<template>
  <div class="index">
    <myhead num="0"></myhead>
    <div class="center recent_blocks">
      <div class="title">{{$t('message.index[0].title') }}</div>
      <div class="btnRed">{{$t('message.index[0].btnRed') }}</div>
      <div class="title_list title_list_flex">
        <div v-for="item in $t('message.index[0].list')">{{item}}</div>
      </div>
      <div v-for="item in blocks" class="title_list_warp title_list_flex">
        <div>
          <router-link :to="'/block/'+item.number">{{item.number}} </router-link>
        </div>
        <div>
          <router-link :to="'/account/'+item.miner"> {{nameformatter.format(item.miner)}} </router-link>
        </div>
        <div>{{ item.timestamp}}</div>
        <div>{{item.transactions.length}}</div>
      </div>
    </div>
    <div class="center recent_blocks recent_transactions">
      <div class="title">
        {{$t('message.index[1].title') }}
      </div>
      <p v-if="txs.length==0" class="recent_transactions_p"> {{$t('message.index[1].zero') }}</p>
      <section v-else>
        <div class="title_list title_list_flex">
          <div v-for="item in $t('message.index[1].list')">{{item}}</div>
        </div>
        <div v-for="item in txs" class="title_list_warp title_list_flex">
          <div>
            <router-link :to="'/tx/'+item.hash">{{item.hash.substr(0, 10)}} </router-link>
          </div>
          <div>
            <router-link :to="'/account/'+item.from">{{item.fromMat}} </router-link>
          </div>
          <div>
            <router-link v-if="item.to" :to="'/account/'+item.to">{{item.toMat}} </router-link>
            <span v-else> {{$t('message.index[1].Amount') }}</span>
          </div>
          <div>{{item.value}}</div>
        </div>
      </section>
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
        blocks: [],
        blockCount: 10,
        txs: []
      };
    },
    created: function () {
      new Promise((resolve, reject) => {
        this.web3.eth.getBlock("latest", false, function (err, result) {
          if (err) reject(err);
          else resolve(result);
        });
      })
        .then(lastBlock => {
          if (lastBlock.number - this.blockCount < 0) {
            this.blockCount = lastBlock.number + 1;
          }
          for (var i = 0; i < 10; i++) {
            let block = this.web3.eth.getBlock(lastBlock.number - i, true);
            console.log(block);
            block.timestamp = this.moment.unix(block.timestamp).format();
            block.transactions.forEach((tx) => {
              tx.fromMat = this.nameformatter.format(tx.from);
              tx.toMat = this.nameformatter.format(tx.to);
              tx.value = this.ethformatter(tx.value);
              this.txs.push(tx);
            });
            this.blocks.push(block);
          }
          console.log(this.blocks);

        })
        .catch(err => {
          console.log(err);
        });
    }
  };
</script>


