<template>
	<div class="c-print" 
	:style='{ "font-size": 12 * printScale + "px" }' 
	v-if='tableData'>
		<div class="l-seal">
			<seal
				:width='160 * printScale'
				:height='160 * printScale'
				:startAngle='-100'
				:endAngle='100'
				:fontSize='16 * printScale'
				fontFamily='汉仪长宋简'
				color='#da2e52'
				:scale='printScale'
				company='中国建设银行股份有限公司上海高化支行'
				:hollowRate='1.6'>
				<div class="l-bottomText" slot='bottomText'
					:style="{ fontSize: 17 * printScale + 'px' }">
					<h3>业务专用章</h3>
					<!--<p>(12)</p>-->
					<p>(12)</p>
				</div>
				<div class="l-sealCenter" slot='sealCenter'>
					<seal-center
						:width='160 * printScale' 
						:height='160 * printScale'
						color='#da2e52' />
				</div>	
			</seal>
		</div>
		<div class="l-title">
			<h3
				:style="{ fontSize: 17 * printScale + 'px', marginBottom: 20 * printScale + 'px' }">
				中国建设银行个人账户收入交易明细
			</h3>
		</div>
		<div class='l-subTitle'>
			<span>卡号/帐号:6217001210075271237</span>
			<span>客户名称:惠连鹏</span>
			<span>币别:人命币元</span>
			<span>钞汇标志:钞</span>
			<span>起始日期:{{ startStr }}</span>
			<span>截止日期:{{ endStr }}</span>
		</div>
		<div class="l-table">
			<el-table :data='tableData' border
				:width='800 * printScale'
				:cellStyle='{ "font-size": 12 * printScale + "px" }'
				:headerCellStyle='{ "font-size": 12 * printScale + "px" }'>
			  <el-table-column
				prop="index"
				label=""
						:width="27 * printScale"
						 class-name='column-index'
						 />
			  <el-table-column
				prop="summary"
				label="摘要"
						:width="70 * printScale" />
			  <el-table-column
				prop="date"
				label="交易日期"
						:width="64 * printScale"/>
			  <el-table-column
				prop="amount"
				label="交易金额"
						:width="96 * printScale"
						 align='right' />
			  <el-table-column
				prop="rest"
				label="账户余额"
						:width="110 * printScale"
						 align='right'  />
			  <el-table-column
				prop="location"
				label="交易地点/附言"
						:width="176 * printScale"  />
			  <el-table-column
				prop="target"
				label="对方账号和户名"
					:width="244 * printScale"  />
			</el-table>
		</div>
		<div class='l-printInfo'>
			<span>
				打印时间: {{ printTimeStr }}
			</span>
			<span>
				打印机构: 建行上海高化支行[310614039]
			</span>
		</div>
		<div class="l-pager"
			:style="{ fontSize: 17 * printScale + 'px' }">
			- 第1页 / 共1页 -
		</div>
		<div class="l-printScaleController"
			v-if='showPrintScale'>
			<input type='text' 
				@input='onInputPrintScale'
				:value='printScale'/>
			{{ printScale }}
		</div>
  </div>
</template>

<script>
import Account from '@/model/Account'
import SalaryFlow from '@/model/SalaryFlow'
import InterestFlow from '@/model/InterestFlow.js'
import ConsumeFlow from '@/model/ConsumeFlow.js'
import InvestFlow from '@/model/InvestFlow.js'
import RateFlow from '@/model/RateFlow.js'
import ConsumeBackFlow from '@/model/ConsumeBackFlow.js'
import moment from 'moment'
import Seal from '@/components/seal/Seal.vue'
import SealCenter from '@/components/seal/SealCenter.vue'


let params = {
	startTime: '20190101',
	startMoney: 143952.19,
	endTime: '20190916',
	printTime: '10:15:29',
	salary: 16200,
	rewardDate: '15'
}

