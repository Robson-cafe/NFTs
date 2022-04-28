// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './interfaces/IERC721.sol';
import './ERC165.sol';

contract ERC721 is IERC721, ERC165{
    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 indexed tokenId
    );

    event Approval(
        address indexed _from, 
        address indexed _to, 
        uint256 indexed _tokenId
    );

    constructor() {
        _registerInterface(bytes4(keccak256('balanceOf(bytes4)') ^ 
            keccak256('ownerOf(bytes4)') ^ 
            keccak256('tranferFrom(bytes4)') ^ 
            keccak256('approve(bytes4)')));
    }

    mapping(uint256 => address) private _tokenOwner;
    mapping(address => uint256) private _ownedTokensCount;
    mapping(uint256 => address) private _tokenApprovals;

    
    function balanceOf(address _owner) public view override returns(uint256) {
        require(_owner != address(0), 'Owner query for non-existent token');
        return _ownedTokensCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view override returns(address) {
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), 'Owner query for non-existent token');
        return owner;
    }

    function _exist(uint256 tokenId) internal view returns(bool) {
        address owner = _tokenOwner[tokenId];

        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual{
        require(to != address(0), 'ERC721: minting to the zero address.'); // endereço não pode ser nulo , ==0
        require(!_exist(tokenId), 'ERC721: token already minted.'); // token existente , ==0

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to] += 1;

        emit Transfer(address(0), to, tokenId);
    }

    function _transferFrom(address _from, address _to, uint256 _tokenId) internal {
        require(_to != address(0), 'ERC721: tranfer to the zero address.');
        require(ownerOf(_tokenId) == _from, 'Trying to tranfer token an address does not own');

        _ownedTokensCount[_to] += 1;
        _ownedTokensCount[_from] -= 1;
        _tokenOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    //usar para debbugin
    function tranferFrom(address _from, address _to, uint256 _tokenId) public {
        _transferFrom(_from, _to, _tokenId);
    }

    function approve(address _to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);

        require(_to != owner, 'Error - approval current owner');
        require(owner == msg.sender, 'Current caller not the owner');

        _tokenApprovals[tokenId] = _to;

        emit Approval(owner, _to, tokenId);
    }
}