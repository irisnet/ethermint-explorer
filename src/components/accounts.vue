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
          {{item.address}}
        </div>
        <div>
          {{ethformatter(item.balance)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import head from "./head";
  export default {
    name: "index",
    components: {
      myhead: head
    },
    data() {
      return {
        accounts: []
      };
    },
    created: function () {
      var accounts = this.web3.eth.accounts;
      for (var k = 0, length = accounts.length; k < length; k++) {
          var balance = this.web3.eth.getBalance(accounts[k]);
          this.accounts[k] = {
            address: accounts[k],
            balance: balance
          }
      }
    }
  };
</script>


