// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintNFT is ERC1155 {
    string public name;
    string public symbol;
    string metadataURI;

    constructor(string memory _name, string memory _symbol, string memory _metadataURI) ERC1155("") {
        name = _name;
        symbol = _symbol;
        metadataURI = _metadataURI;
    }

    function mintNFT(uint _tokenId, uint _amount) public {
        _mint(msg.sender, _tokenId, _amount, "");
    }

    function uri(uint _tokenId) public view override returns  (string memory) {
        return string(abi.encodePacked(metadataURI, Strings.toString(_tokenId), ".json"));
    }
}