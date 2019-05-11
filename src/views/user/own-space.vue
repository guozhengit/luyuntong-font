<template>
    <div id="own-space" style="height: 100%">
      <Card dis-hover>
        <p slot="title">
          <Icon type="android-person"></Icon>
          个人信息
        </p>
        <Button slot="extra" @click.prevent="refreshUserInfo" type="ghost">
          <Icon type="ios-loop-strong"></Icon>刷新
        </Button>
        <Tabs :value="active" @on-click="handleChangeTab">
          <TabPane label="基础信息" name="information">
            <div style="width: 500px">
              <Form ref="userForm_name" :model="userForm" :rules="userRule" :label-width="80" label-position="left">
                <FormItem label="ID">
                  <i-Input v-model="userForm.userId" disabled placeholder="ID"></i-Input>
                </FormItem>
                <FormItem label="姓名" prop="name">
                  <i-Input v-model="userForm.name" placeholder="姓名"></i-Input>
                </FormItem>
                <FormItem label="邮箱">
                  <i-Input v-model="userForm.email" disabled placeholder="邮箱">
                    <Button slot="append" icon="edit" @click="handleChangeTab('updateMail')"></Button>
                  </i-Input>
                </FormItem>
                <FormItem label="手机">
                  <i-Input v-model="userForm.phone" disabled placeholder="手机">
                    <!--<Button slot="append" icon="edit" @click="handleChangeTab('updatePhone')"></Button>-->
                  </i-Input>
                </FormItem>
              </Form>
              <div style="text-align: right">
                <Button type="ghost" :disabled="userForm.name === user.name" @click="handleCancelUpdateName" :loading="updateLoading">取消</Button>
                <Button type="primary" :disabled="userForm.name === user.name" @click="handleUpdateName" :loading="updateLoading">保存</Button>
              </div>
            </div>
          </TabPane>
          <TabPane label="修改邮箱" name="updateMail">
            <div style="width: 500px">
              <Form ref="userForm_email" :model="emailForm" :rules="emailRule" :label-width="80" label-position="left">
                <FormItem label="邮箱">
                  <i-Input v-model="emailForm.email" disabled placeholder="邮箱"></i-Input>
                </FormItem>
                <FormItem label="新邮箱" prop="newEmail">
                  <i-Input v-model="emailForm.newEmail" placeholder="新邮箱">
                    <Button slot="append"
                            icon="paper-airplane"
                            :disabled="emailButtonText!='发送'||emailForm.newEmail===''"
                            :loading="emailCaptchaLoading"
                            @click="handleSendMailCaptcha(emailForm.newEmail)">{{emailButtonText}}</Button>
                  </i-Input>
                </FormItem>
                <FormItem label="验证码" prop="captcha">
                  <i-Input v-model="emailForm.captcha" placeholder="验证码"></i-Input>
                </FormItem>
              </Form>
              <div style="text-align: right">
                <Button type="ghost" @click="handleCancelUpdateMail" :loading="updateLoading">取消</Button>
                <Button type="primary"  @click="handleUpdateMail" :loading="updateLoading">保存</Button>
              </div>
            </div>
          </TabPane>

          <TabPane label="修改密码" name="updatePassword">
            <div style="width: 500px">
              <Form ref="userForm_password" :model="passwordForm" :rules="passwordRule" :label-width="80" label-position="left">
                <FormItem label="新密码" prop="newPassword0">
                  <i-Input v-model="passwordForm.newPassword0" type="password" placeholder="新密码"></i-Input>
                </FormItem>
                <FormItem label="确认密码" prop="newPassword1">
                  <i-Input v-model="passwordForm.newPassword1" type="password" placeholder="确认密码"></i-Input>
                </FormItem>
              </Form>
              <div style="text-align: right">
                <Button type="ghost" @click="handleCancelUpdatePassword" :loading="updateLoading">取消</Button>
                <Button type="primary"  @click="handleUpdatePassword" :loading="updateLoading">保存</Button>
              </div>
            </div>
          </TabPane>
          <TabPane label="修改头像" name="updateAvatar">
            <div style="float: left; margin-left: 20px; width: 58px;height:58px;line-height: 58px;">
              <Avatar :src="imgUrl" size="large" v-if="imgUrl"></Avatar>
            </div>
            <div style="clear: both"></div>
            <Button style="width: 116px" type="primary" :loading="updateLoading" :disabled="imgUrl===''" long @click="handleUpdateAvatar">保存</Button>
          </TabPane>
        </Tabs>
      </Card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'own-space',
  data () {
    const validatePassword = (rule, value, callback) => {
      /* //密码强度正则，最少6位，包括至少1个字母，1个数字，1个特殊字符 */
      let passwordReg = /^.*(?=.{8,})(?=.*[0-9])(?=.*[A-Z|a-z])(?=.*[!@#$%^&*?.]).*$/
      if (!passwordReg.test(value)) {
        callback(new Error('密码格式错误。密码长度最少6位，包括字母、数字、特殊字符(!@#$%^&*?.)'))
      }
      callback()
    }
    return {
      active: 'information',
      updateLoading: false,
      userForm: {},
      userRule: {
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ]
      },
      emailForm: {},
      emailRule: {
        email: [
        ],
        captcha: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ],
        newEmail: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'}
        ]
      },
      emailCaptchaLoading: false,
      emailButtonText: '发送',
      captchaInterval: '',
      phoneForm: {},
      phoneRule: {},
      passwordForm: {},
      passwordRule: {
        newPassword0: [
          {required: true, message: '密码不能为空', trigger: 'change'},
          { validator: validatePassword, trigger: 'change' }
        ],
        newPassword1: [
          {required: true, message: '密码不能为空', trigger: 'change'},
          { validator: validatePassword, trigger: 'change' }
        ]
      },
      imgUrl: ''
    }
  },
  computed: {
    ...mapGetters({
      'user': 'getUser'
    })
  },
  methods: {
    refreshUserInfo () {
      this.$store.dispatch('loadUserInfo').then(() => {
        this.initUserInfo()
      })
    },
    initUserInfo () {
      this.userForm = {
        userId: this.user.userId,
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        version: this.user.version
      }
      this.emailForm = {
        email: this.user.email,
        captcha: '',
        newEmail: '',
        version: this.user.version
      }
      this.phoneForm = {
        phone: this.user.phone,
        captcha: '',
        newPhone: ''
      }
      this.passwordForm = {
        password: '',
        newPassword0: '',
        newPassword1: '',
        version: this.user.version
      }
    },
    handleChangeTab (name) {
      this.active = name
    },
    handleCancelUpdateName () {
      this.$refs['userForm_name'].resetFields()
      this.userForm.name = this.user.name
    },
    handleUpdateName () {
      this.$refs['userForm_name'].validate((valid) => {
        if (valid) {
          this.handleUpdateUser({
            name: this.userForm.name,
            version: this.userForm.version
          })
        }
      })
    },
    handleUpdateUser (user) {
      this.updateLoading = true
      this.$store.dispatch('updateUserInfo', user)
        .then(() => {
          this.updateLoading = false
          this.initUserInfo()
          this.$Notice.success({
            title: `保存成功`
          })
          this.imgUrl = ''
        })
        .catch(() => {
          this.updateLoading = false
        })
    },
    handleSendMailCaptcha (mail) {
      let mailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (mailReg.test(mail)) {
        this.emailCaptchaLoading = true
        this.$store.dispatch('getEmailCaptcha', {type: 0, receiver: mail})
          .then(() => {
            this.emailCaptchaLoading = false
            this.emailButtonText = 60
            this.captchaInterval = setInterval(() => {
              if (this.emailButtonText > 0) {
                this.emailButtonText--
              } else {
                clearInterval(this.captchaInterval)
                this.emailButtonText = '发送'
              }
            }, 1000)
          })
          .catch(() => {
            this.emailCaptchaLoading = false
          })
      } else {
        this.$Message.error({
          content: '邮箱格式错误',
          duration: 5,
          closable: true
        })
      }
    },
    handleUpdateMail () {
      this.$refs['userForm_email'].validate((valid) => {
        if (valid) {
          let data = {
            email: this.emailForm.newEmail,
            captcha: this.emailForm.captcha,
            version: this.emailForm.version
          }
          this.updateLoading = true
          this.$store.dispatch('updateUserEmail', data)
            .then(() => {
              this.updateLoading = false
              this.initUserInfo()
              this.$Notice.success({
                title: `保存成功`
              })
              clearInterval(this.captchaInterval)
              this.emailButtonText = '发送'
            })
            .catch(() => {
              this.updateLoading = false
            })
        }
      })
    },
    handleCancelUpdateMail () {
      this.$refs['userForm_email'].resetFields()
    },
    handleCancelUpdatePassword () {
      this.$refs['userForm_password'].resetFields()
    },
    handleUpdatePassword () {
      this.$refs['userForm_password'].validate((valid) => {
        if (valid) {
          let password0 = this.passwordForm.newPassword0
          let password1 = this.passwordForm.newPassword1
          if (password0 !== password1) {
            this.$Message.error({
              content: '两次密码不一致',
              duration: 5,
              closable: true
            })
          } else {
            let data = {
              password: this.passwordForm.newPassword0,
              version: this.passwordForm.version
            }
            this.updateLoading = true
            this.$store.dispatch('updateUserPassword', data)
              .then(() => {
                this.updateLoading = false
                this.$Notice.success({
                  title: `保存成功`
                })
                this.$refs['userForm_password'].resetFields()
              })
              .catch(() => {
                this.updateLoading = false
              })
          }
        }
      })
    },
    handleUploadSuccess (response) {
      this.imgUrl = response
    },
    handleFormatError () {
    },
    handleMaxSize () {
    },
    handleBeforeUpload () {
    },
    handleUpdateAvatar () {
      this.handleUpdateUser({
        avatar: this.imgUrl,
        version: this.user.version
      })
    }
  },
  mounted () {
    this.initUserInfo()
  }
}
</script>

<style long="less">

</style>
