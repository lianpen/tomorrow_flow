import Flow from './Flow'

const AMOUNT = 2668.12

class ConsumeFlow extends Flow {
	
	constructor(o) {
		super()
		this.parse(o)
	}
	
	parse(o) {
		this.summary = '结汇'
		this.date = o.date.clone()
		this.amount = AMOUNT
		this.rest = o.moneyBefore + this.amount
		this.location = '结汇'
		this.target = '6217001210075271237惠连鹏'
	}
	
}

export default ConsumeFlow