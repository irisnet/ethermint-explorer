<template>
  <div>
    <myhead num="1"></myhead>
    <div class="center recent_blocks service">
      <div class="title">
        {{$t('message.service[0].title')}}
      </div>
      <div class="btnRed" @click="createClick">
        {{$t('message.service[0].btnRed')}}
      </div>
      <div class="title_list title_list_flex">
        <div v-for="item in $t('message.service[0].list')">{{item}}</div>
      </div>
      <div>
        <div class="title_list_warp title_list_flex" v-for="item in list.data">
          <div>{{item.cd }}</div>
          <div>{{item.name }}</div>
          <div>
            <router-link :to="'/account/'+item.addr">{{item.addr }}</router-link>
          </div>
          <div>{{item.defType }}</div>
          <div>{{getDate(item.createtime)}}</div>
          <div>
            <router-link :to="'/service/detail/'+item.cd"><img src="../../static/img/service_select.png"></router-link>
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
            {{$t('message.service[0].createList[0]')}}
            <img src="../../static/img/close.png" @click="create=false" class="modal-close"/>
          </div>
          <div class="model-warp" v-for="item in 7" :class="{'model-warp-selected':model[item-1].is}">
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
              {{$t('message.service[0].create[8]')}}
              <span class="red">*</span>
            </div>
            <div class="textarea">
              <textarea v-model="model[7].val"></textarea>
            </div>
          </div>
          <div class="model-btn">
            <div class="save" @click="save">
              <img src="../../static/img/save.png"/>
              <span>{{$t('message.service[0].createList[2]')}}</span>
            </div>
            <div class="cancel" @click="create=false">
              {{$t('message.service[0].createList[1]')}}
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
    name: 'service',
    components: {
      myhead: head,
      mytoken: token
    },
    data() {
      return {
        page: 1,
        list: {
          total: 0
        },
        model: [
          {key: 'cd', val: '', is: false, required: true},
          {key: 'name', val: '', is: false, required: true},
          {key: 'desc', val: '', is: false, required: true},
          {key: 'defType', val: '', is: false, required: true},
          {key: 'github', val: '', is: false, required: false},
          {key: 'gasLimit', val: '4300000', is: false, required: false},
          {key: 'gasPrice', val: '20000000000', is: false, required: false},
          {key: 'definition', val: '', is: false, required: true}
        ],
        create: false
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.limit();
      },
      limit() {
        this.list = this.service.getSvcDefListDesc(((this.page - 1) * 10), 10);
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
        let model = {};
        this.model.forEach((item) => {
          if (item.required && item.val.trim() === '') {
            bool = false;
          } else {
            model[item.key] = item.val;
          }
        })
        model.gasPrice = isNaN(parseInt(model.gasPrice)) ? 0 : parseInt(model.gasPrice)
        model.gasLimit = isNaN(parseInt(model.gasLimit)) ? 0 : parseInt(model.gasLimit)

        if (bool) {

          model.wallet = this.$store.state.wallerModel;

          this.service.defineService(model.wallet, model.cd, model.name, model.desc, model.defType, model.definition,
            model.github, model.gasPrice, model.gasLimit)
            .then((val) => {
                this.create = false;
                this.limit();
                this.$modal({done: true})
              },
              (error) => {
                this.create = false;
                this.$modal({failed: true})
              });
        }
      },
      createClick() {
        this.$store.state.wallerModel == '' ? window.scrollTo(0, 900) : this.create = true;
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


