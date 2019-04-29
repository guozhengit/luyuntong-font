<template>
    <div class="table-page" style="overflow-y: hidden">
        <div class="search">
            <Form
                    class="search-form"
                    ref="searchForm"
                    :model="searchForm"
                    :label-width="5"
                    inline
            >
                <FormItem prop="optioner">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">业务员</span>
                        <div class="select-input">
                            <Select
                                    v-model="tableData1.optioner"
                                    placeholder="请选择业务员">
                                <Option v-for="item in optioners" :value="item.value" :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                        </div>
                    </div>
                </FormItem>
                <FormItem prop="billCode">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">托运单号</span>
                        <div class="select-input">
                            <Input
                                    v-model="tableData1.billCode"
                                    type="text"
                                    placeholder="请输入单据号"
                            />
                        </div>
                    </div>
                </FormItem>

                <FormItem prop="consginDate">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">托运时间</span>
                        <div class="select-input">
                            <DatePicker
                                    v-model="tableData1.consginDate"
                                    type="daterange"
                                    placement="bottom-start"
                                    placeholder="请选择托运时间"
                            >
                            </DatePicker>
                        </div>
                    </div>
                </FormItem>
                <FormItem prop="payType">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">付款方式</span>
                        <div class="select-input">
                            <Select
                                    v-model="tableData1.payType"
                                    placeholder="请选择车辆状态">
                                <Option v-for="item in payTypes" :value="item.value" :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                        </div>
                    </div>
                </FormItem>
                <FormItem prop="billType">
                    <div class="ivu-form-item select-ground">
                        <span class="select-name">单据类型</span>
                        <div class="select-input">
                            <Select
                                    v-model="tableData1.billType"
                                    placeholder="请选择单据类型">
                                <Option v-for="item in payTypes" :value="item.value" :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                        </div>
                    </div>
                </FormItem>
                <FormItem>
                    <ButtonGroup class="button-flot" style="right:-200%">
                        <Button type="primary" icon="md-search" ghost @click="reportquery">查询</Button>
                        <Button type="success" ghost icon="ios-download-outline" @click="exportReport(1)">未排序导出</Button>
                        <Button type="success" ghost icon="ios-download-outline" @click="exportReport(2)">排序导出</Button>
                    </ButtonGroup>
                </FormItem>
            </Form>
        </div>
        <div>
            <Table class="table-ty" :columns="tableColumns1" :data="tableData1" size="small" ref="table" border height="500"></Table>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                tableData1: this.mockTableData1(),
                tableColumns1: [
                    {
                        title: '单据编号',
                        key: 'billCode',
                        align: "center",
                        fixed: "left",
                    },
                    {
                        title: "业务员",
                        key: "salesMan",
                        align: "center",
                    },
                    {
                        title: "签单人",
                        key: "receiveMan",
                        align: "center",
                    },
                    {
                        title: "业务网点",
                        key: "Station",
                        align: "center",
                    },
                    {
                        title: "单据金额",
                        key: "billAmount",
                        align: "center",
                    },
                    {
                        title: "未收金额",
                        key: "unReceAmount",
                        align: "center",
                    },
                    {
                        title: '付款方式',
                        key: 'payWays',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error';
                            const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail';

                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: '单据类型',
                        key: 'billType',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error';
                            const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail';

                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: '托运时间',
                        key: 'tuoyunTime',
                        render: (h, params) => {
                            return h('div', this.formatDate(this.tableData1[params.index].update));
                        }
                    }
                ]
            }
        },
        methods: {
            mockTableData1 () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        billCode: 'Business' + Math.floor(Math.random () * 100 + 1),
                        salesMan: "公司财务",
                        Station: "个人客户",
                        receiveMan: "Station",
                        billAmount: 'Business' + Math.floor(Math.random () * 100 + 1),
                        unReceAmount: 'Business' + Math.floor(Math.random () * 100 + 1),
                        payWays: Math.floor(Math.random () * 3 + 1),
                        billType: ['托运单', '结算单', '发车单', '到车单', '回车单'],
                        people: [
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            }
                        ],
                        time: Math.floor(Math.random () * 7 + 1),
                        update: new Date()
                    })
                }
                return data;
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1();
            }
        }
    }
</script>

<style>
    .table-ty {
        background-color: #2d8cf0;

    }
</style>
