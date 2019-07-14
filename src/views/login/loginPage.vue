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
                    @click="handleShowResetPassword"
                    style="border-color:#f0f3f7"
                    type="error"
                    long
                    >忘记密码</Button
                  >
                </i-col>
              </Row>
            </div>
          </FormItem>
        </Form>
      </div>
      <Modal
        title="重置密码"
        v-model="restPasswordModal"
        class-name="vertical-center-modal"
        @on-ok="handleResetPassword"
      >
        <p style="display: flex; margin: 15px 0; font-weight: bold">
          <span style="width: 80px; text-align: right; padding: 0 12px"
            >密保问题</span
          >
          <span v-text="currentSecurityQuestion.question"></span>
        </p>
        <Form
          ref="resetForm"
          :model="resetForm"
          :rules="resetRules"
          :label-width="120"
        >
          <FormItem prop="questionPassword" label="问题答案">
            <i-Input v-model="resetForm.questionPassword"></i-Input>
          </FormItem>
          <FormItem prop="userNewPassword" label="新密码">
            <i-Input
              type="password"
              v-model="resetForm.userNewPassword"
              placeholder="请输入问题答案"
            >
            </i-Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button
                  @click="handleResetPassword"
                  type="primary"
                  :loading="resetLoading"
          >重置</Button>
        </div>
      </Modal>
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
        username: "",
        password: "",
        captcha: ""
      },
      loginRules: {
        username: [
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
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ]
      },
      captchaImg: "",
      loading: false,

      restPasswordModal: false,

      securityQuestions: [
        {
          question: "初中老师是谁?",
          password: "张三"
        },
        {
          question: "高中老师是谁?",
          password: "张三"
        },
        {
          question: "大学老师是谁?",
          password: "张三"
        }
      ],
      currentSecurityQuestion: "",
      resetForm: {
        questionPassword: "",
        userNewPassword: ""
      },
      resetRules: {
        questionPassword: [
          { required: true, message: "请输入问题答案", trigger: "blur,change" }
        ],
        userNewPassword: [
          { required: true, message: "请输入新密码", trigger: "blur,change" }
        ]
      },
      resetLoading: false
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
    handleShowResetPassword() {
      let index = Math.floor(Math.random() * this.securityQuestions.length);
      this.currentSecurityQuestion = this.securityQuestions[index];
      this.restPasswordModal = true;
    },
    handleResetPassword() {
      this.resetLoading = true;
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          if (
            this.resetForm.questionPassword ===
            this.currentSecurityQuestion.password
          ) {
            //TODO 修改用户密码
            setTimeout(() => {
              this.$Message.success("密码重置成功");
              this.restPasswordModal = false;
              this.resetLoading = false;
            }, 500);
          } else {
            this.$Message.error("密保问题验证失败");
            this.resetLoading = false;
          }
        }
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
              let result = res.data;
              if (result.code === "200") {
                this.loading = false;
                setTimeout(() => {
                  this.$router.push({ path: "/home" });
                }, 1000);
                this.$Notice.success({
                  title: `登录成功`,
                  duration: 2
                });
              } else {
                this.loading = true;
                this.$Notice.warning({
                  title: `登录失败，请重新登录`
                });
                setTimeout(() => {
                  this.$router.push({ path: "/login" });
                }, 1000);
                this.loading = false;
                this.setCaptcha();
              }
            })
            .captcha(() => {
              this.$Notice.warning({
                title: `未知错误`
              });
              setTimeout(() => {
                this.$router.push({ path: "/login" });
              }, 2000);
              this.loading = false;
              this.setCaptcha();
            });
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "login.less";
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
