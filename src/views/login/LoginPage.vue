<template>
  <div id="loginPage">
    <div v-show="showLogin" class="login" >
      <div class="login-con">
        <Alert type="error" v-if="errorInfo!=''"  show-icon>
          {{errorInfo}}
          <a v-if="errorInfo==='用户名或密码错误'" >忘记密码</a>
        </Alert>
        <Card :bordered="false">
          <p slot="title">
            <Icon type="log-in"></Icon>
            欢迎登陆 | 陆运通物流管理系统
          </p>
          <div class="form-con">
            <Form ref="loginForm" :model="loginForm" :rules="loginRule">
              <FormItem prop="username">
                <i-Input v-model="loginForm.username" placeholder="用户名">
                <span slot="prepend">
                   <Icon :size="16" type="person"></Icon>
                </span>
                </i-Input>
              </FormItem>
              <FormItem prop="password">
                <i-Input type="password" v-model="loginForm.password" placeholder="密码">
                <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                </span>
                </i-Input>
              </FormItem>
              <FormItem prop="captcha">
                <i-Input type="text" v-model="loginForm.captcha" placeholder="验证码" style="width: 230px" >
                <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                </span>
                </i-Input>
                <Tooltip class="img-captcha"  content="点击更换" placement="bottom" v-if="captchaImg!==''">
                  <img :src="captchaImg" alt="验证码" @click="setCaptcha">
                </Tooltip>
              </FormItem>
              <FormItem>
                <Button type="primary" long :loading="loading">登录</Button>
              </FormItem>
            </Form>
            <p class="login-tip">
              <a >忘记密码</a>
            </p>
          </div>
        </Card>
      </div>
    </div>

    <div v-show="showReset" class="login">
      <div class="login-con">
        <Card :bordered="false">
          <p slot="title">
            <Icon type="log-in"></Icon>
            重置密码 &nbsp;| 陆运通物流管理系统
          </p>
          <div class="form-con">
            <Form ref="resetForm" :model="resetForm" :rules="resetRule">
              <FormItem prop="username">
                <i-Input v-model="resetForm.username" placeholder="用户名">
                <span slot="prepend">
                   <Icon :size="16" type="person"></Icon>
                </span>
                </i-Input>
              </FormItem>
              <FormItem prop="captcha">
                <i-Input type="text" v-model="resetForm.captcha" placeholder="验证码">
                <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                </span>
                </i-Input>
              </FormItem>
              <FormItem prop="password">
                <i-Input type="password" v-model="resetForm.password" placeholder="密码">
                <span slot="prepend">
                   <Icon :size="16" type="locked"></Icon>
                </span>
                </i-Input>
              </FormItem>
              <FormItem>
                <Button  type="primary" long :loading="loading">重置</Button>
              </FormItem>
            </Form>
            <p class="login-tip">
              <a >登录系统</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
    <div class="copyright">
      Copyright © 2018 <a href="http://www.ayit.edu.cn/" target="_blank">安阳工学院</a>. Powered By 陆运通物流管理系统. Version {{version}}
    </div>
    <vue-particles color="#dedede" v-bind:class="{ loading: loading }"></vue-particles>
  </div>
</template>

<script>

export default {
  name: 'loginPage',
  data () {
    const validatePassword = (rule, value, callback) => {
      /* //密码强度正则，最少6位，包括至少1个字母，1个数字，1个特殊字符 */
      let passwordReg = /^.*(?=.{8,})(?=.*[0-9])(?=.*[A-Z|a-z])(?=.*[!@#$%^&*?.]).*$/
      if (!passwordReg.test(value)) {
        callback(new Error('密码长度最少6位，包括字母、数字、特殊字符(!@#$%^&*?.)'))
      }
      callback()
    }
    return {
      showLogin: true,
      showEnable: false,
      showReset: false,
      version: this.$util.version(),
      captchaImg: '',
      errorInfo: '',
      loading: false,
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
      loginRule: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', len: 11, message: '用户名长度为11', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度为6-20位', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { type: 'string', len: 4, message: '验证码长度为4位', trigger: 'blur' }
        ]
      },
      enableForm: {
        username: '',
        password: '',
        email: '',
        captcha: ''
      },
      enableRule: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { type: 'string', len: 6, message: '验证码长度为6位', trigger: 'blur' }
        ]
      },
      resetForm: {
        username: '',
        captcha: '',
        password: ''
      },
      resetRule: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', len: 11, message: '用户名长度为11', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { type: 'string', len: 6, message: '验证码长度为6位', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          { validator: validatePassword, trigger: 'change' }
        ]
      },
      emailCaptchaLoading: false,
      emailButtonText: '发送',
      captchaInterval: null
    }
  },

  methods: {
    initCaptcha () {
      if (this.captchaImg === '') {
        this.setCaptcha()
      }
    },
    setCaptcha () {
      this.$store.dispatch('getImageCaptcha').then((response) => {
        this.captchaImg = `data:image/gif;base64,${response.data}`
      })
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          /* 清空验证码 */
          this.captchaImg = ''
          /* 清空错误消息 */
          this.errorInfo = ''
          /* 发送登录请求 */
          this.$store.dispatch('authLogin', this.loginForm)
            .then(() => {
              this.handleSuccess()
            })
            .catch((error) => {
              this.handleFailure(error)
            })
        }
      })
    },
    handleFailure (error) {
      this.loading = false
      this.errorInfo = error.response.data.message
      this.$Notice.error({
        title: `${error.response.status}`,
        desc: `${error.response.data.message}`,
        duration: 0,
        onClose: () => {
          this.errorInfo = ''
        }
      })
    },
    handleShowLogin (user) {
      this.showLogin = true
      this.$refs.loginForm.resetFields()
      this.loginForm = {
        username: user.username,
        password: '',
        captcha: ''
      }
    },
    handleShowEnable (user) {
      this.showEnable = true
      this.$refs.enableForm.resetFields()
      this.enableForm = {
        username: user.username,
        password: user.password,
        email: '',
        captcha: ''
      }
    },
    handleShowUpdatePassword (user) {
      this.showReset = true
      this.$refs.resetForm.resetFields()
      this.resetForm = {
        username: user.username,
        captcha: '',
        password: ''
      }
    },

    handleSendResetMail (username) {
      this.handleSendMail({
        type: 2,
        receiver: username
      })
    },
    handleReset () {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let data = {
            userId: this.resetForm.username,
            captcha: this.resetForm.captcha,
            password: this.resetForm.password
          }
          this.$store.dispatch('resetUserPassword', data)
            .then(() => {
              this.loading = false
              this.showLogin = true
              this.$Notice.success({
                title: `重置成功`,
                duration: 5
              })
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  },
  watch: {
    showLogin (val) {
      if (val) {
        this.showEnable = false
        this.showReset = false
      }
    },
    showEnable (val) {
      if (val) {
        this.showLogin = false
        this.showReset = false
      }
    },
    showReset (val) {
      if (val) {
        this.showLogin = false
        this.showEnable = false
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$Message.destroy()
    this.loading = false
    next()
  }
}
</script>

<style lang="less">
  @import "login.less";
  .login {
    .login-tip{
      display: none;
      text-align: center;
    }
    &:hover .login-tip{
      display: block;
    }
  }
</style>
