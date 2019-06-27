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
			}
		},
		mounted() {
			let canvas = this.$refs.canvas
			console.log(canvas)
			let ctx = canvas.getContext("2d")
			ctx.fillStyle="#fff";
			//绘制成矩形
			for (let i = 0; i < this.width; i += 1) {
				for (let j = 0; j < this.height; j += 1) {
					let isFill = (Math.random() * this.height + j) > this.height * 1.4
					if (isFill) {
						ctx.fillRect(i, j, 1, 1)
					}
				}
			}
		}
	}
</script>

<style>
</style>
