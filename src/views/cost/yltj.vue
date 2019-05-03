<template>
    <div class="table-page">
        <div class="search">
            <Form
                    class="search-form"
                    ref="searchSalaryData"
                    :model="searchSalaryData"
                    :label-width="5"
                    inline
            >
                <FormItem prop="name">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">身份类型</span>
                        <div class="select-input">
                            <Input
                                    v-model="searchSalaryData.name"
                                    type="text"
                                    placeholder="请输入用户名称"
                            />
                        </div>
                    </div>
                </FormItem>
                <FormItem prop="name">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">人员编号</span>
                        <div class="select-input">
                            <Input
                                    v-model="searchSalaryData.name"
                                    type="text"
                                    placeholder="请输入用户名称"
                            />
                        </div>
                    </div>
                </FormItem>
                <FormItem prop="name">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">日期范围</span>
                        <div class="select-input">
                            <Input
                                    v-model="searchSalaryData.name"
                                    type="text"
                                    placeholder="请选择日期范围"
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

        <div class="data-table" style="height: 90%">
            <Table
                    border
                    :columns="salaryColumns"
                    :data="salaryList"
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
            >
            </Page>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleList",
        data() {
            return {
                salaryColumns: [
                    {
                        title: "序号",
                        type: "index",
                        width: 80,
                        align: "center"
                    },
                    {
                        title: "身份分类",
                        key: "iDType",
                        align: "center",
                        sortable: true
                    },
                    {
                        title: "职员编号",
                        key: "officeCode",
                        align: "center"
                    },
                    {
                        title: "结算日期",
                        key: "balanceDate",
                        align: "center",
                        sortable: true
                    },
                    {
                        title: "工资",
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
                        title: "补贴",
                        key: "subsidy",
                        align: "center",
                        sortable: true
                    },
                    {
                        title: "合计总额",
                        key: "totalSalary",
                        align: "center",
                        sortable: true
                    }
                ],
                searchSalaryData: {
                    /*身份类型*/
                    iDType: "",
                    /*职员编号*/
                    officeCode: "",
                    /*结算日期*/
                    balanceDate:"",
                    /*工资*/
                    salary: "",
                    /*奖金*/
                    bonus: "",
                    /*补贴*/
                    subsidy: "",
                    /*合计总额*/
                    totalSalary: ""
                },
                salaryList: [],
                totalCount: 0,
                selectedSalary: [],
                pageIndex: 1,
                pageSize: 10,
                formSalaryData: {
                    /*身份类型*/
                    iDType: "",
                    /*职员编号*/
                    officeCode: "",
                    /*工资结算日期*/
                    balanceDate:"",
                    /*工资*/
                    salary: "",
                    /*奖金*/
                    bonus: "",
                    /*补贴*/
                    subsidy: "",
                    /*合计总额*/
                    totalSalary: ""
                },
                showCreate: false,
                createLoading: false,
            };
        },
        methods: {
            handleQuery() {
                this.$axios
                    .post(
                        `/users/pageQuery?page=${this.pageIndex - 1}&size=${this.pageSize}`,
                        this.searchSalaryData
                    )
                    .then(res => {
                        let result = res.data;
                        this.salaryList = result.data.content;
                        this.totalCount = result.data.totalElements;
                    })
                    .catch(() => {
                        this.salaryList = [];
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
                this.selectedSalary = selection;
                console.log(selection, row);
            },
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
