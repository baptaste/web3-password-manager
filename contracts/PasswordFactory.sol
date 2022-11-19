// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract PasswordFactory is Ownable {
    uint public passwordsCount;

    struct Password {
        bytes32 _passwordHash;
        string _hashId;
    }

    mapping(address => Password[]) public passwords;

    function storePassword(string calldata _hash, string calldata _id) external onlyOwner {
        passwords[msg.sender].push(
            Password(
                bytes32(abi.encodePacked(_hash)),
                _id
            )
        );

        passwordsCount++;
    }

    function retreivePassword(string memory _passwordId) external view onlyOwner returns (string memory) {
        Password[] memory storedPasswords = passwords[msg.sender];
        string memory stringifiedHash = 'not found';

        for (uint i = 0; i < passwordsCount; i++) {

            if (keccak256(abi.encodePacked(storedPasswords[i]._hashId)) == keccak256(abi.encodePacked(_passwordId))) {
                stringifiedHash = string(abi.encodePacked(storedPasswords[i]._passwordHash));
            }
        }

        return stringifiedHash;
    }
}