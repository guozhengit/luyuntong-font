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
                        <span class="select-name">单据编号</span>
                        <div class="select-input">
                            <Input
                                    v-model="billSearchForm.code"
                                    type="text"
                                    placeholder="请输入单据编号"
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

                <FormItem prop="customerName">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">客户名称</span>
                        <div class="select-input">
                            <Input
                                    v-model="billSearchForm.customerName"
                                    type="text"
                                    placeholder="请输入客户名称"
                            />
                        </div>
                    </div>
                </FormItem>

                <FormItem prop="startDate">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">托运日期</span>
                        <div class="select-input">
                            <Input
                                    v-model="billSearchForm.startDate"
                                    type="text"
                                    placeholder="请输入托运日期"
                            />
                        </div>
                    </div>
                </FormItem>

                <FormItem prop="receiveMan">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">接收人</span>
                        <div class="select-input">
                            <Input
                                    v-model="billSearchForm.receiveMan"
                                    type="text"
                                    placeholder="请输入接收人信息"
                            />
                        </div>
                    </div>
                </FormItem>

                <FormItem prop="receiveDate">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">接收时间</span>
                        <div class="select-input">
                            <Input
                                    v-model="billSearchForm.receiveDate"
                                    type="text"
                                    placeholder="请输入接收时间"
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
                            />
                        </div>
                    </div>
                </FormItem>

                <FormItem prop="startDate">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">托运时间</span>
                        <div class="select-input">
                            <Input
                                    v-model="billSearchForm.startDate"
                                    type="text"
                                    placeholder="请输入托运时间"
                            />
                        </div>
                    </div>
                </FormItem>
                <FormItem prop="gender">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">支付方式</span>
                        <div class="select-input">
                            <Select
                                    v-model="billSearchForm.paymentType"
                                    placeholder="请选择支付方式"
                            >
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
                <FormItem prop="gatherType">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">运输方式</span>
                        <div class="select-input">
                            <Select
                                    v-model="billSearchForm.gatherType"
                                    placeholder="请选择运输方式"
                            >
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
                <FormItem prop="arriveVehicleStatus">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">发车状态</span>
                        <div class="select-input">
                            <Select
                                    v-model="billSearchForm.arriveVehicleStatus"
                                    placeholder="请选择车辆状态"
                            >
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
        <div class="data-table" style="overflow: scroll">
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
                title="添加单据信息"
                v-model="showCreate"
                width="88%"
                :mask-closable="false"
        >
            <Form ref="" :model="BillFormData" :rules="formRules" :label-width="100">
                <Row>
                    <i-Col span="6">
                        <FormItem label="单据编号" prop="name">
                            <Input v-model="BillFormData.name" placeholder="请输入单据编号" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="单据类型" prop="type">
                            <Input v-model="BillFormData.type" placeholder="请输入单据类型" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="服务站点" prop="salesStation">
                            <Input v-model="BillFormData.salesStation" placeholder="请输入单据编号" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="顾客姓名" prop="customerName">
                            <Input v-model="BillFormData.customerName" placeholder="请输入顾客姓名" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="托运人" prop="conSignMan">
                            <Input v-model="BillFormData.conSignMan" placeholder="请输入托运人" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="托运人电话" prop="conSignPhone">
                            <Input v-model="BillFormData.conSignPhone" placeholder="请输入托运人电话" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发地址" prop="startAddress">
                            <Input v-model="BillFormData.startAddress" placeholder="请输入始发地址" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发所在区域" prop="startRegion">
                            <Input v-model="BillFormData.startRegion" placeholder="请输入始发所在区域" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发邮编" prop="startPostCode">
                            <Input v-model="BillFormData.startPostCode" placeholder="请输入始发邮编" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发日期" prop="startDate">
                            <Input v-model="BillFormData.startDate" placeholder="请输入始发日期" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发站点" prop="startStation">
                            <Input v-model="BillFormData.startStation" placeholder="请输入始发站点" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="接货人" prop="transportationType">
                            <Input v-model="BillFormData.transportationType" placeholder="请输入接货人" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="接货人电话" prop="receivePhone">
                            <Input v-model="BillFormData.receivePhone" placeholder="请输入接货人电话" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="接货人地址" prop="receiveAddress">
                            <Input v-model="BillFormData.receiveAddress" placeholder="请输入接货人地址" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="接货日期" prop="receiveDate">
                            <Input v-model="BillFormData.receiveDate" placeholder="请输入接货日期" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="目标站点" prop="targetStation">
                            <Input v-model="BillFormData.targetStation" placeholder="请输入目标站点" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="目标区域" prop="targetRegion">
                            <Input v-model="BillFormData.targetRegion" placeholder="请输入目标区域" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="单据编号" prop="serviceType">
                            <Input v-model="BillFormData.serviceType" placeholder="请输入单据编号" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="运输方式" prop="transportationType">
                            <Input v-model="BillFormData.transportationType" placeholder="请输入运输方式" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="其他费用" prop="otherCost">
                            <Input v-model="BillFormData.otherCost" placeholder="请输入其他费用" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="物流费用" prop="name">
                            <Input v-model="BillFormData.name" placeholder="请输入物流费用" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="运输费用" prop="transportCost">
                            <Input v-model="BillFormData.transportCost" placeholder="请输入运输费用" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="付款类型" prop="paymentType">
                            <Input v-model="BillFormData.paymentType" placeholder="请输入付款类型" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="应付金额" prop="accountPayable">
                            <Input v-model="BillFormData.accountPayable" placeholder="请输入应付金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="实付金额" prop="realityPayable">
                            <Input v-model="BillFormData.realityPayable" placeholder="请输入实付金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="未付金额" prop="unReceivedPayable">
                            <Input v-model="BillFormData.unReceivedPayable" placeholder="请输入未付金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="折让金额" prop="allowancePayable">
                            <Input v-model="BillFormData.allowancePayable" placeholder="请输入折让金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="发车状态" prop="arriveVehicleStatus">
                            <Input v-model="BillFormData.arriveVehicleStatus" placeholder="请输入发车状态" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="车到站状态" prop="departVehicleStatus">
                            <Input v-model="BillFormData.departVehicleStatus" placeholder="请输入车到站状态" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="车牌号" prop="vehicleCode">
                            <Input v-model="BillFormData.vehicleCode" placeholder="请输入车牌号" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="车辆类型" prop="vehicleType">
                            <Input v-model="BillFormData.vehicleType" placeholder="请输入车辆类型" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="司机姓名" prop="driverName">
                            <Input v-model="BillFormData.driverName" placeholder="请输入司机姓名" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="司机电话" prop="driverPhone">
                            <Input v-model="BillFormData.driverPhone" placeholder="请输入司机电话" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="收入金额" prop="incomePayable">
                            <Input v-model="BillFormData.incomePayable" placeholder="请输入收入金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="支出金额" prop="expendPayable">
                            <Input v-model="BillFormData.expendPayable" placeholder="请输入支出金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="收支合计" prop="paymentsTotal">
                            <Input v-model="BillFormData.paymentsTotal" placeholder="请输入收支合计" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="收支日期" prop="paymentsDate">
                            <Input v-model="BillFormData.paymentsDate" placeholder="请选择收支日期" />
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
                title="修改单据信息"
                v-model="showModify"
                width="360"
                :mask-closable="false"
        >
            <Form
                    ref="modifyBillForm"
                    :model="BillFormData"
                    :rules="formRules"
                    :label-width="80"
            >
                <Row>
                    <i-Col span="6">
                        <FormItem label="单据编号" prop="name">
                            <Input v-model="BillFormData.name" placeholder="请输入单据编号" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="单据类型" prop="type">
                            <Input v-model="BillFormData.type" placeholder="请输入单据类型" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="服务站点" prop="salesStation">
                            <Input v-model="BillFormData.salesStation" placeholder="请输入单据编号" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="顾客姓名" prop="customerName">
                            <Input v-model="BillFormData.customerName" placeholder="请输入顾客姓名" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="托运人" prop="conSignMan">
                            <Input v-model="BillFormData.conSignMan" placeholder="请输入托运人" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="托运人电话" prop="conSignPhone">
                            <Input v-model="BillFormData.conSignPhone" placeholder="请输入托运人电话" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发地址" prop="startAddress">
                            <Input v-model="BillFormData.startAddress" placeholder="请输入始发地址" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发所在区域" prop="startRegion">
                            <Input v-model="BillFormData.startRegion" placeholder="请输入始发所在区域" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发邮编" prop="startPostCode">
                            <Input v-model="BillFormData.startPostCode" placeholder="请输入始发邮编" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发日期" prop="startDate">
                            <Input v-model="BillFormData.startDate" placeholder="请输入始发日期" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="始发站点" prop="startStation">
                            <Input v-model="BillFormData.startStation" placeholder="请输入始发站点" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="接货人" prop="transportationType">
                            <Input v-model="BillFormData.transportationType" placeholder="请输入接货人" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="接货人电话" prop="receivePhone">
                            <Input v-model="BillFormData.receivePhone" placeholder="请输入接货人电话" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="接货人地址" prop="receiveAddress">
                            <Input v-model="BillFormData.receiveAddress" placeholder="请输入接货人地址" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="接货日期" prop="receiveDate">
                            <Input v-model="BillFormData.receiveDate" placeholder="请输入接货日期" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="目标站点" prop="targetStation">
                            <Input v-model="BillFormData.targetStation" placeholder="请输入目标站点" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="目标区域" prop="targetRegion">
                            <Input v-model="BillFormData.targetRegion" placeholder="请输入目标区域" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="单据编号" prop="serviceType">
                            <Input v-model="BillFormData.serviceType" placeholder="请输入单据编号" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="运输方式" prop="transportationType">
                            <Input v-model="BillFormData.transportationType" placeholder="请输入运输方式" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="其他费用" prop="otherCost">
                            <Input v-model="BillFormData.otherCost" placeholder="请输入其他费用" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="物流费用" prop="name">
                            <Input v-model="BillFormData.name" placeholder="请输入物流费用" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="运输费用" prop="transportCost">
                            <Input v-model="BillFormData.transportCost" placeholder="请输入运输费用" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="付款类型" prop="paymentType">
                            <Input v-model="BillFormData.paymentType" placeholder="请输入付款类型" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="应付金额" prop="accountPayable">
                            <Input v-model="BillFormData.accountPayable" placeholder="请输入应付金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="实付金额" prop="realityPayable">
                            <Input v-model="BillFormData.realityPayable" placeholder="请输入实付金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="未付金额" prop="unReceivedPayable">
                            <Input v-model="BillFormData.unReceivedPayable" placeholder="请输入未付金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="折让金额" prop="allowancePayable">
                            <Input v-model="BillFormData.allowancePayable" placeholder="请输入折让金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="发车状态" prop="arriveVehicleStatus">
                            <Input v-model="BillFormData.arriveVehicleStatus" placeholder="请输入发车状态" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="车到站状态" prop="departVehicleStatus">
                            <Input v-model="BillFormData.departVehicleStatus" placeholder="请输入车到站状态" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="车牌号" prop="vehicleCode">
                            <Input v-model="BillFormData.vehicleCode" placeholder="请输入车牌号" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="车辆类型" prop="vehicleType">
                            <Input v-model="BillFormData.vehicleType" placeholder="请输入车辆类型" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="司机姓名" prop="driverName">
                            <Input v-model="BillFormData.driverName" placeholder="请输入司机姓名" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="司机电话" prop="driverPhone">
                            <Input v-model="BillFormData.driverPhone" placeholder="请输入司机电话" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="收入金额" prop="incomePayable">
                            <Input v-model="BillFormData.incomePayable" placeholder="请输入收入金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="支出金额" prop="expendPayable">
                            <Input v-model="BillFormData.expendPayable" placeholder="请输入支出金额" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="收支合计" prop="paymentsTotal">
                            <Input v-model="BillFormData.paymentsTotal" placeholder="请输入收支合计" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="收支日期" prop="paymentsDate">
                            <Input v-model="BillFormData.paymentsDate" placeholder="请选择收支日期" />
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem label="性别" prop="gender">
                            <RadioGroup v-model="BillFormData.gender">
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
        data: function() {
            return {
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
                        title: "单据编号",
                        width: 200,
                        type: "code",
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
                        title: "支付类型",
                        key: "gatherType",
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
                        title: "接收人",
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
                        title: "服务类型",
                        key: "serviceType",
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
                        title: "其他费用",
                        key: "otherCost",
                        width: 200,
                        align: "center",
                        sortable: true
                    },
                    {
                        title: "物流费用",
                        key: "logisCost",
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
                        title: "付款类型",
                        key: "paymentType",
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
                        title: "实付金额",
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
                    },
                    {
                        title: "发车状态",
                        key: "arriveVehicleStatus",
                        width: 200,
                        align: "center",
                        sortable: true
                    },
                    {
                        title: "车到站状态",
                        key: "departVehicleStatus",
                        width: 200,
                        align: "center",
                        sortable: true
                    },
                    {
                        title: "车牌号",
                        key: "vehicleCode",
                        width: 200,
                        align: "center",
                        sortable: true
                    },
                    {
                        title: "车辆类型",
                        key: "vehicleType",
                        width: 200,
                        align: "center",
                        sortable: true
                    },
                    {
                        title: "司机姓名",
                        key: "driverName",
                        width: 200,
                        align: "center",
                        sortable: true
                    },
                    {
                        title: "司机电话",
                        key: "driverPhone",
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
                    },
                    {
                        title: "收支日期",
                        key: "paymentsDate",
                        width: 200,
                        align: "center",
                        sortable: true,
                        fixed: "right"
                    }
                ],
                billSearchForm: {
                    /*单据编号*/
                    code: "",
                    /*单据类型*/
                    type:
                        "1:托运单；2:发车单；3：到车单；4回车单；5收支费用单；6客户结算单；7司机结算单",
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
                tyBillList: [],
                totalCount: 0,
                selectBill: [],
                pageIndex: 1,
                pageSize: 10,

                BillFormData: {
                    /*单据编号*/
                    code: "",
                    /*单据类型*/
                    type:
                        "1:托运单；2:发车单；3：到车单；4回车单；5收支费用单；6客户结算单；7司机结算单",
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
                        `/users/pageQuery?page=${this.pageIndex - 1}&size=${this.pageSize}`,
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
            handleCreateBill() {
                this.$refs[""].validate(valid => {
                    if (valid) {
                        this.createLoading = true;
                        this.$axios
                            .post("/users", this.BillFormData)
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
                    name: this.selectBill[0].name,
                    password: this.selectBill[0].password,
                    gender: this.selectBill[0].gender,
                    code: this.selectBill[0].code,
                    phone: this.selectBill[0].phone,
                    birthDay: this.selectBill[0].birthDay
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
                            .put(`/users/${this.selectBill[0].id}`, this.BillFormData)
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
