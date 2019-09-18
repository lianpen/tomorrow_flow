<template>
	<div class='c-resign'>
		<div class="c-resign-wrapper">
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
				date: '2019年8月31日',
				color: '#d02d2d'
			}
		}
	}
</script>

<style lang='stylus'>
	.c-resign
		font-size: 18px
		width: 800px
		.c-resign-wrapper
			width: 600px
			margin: 0 auto
			.l-seal
				.c-seal
					left: 222px
					top: 222px
					//transform: rotate(-28deg)
					transform: scale(3, 3)
					.l-sealCenter
						position: absolute
						top: 50%
						left: 50%
						.c-pentagram
							transform: translate(-50%, -50%)
</style>
