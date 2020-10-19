<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import sessionStorage from './utils/sessionStorage'

export default {
    data(){
        return{
        }
    },
    watch:{
    // data的数据名(){数据变化，函数就会调用}

    
    $route:function(newValue,oldValue){
    let allPath=sessionStorage.getSessionStorage('ms_path_all',allPath)
    allPath.push("dashboard")
    allPath.push("changePass")
    let path = newValue.path;
    path=path.split("/")[1]
    console.log("path",path)
    // alert(allPath.indexOf(path))
    if (allPath.indexOf(path) == -1) {
        if(path!="login"){
            this.$router.push({ path: '/404' })
        }
        
    }

    }
  },
}
</script>


<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>