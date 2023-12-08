<template>
    <div class="login-page">
        <div class="login-panel">
            <div class="logo">
                <h1>奇侠BI数据后台</h1>
            </div>
            <div class="login-form">
                <n-spin :show="loading">
                    <n-form :model="formModel" :rules="formRules" ref="form" size="large" :label-width="10" label-placement="left">
                        <n-form-item path="username">
                            <n-input type="text" v-model:value="formModel.username" placeholder="用户名" :maxlength="18" />
                        </n-form-item>
                        <n-form-item path="password" >
                            <n-input type="password" v-model:value="formModel.password" show-password-on="mousedown" placeholder="密码" :maxlength="18" />
                        </n-form-item>
                        <n-form-item path="captcha">
                            <n-input-group>
                                <n-input type="text" v-model:value="formModel.captcha" placeholder="验证码"  :maxlength="6"/>
                                <n-input-group-label style="height:40px;width:140px;padding:0;" @click="refreshCaptcha">
                                    <img ref="captcha" src="@/assets/captcha.png" style="height:40px;width:140px" />
                                </n-input-group-label>
                            </n-input-group>
                        </n-form-item>
                        <n-button type="primary" block circle :style="{'height':'45px','line-height':'45px'}" @click="loginDo">登录</n-button>
                    </n-form>
                </n-spin>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores';
import * as api from '@/api';

let auth = useAuthStore();
let router = useRouter();
let captcha = ref(null);
let loading = ref(false);
let form=ref(null);
let formModel=reactive({
    username:"",
    password:"",
    captcha:"",
})
let formRules = {
    username:[{required:true,message:"",trigger:'bur'}],
    password:[{required:true,message:"",trigger:'bur'}],
    captcha:[{required:true,message:"",trigger:'bur'}],
}

let refreshCaptcha = (e)=>{
    captcha.value.src = captcha.value.src.split('?')[0]+'?_t='+Math.random();
}

let loginDo = async () =>{
    loading.value = true;
    try{
        await form.value.validate();
        let result = api.login(formModel);
        auth.update(result);
        router.push('/main');
    }catch(err){
        console.log('error',err);
    }finally{
        loading.value = false;
    }
}
</script>