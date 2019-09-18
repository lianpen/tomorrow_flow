<template>
	<div class="c-pentagram">
		<svg t="1564551634758" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg" 
			p-id="4602" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500"
			:fill='color'>
			<polyline points="0,170 484,170 88,440 240,4 391,439 0,170"></polyline>
		</svg>		
	</div>
</template>

<script>
	export default {
		props: {
			color: {
				type: String
			}
		},
		computed: {
			style() {
				return {
					color: this.color
				}
			}
		}
	}
</script>

<style lang='stylus'>
	.c-pentagram
		svg
			width: 56px
			
</style>
