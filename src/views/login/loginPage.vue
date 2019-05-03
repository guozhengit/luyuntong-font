<template>
  <div id="loginPage">
    <vue-particle-line>
      <div class="banner">
        <h2>陆运通物流管理系统</h2>
      </div>
      <div class="login">
        <Form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          @keydown.enter.native="handleSubmit"
        >
          <FormItem>
            <span><font color="#00008b" size="20px">欢迎登陆</font></span>
          </FormItem>
          <FormItem prop="username">
            <i-Input v-model="loginForm.username" placeholder="用户账号">
              <span slot="prepend">
                <Icon :size="20" type="ios-contact-outline" />
              </span>
            </i-Input>
          </FormItem>
          <FormItem prop="password">
            <i-Input
              type="password"
              v-model="loginForm.password"
              placeholder="密码"
            >
              <span slot="prepend">
                <Icon :size="20" type="ios-lock-outline" />
              </span>
            </i-Input>
          </FormItem>
          <FormItem prop="captcha">
            <i-Input
              type="text"
              v-model="loginForm.captcha"
              placeholder="验证码"
              style="width: 230px"
              @on-focus="initCaptcha"
            >
              <span slot="prepend">
                <Icon :size="16" type="iconfont icon-yanzhengma" />
              </span>
            </i-Input>
            <Tooltip
              class="img-captcha"
              content="点击更换"
              placement="bottom"
              v-if="captchaImg !== ''"
            >
              <img :src="captchaImg" alt="验证码" @click="setCaptcha" />
            </Tooltip>
          </FormItem>
          <FormItem>
            <div>
              <Row class="button-login">
                <i-col span="12">
                  <Button
                    @click="handleSubmit"
                    style="border-color:#f0f3f7"
                    type="primary"
                    long
                    :loading="loading"
                    >登录</Button
                  >
                </i-col>
                <i-col span="12">
                  <Button
                    @click="handleSubmit"
                    style="border-color:#f0f3f7"
                    type="primary"
                    long
                    :loading="loading"
                    >忘记密码</Button
                  >
                </i-col>
              </Row>
            </div>
          </FormItem>
        </Form>
      </div>
    </vue-particle-line>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "LoginForm",
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        captcha: ""
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于六位",
            trigger: "blur"
          }
        ]
      },
      captchaImg: "",
      loading: false
    };
  },
  methods: {
    initCaptcha() {
      if (this.captchaImg === "") {
        this.setCaptcha();
      }
    },
    setCaptcha() {
      this.$axios.get("/auth/captcha").then(response => {
        this.captchaImg = `data:image/gif;base64,${response.data}`;
      });
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let data = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            captcha: this.loginForm.captcha
          };
          this.loading = true;
          this.$axios
            .post("/auth/login", qs.stringify(data), {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=UTF-8"
              }
            })
            .then(res => {
              this.loading = false;
              let result = res.data;
              if (result.code === "200") {
                this.$Message.success(result.message);
                setTimeout(() => {
                  this.$router.push({ path: "/" });
                }, 2000);
              } else {
                this.setCaptcha();
                this.$Message.error(result.message);
              }
            })
            .captcha(() => {
              this.loading = false;
              this.setCaptcha();
              this.$Message.error("未知错误");
            });
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "login.less";
</style>
