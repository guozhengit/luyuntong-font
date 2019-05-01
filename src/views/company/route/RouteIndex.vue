<template>
  <div class="table-page" style="overflow-y: hidden">
    <div class="search">
      <Form
        class="search-form"
        ref="searchRouteForm"
        :model="searchRouteForm"
        :label-width="5"
        inline
      >
        <FormItem prop="name">
          <div class="ivu-form-item select-ground">
            <span class="select-name">路线名称</span>
            <div class="select-input">
              <Input
                v-model="searchRouteForm.name"
                type="text"
                placeholder="请输入路线名称"
              />
            </div>
          </div>
        </FormItem>

        <FormItem prop="startCity">
          <div class="ivu-form-item select-ground">
            <span class="select-name">出发城市</span>
            <div class="select-input">
              <Input
                v-model="searchRouteForm.startCity"
                type="text"
                placeholder="请输入出发城市"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="startCity">
          <div class="ivu-form-item select-ground">
            <span class="select-name">目标城市</span>
            <div class="select-input">
              <Input
                v-model="searchRouteForm.targetCity"
                type="text"
                placeholder="请输入出发城市"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="startCity">
          <div class="ivu-form-item select-ground">
            <span class="select-name">出发城市</span>
            <div class="select-input">
              <Input
                v-model="searchRouteForm.startCity"
                type="text"
                placeholder="请输入出发城市"
                clearable
              />
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
          :disabled="selectedEmployee.length !== 1"
          @click="showModifyDrawer"
          >修改
        </Button>
        <Button
          type="error"
          icon="ios-trash"
          ghost
          class="button"
          :disabled="!selectedEmployee.length > 0"
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
        :data="employeeList"
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
      title="添加用户"
      v-model="showCreate"
      width="360"
      :mask-closable="false"
    >
      <Form
        ref="createUserForm"
        :model="formData"
        :rules="formRules"
        :label-width="80"
      >
        <Row>
          <!--<i-Col span="24">-->
          <!--<FormItem label="路线编号" prop="name">-->
          <!--<Input v-model="formData.name" placeholder="请输入路线编号"/>-->
          <!--</FormItem>-->
          <!--</i-Col>-->
          <i-Col span="24">
            <FormItem label="密码" prop="password">
              <Input v-model="formData.password" placeholder="请输入密码" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="用户编号" prop="code">
              <Input v-model="formData.code" placeholder="请输入用户编号" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="生日" prop="birthday">
              <Input placeholder="请输入生日" v-model="formData.birthday" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="电话" prop="phone">
              <Input v-model="formData.phone" placeholder="请输入电话" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="邮箱" prop="email">
              <Input v-model="formData.email" placeholder="请输入邮箱" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="formData.gender">
                <Radio label="男">1</Radio>
                <Radio label="女">2</Radio>
                <Radio label="未知">3</Radio>
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
      title="修改用户"
      v-model="showModify"
      width="360"
      :mask-closable="false"
    >
      <Form
        ref="modifyUserForm"
        :model="formData"
        :rules="formRules"
        :label-width="80"
      >
        <Row>
          <i-Col span="24">
            <FormItem label="用户名" prop="name">
              <Input v-model="formData.name" placeholder="请输入用户名" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="用户编号" prop="name">
              <Input v-model="formData.code" placeholder="请输入用户编号" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="密码" prop="password" placeholder="请输入密码">
              <Input type="password" v-model="formData.password" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="生日" prop="birthday">
              <Input placeholder="请输入生日" v-model="formData.birthday" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="电话" prop="phone">
              <Input v-model="formData.phone" placeholder="请输入电话" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="邮箱" prop="email">
              <Input v-model="formData.email" placeholder="请输入邮箱" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="formData.gender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
                <Radio label="其他">其他</Radio>
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
  data: function() {
    return {
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
          title: "路线编号",
          key: "code",
          align: "center",
          sortable: true
        },
        {
          title: "始发城市",
          key: "startCity",
          align: "center"
        },
        {
          title: "目的城市",
          key: "targetCity",
          align: "center"
        },
        {
          title: "开始站点",
          key: "startStation",
          align: "center"
        },
        {
          title: "目标站点",
          key: "targetStation",
          align: "center"
        },
        {
          title: "城市距离",
          key: "cityDistance",
          align: "center"
        },
        {
          title: "站点距离",
          key: "stationDistance",
          align: "center"
        },
        {
          title: "中转城市",
          key: "transferCity",
          align: "center",
          sortable: true
        },
        {
          title: "中转站点",
          key: "transferStation",
          align: "center",
          sortable: true
        },
        {
          title: "城市编号",
          key: "cityCode",
          align: "center",
          sortable: true
        }
      ],
      searchRouteForm: {
        name: "",
        code: "",
        startCity: "",
        targetCity: "",
        startStation: "",
        targetStation: "",
        cityDistance: "",
        stationDistance: "",
        transferCity: "",
        transferStation: ""
      },
      employeeList: [],
      totalCount: 0,
      selectedEmployee: [],
      pageIndex: 1,
      pageSize: 10,

      formData: {
        name: "",
        code: "",
        startCity: "",
        targetCity: "",
        startStation: "",
        targetStation: "",
        cityDistance: "",
        stationDistance: "",
        transferCity: "",
        transferStation: ""
      },
      formRules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        code: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        startCity: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        targetCity: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        startStation: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        cityDistance: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        transferCity: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        transferStation: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        cityCode: [
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
          this.searchRouteForm
        )
        .then(res => {
          let result = res.data;
          this.employeeList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.employeeList = [];
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
      this.selectedEmployee = selection;
      console.log(selection, row);
    },
    showCreateDrawer() {
      this.showCreate = true;
    },
    handleCancelCreateUser() {
      this.showCreate = false;
      this.$refs["createUserForm"].resetFields();
    },

    handleDeleteUser() {
      let ids = this.selectedEmployee.map(item => {
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
      this.$refs["createUserForm"].validate(valid => {
        if (valid) {
          this.createLoading = true;
          this.$axios
            .post("/users", this.formData)
            .then(() => {
              this.createLoading = false;
              this.showCreate = false;
              this.$Message.success("保存用户成功");
              this.$refs["createUserForm"].resetFields();
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
      this.formData = {
        name: this.selectedEmployee[0].name,
        password: this.selectedEmployee[0].password,
        gender: this.selectedEmployee[0].gender,
        code: this.selectedEmployee[0].code,
        phone: this.selectedEmployee[0].phone,
        birthDay: this.selectedEmployee[0].birthDay
      };
      this.showModify = true;
    },
    handleCancelModifyUser() {
      this.showModify = false;
      this.$refs["modifyUserForm"].resetFields();
    },
    handleModifyUser() {
      this.$refs["modifyUserForm"].validate(valid => {
        if (valid) {
          this.modifyLoading = true;
          this.$axios
            .put(`/users/${this.selectedEmployee[0].id}`, this.formData)
            .then(() => {
              this.modifyLoading = false;
              this.showModify = false;
              this.$Message.success("保存用户成功");
              this.$refs["modifyUserForm"].resetFields();
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
