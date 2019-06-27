<template>
	<div id='p-print'>
		<Print 
			startTime = '20190106'
			:startMoney = '143952.19'
			endTime = '20190622'
			:salary = '20000'
			:rewardDate = '15' />
	</div>
</template>

<script>
// @ is an alias to /src
import Print from '@/components/Print.vue'

export default {
  name: 'print',
  components: {
    Print
  }
}
</script>
