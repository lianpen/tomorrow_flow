<template>
	<canvas 
		id="seal-hollow-pixels" 
		ref='canvas'
		:width='width' 
		:height='height'>
         
	</canvas>
</template>

<script>
	export default {
		name: 'sealHollowPixels',
		props: {
			width: {
				type: Number,
				required: true
			},
			height: {
				type: Number,
				required: true
			},
			rate: {
				type: Number,
				default: 1.4
			}
		},
		mounted() {
			this.foo()
		},
		updated() {
			this.foo()
		},
		methods: {
			foo() {
				console.log('hollowpixels')
				let canvas = this.$refs.canvas
				console.log('getCanvas', canvas)
				let ctx = canvas.getContext("2d")
				ctx.fillStyle="#fff";
				let counter = 0
				//绘制成矩形
				for (let i = 0; i < this.width; i += 1) {
					for (let j = 0; j < this.height; j += 1) {
						let isFill = (Math.random() * this.height + j) > this.height * this.rate
						if (isFill) {
							ctx.fillRect(i, j, 1, 1)
							counter += 1
						}
					}
				}
				console.log(counter + ' pixels hollowed')
			}
		}
		
	}
</script>

<style>
</style>
