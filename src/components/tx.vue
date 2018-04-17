<template>
  <div>
    <myhead num="0"></myhead>
    <div class="center recent_blocks block tx" v-if='tx.hash'>
      <div class="title" >
        {{$t('message.tx[0].title')}} {{tx.hash.substr(0, 7)}}...
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[0]')}}:</div>
        <div>
          <router-link :to="'/tx/'+tx.hash">{{tx.hash}} </router-link>
        </div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[1]')}}:</div>
        <div>
          <router-link :to="'/block/'+tx.blockHash">{{tx.blockHash}} </router-link>
        </div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[2]')}}:</div>
        <div>
          <router-link :to="'/block/'+tx.blockNumber">{{tx.blockNumber}} </router-link>
        </div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[3]')}}:</div>
        <div>
          <router-link :to="'/account/'+tx.from">{{nameformatter.format(tx.from)}} </router-link>
        </div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[4]')}}:</div>
        <div>
          <router-link v-if="tx.to" :to="'/account/'+tx.to">{{nameformatter.format(tx.to)}} </router-link>
          <section v-else>
            {{$t('message.tx[0].txt')}}
          </section>
        </div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[5]')}}:</div>
        <div>{{ethformatter(tx.value)}} ({{parseInt(tx.value)}}Wei)</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[6]')}}:</div>
        <div>{{tx.nonce}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[7]')}}:</div>
        <div>{{tx.gas}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[8]')}}:</div>
        <div>{{tx.gasUsed}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[9]')}}:</div>
        <div>{{ethformatter(tx.gasPrice)}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.tx[0].list[10]')}}:</div>
        <div>{{ethformatter(tx.gasUsed * tx.gasPrice)}}</div>
      </div>
      <div class="block_list br_none">
        <div>{{$t('message.tx[0].list[11]')}}:</div>
        <div><pre>{{tx.input}}</pre></div>
      </div>
    </div>
  </div>
</template>


<script>
  import head from "./head";

  export default {
    name: 'tx',
    components: {
      myhead: head
    },
    data() {
      return {
        tx: {}
      }
    },
    created: function () {
      new Promise((resolve, reject) => {
        this.web3.eth.getTransaction(this.$route.params.number, function (err, result) {
          if (err) reject(err);
          else resolve(result);
        });
      })
        .then(tx => {
          new Promise((resolve, reject) => {
            this.web3.eth.getTransactionReceipt(tx.hash, function(err, receipt){
            resolve(receipt);
          });
          }).then(receipt => {
            tx.traces = [];
            tx.failed = false;
            if(receipt){
              tx.gasUsed = receipt.gasUsed;
            }
            var value = tx.value;
            console.log(parseInt(value));
            this.tx = tx;
            console.log(tx);
          })
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
</script>


<style scoped>
</style>
