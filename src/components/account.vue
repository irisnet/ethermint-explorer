<template>
  <div>
    <myhead num="2"></myhead>
     <div class="center recent_blocks block tx">
            <div class="title">{{$t('message.accounts.account') }} {{account.address}}</div>
            <div class="block_list">
              <div>Address:</div>
              <div>
                {{account.address}}
              </div>
            </div>
            <div class="block_list">
              <div>Balance:</div>
              <div>
                {{account.balance}} ETH
              </div>
            </div>
      </div>
      <div class="center recent_blocks recent_transactions">
        <div class="title">
          All Transactions
        </div>
        <p v-if="txs.length==0" class="recent_transactions_p"> No transactions </p>
        <section v-else>
          <div class="title_list title_list_flex">
            <div v-for="item in $t('message.index[1].list')">{{item}}</div>
          </div>
          <div v-for="item in txs" class="title_list_warp title_list_flex">
            <div>
              <router-link :to="'/tx/'+item.hash">{{item.hash.substr(0, 10)}}...</router-link>
            </div>
            <div>
              <router-link :to="'/account/'+item.from">{{item.from}} </router-link>
            </div>
            <div>
              <router-link v-if="item.to" :to="'/account/'+item.to">{{item.to}} </router-link>
              <span v-else> {{item.to}} </span>
            </div>
            <div>{{ethformatter(item.value)}}</div>
          </div>
        </section>
      </div>
  </div>

</template>


<script>
  import head from "./head";

  export default {
    name: 'account',
    components: {
      myhead: head
    },
    data() {
      return {
        account: {},
        txs: []
      }
    },
    methods: {
      init: function () {
        var account = this.$route.params.number;
        var balance = this.web3.eth.getBalance(account);
        if(balance){
           balance = web3.toDecimal(balance);
        }
        this.account = {
          address: account,
          balance: balance
        }
        new Promise((resolve, reject) => {
          this.axios.get('http://10.10.0.1:3434/tx?account='+account + '&size='+10000)
            .then(function (res) {
              var result = res.data;
              resolve(result);
            });
          }).then(result =>{
            new Promise((resolve, reject) => {
              console.log(result)
              for (var k = 0, length = result.length; k < length; k++) {
                result[k].value = web3.toDecimal(result[k].value);
              }
              resolve(result)
            }).then(result => {
              this.txs = result
            })
          })
      }
    },
    created: function () {
        this.init();
    },
    watch: {
      $route (to, from) {
        this.init();
      }
    }

  }
</script>


<style scoped>
</style>
