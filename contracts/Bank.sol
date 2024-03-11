// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "hardhat/console.sol";

contract Bank {

    constructor() {
        createAccount("Miguel Villegas", 1234567890, 8300);
        createAccount("Andres", 4561238900, 7400);
    }   

    struct Transaction {
        uint256 fromAccount;
        uint256 toAccount;
        uint256 amount;
    }

    struct Account {
        address owner;
        string name;
        uint256 accountNumber;
        uint256 balance;
    }

    Account[] private accounts;

    function createAccount(
        string memory _name,
        uint256 _accountNumber,
        uint256 _initBalance
    ) public {
        Account memory newAccount = Account(msg.sender, _name, _accountNumber, _initBalance);
        accounts.push(newAccount);
    }

    function getAccount(uint256 _accountNumber) public view returns (Account memory account) {
        for (uint256 i = 0; i < accounts.length; i++) {
            if (accounts[i].accountNumber == _accountNumber) {
                return accounts[i];
            }
        }
    }

    function getBalance(uint256 _accountNumber) public view returns (uint256 balance) {
        for (uint256 i = 0; i < accounts.length; i++) {
            if (accounts[i].accountNumber == _accountNumber) {
                return accounts[i].balance;
            }
        }
    }

    function transfer(uint256 _fromAccountNumber, uint256 _toAccountNumber, uint256 _amount) public {
        for (uint256 i = 0; i < accounts.length; i++) {
            if (accounts[i].accountNumber == _fromAccountNumber) {
                require(accounts[i].balance >= _amount, "Insufficient funds");
                accounts[i].balance -= _amount;
            }
            if (accounts[i].accountNumber == _toAccountNumber) {
                accounts[i].balance += _amount;
            }
        }
    }
}
