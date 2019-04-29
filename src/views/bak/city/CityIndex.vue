<template>
  <div class="table-page">
    <div class="search">
      <Form
        class="search-form"
        ref="searchForm"
        :model="searchForm"
        :label-width="80"
        inline
      >
        <FormItem prop="name" label="用户名称:">
          <Input
            v-model="searchForm.name"
            type="text"
            placeholder="请输入用户名称"
            clearable
            style="width: 200px"
          />
        </FormItem>
        <FormItem class="buttons">
          <ButtonGroup>
            <Button type="primary" icon="md-search" ghost>查询</Button>
            <Button icon="md-close">重置</Button>
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
          >新增</Button
        >
        <Button
          type="info"
          icon="md-create"
          ghost
          class="button"
          :disabled="selectedUser.length !== 1"
          @click="showModifyDrawer"
          >修改</Button
        >
        <Button
          type="error"
          icon="ios-trash"
          ghost
          class="button"
          :disabled="!selectedUser.length > 0"
          @click="handleDeleteUser"
          >删除</Button
        >
        <Button type="primary" icon="ios-refresh" ghost @click="handleQuery"
          >刷新</Button
        >
      </ButtonGroup>
    </div>
    <div class="data-table">
      <Table
        border
        :columns="userColumns"
        :data="userList"
        @on-selection-change="handleSelect"
      >
      </Table>
    </div>
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
      ></Page>
    </div>
    <Drawer
      title="新增用户"
      v-model="showCreate"
      width="360"
      :mask-closable="false"
    >
      <Form
        ref="createUserForm"
        :model="formData"
        :rules="formRules"
        :label-width="50"
      >
        <Row>
          <i-Col span="24">
            <FormItem label="名称" prop="name">
              <Input v-model="formData.name" placeholder="请输入用户名" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="密码" prop="password" placeholder="请输入密码">
              <Input type="password" v-model="formData.password" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="formData.gender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
                <Radio label="未知">未知</Radio>
              </RadioGroup>
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelCreateUser"
          >取消</Button
        >
        <Button
          type="primary"
          @click="handleCreateUser"
          :loading="createLoading"
          >保存</Button
        >
      </div>
    </Drawer>
    <Drawer
      title="修改城市"
      v-model="showModify"
      width="360"
      :mask-closable="false"
    >
      <Form
        ref="modifyUserForm"
        :model="formData"
        :rules="formRules"
        :label-width="50"
      >
        <Row>
          <i-Col span="24">
            <FormItem label="名称" prop="name">
              <Input v-model="formData.name" placeholder="请输入用户名" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="密码" prop="password" placeholder="请输入密码">
              <Input type="password" v-model="formData.password" />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="formData.gender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
                <Radio label="未知">未知</Radio>
              </RadioGroup>
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelModifyUser"
          >取消</Button
        >
        <Button
          type="primary"
          @click="handleModifyUser"
          :loading="modifyLoading"
          >保存</Button
        >
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      userColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "性别",
          key: "gender"
        },
        {
          title: "性别",
          key: "phone"
        },
        {
          title: "邮箱",
          key: "email"
        }
      ],
      searchForm: {
        name: ""
      },
      userList: [],
      totalCount: 0,
      selectedUser: [],
      pageIndex: 1,
      pageSize: 10,
      formData: {
        name: "",
        password: "123456",
        gender: ""
      },
      formRules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur,change" }
        ],
        gender: []
      },
      showCreate: false,
      createLoading: false,

      showModify: false,
      modifyLoading: false
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
          this.userList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.userList = [];
          this.totalCount = 0;
        });
    },
    handlePageChange(index) {
      this.pageIndex = userIndex;
      this.handleQuery();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.handleQuery();
    },
    handleSelect(selection, row) {
      this.selectedUser = selection;
      console.log(selection, row);
    },
    showCreateDrawer() {
      this.showCreate = true;
    },
    handleCancelCreateUser() {
      this.showCreate = false;
      this.$refs["createUserForm"].resetFields();
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
        name: this.selectedUser[0].name,
        password: this.selectedUser[0].password,
        gender: this.selectedUser[0].gender
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
            .put(`/users/${this.selectedUser[0].id}`, this.formData)
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
    },
    handleDeleteUser() {
      let ids = this.selectedUser.map(item => {
        return item.id;
      });
      console.log(ids);
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
  overflow-x: hidden !important;
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
