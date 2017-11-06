<template>
  <div>
    <myhead num="1"></myhead>
    <div class="center recent_blocks service">
      <div class="title">
        {{$t('message.service[0].title')}}
      </div>
      <div class="btnRed" @click="create=true">
        {{$t('message.service[0].btnRed')}}
      </div>
      <div class="title_list title_list_flex">
        <div v-for="item in $t('message.service[0].list')">{{item}}</div>
      </div>
      <div>
        <div class="title_list_warp title_list_flex" v-for="item in list.data">
          <div>{{item.svc_cd }}</div>
          <div>{{item.svc_name }}</div>
          <div>
            <router-link :to="'/account/'+item.auth">{{item.auth }}</router-link>
          </div>
          <div>{{item.block_type }}</div>
          <div>{{item.auth }}</div>
          <div>{{getDate(item.createtime)}}</div>
          <div>{{getDate(item.createtime)}}</div>
          <div><a target="_blank" :href="'/service/detail/'+item.id"><img src="../../static/img/service_select.png"></a>
          </div>
        </div>
      </div>
      <div style="float: right;margin-top: 40px;">
        <el-pagination
          layout="prev, pager, next"
          :current-page="page"
          @current-change="handleCurrentChange"
          :total="list.total">
        </el-pagination>
      </div>
      <div class="modal " :class="{'model-show':create}">
        <div class="modal-dialog">
          <div style="margin-bottom: 12px" class="modal-head ">
            {{$t('message.service[0].create[7]')}}
            <img src="../../static/img/close.png" @click="create=false" class="modal-close"/>
          </div>
          <div class="model-warp" v-for="item in 6" :class="{'model-warp-selected':model[item-1].is}">
            <div>
              {{$t('message.service[0].create[' + (item - 1) + ']')}}
              <span class="red" v-if="model[item-1].required">*</span>
            </div>
            <div>
              <input v-model="model[item-1].val" @blur="model[item-1].is=false" @focus="model[item-1].is=true"
                     type="text"/>
            </div>
          </div>

          <div class="model-warp">
            <div>
              {{$t('message.service[0].create[6]')}}
              <span class="red">*</span>
            </div>
            <div class="textarea">
              <textarea v-model="model[6].val"></textarea>
            </div>
          </div>
          <div class="model-btn">
            <div class="save" @click="save">
              <img src="../../static/img/save.png"/>
              <span>{{$t('message.service[0].create[9]')}}</span>
            </div>
            <div class="cancel" @click="create=false">
              {{$t('message.service[0].create[8]')}}
            </div>
          </div>
        </div>
      </div>
      <div class="modal modal-tools modal-failed modal-processing" :class="{'model-show':failed}">
        <div class="modal_hint modal-dialog">
          <img src="../../static/img/failed.png"/>
          <span>{{$t('message.head.modal[1]') }}</span>
        </div>
      </div>
      <div class="modal modal-tools modal-done modal-processing" :class="{'model-show':done}">
        <div class="modal_hint modal-dialog">
          <img src="../../static/img/done.png"/>
          <span>{{$t('message.head.modal[2]') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import head from "./head";

  export default {
    name: 'service',
    components: {
      myhead: head
    },
    data() {
      return {
        page: 1,
        list: {
          total: 0
        },
        model: [
          {_svc_cd: '', val: '', is: false, required: true},
          {_svc_name: '', val: '', is: false, required: true},
          {_description: '', val: '', is: false, required: true},
          {_svc_def_type: '', val: '', is: false, required: true},
          {_svc_key: '', val: '', is: false, required: true},
          {_github: '', val: '', is: false, required: false},
          {_svc_def: '', val: '', is: false, required: true},
          {_auth: '', val: '*', is: false, required: true},
          {_block_type: '', val: 'ethereum', is: false, required: true}
        ],
        create: false,
        done: false,
        failed: false
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.limit();
      },
      limit() {
        this.list = JSON.parse(this.service.get_svc_def_list_limit(((this.page - 1) * 10), 10));
        this.list.total = Number(this.list.total);
      },
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
      save() {
        let bool = true;
        this.model.forEach((item) => {
          if (item.required && item.val.trim() === '') {
            console.log(item);
            bool = false;
          }
        })

        if (bool) {
          let _svc_cd = this.model[0].val;
          let _svc_name = this.model[1].val;
          let _description = this.model[2].val;
          let _svc_def_type = this.model[3].val;
          let _svc_key = this.model[4].val;
          let _github = this.model[5].val;
          let _svc_def = this.model[6].val;
          let _auth = this.model[7].val;
          let _block_type = this.model[8].val;
          this.service.svc_def(_svc_cd, _svc_def_type, _svc_def, _auth, _github, _block_type, _svc_name, _description)
            .then((val) => {
              this.create = false;
              this.done = true;
              setTimeout(() => {
                this.done = false;
              }, 2000)

            }, (error) => {
              this.create = false;
              this.failed = true;
              setTimeout(() => {
                this.failed = false;
              }, 2000)
            });

        }

      }
    },
    created: function () {
      this.limit();
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


