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
        <FormItem prop="cityDistance">
          <div class="ivu-form-item select-ground">
            <span class="select-name">城市距离</span>
            <div class="select-input">
              <Input
                v-model="searchRouteForm.cityDistance"
                type="text"
                placeholder="请输入城市距离"
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
          :disabled="selectedRoute.length !== 1"
          @click="showModifyDrawer"
          >修改
        </Button>
        <Button
          type="error"
          icon="ios-trash"
          ghost
          class="button"
          :disabled="!selectedRoute.length > 0"
          @click="handleDeleteRoute"
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
        :columns="routeColumns"
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
      title="添加路线信息 "
      v-model="showCreate"
      width="600"
      :mask-closable="false"
    >
      <Form
        ref="createRouteForm"
        :model="routeFormData"
        :rules="formRules"
        :label-width="120"
      >
        <Row>
          <i-Col span="12">
            <FormItem label="城市编号" prop="cityCode">
              <Input
                v-model="routeFormData.cityCode"
                placeholder="请输入城市编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="路线编号" prop="code">
              <Input
                v-model="routeFormData.code"
                placeholder="请输入路线编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="路线名称" prop="password">
              <Input
                v-model="routeFormData.name"
                placeholder="请输入路线名称"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="开始城市" prop="startCity">
              <Input
                v-model="routeFormData.startCity"
                placeholder="请输入开始城市"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="目标城市" prop="targetCity">
              <Input
                v-model="routeFormData.targetCity"
                placeholder="请输入目标城市"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="开始站点" prop="startStation">
              <Input
                v-model="routeFormData.startStation"
                placeholder="请输入开始站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="目标城市" prop="targetStation">
              <Input
                v-model="routeFormData.targetStation"
                placeholder="请输入目标城市"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="城市距离" prop="cityDistance">
              <Input
                placeholder="请输入城市距离"
                v-model="routeFormData.cityDistance"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="站点距离" prop="stationDistance">
              <Input
                v-model="routeFormData.stationDistance"
                placeholder="请输入站点距离"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="中转城市" prop="transferCity">
              <Input
                v-model="routeFormData.transferCity"
                placeholder="请输入中转城市"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="中转站点" prop="transferStation">
              <Input
                v-model="routeFormData.transferStation"
                placeholder="请输入中转站点"
              />
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelCreateRoute"
          >取消
        </Button>
        <Button
          type="primary"
          @click="handleCreateRoute"
          :loading="createLoading"
          >保存
        </Button>
      </div>
    </Drawer>
    <Drawer
      title="修改路线"
      v-model="showModify"
      width="600"
      :mask-closable="false"
    >
      <Form
        ref="modifyRouteForm"
        :model="routeFormData"
        :rules="formRules"
        :label-width="120"
      >
        <Row>
          <i-Col span="12">
            <FormItem label="城市编号" prop="cityCode">
              <Input
                v-model="routeFormData.cityCode"
                placeholder="请输入城市编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="路线编号" prop="code">
              <Input
                v-model="routeFormData.code"
                placeholder="请输入路线编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="路线名称" prop="password">
              <Input
                v-model="routeFormData.name"
                placeholder="请输入路线名称"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="开始城市" prop="startCity">
              <Input
                v-model="routeFormData.startCity"
                placeholder="请输入开始城市"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="目标城市" prop="targetCity">
              <Input
                v-model="routeFormData.targetCity"
                placeholder="请输入目标城市"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="开始站点" prop="startStation">
              <Input
                v-model="routeFormData.startStation"
                placeholder="请输入开始站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="目标城市" prop="targetStation">
              <Input
                v-model="routeFormData.targetStation"
                placeholder="请输入目标城市"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="城市距离" prop="cityDistance">
              <Input
                placeholder="请输入城市距离"
                v-model="routeFormData.cityDistance"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="站点距离" prop="stationDistance">
              <Input
                v-model="routeFormData.stationDistance"
                placeholder="请输入站点距离"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="中转城市" prop="transferCity">
              <Input
                v-model="routeFormData.transferCity"
                placeholder="请输入中转城市"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="中转站点" prop="transferStation">
              <Input
                v-model="routeFormData.transferStation"
                placeholder="请输入中转站点"
              />
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelModifyRoute"
          >取消
        </Button>
        <Button
          type="primary"
          @click="handleModifyRoute"
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
      routeColumns: [
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
          title: "城市编号",
          key: "cityCode",
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
        }
      ],
      searchRouteForm: {
        name: "",
        code: "",
        cityCode: "",
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
      selectedRoute: [],
      pageIndex: 1,
      pageSize: 10,

      routeFormData: {
        name: "",
        code: "",
        cityCode: "",
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
          { required: true,
              message: "路线名不能为空",
              trigger: "blur,change" }
        ],
        code: [
          {
            required: true,
            message: "路线编号不能为空",
            trigger: "blur,change"
          }
        ],
        startCity: [
          {
            required: true,
            message: "开始城市不能为空",
            trigger: "blur,change"
          }
        ],
        targetCity: [
          {
            required: true,
            message: "目标城市不能为空",
            trigger: "blur,change"
          }
        ],
        startStation: [
          {
            required: true,
            message: "开始站点不能为空",
            trigger: "blur,change"
          }
        ],
        cityDistance: [
          { required: true, message: "距离不能为空", trigger: "blur,change" }
        ],
        transferCity: [
          {
            required: true,
            message: "中转城市不能为空",
            trigger: "blur,change"
          }
        ],
        transferStation: [
          {
            required: true,
            message: "中转站点不能为空",
            trigger: "blur,change"
          }
        ],
        cityCode: [
          {
            required: true,
            message: "城市编号不能为空",
            trigger: "blur,change"
          }
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
          `/route/pageQuery?page=${this.pageIndex - 1}&size=${this.pageSize}`,
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
      this.selectedRoute = selection;
      console.log(selection, row);
    },
    showCreateDrawer() {
      this.showCreate = true;
    },
    handleCancelCreateRoute() {
      this.showCreate = false;
      this.$refs["createRouteForm"].resetFields();
    },

    handleDeleteRoute() {
      let ids = this.selectedRoute.map(item => {
        return item.id;
      });
      console.log(ids);
      this.$axios
        .post("/route/deleteBatch", ids)
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
    handleCreateRoute() {
      this.$refs["createRouteForm"].validate(valid => {
        if (valid) {
          this.createLoading = true;
          this.$axios
            .post("/route", this.routeFormData)
            .then(() => {
              this.createLoading = false;
              this.showCreate = false;
              this.$Message.success("保存路线成功");
              this.$refs["createRouteForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.error("保存路线失败");
            });
        }
      });
    },
    showModifyDrawer() {
      this.routeFormData = {
        startCity: this.selectedRoute[0].startCity,
        targetCity: this.selectedRoute[0].targetCity,
        startStation: this.selectedRoute[0].startStation,
        targetStation: this.selectedRoute[0].targetStation,
        cityDistance: this.selectedRoute[0].cityDistance,
        stationDistance: this.selectedRoute[0].stationDistance,
        transferCity: this.selectedRoute[0].transferCity,
        transferStation: this.selectedRoute[0].transferStation,
        name: this.selectedRoute[0].name,
        code: this.selectedRoute[0].code
      };
      this.showModify = true;
    },
    handleCancelModifyRoute() {
      this.showModify = false;
      this.$refs["modifyRouteForm"].resetFields();
    },
    handleModifyRoute() {
      this.$refs["modifyRouteForm"].validate(valid => {
        if (valid) {
          this.modifyLoading = true;
          this.$axios
            .put(`/route/${this.selectedRoute[0].id}`, this.routeFormData)
            .then(() => {
              this.modifyLoading = false;
              this.showModify = false;
              this.$Message.success("保存路线成功");
              this.$refs["modifyRouteForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.error("保存路线失败");
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
