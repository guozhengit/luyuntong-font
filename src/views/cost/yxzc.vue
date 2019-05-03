<template>
  <div class="table-page">
    <div class="search">
      <Form
        class="search-form"
        ref="searchOPEXData"
        :model="searchOPEXData"
        :label-width="5"
        inline
      >
        <FormItem prop="name">
          <div class="ivu-form-item select-ground">
            <span class="select-name">日期范围</span>
            <div class="select-input">
              <Input
                v-model="searchOPEXData.name"
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

    <div class="data-table" style="height: 82%">
      <Table
        border
        :columns="OPEXColumns"
        :data="OPEXList"
        @on-selection-change="handleSelect"
      >
      </Table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      OPEXColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
       /* {
          title: "季度",
          key: "quarter",
          align: "center",
          sortable: true
        },
        {
          title: "月份",
          key: "month",
          align: "center",
          sortable: true
        },*/
        {
          title: "租金",
          key: "rent",
          align: "center",
          sortable: true
        },
        {
          title: "水费",
          key: "waterFee",
          align: "center"
        },
        {
          title: "电话费",
          key: "telephoneFee",
          align: "center",
          sortable: true
        },
        {
          title: "电费",
          key: "salary",
          align: "center",
          sortable: true
        },
        {
          title: "支出合计",
          key: "totalFee",
          align: "center",
          sortable: true
        }
      ],
      searchOPEXData: {
        /*季度*/
        quarter: "",
        /*月份*/
        month: "",
        /*租金*/
        rent: "",
        /*水费*/
        waterFee: "",
        /*电费*/
        electricFee: "",
        /*电话费*/
        telephoneFee: "",
        /*支出合计*/
        totalFee: ""
      },
      OPEXList: [],
      totalCount: 0,
      selectedSalary: [],
      pageIndex: 1,
      pageSize: 10,
      formSalaryData: {
        /*季度*/
        quarter: "",
        /*月份*/
        month: "",
        /*租金*/
        rent: "",
        /*水费*/
        waterFee: "",
        /*电费*/
        electricFee: "",
        /*电话费*/
        telephoneFee: "",
        /*支出合计*/
        totalFee: ""
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
          this.searchOPEXData
        )
        .then(res => {
          let result = res.data;
          this.OPEXList = result.data.content;
          this.totalCount = result.data.totalElements;
        })
        .catch(() => {
          this.OPEXList = [];
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
