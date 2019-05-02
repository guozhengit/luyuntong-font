<template>
  <div class="table-page" style="overflow-y: hidden">
    <div class="search">
      <Form
        class="search-form"
        ref="employeeSearchForm"
        :model="employeeSearchForm"
        :label-width="5"
        inline
      >
        <FormItem prop="name">
          <div class="ivu-form-item select-ground">
            <span class="select-name">职员名称</span>
            <div class="select-input">
              <Input
                v-model="employeeSearchForm.name"
                type="text"
                placeholder="请输入职员名称"
              />
            </div>
          </div>
        </FormItem>

        <FormItem prop="code">
          <div class="ivu-form-item select-ground">
            <span class="select-name">职员编号</span>
            <div class="select-input">
              <Input
                v-model="employeeSearchForm.code"
                type="text"
                placeholder="请输入职员编号"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="age">
          <div class="ivu-form-item select-ground">
            <span class="select-name">年龄</span>
            <div class="select-input">
              <Input
                v-model="employeeSearchForm.age"
                type="text"
                placeholder="请输入职员年龄"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="age">
          <div class="ivu-form-item select-ground">
            <span class="select-name"></span>
            <div class="select-input">
              <Select v-model="employeeSearchForm.age" placeholder="请选择性别">
                <Option
                  v-for="item in types"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}
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
        :columns="EmployeeColumns"
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
      title="添加职员信息"
      v-model="showCreate"
      width="360"
      :mask-closable="false"
    >
      <Form
        ref="createUserForm"
        :model="emplyeeFormData"
        :rules="formRules"
        :label-width="80"
      >
        <Row>
          <i-Col span="24">
            <FormItem label="职员名称" prop="name">
              <Input
                v-model="emplyeeFormData.name"
                placeholder="请输入职员名称"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="职员编号" prop="code">
              <Input
                v-model="emplyeeFormData.code"
                placeholder="请输入职员编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="职员年龄" prop="age">
              <Input
                placeholder="请输入职员年龄"
                v-model="emplyeeFormData.age"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="职员薪水" prop="salary">
              <Input
                placeholder="请输入职员薪水"
                v-model="emplyeeFormData.salary"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="奖金" prop="bonus">
              <Input v-model="emplyeeFormData.bonus" placeholder="请输入奖金" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="所属部门" prop="email">
              <Input
                v-model="emplyeeFormData.department"
                placeholder="请选择部门"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="emplyeeFormData.gender">
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
        :model="emplyeeFormData"
        :rules="formRules"
        :label-width="80"
      >
        <Row>
          <i-Col span="24">
            <FormItem label="职员名称" prop="name">
              <Input
                v-model="emplyeeFormData.name"
                placeholder="请输入职员名称"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="职员编号" prop="code">
              <Input
                v-model="emplyeeFormData.code"
                placeholder="请输入职员编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="职员年龄" prop="age">
              <Input
                placeholder="请输入职员年龄"
                v-model="emplyeeFormData.age"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="职员薪水" prop="salary">
              <Input
                placeholder="请输入职员薪水"
                v-model="emplyeeFormData.salary"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="奖金" prop="bonus">
              <Input v-model="emplyeeFormData.bonus" placeholder="请输入奖金" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="所属部门" prop="email">
              <Input
                v-model="emplyeeFormData.department"
                placeholder="请选择部门"
              />
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
      EmployeeColumns: [
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
          title: "职员姓名",
          key: "name",
          align: "center",
          sortable: true
        },
        {
          title: "职员编号",
          key: "code",
          align: "center"
        },
        {
          width: 120,
          title: "性别",
          key: "gender",
          align: "center",
          sortable: true
        },
        {
          title: "薪水",
          key: "salary",
          align: "center",
          sortable: true
        },
        {
          title: "奖金",
          key: "bonus",
          align: "center",
          sortable: true
        },
        {
          title: "部门",
          key: "department",
          align: "center",
          sortable: true
        },
        {
          title: "邮箱",
          key: "email",
          align: "center",
          sortable: true
        }
      ],
      employeeSearchForm: {
        code: "",
        name: "",
        birthday: "",
        age: "",
        position: "",
        gender: "",
        salary: "",
        bonus: "",
        department: "",
        stationCode: ""
      },
      employeeList: [],
      totalCount: 0,
      selectedEmployee: [],
      pageIndex: 1,
      pageSize: 10,
      emplyeeFormData: {
        code: "",
        name: "",
        birthday: "",
        age: "",
        position: "",
        gender: "",
        salary: "",
        bonus: "",
        department: "",
        stationCode: ""
      },
      formRules: {
        code: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        birthday: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        age: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        position: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        gender: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        salary: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        bonus: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        department: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        stationCode: [
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
          this.employeeSearchForm
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
            .post("/users", this.emplyeeFormData)
            .then(() => {
              this.createLoading = false;
              this.showCreate = false;
              this.$Message.success("保存职员成功");
              this.$refs["createUserForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.success("保存职员失败");
            });
        }
      });
    },
    showModifyDrawer() {
      this.emplyeeFormData = {
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
            .put(`/users/${this.selectedEmployee[0].id}`, this.emplyeeFormData)
            .then(() => {
              this.modifyLoading = false;
              this.showModify = false;
              this.$Message.success("保存职员成功");
              this.$refs["modifyUserForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.success("保存职员失败");
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
