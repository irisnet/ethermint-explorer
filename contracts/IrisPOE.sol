pragma solidity ^0.4.15;

contract IrisPOE {
    address owner;
    uint latestDocId;

    mapping(uint => DocumentTransfer) private history;
    mapping(bytes32 => bool) private usedHashes;
    mapping(bytes32 => address) private documentHashMap;

    struct DocumentTransfer {
        uint blockNumber;
        bytes32 hash;
        address from;
        address to;
    }

    event DocumentEvent(uint blockNumber, bytes32 indexed hash, address indexed from, address indexed to);

    function IrisPOE(){
        owner = msg.sender;
    }

    // In case you sent funds by accident
    function empty(){
        uint256 balance = address(this).balance;
        address(owner).transfer(balance);
    }

    function newDocument(bytes32 hash) returns (bool success, uint doc_id){
        if (isDocumentExists(hash)) {
            success = false;
            doc_id = 0;
        }else{
            doc_id = createHistory(hash, msg.sender, msg.sender);
            usedHashes[hash] = true;
            success = true;
        }
        return (success, doc_id);
    }

    function createHistory (bytes32 hash, address from, address to) internal returns (uint doc_id){
        ++latestDocId;
        documentHashMap[hash] = to;
        usedHashes[hash] = true;
        history[latestDocId] = DocumentTransfer(block.number, hash, from, to);
        DocumentEvent(block.number, hash, from, to);
        return latestDocId;
    }

    function transferDocument(bytes32 hash, address recipient) returns (bool success, uint doc_id){
        success = false;
        doc_id = 0;

        if (isDocumentExists(hash)){
            if (documentHashMap[hash] == msg.sender){
                doc_id = createHistory(hash, msg.sender, recipient);
                success = true;
            }
        }

        return (success, doc_id);
    }

    function isDocumentExists(bytes32 hash) constant returns (bool exists){
        if (usedHashes[hash]) {
            exists = true;
        }else{
            exists= false;
        }
        return exists;
    }

    function getDocument(uint doc_id) constant returns (uint blockNumber, bytes32 hash, address from, address to){
        DocumentTransfer storage doc = history[doc_id];
        blockNumber = doc.blockNumber;
        hash = doc.hash;
        from = doc.from;
        to = doc.to;
    }

    function getLatestDocId() constant returns (uint latest){
        return latestDocId;
    }
}