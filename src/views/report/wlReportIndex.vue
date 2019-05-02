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
        <FormItem prop="billCode">
          <div class="ivu-form-item select-ground">
            <span class="select-name">单据号</span>
            <div class="select-input">
              <Input
                v-model="FormData.billCode"
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
                v-model="FormData.consginDate"
                type="daterange"
                placement="bottom-start"
                placeholder="请选择托运时间"
              >
              </DatePicker>
            </div>
          </div>
        </FormItem>
        <FormItem prop="canStatus">
          <div class="ivu-form-item select-ground">
            <span class="select-name">车辆状态</span>
            <div class="select-input">
              <Select v-model="FormData.canStatus" placeholder="请选择车辆状态">
                <Option
                  v-for="item in typesList"
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
            <Button type="primary" icon="md-search" ghost @click="reportquery"
              >查询</Button
            >
            <Button
              type="success"
              ghost
              icon="ios-download-outline"
              @click="exportReport(1)"
              >导出</Button
            >
          </ButtonGroup>
        </FormItem>
      </Form>
    </div>
    <div>
      <Table
        :columns="FormData"
        :data="Data"
        size="small"
        ref="table"
        border
        height="500"
      ></Table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      FormData: [
        {
          typesList: [
            {
              value: "1",
              label: "已发车"
            },
            {
              value: "2",
              label: "未发车"
            },
            {
              value: "3",
              label: "待回车"
            }
          ],
          title: "物流单据",
          key: "billCode",
          align: "center",
          width: 200,
          fixed: "left",
          filters: [
            {
              label: "ly",
              value: 1
            },
            {
              label: "LYT",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.name === "ly";
            } else if (value === 2) {
              return row.name === "LYT";
            }
          }
        },

        {
          title: "托运日期",
          key: "consginDate",
          align: "center",
          width: 200,
          sortable: true
        },
        {
          title: "车辆状态",
          key: "canStatus",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.canStatus === 1
                ? "primary"
                : row.canStatus === 2
                ? "error"
                : "success";
            const text =
              row.canStatus === 1
                ? "已发车"
                : row.canStatus === 2
                ? "未发车"
                : "待回车";

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
          align: "center",
          width: 200
        },
        {
          title: "站点信息",
          align: "center",
          children: [
            {
              title: "始发站点",
              key: "startStation",
              align: "center",
              width: 200
            },
            {
              title: "目的站点",
              key: "targetStation",
              align: "center",
              width: 200
            }
          ]
        },

        {
          title: "顾客跟踪",
          align: "center",
          children: [
            {
              title: "托运人",
              key: "consignMan",
              align: "center",
              width: 200
            },
            {
              title: "收货人",
              key: "receiveMan",
              align: "center",
              width: 200
            }
          ]
        },
        {
          title: "货物信息",
          align: "center",
          children: [
            {
              title: "货物名称",
              key: "goodsName",
              align: "center",
              width: 200
            },
            {
              title: "货物重量",
              key: "goodWeight",
              align: "center",
              width: 200,
              sortable: true
            },
            {
              title: "货物体积",
              key: "goodVolume",
              align: "center",
              width: 200,
              sortable: true
            },
            {
              title: "货物数量",
              key: "goodNumber",
              align: "center",
              width: 200,
              sortable: true
            }
          ]
        },
        {
          title: "车辆跟踪",
          align: "center",
          children: [
            {
              title: "发车单号",
              key: "facheCode",
              align: "center",
              width: 200
            },
            {
              title: "发车时间",
              key: "facheDate",
              align: "center",
              width: 200
            }
          ]
        }
      ],
      Data: []
    };
  },
  mounted: function() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        billCode: "LYT" + Math.round(Math.random() * 1000000000),
        consginDate: "2019-0" + (i % 8) + "-" + Math.round(Math.random() * 30),
        canStatus: Math.round(Math.random() * 3),
        startStation: "安阳-黄河大道-安工",
        targetStation: "北京-朝阳-合生汇",
        consignMan: "夏明凤",
        receiveMan: "王盼阳",
        goodsName: "天地壹号",
        goodWeight: Math.round(Math.random() * 100000) + "Kg",
        goodVolume: Math.round(Math.random() * 100000) + "L",
        goodNumber: Math.round(Math.random() * 30),
        facheCode: "LYT" + Math.round(Math.random() * 1234567),
        facheDate: "2019-0" + (i % 10) + "-" + Math.round(Math.random() * 30)
      });
    }
    this.Data = data;
    this.nowTimes();
  },
  methods: {
    exportReport(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "物流跟踪报表"
        });
      }
    }
  }
};
</script>

<style>
.table-ty {
  background-color: #2d8cf0;
}
</style>
