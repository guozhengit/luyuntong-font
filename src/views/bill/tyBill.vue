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
        <FormItem prop="code">
          <div class="ivu-form-item select-ground">
            <span class="select-name">托运单编号</span>
            <div class="select-input">
              <Input
                v-model="billSearchForm.code"
                type="text"
                placeholder="请输入托运单编号"
                clearable
              />
            </div>
          </div>
        </FormItem>
        <!--托运时间-->
        <FormItem prop="startDate">
          <div class="ivu-form-item select-ground">
            <span class="select-name">托运时间</span>
            <div class="select-input">
              <Input
                v-model="billSearchForm.startDate"
                type="DATE"
                placeholder="请输入托运时间"
                clearable
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
                clearable
              />
            </div>
          </div>
        </FormItem>

        <FormItem prop="conSignMan">
          <div class="ivu-form-item select-ground">
            <span class="select-name">托运人</span>
            <div class="select-input">
              <Input
                v-model="billSearchForm.conSignMan"
                type="text"
                placeholder="请输入托运人"
                clearable
              />
            </div>
          </div>
        </FormItem>

        <FormItem prop="paymentType">
          <div class="ivu-form-item select-ground">
            <span class="select-name">付款方式</span>
            <div class="select-input">
              <Select
                v-model="billSearchForm.paymentType"
                placeholder="请选择付款方式"
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
        <FormItem prop="transportationType">
          <div class="ivu-form-item select-ground">
            <span class="select-name">运输方式</span>
            <div class="select-input">
              <Select
                v-model="billSearchForm.transportationType"
                placeholder="请选择运输方式"
                clearable
              >
                <Option
                  v-for="item in transportationTypes"
                  :value="item.value"
                  :key="item.value"
                  :name="transportationType"
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
    <div class="data-table" style="height: 65%">
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
      title="添加单据信息"
      v-model="showCreate"
      width="88%"
      :mask-closable="false"
    >
      <Form ref="" :model="BillFormData" :rules="formRules" :label-width="120">
        <Row>
          <i-Col span="6">
            <FormItem label="单据编号" prop="code">
              <Input v-model="BillFormData.code" placeholder="请输入单据编号" />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="业务员" prop="salesMan">
              <Input
                v-model="BillFormData.salesMan"
                placeholder="请选择业务员"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="服务站点" prop="salesStation">
              <Input
                v-model="BillFormData.salesStation"
                placeholder="请输入服务站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="顾客姓名" prop="customerName">
              <Input
                v-model="BillFormData.customerName"
                placeholder="请输入顾客姓名"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="托运人" prop="conSignMan">
              <Input
                v-model="BillFormData.conSignMan"
                placeholder="请输入托运人"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="托运人电话" prop="conSignPhone">
              <Input
                v-model="BillFormData.conSignPhone"
                placeholder="请输入托运人电话"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发地址" prop="startAddress">
              <Input
                v-model="BillFormData.startAddress"
                placeholder="请输入始发地址"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发所在区域" prop="startRegion">
              <Input
                v-model="BillFormData.startRegion"
                placeholder="请输入始发所在区域"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发邮编" prop="startPostCode">
              <Input
                v-model="BillFormData.startPostCode"
                placeholder="请输入始发邮编"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发日期" prop="startDate">
              <Input
                v-model="BillFormData.startDate"
                placeholder="请输入始发日期"
                type="date"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发站点" prop="startStation">
              <Input
                v-model="BillFormData.startStation"
                placeholder="请输入始发站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="接货人" prop="receiveMan">
              <Input
                v-model="BillFormData.receiveMan"
                placeholder="请输入接货人"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="接货人电话" prop="receivePhone">
              <Input
                v-model="BillFormData.receivePhone"
                placeholder="请输入接货人电话"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="接货人地址" prop="receiveAddress">
              <Input
                v-model="BillFormData.receiveAddress"
                placeholder="请输入接货人地址"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="接货日期" prop="receiveDate">
              <Input
                v-model="BillFormData.receiveDate"
                placeholder="请输入接货日期"
                type="date"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="目标站点" prop="targetStation">
              <Input
                v-model="BillFormData.targetStation"
                placeholder="请输入目标站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="目标区域" prop="targetRegion">
              <Input
                v-model="BillFormData.targetRegion"
                placeholder="请输入目标区域"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="运输方式" prop="transportationType">
              <Select
                v-model="billSearchForm.transportationType"
                placeholder="请选择运输方式"
                clearable
              >
                <Option
                  v-for="item in transportationTypes"
                  :value="item.value"
                  :key="item.value"
                  :name="transportationType"
                  >{{ item.label }}
                </Option>
              </Select>
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="物流费用" prop="name">
              <Input v-model="BillFormData.name" placeholder="请输入物流费用" />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="运输费用" prop="transportCost">
              <Input
                v-model="BillFormData.transportCost"
                placeholder="请输入运输费用"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="其他费用" prop="otherCost">
              <Input
                v-model="BillFormData.otherCost"
                placeholder="请输入其他费用"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="付款类型" prop="paymentType">
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
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="应付金额" prop="accountPayable">
              <Input
                v-model="BillFormData.accountPayable"
                placeholder="请输入应付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="实付金额" prop="realityPayable">
              <Input
                v-model="BillFormData.realityPayable"
                placeholder="请输入实付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="未付金额" prop="unReceivedPayable">
              <Input
                v-model="BillFormData.unReceivedPayable"
                placeholder="请输入未付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="折让金额" prop="allowancePayable">
              <Input
                v-model="BillFormData.allowancePayable"
                placeholder="请输入折让金额"
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
      title="修改单据信息"
      v-model="showModify"
      width="88%"
      :rules="formRules"
      :mask-closable="false"
    >
      <Form ref="" :model="BillFormData"  :label-width="120">
        <Row>
          <i-Col span="6">
            <FormItem label="单据编号" prop="code">
              <Input v-model="BillFormData.code" placeholder="请输入单据编号" />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="业务员" prop="salesMan">
              <Input
                      v-model="BillFormData.salesMan"
                      placeholder="请选择业务员"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="服务站点" prop="salesStation">
              <Input
                      v-model="BillFormData.salesStation"
                      placeholder="请输入服务站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="顾客姓名" prop="customerName">
              <Input
                      v-model="BillFormData.customerName"
                      placeholder="请输入顾客姓名"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="托运人" prop="conSignMan">
              <Input
                      v-model="BillFormData.conSignMan"
                      placeholder="请输入托运人"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="托运人电话" prop="conSignPhone">
              <Input
                      v-model="BillFormData.conSignPhone"
                      placeholder="请输入托运人电话"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发地址" prop="startAddress">
              <Input
                      v-model="BillFormData.startAddress"
                      placeholder="请输入始发地址"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发所在区域" prop="startRegion">
              <Input
                      v-model="BillFormData.startRegion"
                      placeholder="请输入始发所在区域"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发邮编" prop="startPostCode">
              <Input
                      v-model="BillFormData.startPostCode"
                      placeholder="请输入始发邮编"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发日期" prop="startDate">
              <Input
                      v-model="BillFormData.startDate"
                      placeholder="请输入始发日期"
                      type="date"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="始发站点" prop="startStation">
              <Input
                      v-model="BillFormData.startStation"
                      placeholder="请输入始发站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="接货人" prop="receiveMan">
              <Input
                      v-model="BillFormData.receiveMan"
                      placeholder="请输入接货人"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="接货人电话" prop="receivePhone">
              <Input
                      v-model="BillFormData.receivePhone"
                      placeholder="请输入接货人电话"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="接货人地址" prop="receiveAddress">
              <Input
                      v-model="BillFormData.receiveAddress"
                      placeholder="请输入接货人地址"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="接货日期" prop="receiveDate">
              <Input
                      v-model="BillFormData.receiveDate"
                      placeholder="请输入接货日期"
                      type="date"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="目标站点" prop="targetStation">
              <Input
                      v-model="BillFormData.targetStation"
                      placeholder="请输入目标站点"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="目标区域" prop="targetRegion">
              <Input
                      v-model="BillFormData.targetRegion"
                      placeholder="请输入目标区域"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="运输方式" prop="transportationType">
              <Select
                      v-model="billSearchForm.transportationType"
                      placeholder="请选择运输方式"
                      clearable
              >
                <Option
                        v-for="item in transportationTypes"
                        :value="item.value"
                        :key="item.value"
                        :name="transportationType"
                >{{ item.label }}
                </Option>
              </Select>
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="物流费用" prop="name">
              <Input v-model="BillFormData.name" placeholder="请输入物流费用" />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="运输费用" prop="transportCost">
              <Input
                      v-model="BillFormData.transportCost"
                      placeholder="请输入运输费用"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="其他费用" prop="otherCost">
              <Input
                      v-model="BillFormData.otherCost"
                      placeholder="请输入其他费用"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="付款类型" prop="paymentType">
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
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="应付金额" prop="accountPayable">
              <Input
                      v-model="BillFormData.accountPayable"
                      placeholder="请输入应付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="实付金额" prop="realityPayable">
              <Input
                      v-model="BillFormData.realityPayable"
                      placeholder="请输入实付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="未付金额" prop="unReceivedPayable">
              <Input
                      v-model="BillFormData.unReceivedPayable"
                      placeholder="请输入未付金额"
              />
            </FormItem>
          </i-Col>
          <i-Col span="6">
            <FormItem label="折让金额" prop="allowancePayable">
              <Input
                      v-model="BillFormData.allowancePayable"
                      placeholder="请输入折让金额"
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
  name: "ArticleList",
  data: function() {
    return {
      paymentTypes: [
        {
          value: "支护宝",
          label: "支护宝"
        },
        {
          value: "微信",
          label: "微信"
        },
        {
          value: "银行卡",
          label: "银行卡"
        },
        {
          value: "现金",
          label: "现金"
        }
      ],
      transportationTypes: [
        {
          value: "卡车陆运",
          label: "卡车陆运"
        },
        {
          value: "货车陆运",
          label: "货车陆运"
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
          title: "托运单编号",
          width: 200,
          key: "code",
          align: "center"
        },
        {
          title: "服务站点",
          key: "salesStation",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "顾客姓名",
          key: "customerName",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "托运人",
          key: "conSignMan",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "托运电话",
          key: "conSignPhone",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "始发地址",
          key: "startAddress",
          width: 200,
          align: "center"
        },
        {
          title: "始发区域",
          key: "startRegion",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "始发邮编",
          key: "startPostCode",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "始发日期",
          key: "startDate",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "始发站点",
          key: "startStation",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "接货人",
          key: "receiveMan",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "接货人电话",
          key: "receivePhone",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "接货人地址",
          key: "receiveAddress",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "接货日期",
          key: "receiveDate",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "目标站点",
          key: "targetStation",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "目标区域",
          key: "targetRegion",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "运输方式",
          key: "transportationType",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "支付类型",
          key: "gatherType",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "其他费用",
          key: "otherCost",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "运输费用",
          key: "transportCost",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "应付金额",
          key: "accountPayable",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "已收金额",
          key: "realityPayable",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "未付金额",
          key: "unReceivedPayable",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "折让金额",
          key: "allowancePayable",
          width: 200,
          align: "center",
          sortable: true
        }
      ],
      billSearchForm: {
        /*单据编号*/
        code: "",
        /*托运日期*/
        startDate: "",
        /*业务员*/
        salesMan: "",
        /*托运人*/
        conSignMan: "",
        /*运输方式*/
        transportationType: "",
        /*付款类型*/
        paymentType: ""
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
        type: "1",
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
        paymentsDate: "",
        /*车辆单据编号*/
        vehicleBillCode: "",
        /*车辆单据类型*/
        vehicelBillType: "",
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
    handleCancelCreateBill() {
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
              this.$Message.error("报存单据失败");
            });
        }
      });
    },
    /*此处为更新操作 获取到查询的实体数据*/
    showModifyDrawer() {
      this.BillFormData = {
        id:this.selectBill[0].id,
        type: this.selectBill[0].type,
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
    handleCancelModifyBill() {
      this.showModify = false;
      this.$refs["modifyBillForm"].resetFields();
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
              this.$Message.error("报存单据失败");
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
