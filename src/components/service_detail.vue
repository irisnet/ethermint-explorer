<template>
  <div>
    <myhead num="1"></myhead>
    <div class="center recent_blocks service service_detail">
      <div class="title title1">{{$t('message.service_detail[0].title')}}</div>
      <div class="service_definition" style="margin-top: 28px;">
        <div>{{$t('message.service_detail[0].detail[0]') }}</div>
        <div>{{list.svc_cd}}</div>
        <div>{{$t('message.service_detail[0].detail[1]') }}</div>
        <div>{{list.svc_name}}</div>
      </div>
      <div class="service_definition">
        <div>{{$t('message.service_detail[0].detail[2]') }}</div>
        <div>
          <router-link :to="'#'">{{list.auth}} </router-link>
        </div>
        <div>{{$t('message.service_detail[0].detail[3]') }}</div>
        <div>{{list.block_type}}</div>
      </div>
      <div class="service_definition">
        <div>{{$t('message.service_detail[0].detail[4]') }}</div>
        <div>{{list.auth}}</div>
        <div>{{$t('message.service_detail[0].detail[5]') }}</div>
        <div>{{list.createtime}}</div>
      </div>
      <div class="service_definition">
        <div>{{$t('message.service_detail[0].detail[6]') }}</div>
        <div>{{list.github}}</div>
        <div>{{$t('message.service_detail[0].detail[7]') }}</div>
        <div>{{list.updatetime}}</div>
      </div>
      <div class="title title1 title2 ">
        {{$t('message.service_detail[0].service_binding_title') }}
        <div @click="createClick" class="btnRed" v-if="!list.svc_bind.createtime" style="right: 0;">
          {{$t('message.service_detail[0].service_binding_btnRed') }}
        </div>
        <div @click="editClick" v-else class="btnRed_blue" @mouseenter="update='service-detail-update.png'"
             @mouseleave="update='detail-update.png'">
          {{$t('message.service_detail[0].service_binding_btnBlue') }}
          <img :src="'../../static/img/'+update"/>
        </div>
      </div>
      <div v-if="list.svc_bind.createtime" class="service_definition" style="margin-top: 28px">
        <div>{{$t('message.service_detail[0].service_binding_List[0]')}}</div>
        <div>{{list.svc_bind.block_type}}</div>
        <div>{{$t('message.service_detail[0].service_binding_List[1]')}}</div>
        <div>
          <router-link :to="'#'">{{list.svc_bind.block_type}} </router-link>
        </div>
      </div>
      <div v-if="list.svc_bind.createtime" class="service_definition" style="margin-top: 28px">
        <div>{{$t('message.service_detail[0].service_binding_List[2]')}}</div>
        <div>{{list.svc_bind.action}}</div>
        <div>{{$t('message.service_detail[0].service_binding_List[3]')}}</div>
        <div>{{list.svc_bind.fee}}</div>
      </div>
      <div v-if="list.svc_bind.createtime" class="service_definition" style="margin-top: 28px">
        <div>{{$t('message.service_detail[0].service_binding_List[4]')}}</div>
        <div>{{list.svc_bind.createtime}}</div>
        <div>{{$t('message.service_detail[0].service_binding_List[5]')}}</div>
        <div>{{list.svc_bind.updatetime}}</div>
      </div>
      <div class="title title2 title1 ">{{$t('message.service_detail[0].Definition')}}</div>
      <pre readonly="readonly">{{list.description}}</pre>
      <div class="modal" :class="{'model-show':edit.show}">
        <div class="modal-dialog">
          <div class="modal-head" style="margin-bottom: 12px">
            {{$t('message.service_detail[0].edit_title')}}
            <img @click="edit.show=false" src="../../static/img/close.png" class="modal-close"/>
          </div>
          <div class="model-warp" >
            <div>
              {{$t('message.service_detail[0].edit_list[0]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input type="text"  readonly v-model="list.id"/>
            </div>
          </div>

          <div class="model-warp" :class="{'amount':edit.amount.is}">
            <div>
              {{$t('message.service_detail[0].edit_list[1]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="edit.amount.is=false" @focus="edit.amount.is=true" type="text" v-model="edit.amount.val" style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-warp" :class="{'amount':edit.limit.is}">
            <div>
              {{$t('message.service_detail[0].edit_list[2]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="edit.limit.is=false" @focus="edit.limit.is=true" type="text" v-model="edit.limit.val" style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-warp" :class="{'amount':edit.preice.is}">
            <div>
              {{$t('message.service_detail[0].edit_list[3]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="edit.preice.is=false" @focus="edit.preice.is=true" type="text" v-model="edit.preice.val" style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-btn">
            <div class="save">
              <img src="../../static/img/save.png"/>
              <span>{{$t('message.service_detail[0].btn[0]')}}</span>
            </div>
            <div class="cancel" @click="edit.show=false">
              {{$t('message.service_detail[0].btn[1]')}}
            </div>
          </div>
        </div>
      </div>
      <div class="modal" :class="{'model-show':create.show}">
        <div class="modal-dialog">
          <div class="modal-head" style="margin-bottom: 12px">
            {{$t('message.service_detail[0].create_title')}}
            <img @click="create.show=false" src="../../static/img/close.png" class="modal-close"/>
          </div>

          <div class="model-warp" >
            <div>
              {{$t('message.service_detail[0].create_list[0]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input type="text"  readonly v-model="list.id"/>
            </div>
          </div>

          <div class="model-warp" :class="{'amount':create.amount.is}">
            <div>
              {{$t('message.service_detail[0].create_list[2]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="create.amount.is=false" @focus="create.amount.is=true" type="text" v-model="create.amount.val" style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-warp" :class="{'amount':create.limit.is}">
            <div>
              {{$t('message.service_detail[0].create_list[3]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="create.limit.is=false" @focus="create.limit.is=true" type="text" v-model="create.limit.val" style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-warp" :class="{'amount':create.preice.is}">
            <div>
              {{$t('message.service_detail[0].create_list[3]')}}
              <span class="red">*</span>
            </div>
            <div>
              <input @blur="create.preice.is=false" @focus="create.preice.is=true" type="text" v-model="create.preice.val" style=" width: 110px;"/>
            </div>
          </div>
          <div class="model-btn">
            <div class="save">
              <img src="../../static/img/save.png"/>
              <span>{{$t('message.service_detail[0].btn[0]')}}</span>
            </div>
            <div class="cancel" @click="create.show=false">
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
        edit:{
          list:[
            'Bind',
            'Unbind'
          ],
          is:'Unbind',
          amount:{
            is:false,
            val:'amount'
          },
          limit:{
            is:false,
            val:"limit"
          },
          preice:{
            is:false,
            val:"Preice"
          },
          show:false
        },
        create:{
          show:false,
          amount:{
            is:false,
            val:''
          },
          limit:{
            is:false,
            val:"limit"
          },
          preice:{
            is:false,
            val:"Preice"
          },
        }
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
      editClick(){
        this.$store.state.wallerModel == '' ? window.scrollTo(0, 900) : this.edit.show = true;
      },
      createClick(){
        this.$store.state.wallerModel == '' ? window.scrollTo(0, 900) : this.create.show = true;
      }
    },
    created: function () {
      this.list = JSON.parse(this.service.get_svc_def_by_id(this.$route.params.number));
      this.list.createtime = this.getDate(this.list.createtime);
      this.list.updatetime = this.getDate(this.list.updatetime);
      if (this.list.svc_bind.createtime) {
        this.list.svc_bind.createtime = this.getDate(this.list.svc_bind.createtime);
        this.list.svc_bind.updatetime = this.getDate(this.list.svc_bind.updatetime);
      }

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
