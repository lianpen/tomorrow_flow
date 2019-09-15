<template>
	<div class="c-sealCenter"
		:style='outerStyle'>
		<div v-if='type == 1'
			class='l-type-1'
			:style='type1Style' />
		<div v-if='type == 2'
			class='l-type-2' />
	</div>
</template>

<script>
	export default {
		name: 'sealCenter',
		props: {
			type: {
				type: Number,
				default: 1
			},
			width: {
				type: Number,
				required: true
			},
			height: {
				type: Number,
				required: true
			},
			color: {
				type: String
			}
		},
		computed: {
			outerStyle() {
				return {
					width: this.width + 'px',
					height: this.height + 'px'
				}
			},
			type1Style() {
				return {
					width: this.width * .58 + 'px',
					height: this.height * .20 + 'px',
					margin: this.height * .41 + 'px auto',
					borderColor: this.color
				}
			}
		}
	}
</script>

<style lang='stylus'>
	.c-sealCenter
		position: absolute
		left: 0
		top: 0
		.l-type-1
			display: block
			border: 2px solid black
</style>
