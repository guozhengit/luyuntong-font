<template>
  <div class="table-page" style="overflow-y: hidden">
    <div class="search">
      <Form
        class="search-form"
        ref="searchStationForm"
        :model="searchStationForm"
        :label-width="5"
        inline
      >
        <FormItem prop="name">
          <div class="ivu-form-item select-ground">
            <span class="select-name">站点名称</span>
            <div class="select-input">
              <Input
                v-model="searchStationForm.name"
                type="text"
                placeholder="请输入站点名称"
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="cityCode">
          <div class="ivu-form-item select-ground">
            <span class="select-name">城市编号</span>
            <div class="select-input">
              <Input
                v-model="searchStationForm.cityCode"
                type="text"
                placeholder="请输入用户账号"
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
          :disabled="selectedStation.length !== 1"
          @click="showModifyDrawer"
          >修改
        </Button>
        <Button
          type="error"
          icon="ios-trash"
          ghost
          class="button"
          :disabled="!selectedStation.length > 0"
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
        :data="stationList"
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
      width="400"
      :mask-closable="false"
    >
      <Form
        ref="createUserForm"
        :model="stationFormData"
        :rules="formRules"
        :label-width="100"
      >
        <Row>
          <i-Col span="24">
            <FormItem label="站点编号" prop="code">
              <Input
                v-model="stationFormData.code"
                placeholder="请输入站点编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="站点负责人" prop="principal">
              <Input
                v-model="stationFormData.principal"
                placeholder="请输入站点负责人"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="联系电话" prop="linkPhone">
              <Input
                v-model="stationFormData.linkPhone"
                placeholder="请输入联系电话"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="详细地址" prop="detailAddress">
              <Input
                v-model="stationFormData.detailAddress"
                placeholder="请输入详细地址"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="邮编" prop="phone">
              <Input
                v-model="stationFormData.postCode"
                placeholder="输入邮政编码"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="城市代码" prop="cityCode">
              <Input
                v-model="stationFormData.cityCode"
                placeholder="请输入城市代码"
              />
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
      width="400"
      :mask-closable="false"
    >
      <Form
        ref="modifyUserForm"
        :model="stationFormData"
        :rules="formRules"
        :label-width="100"
      >
        <Row>
          <i-Col span="24">
            <FormItem label="站点编号" prop="code">
              <Input
                v-model="stationFormData.code"
                placeholder="请输入站点编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="站点负责人" prop="principal">
              <Input
                v-model="stationFormData.principal"
                placeholder="请输入站点负责人"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="联系电话" prop="linkPhone">
              <Input
                v-model="stationFormData.linkPhone"
                placeholder="请输入联系电话"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="详细地址" prop="detailAddress">
              <Input
                v-model="stationFormData.detailAddress"
                placeholder="请输入详细地址"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="邮编" prop="phone">
              <Input
                v-model="stationFormData.postCode"
                placeholder="输入邮政编码"
              />
            </FormItem>
          </i-Col>
          <i-Col span="24">
            <FormItem label="城市代码" prop="cityCode">
              <Input
                v-model="stationFormData.cityCode"
                placeholder="请输入城市代码"
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
      userColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "站点编号",
          type: "code",
          align: "center"
        },
        {
          title: "站点名称",
          type: "name",
          align: "center"
        },
        {
          title: "站点负责人",
          key: "principal",
          align: "center",
          sortable: true
        },
        {
          title: "联系电话",
          key: "linkPhone",
          align: "center"
        },
        {
          title: "详细地址",
          key: "detailAddress",
          align: "center",
          sortable: true
        },
        {
          title: "邮证编号",
          key: "postCode",
          align: "center",
          sortable: true
        },
        {
          title: "城市代码",
          key: "cityCode",
          align: "center",
          sortable: true
        }
      ],
      searchStationForm: {
        code: "",
        name: "",
        principal: "",
        linkPhone: "",
        detailAddress: "",
        postCode: "",
        cityCode: ""
      },
      stationList: [],
      totalCount: 0,
      selectedStation: [],
      pageIndex: 1,
      pageSize: 10,

      stationFormData: {
        code: "",
        name: "",
        principal: "",
        linkPhone: "",
        detailAddress: "",
        postCode: "",
        cityCode: ""
      },
      formRules: {
        code: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        principal: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        linkPhone: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        detailAddress: [
          { required: true, message: "用户名不能为空", trigger: "blur,change" }
        ],
        postCode: [
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
          this.searchStationForm
        )
        .then(res => {
          let result = res.data;
          this.stationList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.stationList = [];
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
      this.selectedStation = selection;
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
      let ids = this.selectedStation.map(item => {
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
            .post("/users", this.stationFormData)
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
      this.stationFormData = {
        name: this.selectedStation[0].name,
        password: this.selectedStation[0].password,
        gender: this.selectedStation[0].gender,
        code: this.selectedStation[0].code,
        phone: this.selectedStation[0].phone,
        birthDay: this.selectedStation[0].birthDay
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
            .put(`/users/${this.selectedStation[0].id}`, this.stationFormData)
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
