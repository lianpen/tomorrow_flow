<template>
	<div class="c-arcText"
		:style='style' >
		<span v-if='text.length > 1'
			v-for='ro in roList'
			:style='ro.style'>
			{{ ro.letter }}
		</span>
	</div>
</template>

<script>
	
	export default {
		name: 'arcText',
		props: {
			text: {
				type: String,
				required: true
			},
			color: {
				type: String,
				default: 'red'
			},
			width: {
				type: Number,
				default: 200
			},
			height: {
				type: Number,
				default: 200
			},
			borderWidth: {
				type: Number,
				default: 15
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
			}
		},
		data() {
			return {
				roList: []
			}
		},
		created() {
			this.main()
		},
		computed: {
			style() {
				return { 
					color: this.color, 
					width: this.width + "px", 
					height: this.height + "px", 
					fontSize: this.fontSize + "px" ,
					fontFamily: this.fontFamily
				}
			},
			/**
			 * 内容半径 去除边距
			 */
			contentRadius() {
				return {
					w: this.width / 2 - this.borderWidth,
					h: this.height / 2 - this.borderWidth
				}
			},
			/**
			 * 中心点
			 */
			centerPoint() {
				return {
					x: this.width / 2,
					y: this.height / 2
				}
			},
			/**
			 * 文字偏移
			 */
			textOffset() {
				return {
					x: - this.fontSize / 2,
					y: - this.fontSize / 2
				}
			}
		},
		beforeUpdate() {
			this.main()
		},
		methods: {
			/**
			 * 算法入口
			 * 1. 每个字符分配角度平均
			 */
			main(text) {
				let letterList = this.text.split('')
				let roList = letterList.map(letter => {
					return {
						letter,
						angle: 0,
						x: 0,
						y: 0
					}
				})
				// 角度范围
				let angleRange = this.endAngle - this.startAngle
				// 每两个字符间的角度间距
				let angelGap = angleRange / (letterList.length - 1)
				roList.forEach((ro, index) => {
					// y轴偏移角度
					let angle = this.startAngle + (index * angelGap)
					// 极坐标偏移角度
					let polarAngle = (- angle + 90) / 180 * Math.PI
					// 极坐标下x, y
					let polarX = Math.cos(polarAngle) * this.contentRadius.w
					let polarY = Math.sin(polarAngle) * this.contentRadius.h
					// 距离左上角的偏移x, y
					let x = this.centerPoint.x + polarX
					let y = this.centerPoint.y - polarY
					// 处理文字偏移
					x += this.textOffset.x
					y += this.textOffset.y
					// 文字旋转
					let transform = 'rotate(' + angle + 'deg) scale(1, 1.2)'
					// 样式汇总计算
					ro.style = {
						left: x + 'px',
						top: y + 'px',
						transform: transform
					}
				})
				this.roList = roList
			}
		}
	}
</script>

<style lang='stylus'>
.c-arcText
	position: relative
	span
		position: absolute
</style>
