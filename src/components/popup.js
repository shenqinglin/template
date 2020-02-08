import Vue from 'vue'
import Popup from './SPopup'
const PopupBox = Vue.extend(Popup)
let instance = {}
Popup.install = {
  open: function (data) {
    instance = new PopupBox({
      data
    }).$mount()
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.show = true
      // show 和弹窗组件里的show对应，用于控制显隐
    })
  },
  close: function () {
    instance.show = false
  }
}
export default Popup
