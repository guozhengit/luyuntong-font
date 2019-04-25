<template>
    <div class="about">
        <div class="box">
            <div class="box1" ref='res1'>
                <ve-candle :data="chartData" :settings="chartSettings" :tooltip-visible='true'
                           width='100%' height='300px'
                           :mark-line="markLine" :mark-point="markPoint"
                ></ve-candle>


            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name:'aboue',

        data () {
            this.markLine = {
                data:[
                    {
                        name:'平均线',
                        type:'average'
                    }
                ]
            },
                this.markPoint = {
                    data:[
                        {
                            name:'最大值',
                            type:'max'
                        },
                        {
                            name:'最小值',
                            type:'min'
                        }
                    ]
                },

                this.chartSettings = {
                    showMA: true,
                    // showVol: true,
                    showDataZoom:true,
                    star:20,
                    end:100,
                    day:[1,2,3,4]
                }
            return {
                chartData: {
                    columns: ['日期', 'open', 'close', 'lowest', 'highest', 'vol'],
                    rows: [
                        //  [ '2004-01-05 8:00', 10411.85, 10544.07, 10411.85,  10575.92, 221290000 ]
                    ]
                },
                times:[],
            }
        },
        filters:{

        },
        created(){

        },
        mounted () {

            // console.log(formatDate,'332323')
            let form = {
                marketId:14,
                period:'1h',
                limit:10000
            }
            this.$axios.get('/trade/data/getKLineData.o?'+ this.$qs.stringify(form) )
                .then(res=>{
                    // console.log(res,'res')
                    let result = res.data.datas;

                    let time = result.data;//时间

                    let sets = []
                    // console.log(time,'timer')
                    time.forEach((StationIndex,data)=>{

                        this.chartData.rows.push([...StationIndex])

                    })


                    this.chartData.rows.forEach((data,StationIndex)=>{

                        var time1 = data[0];

                        time = this.formatDate(time1)

                        data[0] = time
                    })
                })

            console.log(this.chartData.rows,"rows")
        },
        watch:{
            activName(v){
                console.log(v)
                this.$nextTrick(()=>{
                    this.$refs('res1').echarts.resize()
                })
            }
        },
        methods:{
            formatDate(time){
                var date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm')
            },

        }
    }

</script>