<template>
  <div class="data-table">
    <Table :columns="columns11" :data="data10" border height="500"></Table>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                columns11: [
                    {
                        title: "托运单号",
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
                        title: "物流信息",
                        align: "center",
                        children: [
                            {
                                title: "托运日期",
                                key: "startDate",
                                align: "center",
                                width: 200,
                                sortable: true
                            },
                            {
                                title: "单据详情",
                                align: "center",
                                children: [
                                    {
                                        title: "车辆状态",
                                        key: "canStatus",
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
                                    }
                                ]
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
                    },
                    {
                        title: "操作",
                        key: "opertion",
                        align: "center",
                        width: 200,
                        fixed: "right"
                    }
                ],
                data10: []
            };
        },
        mounted: function() {
            const data = [];
            for (let i = 0; i < 30; i++) {
                data.push({
                    key: i,
                    billCode: "LYT" + Math.round(Math.random() * 1000000000),
                    startDate: "2019-0" + (i % 8) + "-" + Math.round(Math.random() * 30),
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
                    facheDate: "2019-0" + (i % 10) + "-" + Math.round(Math.random() * 30),
                    opertion: "编辑"
                });
            }
            this.data10 = data;
            this.nowTimes();
        },
        methods: {
            // 获取当前时间函数
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month =
                    new Date(timeStamp).getMonth() + 1 < 10
                        ? "0" + (new Date(timeStamp).getMonth() + 1)
                        : new Date(timeStamp).getMonth() + 1;
                let date =
                    new Date(timeStamp).getDate() < 10
                        ? "0" + new Date(timeStamp).getDate()
                        : new Date(timeStamp).getDate();
                let hh =
                    new Date(timeStamp).getHours() < 10
                        ? "0" + new Date(timeStamp).getHours()
                        : new Date(timeStamp).getHours();
                let mm =
                    new Date(timeStamp).getMinutes() < 10
                        ? "0" + new Date(timeStamp).getMinutes()
                        : new Date(timeStamp).getMinutes();
                // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
                // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
                this.nowTime =
                    year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm;
                // console.log(this.nowTime);
            },
            // 定时器函数
            nowTimes() {
                this.timeFormate(new Date());
                setInterval(this.nowTimes, 30 * 1000);
            }
        },
        randomNumber() {
            const now = new Date();
            let month = now.getMonth() + 1;
            let day = now.getDate();
            let hour = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            month = this.setTimeDateFmt(month);
            hour = this.setTimeDateFmt(hour);
            minutes = this.setTimeDateFmt(minutes);
            seconds = this.setTimeDateFmt(seconds);
            return (
                now.getFullYear().toString() +
                month.toString() +
                day +
                hour +
                minutes +
                seconds +
                Math.round(Math.random() * 23 + 100).toString()
            );
        }
    };
</script>
