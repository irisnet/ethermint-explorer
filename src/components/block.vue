<template>
  <div>
    <myhead num="0"></myhead>
    <div class="center recent_blocks block">
      <div class="title">{{$t('message.block[0].title')}}  {{block.number}}</div>
      <div class="btn_div">
        <a :href="'/block/'+(block.number+1)" class="btnBlue">
          {{$t('message.block[0].btn[1]') }}
        </a>
        <a v-if="block.number>=1" :href="'/block/'+(block.number-1)" class="btnBlue">
          {{$t('message.block[0].btn[0]')}}
        </a>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[0]')}}:</div>
        <div>{{block.hash}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[1]')}}:</div>
        <div>
          <router-link :to="'/block/'+block.parentHash">{{block.parentHash}} </router-link>
        </div>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[2]')}}:</div>
        <div>
          <router-link :to="'/account/'+block.miner">{{nameformatter.format(block.miner)}} </router-link>
        </div>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[3]')}}:</div>
        <div>{{numeral(block.gasLimit).format()}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[4]')}}:</div>
        <div>{{numeral(block.gasUsed).format()}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[5]')}}:</div>
        <div>{{numeral(block.difficulty).format() == 'NaN' ? '' : numeral(block.difficulty).format()}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[6]')}}:</div>
        <div>{{numeral(block.totalDifficulty).format() == 'NaN' ? '' : numeral(block.totalDifficulty).format()}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[7]')}}:</div>
        <div>{{moment.unix(block.timestamp).format()}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[8]')}}:</div>
        <div>{{numeral(block.size).format()}}</div>
      </div>
      <div class="block_list">
        <div>{{$t('message.block[0].list[9]')}}:</div>
        <div v-if="block.transactions">{{block.transactions.length}}</div>
      </div>

      <div class="title block_title recent_transactions ">
        {{$t('message.block[1].title')}}
      </div>
      <p v-if="block.transactions.length===0" class="recent_transactions_p"> {{$t('message.block[1].zero')}} </p>
      <section v-else>
        <div class="title_list title_list_flex">
          <div v-for="item in $t('message.block[1].list')">
            {{item}}
          </div>
        </div>
        <section v-for="item in block.transactions">
          <div class="title_list_warp title_list_flex">
            <div>
              <section v-if="item.error">
                <img class="error" @mouseenter="enter(item)" @mouseleave="leave(item)"
                     src="../../static/img/error.png"/>
                <div class="toolTips" v-show="item.is">
                  <div class="triangle-left"></div>
                  <div class="toolTips_txt">
                    {{$t('message.block[1].toolTips_txt')}}
                  </div>
                </div>
              </section>
              <router-link :to="'/tx/'+item.hash"> {{item.hash.substr(0, 10)}}... </router-link>
            </div>
            <div class="capitalize">Tx</div>
            <div>
              <router-link :to="'/account/'+item.from"> {{nameformatter.format(item.from)}} </router-link>
            </div>
            <div>
              <router-link v-if="item.to" :to="'/account/'+item.to"> {{nameformatter.format(item.to)}} </router-link>
              <section v-else>
                New Contract
              </section>
            </div>
            <div>
              {{ethformatter(item.value)}}
            </div>
          </div>

          <div class="title_list_warp title_list_flex traces" v-for="trace in item.traces">
            <div>
              <img src="../../static/img/arrow_right.jpg"/>
            </div>
            <div>{{trace.type}}</div>
            <div>
              <router-link :to="'/account/'+trace.action.from"> {{nameformatter.format(trace.action.from)}}
              </router-link>
            </div>

            <div v-if="trace.type === 'call'">
              <router-link :to="'/account/'+trace.action.to"> {{nameformatter.format(trace.action.to)}}</router-link>
            </div>
            <div v-if="trace.type === 'create'">
              <router-link :to="'/account/'+trace.result.address"> {{nameformatter.format(trace.result.address)}}
              </router-link>
            </div>
            <div v-if="trace.type === 'suicide'">
              <router-link :to="'/account/'+trace.action.refundAddress">
                {{nameformatter.format(trace.action.refundAddress)}}
              </router-link>
            </div>
            <div v-if="trace.type === 'suicide'">
              {{ethformatter(trace.action.balance)}}
            </div>
            <div v-if="trace.type === 'call'||trace.type === 'create'">{{ethformatter(trace.action.value)}}</div>


          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
  import head from "./head";

  export default {
    name: "block",
    components: {
      myhead: head
    },
    data() {
      return {
        block: {
          transactions: {
            traces: []
          }
        },

      }
    },
    methods: {
      enter(item) {
        item.is = true;

      },
      leave(item) {
        item.is = false;

      }
    },
    created: function () {

      new Promise((resolve, reject) => {
        this.web3.eth.getBlock(this.$route.params.number, true, function (err, result) {
          if (err) reject(err);
          else resolve(result);
        });
      })
        .then(block => {
          block.transactions.forEach((tx) => {
            tx.traces = [];
            tx.failed = false;
            tx.is = false;
            block.transactions.forEach(function (trace) {
              if (tx.hash === trace.transactionHash) {
                tx.traces.push(trace);
                if (trace.error) {
                  tx.failed = true;
                  tx.error = trace.error;
                }
              }
            });
//            tx.traces = [{
//              "action": {
//                "from": "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
//                "to": "0x8be7a6246ac1c73c09ea62ef69d33836434de391",
//                "value": 10
//              },
//              "type": "call"
//            }, {
//              "action": {
//                "from": "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
//                "to": "0x8be7a6246ac1c73c09ea62ef69d33836434de391",
//                "value": 10,
//                "result": 'dasdddddddd'
//              },
//              "result": {
//                "address": "address",
//              },
//              "type": "create"
//            }, {
//              "action": {
//                "from": "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
//                "to": "0x8be7a6246ac1c73c09ea62ef69d33836434de391",
//                "value": 10,
//                "result": 'dasdddddddd',
//                "refundAddress": "xxxxxx",
//                "balance": 30
//              },
//              "type": "suicide"
//            }];
          });

          this.block = block;
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
</script>


