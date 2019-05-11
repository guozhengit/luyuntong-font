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
        <FormItem prop="vehicleBillCode">
          <div class="ivu-form-item select-ground">
            <span class="select-name">车辆单据编号</span>
            <div class="select-input">
              <Input
                v-model="billSearchForm.vehicleBillCode"
                type="text"
                placeholder="请输入车辆单据编号"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <!--1发车单、2回车单、3到车单-->
        <FormItem prop="type">
          <div class="ivu-form-item select-ground">
            <span class="select-name">运输单据类型</span>
            <div class="select-input">
              <Select
                v-model="billSearchForm.type"
                placeholder="请选择运输单据类型"
                clearable
              >
                <Option
                  v-for="item in billTypes"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </div>
        </FormItem>

        <FormItem prop="vehicleBillDate">
          <div class="ivu-form-item select-ground">
            <span class="select-name">开具日期</span>
            <div class="select-input">
              <Input
                v-model="billSearchForm.vehicleBillDate"
                type="date"
                placeholder="请输入业务操作日期"
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
        :columns="billColumns"
        :data="billList"
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
      title="添加运输单据"
      v-model="showCreate"
      width="70%"
      :mask-closable="false"
    >
      <Form
        ref="createBillForm"
        :model="BillFormData"
        :rules="formRules"
        :label-width="140"
      >
        <Row>
          <i-Col span="8">
            <FormItem label="运输单据号" prop="vehicleBillCode">
              <Input
                v-model="BillFormData.vehicleBillCode"
                placeholder="请输入运输单据号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="运输单据类型" prop="vehicleBillType">
              <Select v-model="BillFormData.vehicleBillType">
                <Option
                  v-for="item in billTypes"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="开具日期" prop="vehicleBillDate">
              <Input
                v-model="BillFormData.vehicleBillDate"
                placeholder="请输入开具日期"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="业务员" prop="salesMan">
              <Input
                v-model="BillFormData.salesMan"
                placeholder="请选择业务员"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="业务站点" prop="salesStation">
              <Input
                v-model="BillFormData.salesStation"
                placeholder="请输入业务站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="选择区域" prop="startRegion">
              <Input
                v-model="BillFormData.startRegion"
                placeholder="请选择区域"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="始发站点" prop="startStation">
              <Input
                v-model="BillFormData.startStation"
                placeholder="请输入始发站点"
              />
            </FormItem>
          </i-Col>

          <i-Col span="8">
            <FormItem label="目标站点" prop="targetStation">
              <Input
                v-model="BillFormData.targetStation"
                placeholder="请输入目标站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="付款类型" prop="paymentType">
              <Input
                v-model="BillFormData.paymentType"
                placeholder="请输入付款类型"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="其他费用" prop="otherCost">
              <Input
                v-model="BillFormData.otherCost"
                placeholder="请输入其他费用"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="运输费用" prop="transportCost">
              <Input
                v-model="BillFormData.transportCost"
                placeholder="请输入运输费用"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="已付金额" prop="realityPayable">
              <Input
                v-model="BillFormData.realityPayable"
                placeholder="请输入实付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="未付金额" prop="unReceivedPayable">
              <Input
                v-model="BillFormData.unReceivedPayable"
                placeholder="请输入未付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="折让金额" prop="allowancePayable">
              <Input
                v-model="BillFormData.allowancePayable"
                placeholder="请输入折让金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="车牌号" prop="vehicleCode">
              <Input
                v-model="BillFormData.vehicleCode"
                placeholder="请输入车牌号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="车辆类型" prop="vehicleType">
              <Input
                v-model="BillFormData.vehicleType"
                placeholder="请输入车辆类型"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="司机姓名" prop="driverName">
              <Input
                v-model="BillFormData.driverName"
                placeholder="请输入司机姓名"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="司机电话" prop="driverPhone">
              <Input
                v-model="BillFormData.driverPhone"
                placeholder="请输入司机电话"
              />
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelCreateBill"
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
      title="修改运输单据"
      v-model="showModify"
      width="70%"
      :mask-closable="false"
    >
      <Form ref="ModifyBillForm" :model="BillFormData" :label-width="140">
        <Row>
          <i-Col span="8">
            <FormItem label="托运单号" prop="code">
              <Input v-model="BillFormData.code" placeholder="请选择托运单号" />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="业务员" prop="salesMan">
              <Input
                v-model="BillFormData.salesMan"
                placeholder="请选择业务员"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="车辆单据号" prop="vehicleBillCode">
              <Input
                v-model="BillFormData.vehicleBillCode"
                placeholder="请输入车辆单据号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="运输单据类型" prop="vehicleBillType">
              <Input
                v-model="BillFormData.vehicleBillType"
                placeholder="运输单据类型"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="单据类型" prop="type">
              <Input v-model="BillFormData.type" placeholder="请输入单据类型" />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="开具日期" prop="vehicleBillDate">
              <DatePicker
                v-model="BillFormData.vehicleBillDate"
                type="date"
                placeholder="请输入开具日期"
                style="width: 200px"
              >
              </DatePicker>
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="服务站点" prop="salesStation">
              <Input
                v-model="BillFormData.salesStation"
                placeholder="请输入服务站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="所属区域" prop="startRegion">
              <Input
                v-model="BillFormData.startRegion"
                placeholder="请选择所属区域"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="始发站点" prop="startStation">
              <Input
                v-model="BillFormData.startStation"
                placeholder="请输入始发站点"
              />
            </FormItem>
          </i-Col>

          <i-Col span="8">
            <FormItem label="目标站点" prop="targetStation">
              <Input
                v-model="BillFormData.targetStation"
                placeholder="请输入目标站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="付款类型" prop="paymentType">
              <Input
                v-model="BillFormData.paymentType"
                placeholder="请输入付款类型"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="其他费用" prop="otherCost">
              <Input
                v-model="BillFormData.otherCost"
                placeholder="请输入其他费用"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="运输费用" prop="transportCost">
              <Input
                v-model="BillFormData.transportCost"
                placeholder="请输入运输费用"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="已付金额" prop="realityPayable">
              <Input
                v-model="BillFormData.realityPayable"
                placeholder="请输入实付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="未付金额" prop="unReceivedPayable">
              <Input
                v-model="BillFormData.unReceivedPayable"
                placeholder="请输入未付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="折让金额" prop="allowancePayable">
              <Input
                v-model="BillFormData.allowancePayable"
                placeholder="请输入折让金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="车牌号" prop="vehicleCode">
              <Input
                v-model="BillFormData.vehicleCode"
                placeholder="请输入车牌号"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="车辆类型" prop="vehicleType">
              <Input
                v-model="BillFormData.vehicleType"
                placeholder="请输入车辆类型"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="司机姓名" prop="driverName">
              <Input
                v-model="BillFormData.driverName"
                placeholder="请输入司机姓名"
              />
            </FormItem>
          </i-Col>
          <i-Col span="8">
            <FormItem label="司机电话" prop="driverPhone">
              <Input
                v-model="BillFormData.driverPhone"
                placeholder="请输入司机电话"
              />
            </FormItem>
          </i-Col>
        </Row>
      </Form>
      <div class="create-drawer-footer">
        <Button style="margin-right: 8px" @click="handleCancelModifyBill"
          >取消
        </Button>
        <Button
          type="primary"
          @click="handleModifyBill"
          :loading="modifyLoading"
          >保存
        </Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "carBill",
  data: function() {
    return {
      billTypes: [
        {
          value: "1",
          label: "发车单据"
        },
        {
          value: "2",
          label: "到车单据"
        },
        {
          value: "3",
          label: "回车单据"
        }
      ],
      billColumns: [
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
          title: "托运单据号",
          width: 200,
          key: "code",
          align: "center"
        },
        {
          title: "车辆单据号",
          width: 200,
          key: "vehicleBillCode",
          align: "center"
        },
        {
          title: "业务员",
          key: "conSignMan",
          width: 200,
          align: "center"
        },
        {
          title: "运输单据类型",
          key: "type",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.type === "1"
                ? "primary"
                : row.type === "2"
                ? "warning"
                :row.type === "3"
                ?"success":"error";
            const text =
              row.type === "1"
                ? "发车单据"
                : row.type === "2"
                ? "到处单据"
                :row.type === "3"?"回车单据":"其他单据";

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
          align: "center",
          sortable: true
        },
        {
          title: "开具日期",
          key: "vehicleBillDate",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "始发站点",
          key: "startStation",
          width: 200,
          align: "center"
        },
        {
          title: "目标站点",
          key: "targetStation",
          width: 200,
          align: "center"
        },

        {
          title: "付款类型",
          key: "paymentType",
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
          title: "其他费用",
          key: "otherCost",
          width: 200,
          align: "center"
        },
        {
          title: "运输费用",
          key: "transportCost",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "已付金额",
          key: "realityPayable",
          width: 200,
          align: "center"
        },
        {
          title: "未付金额",
          key: "unReceivedPayable",
          width: 200,
          align: "center"
        },
        {
          title: "折让金额",
          key: "allowancePayable",
          width: 200,
          align: "center"
        },
        {
          title: "车牌号",
          key: "vehicleCode",
          width: 200,
          align: "center"
        },
        {
          title: "车辆类型",
          key: "vehicleType",
            render: (h, params) => {
                const row = params.row;
                const color =
                    row.vehicleType === "1"
                        ? "primary"
                        : row.vehicleType === "2"
                        ? "warning"
                        :row.vehicleType === "3"
                            ?"success":"error";
                const text =
                    row.vehicleType === "1"
                        ? "B1"
                        : row.vehicleType === "2"
                        ? "B2"
                        :row.vehicleType === "3"?"A1":"A2";

                return h(
                    "Tag",
                    {
                        props: {
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
          title: "司机姓名",
          key: "driverName",
          width: 200,
          align: "center"
        },
        {
          title: "司机电话",
          key: "driverPhone",
          width: 200,
          align: "center"
        }
      ],
      billSearchForm: {
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
        /*司机电话*/
        driverPhone: "",
        /*收入金额*/
        incomePayable: "",
        /*支出金额*/
        expendPayable: "",
        /*收支合计*/
        paymentsTotal: "",
        /*收支日期*/
        paymentsDate: ""
      },
      billList: [],
      totalCount: 0,
      selectBill: [],
      pageIndex: 1,
      pageSize: 10,
      BillFormData: {
        /*托运单据编号*/
        code: "",
        /*单据类型*/
        type: "",
        /*业务员*/
        salesMan: "",
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
        /*物流费用*/
        logisticsCost: "",
        /*其他费用*/
        otherCost: "",
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
        /*司机电话*/
        driverPhone: "",
        /*收入金额*/
        incomePayable: "",
        /*支出金额*/
        expendPayable: "",
        /*收支合计*/
        paymentsTotal: "",
        /*收支日期*/
        paymentsDate: "",
        /*车辆单据编号*/
        vehicleBillCode: "",
        /*车辆单据类型*/
        vehicleBillType: "",
        /*车辆单据开具日期*/
        vehicleBillDate: "",
        /*结算单据编号*/
        accountBillCode: "",
        /*结算单据类型*/
        accountBillType: "",
        /*结算单据开具日期*/
        accountBillDate: "",
        /*收支单据编号*/
        paymentCode: "",
        /**/
        targetPostCode: "",
        /**/
        customerCode: "",
        /**/
        detailGoodsCustomerCode: "",
        /**/
        detailPaymentCustomerCode: ""
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
        /*服务站点*/
        salesStation: [
          {
            required: true,
            message: "服务站点不能为空",
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

        /*其他费用*/
        otherCost: [
          {
            required: true,
            message: "其他费用不能为空",
            trigger: "blur,change"
          }
        ],
        /*物流费用*/
        logisticsCost: [
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
          this.billList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.billList = [];
          this.totalCount = 0;
        });
    },
    handlePageChange(billIndex) {
      this.pageIndex = billIndex;
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

    handleCancelCreateBill() {
      this.showCreate = false;
      this.$refs["createBillForm"].resetFields();
    },
    handleCreateBill() {
      this.$refs["createBillForm"].validate(valid => {
        if (valid) {
          this.createLoading = true;
          this.$axios
            .post("/bill", this.BillFormData)
            .then(() => {
              this.createLoading = false;
              this.showCreate = false;
              this.$Message.success("报存单据成功");
              this.$refs["createBillForm"].resetFields();
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
        type: "",
        code: this.selectBill[0].code,
        vehicleBillCode: this.selectBill[0].vehicleBillCode,
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
        paymentsDate: this.selectBill[0].paymentsDate
      };
      this.showModify = true;
    },
    handleCancelModifyBill() {
      this.showModify = false;
      this.$refs["ModifyBillForm"].resetFields();
    },
    handleModifyBill() {
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
