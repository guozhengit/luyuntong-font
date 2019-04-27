<template>
    <div ref="dom"></div>
</template>

<script>
    import echarts from 'echarts'
    import { on, off } from '@/libs/tools'
    export default {
        name: 'serviceRequests',
        data () {
            return {
                dom: null
            }
        },
        methods: {
            resize () {
                this.dom.resize()
            }
        },
        mounted () {
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#a0dcdd'
                        }
                    }
                },
                legend: {
                    data:['发车数量','订单数量','回款金额','支出成本']
                },
                grid: {
                    top: '10%',
                    left: '1.2%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        boundaryGap: false,
                        data:[0,5000,10000,15000,20000]
                    }
                ],
                series: [
                    {
                        name: '发车数量',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {
                                color: '#f0d442'
                            } },
                        data: [1203, 1325, 1016, 1734, 5590, 2430, 2610,1342,1543,6542,2123,3425]
                    },
                    {
                        name: '订单数量',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {
                                color: '#10A6FF'
                            } },
                        data: [2574, 3583, 2785, 2343, 2904, 3304, 32574, 3583, 2785, 2373, 2964, 3344]
                    },
                    {
                        name: '回款金额',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {
                                color: '#a63b80'
                            } },
                        data: [37900, 26823, 35423, 26943, 31046, 47835, 35865, 26823, 35423, 26943, 31046, 47835]
                    },
                    {
                        name: '支出成本',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: { normal: {
                                color: '#56bf83'
                            } },
                        data: [12000, 24500, 34600, 24500, 37200, 24000, 28000,36000,23456,32425,23425,21453]
                    }
                ]
            }
            this.$nextTick(() => {
                this.dom = echarts.init(this.$refs.dom)
                this.dom.setOption(option)
                on(window, 'resize', this.resize)
            })
        },
        beforeDestroy () {
            off(window, 'resize', this.resize)
        }
    }
</script>
