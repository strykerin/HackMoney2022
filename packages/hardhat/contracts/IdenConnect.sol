pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract IdenConnect is Ownable {

    event SetUserPubKey(address owner, string publicKey);
    event SetAutoPubKey(address owner, string publicKey);

    mapping(address => string) public userPubKeyMap;
    mapping(address => string) public autoPubKeyMap;

    constructor() payable {}

    function setUserPubKey(string memory pubKey) public {
        autoPubKeyMap[msg.sender] = "";
        userPubKeyMap[msg.sender] = pubKey;

        emit SetUserPubKey(msg.sender, pubKey);
    }

    function setAutoPubKey(address userAddress, string memory pubKey)
        public
        onlyOwner
    {
        autoPubKeyMap[userAddress] = pubKey;
        emit SetAutoPubKey(userAddress, pubKey);
    }
}
