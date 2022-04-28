// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';
import './interfaces/IERC721Enumerable.sol';

contract ERC721Enumerable is ERC721, IERC721Enumerable{
    constructor() {
        _registerInterface(bytes4(keccak256('totalSupply(bytes4)') ^ 
            keccak256('tokenByIndex(bytes4)') ^ 
            keccak256('tokenOfOwnerByIndex(bytes4)')));
    }

    uint256[] private _allTokens;

    mapping (uint256 => uint256) private _allTokensIndex;    // index do arrai tokens com id de token
    mapping (address => uint256[]) private _ownedTokens;     //relação do dono com a lista de token que é dono
    mapping (uint256 => uint256) private _ownedTokensIndex;  // dono de cada index da lista de tokken

    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);

        _addTokensToAllTokenEnumaration(tokenId);
        _addTokensToOwnerEnumaration(to, tokenId);
    }

    function _addTokensToAllTokenEnumaration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function _addTokensToOwnerEnumaration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }

    function totalSupply() public view override returns (uint256) {
        return _allTokens.length;
    }

    //funções para debbugin
    function tokenByIndex(uint256 index) public view override returns(uint256) {
        require(index < totalSupply(), 'Global index is out bound');

        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address to, uint256 index) public view override returns(uint256) {
        require(index < balanceOf(to), 'Owner index is out bound');
        
        return _ownedTokens[to][index];
    }
}