import Vue from 'vue';
import Vuex from 'vuex';
import ActionHelp from './ActionHelper';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    // 控制是否显示编辑框
    isShow: false,
    // 传递数据的桥梁
    transMemo: null,
    filterCateId: -1,
    aHelper:new ActionHelp()
  },
  mutations: {
    changIsShow(state:any):void {
      state.isShow = !state.isShow
    },
    showEditMemo(state:any,editMemo:any) { 
      state.transMemo = editMemo
      state.isShow = true
    }
  },
});

export default store
