<template>
  <div class="index" :style='{ width: width }'>
		<h3>
			巨象网络MrD测试表
		</h3>
		<el-table :data='flowList' border
			:width='width'>
      <el-table-column
        prop="abstract"
        label="摘要" />
			<!--
      <el-table-column
        prop="date"
        label="交易日期"
				width="100" />
      <el-table-column
        prop="amount"
        label="交易金额"
				width="180" 
				:formatter="formatAmount" />
      <el-table-column
        prop="rest"
        label="账户金额"
				width="200"  />
      <el-table-column
        prop="location"
        label="交易地点/附言"
				width="300"  />
      <el-table-column
        prop="target"
        label="对方账号和户名"
				width="400"  />
			-->
		</el-table>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    msg: String
  },
	data() {
		return {
			flowList: [],
			width: 210 * 3.78 + 'px'
		}
	},
	created() {
		let a = ''
		for (let j = 0; j < 100; j += 1) {
			a = a + j 
		}
		let sample = {
			abstract: a,
			date: '20180403',
			amount: -35,
			rest: 102323,
			location: '财付通-微信支付：大时代上海',
			target: '10529006110103财付通-微信支付：微信转账'
		}
		for (let i = 0; i < 40; i += 1) {
			this.flowList.push(sample)
		}
	},
	methods: {
		formatAmount(row, column, cellValue, index) {
			return cellValue.toFixed(2)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus'>
	h3
		color: red
		text-align: center
		margin: 40px
	.index
		padding: 0
	table
		border-color: #000 !important
		tr
			border-color: #000 !important
			th
			td
			td, th
				border-color: #000 !important
	.el-table 
		border-color: #000 !important
	.el-table:before, .el-table:after
		background-color: #000 !important
</style>
