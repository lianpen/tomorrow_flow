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
				<c-seal
					:width='160'
					:height='160'
					:startAngle='-140'
					:endAngle='140'
					:fontSize='20'
					:borderWidth='17'
					fontFamily='汉仪长宋简'
					:color='color'
					company='湖北群艺积分制咨询管理有限公司上海分公司'
					:hollowRate='1.8' >
					<div class="l-sealCenter" slot='sealCenter'>
						<c-pentagram :color='color'></c-pentagram>
					</div>
				</c-seal>
			</div>
		</div>
	</div>
	
</template>

<script>
	import Seal from '@/components/seal/Seal.vue'
	import Pentagram from './Pentagram.vue'
	export default {
		components: {
			'c-seal': Seal,
			'c-pentagram': Pentagram
		},
		data() {
			return {
				date: '2019年7月31日',
				color: '#d02d2d'
			}
		}
	}
</script>

<style lang='stylus'>
	.c-resign
		font-size: 16px
		width: 800px
		.c-resign-wrapper
			width: 600px
			margin: 0 auto
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
				.c-seal
					left: 547px
					top: 290px
					transform: rotate(-28deg)
					.l-sealCenter
						position: absolute
						top: 50%
						left: 50%
						.c-pentagram
							transform: translate(-50%, -50%)
</style>
