<template>
  <div class="p-print" :style='{ width: width }'>
		<h3>
			巨象网络5月份MrD公示
		</h3>
		<el-table :data='flowList' border
			:width='width'>
      <el-table-column
        prop="a1"
        label="名次"
				width="100" />
      <el-table-column
        prop="a2"
        label="姓名" />
      <el-table-column
        prop="a3"
        label="事业部" />
      <el-table-column
        prop="a4"
        label="积分" />
      <el-table-column
        prop="a5"
        label="产值" />
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
			flowList: FL,
			width: 210 * 3.78 + 'px'
		}
	},
	methods: {
		formatAmount(row, column, cellValue, index) {
			return cellValue.toFixed(2)
		}
	}
}


const FL = [{
	a1: 1,
	a2: '马泽龙',
	a3: '上海销售部',
	a4: 1640,
	a5: 174800
}, {
	a1: 2,
	a2: '刘俊杰',
	a3: '上海销售部',
	a4: 1620,
	a5: 171100
}, {
	a1: 3,
	a2: '李芯艺',
	a3: '上海研发部',
	a4: 1210,
	a5: 140500
}, {
	a1: 4,
	a2: '赵伟',
	a3: '上海研发部',
	a4: 1120,
	a5: 182000
}, {
	a1: 5,
	a2: '罗丹',
	a3: '上海运营部',
	a4: 840,
	a5: 64500
}, {
	a1: 6,
	a2: '王伟强',
	a3: '上海销售部',
	a4: 830,
	a5: 69700
}]
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus'>
	.p-print
		h3
			color: red
			text-align: center
			margin-bottom: 20px
			font-size: 20px
			line-height: 1
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
			color: #000 !important
			border-color: #000 !important
		.el-table:before, .el-table:after
			background-color: #000 !important
</style>
