pragma solidity ^0.4.15;

contract IrisSvcContract {

    // service definition event
    event evtSvcDef(address indexed from,uint svcId);

    // service binding event
    event evtSvcBind(address indexed from,uint bindId);

    // service binding update event
    event evtSvcBindUpdate(address indexed from,bool result);

    // service call event
    event evtSvcCall(uint callId,address consumer,address indexed provider,string  data);

    // service callback event
    event evtSvcCallback(uint callId,address indexed consumer,address provider,string data);

    // service recall event
    event evtSvcRecall(uint callId,address indexed consumer,uint fee);

    // struct for service definition
    struct svcDef {
        address addr; // definition address（provider）
        string cd; //service code (unique)
        string name; // service name
        string desc; // service description
        string defType; // service definition type
        string def; // service definition
        string github; //github address
        uint createtime;
    }

    // struct for service binding
    struct svcBind {
        address addr; // binding address
        uint state; // editable "1: bind/0: unbind"
        string auth; // editable
        uint fee; // editable
        string publicKey; // editable
        uint createtime;
        uint updatetime;
    }

    // a summary of service call record
    struct svcCall {
        address consumer;
        address provider;
        uint fee;
    }

    mapping(uint => svcDef) private svcMap;
    mapping(uint => svcBind) private bindMap;
    mapping(uint => uint) private svcXBindMap;
    mapping(uint => svcCall) private svcCallMap;
    mapping (string => uint) private cdXIdMap;
    mapping (uint => uint) private svcIdXFeeMap;
    uint private latestSvcId;
    uint private latestBindId;
    uint private latestCallId;

    function getLatestSvcId() public view returns (uint) {
        return latestSvcId;
    }

    function defineService(string cd, string name, string desc, string defType, string definition, string github) public returns (uint) {

        require(cdXIdMap[cd] == uint(0x0)); // check cd existence

        var svcId = ++ latestSvcId;
            svcMap[svcId] = svcDef(
            msg.sender,
            cd,
            name,
            desc,
            defType,
            definition,
            github,
            now
        );

        cdXIdMap[cd] = svcId;
        evtSvcDef(msg.sender, svcId);
        return svcId;
    }

    function bindService(uint svcId, uint bindState, string auth, uint fee, string publicKey) public returns (uint) {

        require(svcId > 0 && svcId <= latestSvcId); // check svc existence
        require(svcXBindMap[svcId] == uint(0x0)); // check binding existence

        var bindId = ++ latestBindId;
        bindMap[bindId] = svcBind(
            msg.sender,
            bindState,
            auth,
            fee,
            publicKey,
            now,
            now
        );

        svcXBindMap[svcId] = bindId;
        svcIdXFeeMap[svcId] = fee;
        evtSvcBind(msg.sender, bindId);

        return bindId;
    }

    function updateSvcBind(uint svcId, uint bindState, string auth, uint fee, string publicKey) public returns (uint) {

        require(svcId > 0 && svcId <= latestSvcId); // check svc existence

        var bindId = svcXBindMap[svcId];
        require(bindId != uint(0x0)); // check binding existence

        var binding = bindMap[bindId];
        require(binding.addr == msg.sender); // check authorization

        binding.state = bindState;
        binding.auth = auth;
        binding.fee = fee;
        binding.publicKey = publicKey;
        binding.updatetime = now;

        svcIdXFeeMap[svcId] = fee;
        evtSvcBindUpdate(msg.sender, true);

        return (bindId);
    }

    function getSvcDef(uint svcId) public view returns(address, string, string, string, string, string, string, uint) {
        var svc = getDefPrivate(svcId);
        return (svc.addr, svc.cd, svc.name, svc.desc, svc.defType, svc.def, svc.github, svc.createtime);
    }

    function covertCdToId(string cd) public view returns(uint){
        uint svcId = cdXIdMap[cd];
        return svcId;
    }


    function getSvcBind(uint svcId) public view returns(address, uint, string, uint, string, uint, uint) {
        var binding = getSvcBindPrivate(svcId);
        return (binding.addr, binding.state, binding.auth, binding.fee, binding.publicKey, binding.createtime, binding.updatetime);
    }

    // Consumer calls service and transfers in the specified fee to Contract
    function callService(uint svcId, string data) public payable returns (uint) {
        var binding = getSvcBindPrivate(svcId);
        require(binding.state == 1); // check binding state
        uint fee = svcIdXFeeMap[svcId];
        require(msg.value >= fee);

        var sender = msg.sender;
        var provider = binding.addr;
        var callId = ++ latestCallId;
        svcCallMap[callId] = svcCall(sender, provider, fee);
        evtSvcCall(callId, sender, provider, data);
        return callId;
    }

    // Provider calls back service
    // after processing the received request data from Consumer
    // then Contract transfers out the specified fee to Provider
    function callbackService(uint callId, string data) public payable {
        var call = svcCallMap[callId];
        require(call.provider == msg.sender); // check provider authorization
        call.provider.transfer(call.fee); // transfers out the specified fee to Provider
        evtSvcCallback(callId, call.consumer, call.provider, data);
        delete svcCallMap[callId];
    }

    // Consumer can recall service if Provider did not callback
    // then Contract payback the specified fee to Consumer
    function recallService(uint callId) public payable returns (uint) {
        var call = svcCallMap[callId];
        require(call.consumer == msg.sender); // check consumer authorization
        call.consumer.transfer(call.fee); // transfers out the specified fee back to Consumer
        evtSvcRecall(callId, call.consumer, call.fee);
        delete svcCallMap[callId];
    }

    function getDefPrivate(uint svcId) private view returns(svcDef) {
        require(svcId > 0 && svcId <= latestSvcId); // check svc existence
        return svcMap[svcId];
    }

    function getSvcBindPrivate(uint svcId) private view returns(svcBind) {
        require(svcId > 0 && svcId <= latestSvcId); // check svc existence
        uint bindId = svcXBindMap[svcId];
        require(bindId > 0); // check binding existence
        return bindMap[bindId];
    }
}
