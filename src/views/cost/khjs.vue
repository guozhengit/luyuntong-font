<template>
  <div class="table-page">
    <div class="search">
      <Form
        class="search-form"
        ref="searchKhjsData"
        :model="searchKhjsData"
        :label-width="5"
        inline
      >
        <FormItem prop="name">
          <div class="ivu-form-item select-ground">
            <span class="select-name">客户编号</span>
            <div class="select-input">
              <Input
                v-model="searchKhjsData.name"
                type="text"
                placeholder="请输入客户编号"
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="name">
          <div class="ivu-form-item select-ground">
            <span class="select-name">结算方式</span>
            <div class="select-input">
              <Input
                v-model="searchKhjsData.name"
                type="text"
                placeholder="请输入结算方式"
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="name">
          <div class="ivu-form-item select-ground">
            <span class="select-name">结算状态</span>
            <div class="select-input">
              <Input
                v-model="searchKhjsData.name"
                type="text"
                placeholder="请输入结算状态"
              />
            </div>
          </div>
        </FormItem>
        <FormItem prop="accountTime">
          <div class="ivu-form-item select-ground">
            <span class="select-name">结算日期</span>
            <div class="select-input">
              <Input
                v-model="searchKhjsData.accountTime"
                type="text"
                placeholder="请输入结算日期"
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
        :columns="khjsColumns"
        :data="khjsList"
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
      khjsColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "客户名称",
          key: "customerName",
          align: "center",
          sortable: true
        },
        {
          title: "客户编号",
          key: "customerCode",
          align: "center"
        },
        {
          title: "结算方式",
          key: "accountType",
          align: "center",
          sortable: true
        },
        {
          title: "结算状态",
          key: "accountStatus",
          align: "center",
          sortable: true
        },
        {
          title: "结算金额",
          key: "accountAmount",
          align: "center",
          sortable: true
        },
        {
          title: "未结算金额",
          key: "unAccountAmount",
          align: "center",
          sortable: true
        },
        {
          title: "结算时间",
          key: "accountTime",
          align: "center",
          sortable: true
        }
      ],
      searchKhjsData: {
        /*客户名称*/
        customerName: "",
        /*客户编号*/
        customerCode: "",
        /*结算状态*/
        accountStatus: "",
        /*结算方式*/
        accountType: "",
        /*结算金额*/
        accountAmount: "",
        /*未结算金额*/
        unAccountAmount: "",
        /*结算时间*/
        accountTime: ""
      },
      khjsList: [],
      totalCount: 0,
      selectedKhjs: [],
      pageIndex: 1,
      pageSize: 10,
      formSalaryData: {
        /*客户名称*/
        customerName: "",
        /*客户编号*/
        customerCode: "",
        /*结算状态*/
        accountStatus: "",
        /*结算方式*/
        accountType: "",
        /*结算金额*/
        accountAmount: "",
        /*未结算金额*/
        unAccountAmount: "",
        /*结算时间*/
        accountTime: ""
      },
      showCreate: false,
      createLoading: false
    };
  },
  methods: {
    handleQuery() {
      this.$axios
        .post(
          `/users/pageQuery?page=${this.pageIndex - 1}&size=${this.pageSize}`,
          this.searchKhjsData
        )
        .then(res => {
          let result = res.data;
          this.khjsList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.khjsList = [];
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
      this.selectedKhjs = selection;
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
