<template>
    <n-layout class="app-layout">
      <n-layout-header bordered class="app-layout-header">
        <n-space justify="space-between">
            <n-space class="app-layout-header-left" align="start">
                <h3>奇侠BI数据后台</h3>
                <a href="javascript:;" @click.stop="triggerCollapsedMenu">
                    <n-icon size="18"><ReorderFour /></n-icon>
                </a>
            </n-space>
            <n-space class="app-layout-header-right">
                <div class="app-layout-header-right-user-profile">
                    <n-dropdown
                        trigger="click"
                        :options="useProfileOptions"
                        :show-arrow="true"
                        @select="userProfileSelect"
                    >
                        <n-space align="bottom">
                            <n-avatar
                                round
                                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                                class="auth_headimg"
                            />
                            <span class="auth_nickname">{{auth.store.nickname}}</span>
                        </n-space>
                    </n-dropdown>
                </div>
            </n-space>
        </n-space>
      </n-layout-header>
      <n-layout has-sider  class="app-layout-body">
        <n-layout-sider bordered class="app-layout-sider"  :collapse-mode="menuCollapseMode" :collapsed="menuCollapsed" :collapsed-width="menuCollapseWidth" >
            <n-form :class="siderFormcollsped + ' app-layout-sider-form'">
                <n-input-group>
                    <n-input @focus="siderFormInputFocus" />
                    <n-button>
                        <n-icon><Search /></n-icon>
                    </n-button>
                </n-input-group>
            </n-form>
            <n-scrollbar class="app-layout-sider-scorllbar"  trigger="none">
                <n-menu
                    :options="menuOptions"
                    class="app-layout-menu"
                />
            </n-scrollbar>
        </n-layout-sider>
        <n-layout class="app-layout-content">
            <div class="app-layout-content-main">
                <n-card :bordered="false" class="app-layout-content-breadcrumb">
                    <n-breadcrumb separator=">">
                        <n-breadcrumb-item><n-icon><Home /></n-icon></n-breadcrumb-item>
                        <n-breadcrumb-item>管理首页</n-breadcrumb-item>
                    </n-breadcrumb>
                </n-card>
                <n-scrollbar class="app-layout-content-scrollbar">
                    <RouterView />
                </n-scrollbar>
            </div>
            <div :class="appLayoutContentCover" @click="triggerCollapsedMenu"></div>
        </n-layout>
      </n-layout>
    </n-layout>
    
    <n-drawer v-model:show="userCahangePwdDrawerActive" :width="fwidth(500)" block-scroll :mask-closable="false">
        <n-drawer-content title="修改密码" closable>

        </n-drawer-content>
    </n-drawer>
</template>

<script setup>
import { h, defineComponent, ref,reactive } from "vue";
import {useRouter} from 'vue-router';
import { NIcon } from "naive-ui";
import {useAuthStore} from '@/stores';

import {renderIcon,breakpoint,fwidth} from '@/helper';

import {Home,DocumentText,ReorderFour,FlowerSharp,LogOut,Search} from "@vicons/ionicons5";

let auth = useAuthStore();
let router = useRouter();
let userCahangePwdDrawerActive = ref(false);
let breakpoint_ge_lg = breakpoint('lg');

const menuCollapsed = ref(!breakpoint_ge_lg);
const menuCollapseMode = ref(breakpoint_ge_lg ? 'width' : 'transform');
const menuCollapseWidth = ref(breakpoint_ge_lg ? 48 : 0);
const siderFormcollsped = ref('');
let appLayoutContentCover = ref('');

let useProfileOptions = reactive([
    {
        label: "修改密码",
        key: "change_user_pwd",
        icon:renderIcon(FlowerSharp),
    },
    {
        label: "退出登录",
        key: "auth_exit",
        icon:renderIcon(LogOut),
    }
])

let menuOptions = computed(()=>{
    let menus = [];
    for(let i=0;i<50;i++){
        let cur_menu = {
            label:`菜单@${i}`,
            key:`menu@${i}`,
            icon: renderIcon(DocumentText),
            children:[],
        }
        for(let j=0;j<10;j++){
            cur_menu.children.push({
                label:`菜单@${i}@${j}`,
                key:`menu@${i}@${j}`,
            })
        }
        menus.push(cur_menu);
    }
    return menus;
});

let userProfileSelect = (key,option)=>{
    if(key == 'auth_exit'){
        auth.logout();
        router.replace('/login');
    }else{
        userCahangePwdDrawerActive.value = !userCahangePwdDrawerActive.value;
    }
}

const triggerCollapsedMenu = ()=>{
    menuCollapsed.value = !menuCollapsed.value;
    if(menuCollapsed.value){
        siderFormcollsped.value = "app-layout-sider-form-collsped";
        appLayoutContentCover.value = "";
    }else{
        siderFormcollsped.value = "";
        console.log('asdfasfd');
        if(!breakpoint_ge_lg){
            appLayoutContentCover.value = 'app-layout-content-conver';
        }
    }
}

const siderFormInputFocus = ()=>{
    if(menuCollapsed.value){
        menuCollapsed.value = !menuCollapsed.value;
        siderFormcollsped.value = "";
    }
}

</script>