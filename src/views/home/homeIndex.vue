<template>
  <div>
    <Row>
      <label class="left"><h1>年度统计报表</h1></label>
      <tr/>
      <Card shadow>
        <example style="height: 500px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
    import Example from './example.vue'
    export default {
        name: 'home',
        components: {
            Example
        },
        data () {
            return {
            }
        },
        mounted () {
        }
    }
</script>

<style lang="less">
  .count-style{
    font-size: 50px;
  }
</style>
