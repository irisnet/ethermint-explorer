<template>
  <div class="index">
    <myhead num="2"></myhead>
    <div class="center all_accounts accounts">
      <div class="title">{{$t('message.accounts.title') }}</div>
      <div class="title_list title_list_flex">
        <div v-for="item in $t('message.accounts.list')">{{item}}</div>
      </div>
      <div v-for="item in accounts" class="title_list_warp title_list_flex">
        <div>
          <router-link :to="'/account/'+item.address">{{item.address}}</router-link>
        </div>
        <div>
          {{item.balance}} ETH
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import head from "./head";
  export default {
    name: "accounts",
    components: {
      myhead: head
    },
    data() {
      return {
        accounts: []
      };
    },
    created: function () {
    new Promise((resolve, reject) => {
      this.axios.get('http://10.10.0.1:3434/account')
        .then(function (res) {
          var result = res.data;
          resolve(result);
        });
      }).then(result =>{
        new Promise((resolve, reject) => {
          var accounts = [];
          for (var k = 0, length = result.length; k < length; k++) {
           var balance = 0;
           if(result[k].balance){
              balance = web3.toDecimal(result[k].balance);
           }
           accounts[k] = {
             address: result[k]._id,
             balance: balance
           }
          }
          resolve(accounts)
        }).then(accounts => {
          this.accounts = accounts
        })
      })
    }
  };
</script>


