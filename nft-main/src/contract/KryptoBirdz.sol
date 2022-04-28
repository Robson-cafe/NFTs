// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract KryptoBirdz is ERC721Connector{
    string[] public kryptoBird;

    mapping(string => bool) _kryptoBirdzExists;

    function mint (string memory _kryptoBird) public payable {
        require(!_kryptoBirdzExists[_kryptoBird], 'Error kriptoBird already exist.');
        kryptoBird.push(_kryptoBird);
        uint256 _id = kryptoBird.length - 1;

        _mint(msg.sender, _id);

        _kryptoBirdzExists[_kryptoBird] = true;
    }

    constructor() ERC721Connector('KryptoBirds', 'KBIRDS'){
        
    }
}
