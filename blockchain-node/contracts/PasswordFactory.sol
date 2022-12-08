// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "./Ownable.sol";

contract PasswordFactory is Ownable {
    uint public passwordsCount;

    struct Password {
        string _passwordHash;
        string _hashId;
    }

    mapping(address => Password[]) public passwords;

    event NewPassword(string indexed hashId, bool indexed stored);

    function storePassword(string calldata _hash, string calldata _id) external onlyOwner returns (bool) {
        passwords[msg.sender].push(Password(_hash,_id));
        bool stored = true;
        passwordsCount++;
        emit NewPassword(_id, stored);
        return stored;
    }

    function retreivePassword(string memory _passwordId) external view onlyOwner returns (string memory) {
        Password[] memory storedPasswords = passwords[msg.sender];
        string memory passwordHash;

        for (uint i = 0; i < passwordsCount; i++) {

            if (keccak256(abi.encodePacked(storedPasswords[i]._hashId)) == keccak256(abi.encodePacked(_passwordId))) {
                passwordHash = storedPasswords[i]._passwordHash;
            }
        }

        return passwordHash;
    }
}