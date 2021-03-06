<template>
  <div class="login">
    <div class="content">
      <div class="title">
        <img :src="logo" />
      </div>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">欢迎进入CDM系统，请登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2021</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/login';
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { Base64 } from 'js-base64'
import logoImg from '@/assets/icons/menu/login_logo.png'

export default {
  name: 'Login',
  data() {
    return {
      logo: logoImg,
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: 'admin',
        password: 'admin123',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          {required: true, trigger: 'blur', message: '用户名不能为空'}
        ],
        password: [
          {required: true, trigger: 'blur', message: '密码不能为空'}
        ],
        code: [ {required: true, trigger: 'change', message: '验证码不能为空'} ]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        if (res.code === 200) {
          let data = res.data
          this.codeUrl = 'data:image/gif;base64,' + Base64.decode(data.img);
          this.loginForm.uuid = data.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get('username');
      const password = Cookies.get('password');
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.username, {expires: 30});
            Cookies.set('password', encrypt(this.loginForm.password), {expires: 30});
            Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
          } else {
            Cookies.remove('username');
            Cookies.remove('password');
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.$router.push({path: this.redirect || '/'}).catch(() => {});
          }).catch(() => {
            this.loading = false;
            this.getCode();
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '~@/scss/view/login.scss';
</style>
