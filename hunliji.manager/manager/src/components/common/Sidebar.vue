<template>
    <div class="sidebar" >
        <el-menu style="overflow:hidden" class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9"  active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <!-- <template v-if="item.subdirectoryList"> -->
                    <el-submenu :index="item.resourceUrl" :key="item.resourceUrl">
                       <template slot="title">
                           
                            <span>{{ item.resourceName }}</span>
                       </template>
                        <template v-for="subItem in item.subdirectoryList">
                            <el-submenu v-if="subItem.subdirectoryList" :index="subItem.resourceSort" :key="subItem.resourceSort">
                                <template slot="resourceName">{{ subItem.resourceName }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.resourceSort">
                                    {{ threeItem.resourceName }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.resourceUrl" :key="subItem.resourceUrl">
                               {{ subItem.resourceName }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                <!-- </template> -->
                <!-- <template v-else>
                    <el-menu-item :index="item.resourceUrl" :key="item.resourceUrl">
                        <i :class="item.icon"></i><span slot="resourceName">{{ item.resourceName }}</span>
                    </el-menu-item>
                </template> -->
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import sessionStorage from '../../utils/sessionStorage'
    export default {
        data() {
            return {
                collapse: false,
                items: this.$store.state.siderState
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            sideBarMsg(){
                 return this.$store.state.siderState
            }
        },
        created(){
                
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            this.items=sessionStorage.getSessionStorage("ms_siderBar")
            console.log("0000000000000000",sessionStorage.getSessionStorage("ms_siderBar"))
            
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 50px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 165px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
