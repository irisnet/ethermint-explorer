<template>
  <div>
    <myhead num="1"></myhead>
    <div class="center recent_blocks service service_detail">
      <div class="title title1">{{$t('message.service_detail[0].title')}}</div>
      <div class="service_definition" style="margin-top: 28px;">
        <div>{{$t('message.service_detail[0].detail[0]') }}</div>
        <div>{{list.cd}}</div>
        <div>{{$t('message.service_detail[0].detail[1]') }}</div>
        <div>{{list.name}}</div>
      </div>
      <div class="service_definition">
        <div>{{$t('message.service_detail[0].detail[2]') }}</div>
        <div>
          <router-link :to="'#'">{{list.addr}} </router-link>
        </div>
        <div>{{$t('message.service_detail[0].detail[3]') }}</div>
        <div>{{list.defType}}</div>
      </div>
      <div class="service_definition">
        <div>{{$t('message.service_detail[0].detail[6]') }}</div>
        <div>{{list.github}}</div>
        <div>{{$t('message.service_detail[0].detail[5]') }}</div>
        <div>{{list.createtime}}</div>
      </div>
      <div class="service_definition">

        <div>{{$t('message.service_detail[0].detail[7]') }}</div>
        <div>{{list.desc}}</div>
      </div>
      <div class="title title1 title2 ">
        {{$t('message.service_detail[0].service_binding_title') }}
        <div @click="createClick" class="btnRed" v-if="!list.svcBind.createtime" style="right: 0;">
          {{$t('message.service_detail[0].service_binding_btnRed') }}
        </div>
        <div @click="editClick" v-else class="btnRed_blue" @mouseenter="update='service-detail-update.png'"
             @mouseleave="update='detail-update.png'">
          {{$t('message.service_detail[0].service_binding_btnBlue') }}
          <img :src="'../../static/img/'+update"/>
        </div>
      </div>
      <div v-if="list.svcBind.createtime" class="service_definition" style="margin-top: 28px">

        <div>{{$t('message.service_detail[0].service_binding_List[1]')}}</div>
        <div>
          <router-link :to="'#'">{{list.svcBind.addr}} </router-link>
        </div>
        <div>{{$t('message.service_detail[0].service_binding_List[3]')}}</div>
        <div>{{list.svcBind.fee}}</div>

      </div>
      <div v-if="list.svcBind.createtime" class="service_definition" style="margin-top: 28px">
        <div>{{$t('message.service_detail[0].service_binding_List[2]')}}</div>
        <div>{{list.svcBind.state == 1 ? modal.list[0].txt : modal.list[1].txt}}</div>
        <div>{{$t('message.service_detail[0].service_binding_List[0]')}}</div>
        <div>{{list.svcBind.auth}}</div>
      </div>
      <div v-if="list.svcBind.createtime" class="service_definition" style="margin-top: 28px">
        <div>{{$t('message.service_detail[0].service_binding_List[4]')}}</div>
        <div>{{list.svcBind.createtime}}</div>
        <div>{{$t('message.service_detail[0].service_binding_List[5]')}}</div>
        <div>{{list.svcBind.updatetime}}</div>
      </div>
      <div v-if="list.svcBind.createtime" class="service_definition" style="margin-top: 28px">
        <div>{{$t('message.service_detail[0].service_binding_List[6]')}}</div>
        <div style="width: 80%;    word-break: break-all; word-wrap: break-word;">{{list.svcBind.publicKey}}</div>
      </div>
      <div class="title title2 title1 ">{{$t('message.service_detail[0].Definition')}}</div>
      <pre readonly="readonly">{{list.def}}</pre>
      <div class="modal" :class="{'model-show':modal.show}">
        <div class="modal-dialog">
          <div class="modal-head" style="margin-bottom: 12px">
            {{modal.title}}
            <img @click="modal.show=false" src="../../static/img/close.png" class="modal-close"/>
          </div>
          <div class="model-warp">
            <div>
              {{$t('message.service_detail[0].modal_list[0]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input type="text" readonly v-model="list.id"/>
            </div>
          </div>
          <div class="model-warp" :class="{'amount':modal.amount.is}">
            <div>
              {{$t('message.service_detail[0].modal_list[1]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="modal.amount.is=false" @focus="modal.amount.is=true" type="text" v-model="modal.amount.val"
                     style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-warp" :class="{'amount':modal.auth.is}">
            <div>
              {{$t('message.service_detail[0].modal_list[4]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="modal.auth.is=false" @focus="modal.auth.is=true" type="text" v-model="modal.auth.val"
                     style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-warp ">
            <div>
              {{$t('message.service_detail[0].modal_list[5]')}}
              <span class="red">*</span>
            </div>
            <div>
              <select v-model="modal.bindState" class=" edit_select">
                <option v-for="item in modal.list" v-bind:value="item.val">{{item.txt}}</option>
              </select>
            </div>
          </div>
          <div class="model-warp" :class="{'amount':modal.limit.is}">
            <div>
              {{$t('message.service_detail[0].modal_list[2]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="modal.limit.is=false" @focus="modal.limit.is=true" type="text" v-model="modal.limit.val"
                     style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-warp" :class="{'amount':modal.preice.is}">
            <div>
              {{$t('message.service_detail[0].modal_list[3]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="modal.preice.is=false" @focus="modal.preice.is=true" type="text" v-model="modal.preice.val"
                     style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-btn">
            <div class="save" @click="Save">
              <img src="../../static/img/save.png"/>
              <span>{{$t('message.service_detail[0].btn[0]')}}</span>
            </div>
            <div class="cancel" @click="modal.show=false">
              {{$t('message.service_detail[0].btn[1]')}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <mytoken></mytoken>
  </div>
</template>


<script>
  import head from "./head";
  import token from "./token";

  export default {
    name: 'service_detail',
    components: {
      myhead: head,
      mytoken: token
    },
    data() {
      return {
        list: {},
        update: 'detail-update.png',
        modal: {
          list: [
            {txt: 'Bind', val: 1},
            {txt: 'Unbind', val: 0}
          ],
          bindState: '0',
          amount: {
            is: false,
            val: ''
          },
          limit: {
            is: false,
            val: 4300000
          },
          preice: {
            is: false,
            val: 20000000000
          },
          auth: {
            is: false,
            val: ""
          },
          show: false,
          title: '',
          state: ''
        },
      }
    },
    methods: {
      getDate(date) {
        var date = new Date(date * 1000);//如果date为10位不需要乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
      },
      editClick() {
        this.modal.state = 'edit';
        this.modal.title = this.$t('message.service_detail[0].edit_title');
        this.modalShow();
      },
      createClick() {
        this.modal.state = 'create';
        this.modal.title = this.$t('message.service_detail[0].create_title');
        this.modalShow();
      },
      modalShow() {
        this.$store.state.wallerModel == '' ? window.scrollTo(0, document.body.scrollHeight) : this.modal.show = true;
      },
      Save() {
        let gasPrice = this.$g._int(this.modal.preice.val);
        let gasLimit = this.$g._int(this.modal.limit.val);
        if (this.modal.state == 'edit') {
          this.service.updateSvcBind(this.$store.state.wallerModel, this.list.id, this.modal.bindState, this.modal.auth.val, this.$g._int(this.modal.amount.val), gasPrice, gasLimit).then((val) => {
              this.$modal({done: true});
              this.init();
            },
            (error) => {
              this.$modal({failed: true})
            });
        } else {
          this.service.bindService(this.$store.state.wallerModel, this.list.id, this.modal.bindState, this.modal.auth.val, this.$g._int(this.modal.amount.val), gasPrice, gasLimit).then((val) => {
              this.$modal({done: true});
              this.init();
            },
            (error) => {
              this.$modal({failed: true})
            });
        }
        this.modal.show = false;

      },
      init() {
        this.list = this.service.getSvcDefDetailByCd(this.$route.params.number);
        this.list.createtime = this.getDate(this.list.createtime);
        if (this.list.svcBind.createtime) {
          this.modal.amount.val = this.list.svcBind.fee;
          this.modal.auth.val = this.list.svcBind.auth;
          this.modal.bindState = this.list.svcBind.state;
          this.list.svcBind.createtime = this.getDate(this.list.svcBind.createtime);
          this.list.svcBind.updatetime = this.getDate(this.list.svcBind.updatetime);
        }
      }
    },
    created: function () {
      this.init();
    }
  }
</script>


<style scoped>
  .model-show {
    opacity: 1;
    display: block;
    animation: model-show-frames 0.5s;
  }

  @keyframes model-show-frames {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

</style>
