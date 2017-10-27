pragma solidity ^0.4.15;

import "./strings.sol";


 contract IrisSvcsContracts{

     //服务定义事件
     event evt_svc_def(
         address indexed _from,
         uint svc_id
     );

     //服务绑定事件
     event evt_svc_bind(
         address indexed _from,
         bool result
     );

     //服务绑定更新事件
     event evt_svc_bind_update(
         address indexed _from,
         bool result
     );

     //服务调用方监听事件
     event notify_consumer(
         address indexed consumer,
         address provider,
         string  data
     );

     //服务提供方监听事件
     event notify_provider(
         address indexed consumer,
         address provider,
         string  data
     );



    using strings for *;

    //服务定义集合
    bean_svc_def[] svcs;
    //服务定义id，自增长
    uint svc_id = 1;

    //服务绑定集合
    bean_svc_bind[] binds;
    //服务绑定id，自增长
    uint bind_id = 1;

    svc_call[] calls;
    uint call_id = 0;

    //服务定义cd到id的映射
    mapping (string => uint) cd2id;
    //服务地址到服务费用的映射
    mapping (address => uint) addr2fee;

    // struct for bean service definition
    struct bean_svc_def {
        uint id; // identity
        address def_addr; // definition address（provider）
        string svc_cd; //service code (unique)
        string svc_def_type; // service definition type
        string svc_def; // service definition
        string auth; //
        string github; //github address
        uint createtime; // update
        uint updatetime; // update
        string block_type; //
        string svc_name; // service name
        string _description; // service description
        uint bind_id;
    }

    struct bean_svc_bind {
        uint id; //
        address bind_addr; // bind address (editable)
        uint svc_id; //service id
        string action; //editable "bind/unbind"
        uint fee; //editable
        string scope;  //editable
        uint createtime; //
        uint updatetime; //
        string block_type; // editable
        string public_key; //
    }

    // a summary of service call record
    struct svc_call{
        address consumer;
        address provider;
        bool is_complete;
        uint fee;
    }

    //服务定义函数
    function svc_def(string _svc_cd, string _svc_def_type, string _svc_def,
                     string _auth, string _github, string _block_type,
                     string _svc_name, string _description){
        //扩展数组长度
        svcs.length+=2;

        //if svc_cd unique
        if (cd2id[_svc_cd] != uint(0x0)){
            evt_svc_def(msg.sender,0);
            return;
        }

        svcs[svc_id++] = bean_svc_def(
                svc_id,
                msg.sender,
                _svc_cd,
                _svc_def_type,
                _svc_def,
                _auth,
                _github,
                block.timestamp,
                block.timestamp,
                _block_type,
                _svc_name,
                _description,
                0
            );

        cd2id[_svc_cd] = svc_id -1;
        evt_svc_def(msg.sender,svc_id - 1);
    }

     //服务绑定函数
    function svc_bind(string _svc_cd, address _bind_address, string _action,
                      uint _fee, string _scope, string _block_type,string _public_key){

        uint _svc_id = cd2id[_svc_cd]; //get svc_id from svc_cd
        //if svc_cd unique
        if (_svc_id == uint(0x0)){
            evt_svc_bind(msg.sender,false);
            return;
        }
        //扩展数组长度
        binds.length+=2;
        binds[bind_id++] = bean_svc_bind(
            bind_id,
            //block.coinbase,
            _bind_address,
            _svc_id,
            _action,
            _fee,
            _scope,
            block.timestamp,
            block.timestamp,
            _block_type,
            _public_key
        );
        svcs[_svc_id].bind_id = bind_id - 1;
        addr2fee[_bind_address] = _fee;
        evt_svc_bind(msg.sender,true);
    }

    function svc_bind_update(string _svc_cd, string _action, uint _fee){
        uint _svc_id = cd2id[_svc_cd]; //get svc_id from svc_cd
        if (_svc_id == uint(0x0)){
            evt_svc_bind_update(msg.sender,false);
            return;
        }
        bean_svc_bind bind = binds[svcs[_svc_id].bind_id];
        bind.action = _action;
        bind.fee = _fee;
        addr2fee[bind.bind_addr] = _fee;
        evt_svc_bind_update(msg.sender,true);
    }

     function get_svc_def(string _svc_cd) returns(string){
         uint _svc_id = cd2id[_svc_cd];
         if (_svc_id == uint(0x0)){
             return "";
         }
         var svc = svcs[_svc_id];
         string memory output =toJson(svc);
         return output;
     }

     function get_svc_def_by_id(uint _svc_id) returns(string){
          var svc = svcs[_svc_id];
          string memory output =toJson(svc);
          return output;
     }

    function get_svc_bind_by_id(uint bind_id) returns(string){
        string[50] memory str_arr;
        string memory output;
        var slice_arr = new strings.slice[](50);
        uint c;
        var svc_bind =  binds[bind_id];
        str_arr[c++] = "{\"id\":\"";
        str_arr[c++] = int2string(svc_bind.id);
        str_arr[c++] = "\",\"bind_addr\":\"";
        str_arr[c++] = toAsciiString(svc_bind.bind_addr);
        str_arr[c++] = "\",\"svc_id\":\"";
        str_arr[c++] = int2string(svc_bind.svc_id);
        str_arr[c++] = "\",\"action\":\"";
        str_arr[c++] = svc_bind.action;
        str_arr[c++] = "\",\"fee\":\"";
        str_arr[c++] = int2string(svc_bind.fee);
        str_arr[c++] = "\",\"scope\":\"";
        str_arr[c++] = svc_bind.scope;
        str_arr[c++] = "\",\"createtime\":\"";
        str_arr[c++] = int2string(svc_bind.createtime);
        str_arr[c++] = "\",\"updatetime\":\"";
        str_arr[c++] = int2string(svc_bind.updatetime);
        str_arr[c++] = "\",\"block_type\":\"";
        str_arr[c++] = svc_bind.block_type;
        str_arr[c++] = "\",\"public_key\":\"";
        str_arr[c++] = svc_bind.public_key;
        str_arr[c++] = "\"}";

        for(uint i = 0;i < c;i++){
            slice_arr[i] = str_arr[i].toSlice();
        }
        output = "".toSlice().join(slice_arr);
        return output;
      }

    function get_svc_def_list() returns(string){
        string memory infos = "[";
        for(uint i = 1;i < svc_id;i++){
            var svc = svcs[i];
            string memory res =toJson(svc);
            infos = infos.toSlice().concat(res.toSlice());
            if(i != svc_id - 1){
                infos = infos.toSlice().concat(",".toSlice());
            }
        }
        infos = infos.toSlice().concat("]".toSlice());
        return infos;
    }

    function get_svc_def_list_limit(uint skip,uint limit) returns(string){
        var total = int2string(svc_id - 1);

        string memory infos = "{";
        infos = infos.toSlice().concat("\"total\":".toSlice());
        infos = infos.toSlice().concat("\"".toSlice());
        infos = infos.toSlice().concat(total.toSlice());
        infos = infos.toSlice().concat("\",\"data\":[".toSlice());
        uint end = skip + limit + 1;
        if(end>svc_id-1){
            end = svc_id;
        }
        for(uint i = skip + 1;i < end;i++){
            var svc = svcs[i];
            string memory res =toJson(svc);
            infos = infos.toSlice().concat(res.toSlice());
            if(i != end - 1){
                infos = infos.toSlice().concat(",".toSlice());
            }
        }
        infos = infos.toSlice().concat("]}".toSlice());
        return infos;
    }

    function toJson(bean_svc_def svc) private returns(string){
         string[50] memory str_arr;
         string memory output;
         var slice_arr = new strings.slice[](50);
         uint c;
         str_arr[c++] = "{\"id\":\"";
         str_arr[c++] = int2string(svc.id);
         str_arr[c++] = "\",\"def_addr\":\"";
         str_arr[c++] = toAsciiString(svc.def_addr);
         str_arr[c++] = "\",\"svc_cd\":\"";
         str_arr[c++] = svc.svc_cd;
         str_arr[c++] = "\",\"svc_def_type\":\"";
         str_arr[c++] = svc.svc_def_type;
         str_arr[c++] = "\",\"svc_def\":\"";
         str_arr[c++] = svc.svc_def;
         str_arr[c++] = "\",\"auth\":\"";
         str_arr[c++] = svc.auth;
         str_arr[c++] = "\",\"github\":\"";
         str_arr[c++] = svc.github;
         str_arr[c++] = "\",\"createtime\":\"";
         str_arr[c++] = int2string(svc.createtime);
         str_arr[c++] = "\",\"updatetime\":\"";
         str_arr[c++] = int2string(svc.updatetime);
         str_arr[c++] = "\",\"block_type\":\"";
         str_arr[c++] = svc.block_type;
         str_arr[c++] = "\",\"svc_name\":\"";
         str_arr[c++] = svc.svc_name;
         str_arr[c++] = "\",\"bind_id\":\"";
         str_arr[c++] = int2string(svc.bind_id);
         str_arr[c++] = "\",\"description\":\"";
         str_arr[c++] = svc._description;
         str_arr[c++] = "\"";

         var bind_id = svc.bind_id;
         if (bind_id != uint(0x0)){
             var svc_bind =  binds[bind_id];
             str_arr[c++] = ",\"svc_bind\":";
             str_arr[c++] = "{\"id\":\"";
             str_arr[c++] = int2string(svc_bind.id);
             str_arr[c++] = "\",\"bind_addr\":\"";
             str_arr[c++] = toAsciiString(svc_bind.bind_addr);
             str_arr[c++] = "\",\"svc_id\":\"";
             str_arr[c++] = int2string(svc_bind.svc_id);
             str_arr[c++] = "\",\"action\":\"";
             str_arr[c++] = svc_bind.action;
             str_arr[c++] = "\",\"fee\":\"";
             str_arr[c++] = int2string(svc_bind.fee);
             str_arr[c++] = "\",\"scope\":\"";
             str_arr[c++] = svc_bind.scope;
             str_arr[c++] = "\",\"createtime\":\"";
             str_arr[c++] = int2string(svc_bind.createtime);
             str_arr[c++] = "\",\"updatetime\":\"";
             str_arr[c++] = int2string(svc_bind.updatetime);
             str_arr[c++] = "\",\"block_type\":\"";
             str_arr[c++] = svc_bind.block_type;
             str_arr[c++] = "\",\"public_key\":\"";
             str_arr[c++] = svc_bind.public_key;
             str_arr[c++] = "\"}";
         }else{
             str_arr[c++] = ",\"svc_bind\":";
             str_arr[c++] = "{}";
         }
         str_arr[c++] = "}";

         for(uint i = 0;i < c;i++){
             slice_arr[i] = str_arr[i].toSlice();
         }

         output = "".toSlice().join(slice_arr);
         return output;
    }

    function get_svc_fee(address bind_addr) returns(uint){
         var _fee = addr2fee[bind_addr];
         return _fee;
    }

    //服务调用方调用远程服务
    function callService(address service, string data) payable{
         uint _fee = get_svc_fee(service);
         var sender = msg.sender;
         //判断本次调用的服务费用
         if(msg.value < _fee) {
             //返回错误，通知调用方余额不足
             return;
         }
         //扩展数组长度
         calls.length++;
         calls[call_id++] = svc_call(sender, service, false, _fee);
         notify_provider(sender, service, data);
    }

    //服务提供方通过调用callbackService，返回处理数据
    function callbackService(address customer, string data){
         for(var i = 0; i < call_id; i++) {
             var call = calls[i];
             if(call.consumer == customer && !call.is_complete){
                 call.is_complete = true;
                 call.provider.send(call.fee);
                 notify_consumer(call.consumer, call.provider, data);
             }
         }
    }

    function int2string(uint v) constant private returns (string) {
       bytes32 ret;
        if (v == 0) {
             ret = '0';
        }
        else {
             while (v > 0) {
                  ret = bytes32(uint(ret) / (2 ** 8));
                  ret |= bytes32(((v % 10) + 48) * 2 ** (8 * 31));
                  v /= 10;
             }
        }
        return ret.toSliceB32().toString();
    }

    function toAsciiString(address x) private returns (string) {
         bytes memory s = new bytes(40);
         for (uint i = 0; i < 20; i++) {
             byte b = byte(uint8(uint(x) / (2**(8*(19 - i)))));
             byte hi = byte(uint8(b) / 16);
             byte lo = byte(uint8(b) - 16 * uint8(hi));
             s[2*i] = toChar(hi);
             s[2*i+1] = toChar(lo);
         }
         return string(s);
    }

    function toChar(byte b) private returns (byte c) {
         if (b < 10) return byte(uint8(b) + 0x30);
         else return byte(uint8(b) + 0x57);
    }
 }