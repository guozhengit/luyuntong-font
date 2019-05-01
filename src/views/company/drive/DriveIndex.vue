<template>
  <div class="table-page">
    <div class="search">
      <Form
        class="search-form"
        ref="searchForm"
        :model="searchForm"
        :label-width="5"
        inline
      >
        <FormItem prop="code">
          <div class="ivu-form-item select-ground">
            <span class="select-name">司机编号</span>
            <div class="select-input">
              <Input
                v-model="searchForm.code"
                type="text"
                placeholder="请输入司机编号"
              />
            </div>
          </div>
        </FormItem>

        <FormItem prop="driveLicence">
          <div class="ivu-form-item select-ground">
            <span class="select-name">驾驶证</span>
            <div class="select-input">
              <Input
                v-model="searchForm.driveLicence"
                type="text"
                placeholder="请输入驾驶证"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="idCard">
          <div class="ivu-form-item select-ground">
            <span class="select-name">身份证</span>
            <div class="select-input">
              <Input
                v-model="searchForm.idCard"
                type="text"
                placeholder="请输入驾驶证"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="gender">
        <div class="ivu-form-item select-ground">
        <span class="select-name">性别</span>
        <div class="select-input">
        <Select
        v-model="searchForm.gender"
        placeholder="请选择性别">
        <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}
        </Option>
        </Select>
        </div>
        </div>
        </FormItem>
        <FormItem style="float: right">
          <ButtonGroup>
            <Button type="primary" icon="md-search" ghost @click="handleQuery"
              >查询
            </Button>
            <Button
              type="primary"
              style="color:#e82626"
              icon="md-close"
              ghost
              @click="handleQuery"
              >重置
            </Button>
          </ButtonGroup>
        </FormItem>
      </Form>
    </div>
    <div class="operation">
      <ButtonGroup>
        <Button
          type="primary"
          icon="md-add"
          ghost
          class="button"
          @click="showCreateDrawer"
          >新增
        </Button>
        <Button
          type="info"
          icon="md-create"
          ghost
          class="button"
          :disabled="selectDriver.length !== 1"
          @click="showModifyDrawer"
          >修改
        </Button>
        <Button
          type="error"
          icon="ios-trash"
          ghost
          class="button"
          :disabled="!selectDriver.length > 0"
          @click="handleDeleteUser"
          >删除
        </Button>
        <Button type="primary" icon="ios-refresh" ghost @click="handleQuery"
          >刷新
        </Button>
      </ButtonGroup>
    </div>
    <div class="data-table">
      <Table
        border
        :columns="userColumns"
        :data="darverList"
        @on-selection-change="handleSelect"
      >
      </Table>
    </div>
    <!--<br>-->

    <div class="pagination">
      <Page
        :total="totalCount"
        :current="pageIndex"
        :page-size="pageSize"
        show-total
        show-sizer
        show-elevator
        @on-change="handlePageChange"
        @on-page-size-change="handlePageSizeChange"
      >
      </Page>
    </div>
    <Drawer
      title="添加司机信息"
      v-model="showCreate"
      width="360"
      :mask-closable="false"
    >
      <Form
        ref="createDriverForm"
        :model="DriverFormData"
        :rules="formRules"
        :label-width="80"
      >
        <Row>
          <i-Col span="24">
            <FormItem label="司机姓名" prop="name">
              <Input v-model="DriverFormData.name" placeholder="请输入用户名" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="司机编号" prop="name">
              <Input
                v-model="DriverFormData.code"
                placeholder="请输入用户编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="身份证" prop="name">
              <Input
                v-model="DriverFormData.idCard"
                placeholder="请输入身份证"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="司机编号" prop="name">
              <Input
                v-model="DriverFormData.code"
                placeholder="请输入用户编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="生日" prop="birthday">
              <Input
                placeholder="请输入生日"
                v-model="DriverFormData.birthday"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="电话" prop="phone">
              <Input v-model="DriverFormData.phone" placeholder="请输入电话" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="地址" prop="email">
              <Input
                v-model="DriverFormData.address"
                placeholder="请输入邮箱"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="DriverFormData.gender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
              </RadioGroup>
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelCreateUser"
          >取消
        </Button>
        <Button
          type="primary"
          @click="handleCreateUser"
          :loading="createLoading"
          >保存
        </Button>
      </div>
    </Drawer>
    <Drawer
      title="修改司机信息"
      v-model="showModify"
      width="360"
      :mask-closable="false"
    >
      <Form
        ref="modifyDriverForm"
        :model="DriverFormData"
        :rules="formRules"
        :label-width="80"
      >
        <Row>
          <i-Col span="24">
            <FormItem label="司机姓名" prop="name">
              <Input v-model="DriverFormData.name" placeholder="请输入用户名" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="司机编号" prop="name">
              <Input
                v-model="DriverFormData.code"
                placeholder="请输入用户编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="身份证" prop="name">
              <Input
                v-model="DriverFormData.idCard"
                placeholder="请输入身份证"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="司机编号" prop="name">
              <Input
                v-model="DriverFormData.code"
                placeholder="请输入用户编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="生日" prop="birthday">
              <Input
                placeholder="请输入生日"
                v-model="DriverFormData.birthday"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="电话" prop="phone">
              <Input v-model="DriverFormData.phone" placeholder="请输入电话" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="地址" prop="email">
              <Input
                v-model="DriverFormData.address"
                placeholder="请输入邮箱"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="DriverFormData.gender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
              </RadioGroup>
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelModifyUser"
          >取消
        </Button>
        <Button
          type="primary"
          @click="handleModifyUser"
          :loading="modifyLoading"
          >保存
        </Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      genderList: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],
      userColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "司机姓名",
          type: "name",
          align: "center"
        },
        {
          title: "身份证",
          key: "idCard",
          align: "center",
          sortable: true
        },
        {
          title: "籍贯",
          key: "nativePlace",
          align: "center",
          sortable: true
        },
        {
          title: "站点编号",
          key: "stationCode",
          align: "center",
          sortable: true
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          sortable: true
        },
        {
          title: "驾驶证",
          key: "driveLicence",
          align: "center",
          sortable: true
        },
        {
          title: "车辆运营证",
          key: "runLicence",
          align: "center"
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          sortable: true
        },
        {
          title: "电话",
          key: "phone",
          align: "center",
          sortable: true
        },
        {
          title: "车辆编号",
          key: "vehicleCode",
          align: "center",
          sortable: true
        }
      ],
      searchForm: {
        name: "",
        code: "",
        gender: ""
      },
      darverList: [],
      totalCount: 0,
      selectDriver: [],
      pageIndex: 1,
      pageSize: 10,

      DriverFormData: {
        code: "",
        idCard: "412823XXXXXXXX1218",
        nativePlace: "",
        stationCode: "",
        phone: "",
        gender: "",
        birthday: "",
        address: "",
        driveLicence: "",
        runLicence: "",
        vehicleCode: ""
      },
      formRules: {
        code: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        idCard: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        nativePlace: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        stationCode: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        phone: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        gender: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        birthday: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        address: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        driveLicence: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        runLicence: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        vehicleICode: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ]
      },
      showCreate: false,
      createLoading: false,

      showModify: false,
      modifyLoading: false,

      showDelete: false,
      deleteLoading: false
    };
  },
  methods: {
    handleQuery() {
      this.$axios
        .post(
          `/users/pageQuery?page=${this.pageIndex - 1}&size=${this.pageSize}`,
          this.searchForm
        )
        .then(res => {
          let result = res.data;
          this.darverList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.darverList = [];
          this.totalCount = 0;
        });
    },
    handlePageChange(userIndex) {
      this.pageIndex = userIndex;
      this.handleQuery();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.handleQuery();
    },
    handleSelect(selection, row) {
      this.selectDriver = selection;
      console.log(selection, row);
    },
    showCreateDrawer() {
      this.showCreate = true;
    },
    handleCancelCreateUser() {
      this.showCreate = false;
      this.$refs["createDriverForm"].resetFields();
    },

    handleDeleteUser() {
      let ids = this.selectDriver.map(item => {
        return item.id;
      });
      console.log(ids);
      this.$axios
        .post("/users/deleteBatch", ids)
        .then(() => {
          this.showDelete = false;
          this.deleteLoading = false;
          this.$Message.success("删除成功");
          /*删除成功，回调查询接口*/
          this.handleQuery();
        })
        .catch(() => {
          this.deleteLoading = false;
          this.$Message.error("删除失败");
        });
    },
    handleCreateUser() {
      this.$refs["createDriverForm"].validate(valid => {
        if (valid) {
          this.createLoading = true;
          this.$axios
            .post("/users", this.DriverFormData)
            .then(() => {
              this.createLoading = false;
              this.showCreate = false;
              this.$Message.success("保存用户成功");
              this.$refs["createDriverForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.success("保存用户失败");
            });
        }
      });
    },
    showModifyDrawer() {
      this.DriverFormData = {
        name: this.selectDriver[0].name,
        password: this.selectDriver[0].password,
        gender: this.selectDriver[0].gender,
        code: this.selectDriver[0].code,
        phone: this.selectDriver[0].phone,
        birthDay: this.selectDriver[0].birthDay
      };
      this.showModify = true;
    },
    handleCancelModifyUser() {
      this.showModify = false;
      this.$refs["modifyDriverForm"].resetFields();
    },
    handleModifyUser() {
      this.$refs["modifyDriverForm"].validate(valid => {
        if (valid) {
          this.modifyLoading = true;
          this.$axios
            .put(`/users/${this.selectDriver[0].id}`, this.DriverFormData)
            .then(() => {
              this.modifyLoading = false;
              this.showModify = false;
              this.$Message.success("保存用户成功");
              this.$refs["modifyDriverForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.success("保存用户失败");
            });
        }
      });
    }
  },
  mounted() {
    this.handleQuery();
  }
};
</script>

<style lang="less" scoped>
.operation {
  .button {
    margin-right: 5px;
  }
}
</style>
<style lang="less">
.ivu-table-tip {
}
</style>

<style lang="less">
.create-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
