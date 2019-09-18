<template>
	<div class='c-resign'>
		<div class="c-resign-wrapper">
			<div class="l-title">
				离职证明
			</div>	
			<div class="l-body">
				惠连鹏（身份证号为：310115198906050610） 自
				<em>2017年10月16日</em>
				入职我公司于
				<em>技术研发部</em>
				担任
				<em>前端工程师</em>
				一职，至
				<em>{{ date }}</em>
				因
				<em>个人原因</em>
				申请离职，经协商一职，已办理离职手续。
			</div>
			<div class="l-stress">
				特此证明。
			</div>
			<div class="l-footer">
				<p>
					湖北群艺积分制咨询管理有限公司上海分公司
				</p>
				<p>
					{{ date }}
				</p>
			</div>
			<div class="l-seal">
				<img :src='imgUrl' />
			</div>
		</div>
	</div>
	
</template>

<script>
	import Seal from '@/components/seal/Seal.vue'
	export default {
		components: {
			'c-seal': Seal
		},
		data() {
			return {
				date: '2019年8月31日',
				color: '#d02d2d',
				imgUrl:require("@/assets/seal.png")
			}
		}
	}
</script>

<style lang='stylus'>
	.c-resign
		font-size: 18px
		.c-resign-wrapper
			margin: 0 80px
			.l-title
				font-size: 24px
				font-weight: bold
				text-align: center
				margin: 60px 0 40px
			.l-body
				text-indent: 38px
				line-height: 2
				em
					border-bottom: 1px solid #000
					font-style: normal
					padding: 0 10px 2px
			.l-stress
				margin-top: 40px
				text-indent: 38px
			.l-footer
				margin-right: 10px
				text-align: right
				margin-top: 90px
				p
					margin-bottom: 20px
			.l-seal
				position: relative
				img 
					z-index: -1
					transform: rotate(-28deg)
					position: absolute
					right: 9px
					top: -192px
					width: 190px
					height: 190px
</style>
