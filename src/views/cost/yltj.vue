<template>
  <div class="table-page">
    <div class="search">
      <Form
        class="search-form"
        ref="searchYltjData"
        :model="searchYltjData"
        :label-width="5"
        inline
      >
        <FormItem prop="name">
          <div class="ivu-form-item select-ground">
            <span class="select-name">盈利时间</span>
            <div class="select-input">
              <Input
                v-model="searchYltjData.ProfitTime"
                type="date"
                placeholder="请选择日期区间"
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
          <ButtonGroup>
            <Button
                    style="margin: 5px;"
                    type="error"
                    icon="md-arrow-down"
                    ghost
                    @click="exportReport1()"
            >导出
            </Button>
          </ButtonGroup>
        </FormItem>
      </Form>
    </div>
    <div class="data-table" style="height: 90%">
      <Table
        border
        :columns="yltjColumns"
        :data="yltjList"
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
      yltjColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "结算金额",
          key: "settlementAmount",
          align: "center",
          sortable: true
        },
        {
          title: "未结算金额",
          key: "outstandingAmount",
          align: "center",
          sortable: true
        },
        {
          title: "工资成本",
          key: "payrollCost",
          align: "center"
        },
        {
          title: "支出金额",
          key: "amountPaid",
          align: "center",
          sortable: true
        },
        {
          title: "预计盈利金额",
          key: "expectedProfitAmount",
          align: "center",
          sortable: true
        },
        {
          title: "实际盈利金额",
          key: "actualProfitAmount",
          align: "center",
          sortable: true
        }
      ],
      searchYltjData: {
        /*未结算金额*/
        outstandingAmount: "",
        /*结算金额*/
        settlementAmount: "",
        /*工资成本*/
        payrollCost: "",
        /*支出金额*/
        amountPaid: "",
        /*结算金额*/
        accountAmount: "",
        /*预计盈利金额*/
        expectedProfitAmount: "",
        /*实际盈利金额*/
        actualProfitAmount: "",
        /*盈利时间*/
        ProfitTime: ""
      },
      yltjList: [],
      totalCount: 0,
      selectedYltj: [],
      pageIndex: 1,
      pageSize: 10,
      formSalaryData: {
        /*未结算金额*/
        outstandingAmount: "",
        /*结算金额*/
        settlementAmount: "",
        /*工资成本*/
        payrollCost: "",
        /*支出金额*/
        amountPaid: "",
        /*结算金额*/
        accountAmount: "",
        /*预计盈利金额*/
        expectedProfitAmount: "",
        /*实际盈利金额*/
        actualProfitAmount: "",
        /*盈利时间*/
        ProfitTime: ""
      },
      showCreate: false,
      createLoading: false
    };
  },
  methods: {
      exportReport1() {
          this.$refs.table.exportCsv({
              filename: "盈利统计",
          });
      },
    handleQuery() {
      this.$axios
        .post(
          `/finaceManage/profit?page=${this.pageIndex - 1}&size=${this.pageSize}`,
          this.searchYltjData
        )
        .then(res => {
          let result = res.data;
          this.yltjList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.yltjList = [];
          this.totalCount = 0;
        });
    },
    handlePageChange(profitIndex) {
      this.pageIndex = profitIndex;
      this.handleQuery();
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.handleQuery();
    },
    handleSelect(selection, row) {
      this.selectedYltj = selection;
      console.log(selection, row);
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
