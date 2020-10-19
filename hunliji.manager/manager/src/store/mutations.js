export default {
  siderBarMsg:(state,payload)=>{
    state.siderState=payload
  },
  initFootF:(state)=>{
    state.initFoot=false; 
  },
  initFootT:(state)=>{
    state.initFoot=true; //突变
  },
  increment:(state)=>{
    state.count++; //突变
  },
  decrement:(state,payload)=>{
    state.count-=payload; //突变
  },
  SHOW_FOOT:(state)=>{
    state.bFoot=true;
  },
  HIDE_FOOT:(state)=>{
    state.bFoot=false;
  },
  SHOW_LOADING:(state)=>{
    state.bLoading=true;
  },
  HIDE_LOADING:(state)=>{
    state.bLoading=false;
  }
};
 