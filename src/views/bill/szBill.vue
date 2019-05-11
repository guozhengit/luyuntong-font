<template>
  <div class="table-page">
    <div class="search">
      <Form
        class="search-form"
        ref="billSearchForm"
        :model="billSearchForm"
        :label-width="5"
        inline
      >
        <FormItem prop="paymentCode">
          <div class="ivu-form-item select-ground">
            <span class="select-name">收支单编号</span>
            <div class="select-input">
              <Input
                v-model="billSearchForm.paymentCode"
                type="text"
                placeholder="请输入收支单号"
              />
            </div>
          </div>
        </FormItem>

        <FormItem prop="conSignMan">
          <div class="ivu-form-item select-ground">
            <span class="select-name">业务员</span>
            <div class="select-input">
              <Input
                v-model="billSearchForm.conSignMan"
                type="text"
                placeholder="请输入业务员"
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="paymentType">
          <div class="ivu-form-item select-ground">
            <span class="select-name">付款类型</span>
            <div class="select-input">
              <Select
                      v-model="billSearchForm.paymentType"
                      placeholder="请选择付款类型"
                      clearable
              >
                <Option
                        v-for="item in paymentTypes"
                        :value="item.value"
                        :key="item.value"
                        :name="paymentType"
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
          :disabled="selectBill.length !== 1"
          @click="showModifyDrawer"
          >修改
        </Button>
        <Button
          type="error"
          icon="ios-trash"
          ghost
          class="button"
          :disabled="!selectBill.length > 0"
          @click="handleDeleteBill"
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
        :columns="billsColumns"
        :data="tyBillList"
        @on-selection-change="handleSelect"
      >
      </Table>
    </div>
    <!--<br>-->

    <div class="pagination" style="float: bottom">
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
      title="添加收支信息"
      v-model="showCreate"
      width="60%"
      :mask-closable="false"
    >
      <Form ref="" :model="BillFormData" :rules="formRules" :label-width="140">
        <Row>
          <i-Col span="12">
            <FormItem label="收支单编号" prop="paymentCode">
              <Input
                v-model="BillFormData.paymentCode"
                placeholder="请输入单据编号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="收支日期" prop="paymentsDate">
              <Input
                v-model="BillFormData.paymentsDate"
                placeholder="请选择收支日期"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="业务员" prop="salesMan">
              <Input
                v-model="BillFormData.salesMan"
                placeholder="请输入业务员"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="业务网点" prop="salesStation">
              <Input
                v-model="BillFormData.salesStation"
                placeholder="请输入业务网点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="收入金额" prop="incomePayable">
              <Input
                v-model="BillFormData.incomePayable"
                placeholder="请输入收入金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="支出金额" prop="expendPayable">
              <Input
                v-model="BillFormData.expendPayable"
                placeholder="请输入支出金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="收支合计" prop="paymentsTotal">
              <Input
                v-model="BillFormData.paymentsTotal"
                placeholder="请输入收支合计"
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
          @click="handleCreateBill"
          :loading="createLoading"
          >保存
        </Button>
      </div>
    </Drawer>
    <Drawer
      title="修改收支信息"
      v-model="showModify"
      width="60%"
      :mask-closable="false"
    >
      <Form
        ref="modifyBillForm"
        :model="BillFormData"
        :rules="formRules"
        :label-width="140"
      >
        <Row>
          <i-Col span="12">
            <FormItem label="收支单编号" prop="name">
              <Input v-model="BillFormData.name" placeholder="请输入单据编号" />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="收支日期" prop="paymentsDate">
              <Input
                v-model="BillFormData.paymentsDate"
                placeholder="请选择收支日期"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="业务员" prop="salesMan">
              <Input
                v-model="BillFormData.salesMan"
                placeholder="请输入业务员"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="业务网点" prop="salesStation">
              <Input
                v-model="BillFormData.salesStation"
                placeholder="请输入业务网点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="收入金额" prop="incomePayable">
              <Input
                v-model="BillFormData.incomePayable"
                placeholder="请输入收入金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="支出金额" prop="expendPayable">
              <Input
                v-model="BillFormData.expendPayable"
                placeholder="请输入支出金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="12">
            <FormItem label="收支合计" prop="paymentsTotal">
              <Input
                v-model="BillFormData.paymentsTotal"
                placeholder="请输入收支合计"
              />
            </FormItem>
          </i-Col>
          <!--<i-Col span="12">-->
          <!--<FormItem label="费用类型" prop="costType">-->
          <!--<Input v-model="BillFormData.costType" placeholder="请输入收支合计" />-->
          <!--</FormItem>-->
          <!--</i-Col>-->
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
        paymentTypes: [
            {
                value: "1",
                label: "到付"
            },
            {
                value: "2",
                label: "部分结算"
            },
            {
                value: "3",
                label: "线上付款"
            },
            {
                value: "4",
                label: "其他"
            }
        ],
      billsColumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },

        {
          title: "收支单号",
          width: 200,
          key: "code",
          align: "center"
        },
        {
          title: "收支日期",
          key: "paymentsDate",
          width: 200,
          align: "center",
          sortable: true
        },
          {
              title: "付款类型",
              key: "paymentType",
              sortable: true,
              render: (h, params) => {
                  const row = params.row;
                  const color =
                      row.paymentType === "1"
                          ? "primary"
                          : row.paymentType === "2"
                          ? "warning"
                          :row.paymentType === "3"
                              ?"success":"error";
                  const text =
                      row.paymentType === "1"
                          ? "到付"
                          : row.paymentType === "2"
                          ? "部分结算"
                          :row.paymentType === "3"?"线上付款":"其他";

                  return h(
                      "Tag",
                      {
                          props: {
                              type: "dot",
                              color: color
                          }
                      },
                      text
                  );
              },
              width: 200,
              align: "center"
          },
        {
          title: "业务员",
          key: "salesMan",
          width: 200,
          align: "center",
          sortable: true
        },

        {
          title: "业务站点",
          key: "salesStation",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "收入金额",
          key: "incomePayable",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "支出金额",
          key: "expendPayable",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "收支合计",
          key: "paymentsTotal",
          width: 200,
          align: "center",
          sortable: true
        }
      ],
      billSearchForm: {
        /*单据编号*/
        code: "",
        /*单据类型*/
        type: "",
        /*收支单据编号*/
        paymentCode: "",
        conSignMan: "",
        /*付款类型*/
        paymentType: "",
      },
      tyBillList: [],
      totalCount: 0,
      selectBill: [],
      pageIndex: 1,
      pageSize: 10,

      BillFormData: {
        /*单据编号*/
        code: "",
        /*单据类型*/
        // type: "1:托运单；2:发车单；3：到车单；4回车单；5收支费用单；6客户结算单；7司机结算单",
        type: "",
        /*车辆单据编号*/
        vehicleBillCode: "",
        /*车辆单据类型*/
        vehicleBillType: "",
        /*车辆单据开具日期*/
        vehicleBillDate: "",
        /*结算单据编号*/
        accountBillCode: "",
        /*..类型*/
        accountBillType: "",
        /*..日期*/
        accountBillDate: "",
        /*收支单据编号*/
        paymentCode: "",
        /*服务站点*/
        salesStation: "",
        /*顾客姓名*/
        customerName: "",
        /*收款类型*/
        gatherType: "",
        /*托运人*/
        conSignMan: "",
        /*托运人电话*/
        conSignPhone: "",
        /*始发地址*/
        startAddress: "",
        /*始发所在区域*/
        startRegion: "",
        /*始发邮编*/
        startPostCode: "",
        /*始发日期*/
        startDate: "",
        /*始发站点*/
        startStation: "",
        /*接货人*/
        receiveMan: "",
        /*接货人电话*/
        receivePhone: "",
        /*接货人地址*/
        receiveAddress: "",
        /*接货日期*/
        receiveDate: "",
        /*目标站点*/
        targetStation: "",
        /*目标区域*/
        targetRegion: "",
        /*服务类型*/
        serviceType: "",
        /*运输方式*/
        transportationType: "",
        /*其他费用*/
        otherCost: "",
        /*物流费用*/
        logisCost: "",
        /*运输费用*/
        transportCost: "",
        /*付款类型*/
        paymentType: "",
        /*应付金额*/
        accountPayable: "",
        /*实付金额*/
        realityPayable: "",
        /*未付金额*/
        unReceivedPayable: "",
        /*折让金额*/
        allowancePayable: "",
        /*发车状态*/
        arriveVehicleStatus: "",
        /*车到站状态*/
        departVehicleStatus: "",
        /*车牌号*/
        vehicleCode: "",
        /*车辆类型*/
        vehicleType: "",
        /*司机姓名*/
        driverName: "",
        /*司机姓名*/
        driverPhone: "",
        /*收入金额*/
        incomePayable: "",
        /*支出金额*/
        expendPayable: "",
        /*收支合计*/
        paymentsTotal: "",
        /*收支日期*/
        paymentsDate: "",
        /**/
        customer: {},
        detailGoods: [],
        detailPayments: []
      },
      formRules: {
        /*单据编号*/
        code: [
          {
            required: true,
            message: "单据编号不能为空",
            trigger: "blur,change"
          }
        ],
        /*单据类型*/
        type:
          "1:托运单；2:发车单；3：到车单；4回车单；5收支费用单；6客户结算单；7司机结算单",
        /*服务站点*/
        salesStation: [
          {
            required: true,
            message: "单据类型不能为空",
            trigger: "blur,change"
          }
        ],
        /*顾客姓名*/
        customerName: [
          {
            required: true,
            message: "顾客姓名不能为空",
            trigger: "blur,change"
          }
        ],
        /*收款类型*/
        gatherType: [
          {
            required: true,
            message: "收款类型不能为空",
            trigger: "blur,change"
          }
        ],
        /*托运人*/
        conSignMan: [
          { required: true, message: "托运人不能为空", trigger: "blur,change" }
        ],
        /*托运人电话*/
        conSignPhone: [
          {
            required: true,
            message: "托运人电话不能为空",
            trigger: "blur,change"
          }
        ],
        /*始发地址*/
        startAddress: [
          {
            required: true,
            message: "始发地址不能为空",
            trigger: "blur,change"
          }
        ],
        /*始发所在区域*/
        startRegion: [
          {
            required: true,
            message: "始发所在区域不能为空",
            trigger: "blur,change"
          }
        ],
        /*始发邮编*/
        startPostCode: [
          {
            required: true,
            message: "始发邮编不能为空",
            trigger: "blur,change"
          }
        ],
        /*始发日期*/
        startDate: [
          {
            required: true,
            message: "始发日期不能为空",
            trigger: "blur,change"
          }
        ],
        /*始发站点*/
        startStation: [
          {
            required: true,
            message: "始发站点不能为空",
            trigger: "blur,change"
          }
        ],
        /*接货人*/
        receiveMan: [
          { required: true, message: "接货人不能为空", trigger: "blur,change" }
        ],
        /*接货人电话*/
        receivePhone: [
          {
            required: true,
            message: "接货人电话不能为空",
            trigger: "blur,change"
          }
        ],
        /*接货人地址*/
        receiveAddress: [
          {
            required: true,
            message: "接货人地址不能为空",
            trigger: "blur,change"
          }
        ],
        /*接货日期*/
        receiveDate: [
          {
            required: true,
            message: "接货日期不能为空",
            trigger: "blur,change"
          }
        ],
        /*目标站点*/
        targetStation: [
          {
            required: true,
            message: "目标站点不能为空",
            trigger: "blur,change"
          }
        ],
        /*目标区域*/
        targetRegion: [
          {
            required: true,
            message: "目标区域不能为空",
            trigger: "blur,change"
          }
        ],
        /*服务类型*/
        serviceType: [
          {
            required: true,
            message: "服务类型不能为空",
            trigger: "blur,change"
          }
        ],
        /*运输方式*/
        transportationType: [
          {
            required: true,
            message: "运输方式不能为空",
            trigger: "blur,change"
          }
        ],
        /*其他费用*/
        otherCost: [
          {
            required: true,
            message: "其他费用不能为空",
            trigger: "blur,change"
          }
        ],
        /*物流费用*/
        logisCost: [
          {
            required: true,
            message: "物流费用不能为空",
            trigger: "blur,change"
          }
        ],
        /*运输费用*/
        transportCost: [
          {
            required: true,
            message: "运输费用不能为空",
            trigger: "blur,change"
          }
        ],
        /*付款类型*/
        paymentType: [
          {
            required: true,
            message: "付款类型不能为空",
            trigger: "blur,change"
          }
        ],
        /*应付金额*/
        accountPayable: [
          {
            required: true,
            message: "应付金额不能为空",
            trigger: "blur,change"
          }
        ],
        /*实付金额*/
        realityPayable: [
          {
            required: true,
            message: "实付金额不能为空",
            trigger: "blur,change"
          }
        ],
        /*未付金额*/
        unReceivedPayable: [
          {
            required: true,
            message: "未付金额不能为空",
            trigger: "blur,change"
          }
        ],
        /*折让金额*/
        allowancePayable: [
          {
            required: true,
            message: "折让金额不能为空",
            trigger: "blur,change"
          }
        ],
        /*发车状态*/
        arriveVehicleStatus: [
          {
            required: true,
            message: "发车状态不能为空",
            trigger: "blur,change"
          }
        ],
        /*车到站状态*/
        departVehicleStatus: [
          {
            required: true,
            message: "车到站状态不能为空",
            trigger: "blur,change"
          }
        ],
        /*车牌号*/
        vehicleCode: [
          { required: true, message: "车牌号不能为空", trigger: "blur,change" }
        ],
        /*车辆类型*/
        vehicleType: [
          {
            required: true,
            message: "车辆类型不能为空",
            trigger: "blur,change"
          }
        ],
        /*司机姓名*/
        driverName: [
          {
            required: true,
            message: "司机姓名不能为空",
            trigger: "blur,change"
          }
        ],
        /*司机电话*/
        driverPhone: [
          {
            required: true,
            message: "司机电话不能为空",
            trigger: "blur,change"
          }
        ],
        /*收入金额*/
        incomePayable: [
          {
            required: true,
            message: "收入金额不能为空",
            trigger: "blur,change"
          }
        ],
        /*支出金额*/
        expendPayable: [
          {
            required: true,
            message: "支出金额不能为空",
            trigger: "blur,change"
          }
        ],
        /*收支合计*/
        paymentsTotal: [
          {
            required: true,
            message: "收支合计不能为空",
            trigger: "blur,change"
          }
        ],
        /*收支日期*/
        paymentsDate: [
          {
            required: true,
            message: "收支日期不能为空",
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
          `/bill/pageQuery?page=${this.pageIndex - 1}&size=${this.pageSize}`,
          this.billSearchForm
        )
        .then(res => {
          let result = res.data;
          this.tyBillList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.tyBillList = [];
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
      this.selectBill = selection;
      console.log(selection, row);
    },
    showCreateDrawer() {
      this.showCreate = true;
    },
    handleCancelCreateUser() {
      this.showCreate = false;
      this.$refs[""].resetFields();
    },

    handleDeleteBill() {
      let ids = this.selectBill.map(item => {
        return item.id;
      });
      console.log(ids);
      this.$axios
        .post("/bill/deleteBatch", ids)
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
    handleCreateBill() {
      this.$refs[""].validate(valid => {
        if (valid) {
          this.createLoading = true;
          this.$axios
            .post("/bill", this.BillFormData)
            .then(() => {
              this.createLoading = false;
              this.showCreate = false;
              this.$Message.success("报存单据成功");
              this.$refs[""].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.success("报存单据失败");
            });
        }
      });
    },
    /*此处为更新操作 获取到查询的实体数据*/
    showModifyDrawer() {
      this.BillFormData = {
        type: this.selectBill[0].type,
        vehicleBillCode: this.selectBill[0].vehicleBillCode,
        vehicleBillType: this.selectBill[0].vehicleBillType,
        vehicleBillDate: this.selectBill[0].vehicleBillDate,
        accountBillCode: this.selectBill[0].accountBillCode,
        accountBillType: this.selectBill[0].accountBillType,
        accountBillDate: this.selectBill[0].accountBillDate,
        paymentCode: this.selectBill[0].paymentCode,
        salesStation: this.selectBill[0].salesStation,
        customerName: this.selectBill[0].customerName,
        gatherType: this.selectBill[0].gatherType,
        conSignMan: this.selectBill[0].conSignMan,
        conSignPhone: this.selectBill[0].conSignPhone,
        startAddress: this.selectBill[0].startAddress,
        startRegion: this.selectBill[0].startRegion,
        startPostCode: this.selectBill[0].startPostCode,
        startDate: this.selectBill[0].startDate,
        startStation: this.selectBill[0].startStation,
        receiveMan: this.selectBill[0].receiveMan,
        receivePhone: this.selectBill[0].receivePhone,
        receiveAddress: this.selectBill[0].receiveAddress,
        receiveDate: this.selectBill[0].receiveDate,
        targetStation: this.selectBill[0].targetStation,
        targetRegion: this.selectBill[0].targetRegion,
        serviceType: this.selectBill[0].serviceType,
        transportationType: this.selectBill[0].transportationType,
        otherCost: this.selectBill[0].otherCost,
        logisCost: this.selectBill[0].logisCost,
        transportCost: this.selectBill[0].transportCost,
        paymentType: this.selectBill[0].paymentType,
        accountPayable: this.selectBill[0].accountPayable,
        realityPayable: this.selectBill[0].realityPayable,
        unReceivedPayable: this.selectBill[0].unReceivedPayable,
        allowancePayable: this.selectBill[0].allowancePayable,
        arriveVehicleStatus: this.selectBill[0].arriveVehicleStatus,
        departVehicleStatus: this.selectBill[0].departVehicleStatus,
        vehicleCode: this.selectBill[0].vehicleCode,
        vehicleType: this.selectBill[0].vehicleType,
        driverName: this.selectBill[0].driverName,
        driverPhone: this.selectBill[0].driverPhone,
        incomePayable: this.selectBill[0].incomePayable,
        expendPayable: this.selectBill[0].expendPayable,
        paymentsTotal: this.selectBill[0].paymentsTotal,
        paymentsDate: this.selectBill[0].paymentsDate,
        code: this.selectBill[0].code
      };
      this.showModify = true;
    },
    handleCancelModifyUser() {
      this.showModify = false;
      this.$refs["modifyBillForm"].resetFields();
    },
    handleModifyUser() {
      this.$refs["modifyBillForm"].validate(valid => {
        if (valid) {
          this.modifyLoading = true;
          this.$axios
            .put(`/bill/${this.selectBill[0].id}`, this.BillFormData)
            .then(() => {
              this.modifyLoading = false;
              this.showModify = false;
              this.$Message.success("报存单据成功");
              this.$refs["modifyBillForm"].resetFields();
              this.handleQuery();
            })
            .catch(() => {
              this.createLoading = false;
              this.$Message.success("报存单据失败");
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