export default {
	components: {
		seal: Seal,
		'seal-center': SealCenter
	},
	name: 'Print',
	data() {
		return Object.assign({
			money: 0,
			flowList: [],
			tableData: [],
			/**
			 * 打印机不同比例调整系数
			 */
			printScale: 0.948,
			showPrintScale: false
		}, params)
	},
	created() {
		window.document.onkeydown = event => {
			let keyCode = event.keyCode
			switch(keyCode) {
				case 65:
					this.togglePrintScale()
					break;
			}
		}
		this.money = this.startMoney
		let startMoment = moment(this.startTime, 'YYYYMMDD')
		let endMoment = moment(this.endTime, 'YYYYMMDD')
		let momentPointer = startMoment.clone()
		while(momentPointer.isBefore(endMoment)) {
			this._handleDate(momentPointer)
			momentPointer.add(1, 'd')
		}
		let incomeFlowList = this.flowList.filter(flow => flow.amount > 0)
		let tableData = incomeFlowList.map(flow => flow.assign())
		tableData = tableData.map((data, index) => {
			return Object.assign({}, data, {
				index: index + 1
			})
		})
		this.tableData = tableData
	},
	methods: {
		/**
		 * 开关打印系数面板
		 */
		togglePrintScale() {
			this.showPrintScale = !this.showPrintScale
		},
		/**
		 * 改变打印比例系数
		 */
		onInputPrintScale(event) {
			let input = event.target.value
			let scale = parseFloat(input)
			if (!isNaN(scale) && scale) 
				this.printScale = scale
		},
		/**
		 * 单日处理
		 * 1. 36912月21日 发放利息
		 * 2. 每日随机消费50-150元
		 * 3. 每月15号发工资
		 * 4. 大于12万时 提款10w
		 * 5. 结汇
		 * 6. 消费退货
		 */
		_handleDate(momentPointer) {
			this._handleInterest(momentPointer)
			this._handleConsume(momentPointer)
			this._handleSalary(momentPointer)
			this._handleInvest(momentPointer)
			this._handleRate(momentPointer)
			this._handleConsumeBack(momentPointer)
		},
		/**
		 * 结汇
		 */
		_handleRate(momentPointer) {
			let month = momentPointer.month()
			let date = momentPointer.date()
			if (month == 7 && date == 14) {
				let flow = new RateFlow({
					date: momentPointer,
					moneyBefore: this.money
				})
				this.money += flow.amount
				this.flowList.push(flow)
			}
		},
		/**
		 * 消费退货
		 */
		_handleConsumeBack(momentPointer) {
			let month = momentPointer.month()
			let date = momentPointer.date()
			if (
				month == 1 && date == 2
				||
				month == 5 && date == 17
			) {
				let flow = new ConsumeBackFlow({
					date: momentPointer,
					moneyBefore: this.money
				})
				this.money += flow.amount
				this.flowList.push(flow)
			}
		},
		/**
		 * 利息 36912月21日 利率0.3%
		 */
		_handleInterest(momentPointer) {
			let month = momentPointer.month()
			let date = momentPointer.date()
			const INTEREST_DATE = 21
			const INTEREST_MONTH_LIST = [3, 6, 9, 12]
			let hit = (
				date == INTEREST_DATE 
				&&
				INTEREST_MONTH_LIST.includes(month + 1)
			) 
			if (!hit) return
			let flow = new InterestFlow({
				date: momentPointer,
				moneyBefore: this.money
			})
			this.money += flow.amount
			this.flowList.push(flow)
		},
		/**
		 * 工资
		 */
		_handleSalary(momentPointer) {
			if (momentPointer.date() == this.rewardDate) {
				let flow = new SalaryFlow({
					date: momentPointer,
					salary: this.salary,
					moneyBefore: this.money
				})
				this.money += flow.amount
				this.flowList.push(flow)
			}
		},
		/**
		 * 消费
		 */
		_handleConsume(momentPointer) {
			let flow = new ConsumeFlow({
				date: momentPointer,
				moneyBefore: this.money
			})
			this.money += flow.amount
			this.flowList.push(flow)
		},
		/**
		 * 大于12万时 提款10w
		 */
		_handleInvest(momentPointer) {
			if (this.money < 120000) return
			let hit = Math.random() * 100 > 95
			if (!hit) return
			let flow = new InvestFlow({
				date: momentPointer,
				moneyBefore: this.money
			})
			this.money += flow.amount
			this.flowList.push(flow)
		}
	},
	computed: {
		printTimeStr() {
			let m = moment(this.endTime, 'YYYYMMDD')
			let dateStr = m.format('YYYY年MM月DD日')
			let timeStr = dateStr + ' ' + this.printTime
			return timeStr
		},
		startStr() {
			let m = moment(this.startTime, 'YYYYMMDD')
			let dateStr = m.format('YYYY年MM月DD日')
			return dateStr
		},
		endStr() {
			let m = moment(this.endTime, 'YYYYMMDD')
			let dateStr = m.format('YYYY年MM月DD日')
			return dateStr
		},
		sealStyle() {
			return {
				transform: 'scale(' + this.printScale + ')'
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			console.log(1)
		})
	}
}

</script>

<style lang='stylus'>
	.c-print
		//transform: scale(.9)
		font-size: 12px
		font-family: monospace
		color: #000
		line-height: 1
		.el-table--scrollable-x .el-table__body-wrapper
			overflow: hidden
		.l-title
			h3
				text-align: center
				margin-bottom: 20px
				font-size: 17px
				line-height: 1
		.l-subTitle
			margin-bottom: 10px
			span
				margin-right: 10px
		.l-table
			table
				background: none
				border-color: #000
				tr
					background: none
					border-color: #000
					th
						height: 34px
						background: none
					td
						height: 32px
					td, th
						font-weight: normal
						color: #000
						border-color: #000
						padding: 0
						div
							padding: 0 6px 0 3px
					td.column-index
						div 
							padding: 0 1px
			.el-table 
				color: #000
				border-color: #000
				font-size: 12px
				background: none
				:before
					height: 0
			.el-table:before, .el-table:after
				background-color: #000
			.el-table__column-resize-proxy:after 
				display: none
			.el-table--border:after
				display: none
		.l-printInfo
			margin-top: 1px
			margin-left: 2px
			span 
				margin-right: 12px
		.l-pager
			font-size: 17px
			font-weight: bold
			text-align: center
			margin-top: 13px
</style>
