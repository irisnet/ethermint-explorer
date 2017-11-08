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
          process:false
        },
        i18n:'',
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

