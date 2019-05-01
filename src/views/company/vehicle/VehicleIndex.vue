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
                <FormItem prop="code">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">用户名</span>
                        <div class="select-input">
                            <Input
                                    v-model="searchVehicleForm.code"
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
                        </Button
                        >
                        <Button type="primary" style="color:#e82626" icon="md-close" ghost @click="handleQuery"
                        >重置
                        </Button
                        >
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
                    ref="createUserForm"
                    :model="vehicleFormData"
                    :rules="formRules"
                    :label-width="100"
            >
                <Row>
                    <i-Col span="12">
                        <FormItem label="车牌号" prop="code">
                            <Input v-model="vehicleFormData.code" placeholder="请输入车牌号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="保险单" prop="insuranceCard">
                            <Input v-model="vehicleFormData.insuranceCard" placeholder="请输入保险单号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.stationCode" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.stationCode" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.stationCode" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>

                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.useAge" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.type" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属单位" prop="owner">
                            <Input v-model="vehicleFormData.owner" placeholder="请选择所属单位"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车辆型号" prop="model">
                            <Input v-model="vehicleFormData.model" placeholder="请输入选择车辆型号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="发动机编号" prop="engineNo">
                            <Input v-model="vehicleFormData.engineNo" placeholder="请输入发动机编号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车架编号" prop="frameNo">
                            <Input v-model="vehicleFormData.frameNo" placeholder="请输入车架编号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车身长度" prop="length">
                            <Input v-model="vehicleFormData.length" placeholder="请输入车长"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车身宽度" prop="width">
                            <Input v-model="vehicleFormData.width" placeholder="请输入车宽"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车身高度" prop="high">
                            <Input v-model="vehicleFormData.high" placeholder="请输入车高"/>
                        </FormItem>
                    </i-Col>


                    <i-Col span="12">
                        <FormItem label="限高" prop="allowCarryHigh">
                            <Input v-model="vehicleFormData.engineNo" placeholder="请输入限高"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="准载体积" prop="allowCarryVolume">
                            <Input v-model="vehicleFormData.frameNo" placeholder="请输入准载体积"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="载重量" prop="allowCarryWeight">
                            <Input v-model="vehicleFormData.allowCarryWeight" placeholder="请输入载重量"/>
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
                width="600"
                :mask-closable="false"
        >
            <Form
                    ref="modifyUserForm"
                    :model="vehicleFormData"
                    :rules="formRules"
                    :label-width="100"
            >
                <Row>
                    <i-Col span="12">
                        <FormItem label="车牌号" prop="code">
                            <Input v-model="vehicleFormData.code" placeholder="请输入车牌号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="保险单" prop="insuranceCard">
                            <Input v-model="vehicleFormData.insuranceCard" placeholder="请输入保险单号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.stationCode" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.stationCode" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.stationCode" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>

                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.useAge" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属站点" prop="stationCode">
                            <Input v-model="vehicleFormData.type" placeholder="请选择站点信息"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="所属单位" prop="owner">
                            <Input v-model="vehicleFormData.owner" placeholder="请选择所属单位"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车辆型号" prop="model">
                            <Input v-model="vehicleFormData.model" placeholder="请输入选择车辆型号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="发动机编号" prop="engineNo">
                            <Input v-model="vehicleFormData.engineNo" placeholder="请输入发动机编号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车架编号" prop="frameNo">
                            <Input v-model="vehicleFormData.frameNo" placeholder="请输入车架编号"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车身长度" prop="length">
                            <Input v-model="vehicleFormData.length" placeholder="请输入车长"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车身宽度" prop="width">
                            <Input v-model="vehicleFormData.width" placeholder="请输入车宽"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="车身高度" prop="high">
                            <Input v-model="vehicleFormData.high" placeholder="请输入车高"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="限高" prop="allowCarryHigh">
                            <Input v-model="vehicleFormData.engineNo" placeholder="请输入限高"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="准载体积" prop="allowCarryVolume">
                            <Input v-model="vehicleFormData.frameNo" placeholder="请输入准载体积"/>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem label="载重量" prop="allowCarryWeight">
                            <Input v-model="vehicleFormData.allowCarryWeight" placeholder="请输入载重量"/>
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
                        title: "用户编号",
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
                        align: "center",
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
                    owner: "",
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
                    DetailGoodCode: "",
                },
                vehicleList: [],
                totalCount: 0,
                selectedVehicle: [],
                pageIndex: 1,
                pageSize: 10,

                vehicleFormData: {
                    code: "",
                    owner: "陆运通",
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
                    DetailGoodCode: "",
                },
                formRules: {
                    code: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    owner: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    stationCode: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    type: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    model: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    length: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    high: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    width: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    allowCarryVolume: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    allowCarryWeight: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    allowCarryHigh: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    useAge: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    frameNo: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    engineNo: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    insuranceCard: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
                    DetailGoodCode: [{required: true, message: "车牌号不能为空", trigger: "blur,change"}],
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
            handleCancelCreateUser() {
                this.showCreate = false;
                this.$refs["createUserForm"].resetFields();
            },

            handleDeleteUser() {
                let ids = this.selectedVehicle.map(item => {
                    return item.id;
                });
                console.log(ids);
                this.$axios.post("/users/deleteBatch", ids).then(() => {
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
                            .post("/users", this.vehicleFormData)
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
                this.vehicleFormData = {
                    name: this.selectedVehicle[0].name,
                    password: this.selectedVehicle[0].password,
                    gender: this.selectedVehicle[0].gender,
                    code: this.selectedVehicle[0].code,
                    phone: this.selectedVehicle[0].phone,
                    birthDay: this.selectedVehicle[0].birthDay
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
                            .put(`/users/${this.selectedVehicle[0].id}`, this.vehicleFormData)
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
