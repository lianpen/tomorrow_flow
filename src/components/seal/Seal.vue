<template>
	<div class="c-seal" 
		:style="style">
		<div class="l-outerBorder" 
			:style="[ style, { borderColor: color, borderWidth: 4 * scale + 'px' } ]" />
		<slot name='sealCenter'></slot>
		<slot name='bottomText'></slot>
		<div class="l-arcText">
			<arc-text
				:width='width'
				:height='height'
				:startAngle='startAngle'
				:endAngle='endAngle'
				:fontSize='fontSize'
				:text='company'
				:color='color'
				:fontFamily='fontFamily'
				:borderWidth='19'>
			</arc-text>
		</div>
		<div class="l-mask"></div>
		<div class="l-hollowPixels">
			<hollow-pixels 
				:width='width'
				:height='height'
				:rate='hollowRate' />
		</div>
	</div>
</template>

<script>
	import ArcText from './ArcText.vue'
	import SealCenter from './SealCenter.vue'
	import HollowPixels from './HollowPixels.vue'
	
	
	export default {
		name: 'seal',
		components: {
			'arc-text': ArcText,
			'seal-center': SealCenter,
			'hollow-pixels': HollowPixels
		},
		props: {
			centerType: {
				type: Number,
				default: 1
			},
			width: {
				type: Number,
				default: 200
			},
			height: {
				type: Number,
				default: 200
			},
			startAngle: {
				type: Number,
				default: -90
			},
			endAngle: {
				type: Number,
				default: 90
			},
			fontSize: {
				type: Number,
				default: 16
			},
			fontFamily: {
				type: String
			},
			company: {
				type: String,
				required: true
			},
			color: {
				type: String,
				default: 'red'
			},
			borderWidth: {
				type: Number,
				default: 15
			},
			/**
			 * 镂空率
			 */
			hollowRate: {
				type: Number,
				default: 1.4
			},
			/**
			 * 打印比例
			 */
			scale: {
				type: Number,
				default: 1
			}
		},
		computed: {
			style() {
				return {
					width: this.width + 'px',
					height: this.height + 'px',
					color: this.color,
					fontFamily: this.fontFamily
				}
			}
		}
	}
</script>

<style lang='stylus'>
	.c-seal
		position: fixed
		left: 0
		top: 17px
		z-index: -1
		transform: rotate(-90deg)
		.l-outerBorder 
			position: absolute
			left: 0
			top: 0
			border-radius: 50%
			border: 4px solid #000
		.l-bottomText
			font-family: monospace
			position: absolute
			left: 0
			right: 0
			bottom: 12px
			text-align: center
			font-size: 17px
			h3
				margin-bottom: 4px
				font-weight: normal
		.l-arcText
			font-family: sarif
		.l-mask
			position: absolute
			left: 0
			top: 0
			width: 100%
			height: 100%
			background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) , rgba(255, 255, 255, .8))
		.l-hollowPixels
			position: absolute
			left: 0
			top: 0
			width: 100%
			height: 100%
</style>
