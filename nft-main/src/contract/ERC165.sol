// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './interfaces/IERC165.sol';


contract ERC165 is IERC165 {
    constructor() {
        _registerInterface(bytes4(keccak256('supportsInterface(bytes4)') ^ 
            keccak256('_registerInterface(bytes4)')));
    }

    mapping (bytes4 => bool) public _suportedInterfaces;

    function supportsInterface(bytes4 interfaceID) external view override returns (bool) {
        return _suportedInterfaces[interfaceID];
    }

    function _registerInterface(bytes4 interfaceId) public override {
        require(interfaceId != 0xffffffff, 'ERC164 = Invalid interface.');
        _suportedInterfaces[interfaceId] = true;
    }
}