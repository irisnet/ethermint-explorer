<template>
  <div>
    <div class="modal modal-processing looding" :class="{'model-show':model.process}">
      <div class="modal_hint modal-dialog">
        <img src="../../../static/img/processing.png"/>
        <span>{{i18n.message.head.modal[0]}}</span>
      </div>
    </div>
    <div class="modal modal-tools modal-failed modal-processing" :class="{'model-show':model.failed}">
      <div class="modal_hint modal-dialog">
        <img src="../../../static/img/failed.png"/>
        <span>{{i18n.message.head.modal[1]}}</span>
      </div>
    </div>
    <div class="modal modal-tools modal-done modal-processing" :class="{'model-show':model.done}">
      <div class="modal_hint modal-dialog">
        <img src="../../../static/img/done.png"/>
        <span>{{i18n.message.head.modal[2]}}</span>
      </div>
    </div>
    <div class="modal modal-tools modal-done modal-processing model-show" :class="{'model-show':model.error}" v-if="model.error&&model.error.text" >

      <div style="background-color: #ee4040;height: 160px;width: 600px;border-radius: 5px;top:50%;margin-top: -80px;
      left: 50%;margin-left: -300px;position: relative;position: absolute;">
          <img src="../../../static/img/red_close.png" style="position: absolute;top: 28px;margin-left: 60px;"/>
          <img @click="closeClick" src="../../../static/img/red_min_close.png" style="position: absolute;top: 0px;right: 0;margin: 20px; cursor: pointer; width: 10px;"/>
          <div style=" font-size: 36px;color: rgb(255, 255, 255);font-weight: bold;text-indent: 144px;margin-top: 32px">Oh snap!</div>
           <div style=" font-size: 20px;color: rgb(255, 255, 255);text-indent: 144px;margin-top: 4px" v-if="model.error.text" >{{model.error.text}}</div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'modalVue',
    data() {
      return {
        model: {
          failed: false,
          done: false,
          process:false,
          error:{
            text:''
          }
        },
        i18n:'',
      }
    },
    methods: {
      closeClick() {
        this.model= {
          failed: false,
          done: false,
          process:false,
          error:{
            text:''
          }
        }
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

