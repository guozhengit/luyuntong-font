<template>
  <div class="table-page" style="overflow-y:hidden">
    <div class="search">
      <Form
        class="search-form"
        ref="searchVehicleForm"
        :model="searchVehicleForm"
        :label-width="10"
        inline
      >
        <FormItem prop="code">
          <div class="ivu-form-item select-ground">
            <span class="select-name">车牌号</span>
            <div class="select-input">
              <Input
                v-model="searchVehicleForm.code"
                type="text"
                placeholder="请输入车牌号"
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="useAge">
          <div class="ivu-form-item select-ground">
            <span class="select-name">车辆类型</span>
            <div class="select-input">
              <Input
                v-model="searchVehicleForm.type"
                type="text"
                placeholder="请输入车辆类型"
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="useAge">
          <div class="ivu-form-item select-ground">
            <span class="select-name">车龄</span>
            <div class="select-input">
              <Input
                v-model="searchVehicleForm.useAge"
                type="text"
                placeholder="请输入使用年限"
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
          :disabled="selectedVehicle.length !== 1"
          @click="showModifyDrawer"
          >修改
        </Button>
        <Button
          type="error"
          icon="ios-trash"
          ghost
          class="button"
          :disabled="!selectedVehicle.length > 0"
          @click="handleDeleteVehicle"
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
        :columns="vehicleCloumns"
        :data="vehicleList"
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
      title="添加车辆信息"
      v-model="showCreate"
      width="800"
      :mask-closable="false"
    >
      <Form
        ref="createVehicleForm"
        :model="vehicleFormData"
        :rules="formRules"
        :label-width="120"
      >
        <Row>
          <i-Col span="12">
            <FormItem label="车牌号" prop="code">
              <Input
                      v-model="vehicleFormData.code"
                      placeholder="请输入车牌号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="保险单" prop="insuranceCard">
              <Input
                      v-model="vehicleFormData.insuranceCard"
                      placeholder="请输入保险单号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="所属站点" prop="stationCode">
              <Input
                      v-model="vehicleFormData.stationCode"
                      placeholder="请选择站点信息"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="所属单位" prop="owner">
              <Input
                      v-model="vehicleFormData.owner"
                      placeholder="请选择所属单位"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车辆型号" prop="model">
              <Input
                      v-model="vehicleFormData.model"
                      placeholder="请输入选择车辆型号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="发动机编号" prop="engineNo">
              <Input
                      v-model="vehicleFormData.engineNo"
                      placeholder="请输入发动机编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车架编号" prop="frameNo">
              <Input
                      v-model="vehicleFormData.frameNo"
                      placeholder="请输入车架编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车身长度" prop="length">
              <Input
                      v-model="vehicleFormData.length"
                      placeholder="请输入车长"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车身宽度" prop="width">
              <Input v-model="vehicleFormData.width" placeholder="请输入车宽" />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车身高度" prop="high">
              <Input v-model="vehicleFormData.high" placeholder="请输入车高" />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="限高" prop="allowCarryHigh">
              <Input
                      v-model="vehicleFormData.allowCarryHigh"
                      placeholder="请输入限高"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="准载体积" prop="allowCarryVolume">
              <Input
                      v-model="vehicleFormData.allowCarryVolume"
                      placeholder="请输入准载体积"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="载重量" prop="allowCarryWeight">
              <Input
                      v-model="vehicleFormData.allowCarryWeight"
                      placeholder="请输入载重量"
              />
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelCreateVehicle"
          >取消
        </Button>
        <Button
          type="primary"
          @click="handleCreateVehicle"
          :loading="createLoading"
          >保存
        </Button>
      </div>
    </Drawer>
    <Drawer
      title="修改车辆信息"
      v-model="showModify"
      width="600"
      :mask-closable="false"
    >
      <Form
        ref="modifyVehicleForm"
        :model="vehicleFormData"
        :rules="formRules"
        :label-width="120"
      >
        <Row>
          <i-Col span="12">
            <FormItem label="车牌号" prop="code">
              <Input
                v-model="vehicleFormData.code"
                placeholder="请输入车牌号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="保险单" prop="insuranceCard">
              <Input
                v-model="vehicleFormData.insuranceCard"
                placeholder="请输入保险单号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="所属站点" prop="stationCode">
              <Input
                v-model="vehicleFormData.stationCode"
                placeholder="请选择站点信息"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="所属单位" prop="owner">
              <Input
                v-model="vehicleFormData.owner"
                placeholder="请选择所属单位"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车辆型号" prop="model">
              <Input
                v-model="vehicleFormData.model"
                placeholder="请输入选择车辆型号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="发动机编号" prop="engineNo">
              <Input
                v-model="vehicleFormData.engineNo"
                placeholder="请输入发动机编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车架编号" prop="frameNo">
              <Input
                v-model="vehicleFormData.frameNo"
                placeholder="请输入车架编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车身长度" prop="length">
              <Input
                v-model="vehicleFormData.length"
                placeholder="请输入车长"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车身宽度" prop="width">
              <Input v-model="vehicleFormData.width" placeholder="请输入车宽" />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="车身高度" prop="high">
              <Input v-model="vehicleFormData.high" placeholder="请输入车高" />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="限高" prop="allowCarryHigh">
              <Input
                v-model="vehicleFormData.allowCarryHigh"
                placeholder="请输入限高"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="准载体积" prop="allowCarryVolume">
              <Input
                v-model="vehicleFormData.allowCarryVolume"
                placeholder="请输入准载体积"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="载重量" prop="allowCarryWeight">
              <Input
                v-model="vehicleFormData.allowCarryWeight"
                placeholder="请输入载重量"
              />
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelModifyVehicle"
          >取消
        </Button>
        <Button
          type="primary"
          @click="handleModifyVehicle"
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
      vehicleCloumns: [
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
          title: "车牌号",
          key: "code",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          width: 200,
          title: "车辆信息编号",
          key: "code",
          align: "center"
        },
        {
          width: 120,
          title: "车辆归属",
          key: "owner",
          align: "center",
          sortable: true
        },
        {
          width: 120,
          title: "车辆限高",
          key: "allowCarryWeight",
          align: "center",
          sortable: true
        },
        {
          width: 120,
          title: "准载重量",
          key: "allowCarryHigh",
          align: "center",
          sortable: true
        },
        {
          width: 120,
          title: "准载体积",
          key: "allowCarryVolume",
          align: "center"
        },
        {
          title: "发动机型号",
          key: "engineNo",
          align: "center",
          sortable: true
        },
        {
          title: "保险单号",
          key: "insuranceCard",
          align: "center",
          sortable: true
        }
      ],
      searchVehicleForm: {
        code: "",
        owner: "陆运通",
        vehicleCode: "",
        stationCode: "",
        type: "",
        model: "",
        length: "",
        high: "",
        width: "",
        allowCarryVolume: "",
        allowCarryWeight: "",
        allowCarryHigh: "",
        useAge: "",
        frameNo: "",
        engineNo: "",
        insuranceCard: "",
        DetailGoodCode: ""
      },
      vehicleList: [],
      totalCount: 0,
      selectedVehicle: [],
      pageIndex: 1,
      pageSize: 10,

      vehicleFormData: {
        code: "",
        owner: "陆运通",
        vehicleCode: "",
        stationCode: "",
        type: "",
        model: "",
        length: "",
        high: "",
        width: "",
        allowCarryVolume: "",
        allowCarryWeight: "",
        allowCarryHigh: "",
        useAge: "",
        frameNo: "",
        engineNo: "",
        insuranceCard: "",
        DetailGoodCode: ""
      },
      formRules: {
        vehicleCode: [
          { required: true, message: "车牌号不能为空", trigger: "blur,change" }
        ],
        owner: [
          {
            required: true,
            message: "车辆所属不能为空",
            trigger: "blur,change"
          }
        ],
        stationCode: [
          {
            required: true,
            message: "所属站点不能为空",
            trigger: "blur,change"
          }
        ],
        type: [
          {
            required: true,
            message: "车辆类型不能为空",
            trigger: "blur,change"
          }
        ],
        model: [
          {
            required: true,
            message: "车辆型号不能为空",
            trigger: "blur,change"
          }
        ],
        length: [
          {
            required: true,
            message: "车辆长度不能为空",
            trigger: "blur,change"
          }
        ],
        high: [
          {
            required: true,
            message: "车辆高度不能为空",
            trigger: "blur,change"
          }
        ],
        width: [
          {
            required: true,
            message: "车辆宽度不能为空",
            trigger: "blur,change"
          }
        ],
        allowCarryVolume: [
          {
            required: true,
            message: "准载体积不能为空",
            trigger: "blur,change"
          }
        ],
        allowCarryWeight: [
          {
            required: true,
            message: "准载重量不能为空",
            trigger: "blur,change"
          }
        ],
        allowCarryHigh: [
          {
            required: true,
            message: "准载高度不能为空",
            trigger: "blur,change"
          }
        ],
        useAge: [
          {
            required: true,
            message: "使用年限不能为空",
            trigger: "blur,change"
          }
        ],
        frameNo: [
          {
            required: true,
            message: "车架编号不能为空",
            trigger: "blur,change"
          }
        ],
        engineNo: [
          {
            required: true,
            message: "发动机编号不能为空",
            trigger: "blur,change"
          }
        ],
        insuranceCard: [
          {
            required: true,
            message: "车险号码不能为空",
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
          `/car/pageQuery?page=${this.pageIndex - 1}&size=${this.pageSize}`,
          this.searchVehicleForm
        )
        .then(res => {
          let result = res.data;
          this.vehicleList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.vehicleList = [];
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
      this.selectedVehicle = selection;
      console.log(selection, row);
    },
    showCreateDrawer() {
      this.showCreate = true;
    },
    handleCancelCreateVehicle() {
      this.showCreate = false;
      this.$refs["createVehicleForm"].resetFields();
    },

    handleDeleteVehicle() {
      let ids = this.selectedVehicle.map(item => {
        return item.id;
      });
      console.log(ids);
      this.$axios
        .post("/car/deleteBatch", ids)
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
    handleCreateVehicle() {
      this.$refs["createVehicleForm"].validate(valid => {
        if (valid) {
          this.createLoading = true;
          this.$axios
            .post("/car", this.vehicleFormData)
            .then(() => {
              this.createLoading = false;
              this.showCreate = false;
              this.$Message.success("保存车辆信息成功");
              this.$refs["createVehicleForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.error("保存车辆信息失败");
            });
        }
      });
    },
    showModifyDrawer() {
      this.vehicleFormData = {
        name: this.selectedVehicle[0].name,
        code: this.selectedVehicle[0].code,
        owner: this.selectedVehicle[0].owner,
        stationCode: this.selectedVehicle[0].stationCode,
        type: this.selectedVehicle[0].type,
        model: this.selectedVehicle[0].model,
        length: this.selectedVehicle[0].length,
        high: this.selectedVehicle[0].high,
        width: this.selectedVehicle[0].width,
        allowCarryVolume: this.selectedVehicle[0].allowCarryVolume,
        allowCarryWeight: this.selectedVehicle[0].allowCarryWeight,
        allowCarryHigh: this.selectedVehicle[0].allowCarryHigh,
        useAge: this.selectedVehicle[0].useAge,
        frameNo: this.selectedVehicle[0].frameNo,
        engineNo: this.selectedVehicle[0].engineNo,
        insuranceCard: this.selectedVehicle[0].insuranceCard
      };
      this.showModify = true;
    },
    handleCancelModifyVehicle() {
      this.showModify = false;
      this.$refs["modifyVehicleForm"].resetFields();
    },
    handleModifyVehicle: function() {
      this.$refs["modifyVehicleForm"].validate(valid => {
        if (valid) {
          this.modifyLoading = true;
          this.$axios
            .put(`/car/${this.selectedVehicle[0].id}`, this.vehicleFormData)
            .then(() => {
              this.modifyLoading = false;
              this.showModify = false;
              this.$Message.success("保存车辆信息成功");
              this.$refs["modifyVehicleForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.success("保存车辆信息失败");
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
