// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    
    function balanceOf(address _owner) external view returns (uint256);

    
    function ownerOf(uint256 _tokenId) external view returns (address);

   
    function tranferFrom(address _from, address _to, uint256 _tokenId) external;

   
    function approve(address _approved, uint256 _tokenId) external;

}