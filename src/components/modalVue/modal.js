import modalVue from './modal.vue'

export default {
  install(Vue, i18n) {
    let modal = Vue.extend(modalVue);
    let $modal = new modal();
    $modal.i18n = i18n.getLocaleMessage(localStorage.locale);
    document.body.appendChild($modal.$mount().$el);
    Vue.prototype.$modal = (model => {
      $modal.model = model;
      if(!model.process){
        setTimeout(() => {
          $modal.model={
            failed: false,
            done: false,
            process:false,
            error:{
              text:''
            }
          }
        }, 2000)
      }
    });
  }
}
