import Flow from './Flow'

const INVEST_AMOUNT = -100000

class ConsumeFlow extends Flow {
	
	constructor(o) {
		super()
		this.parse(o)
	}
	
	parse(o) {
		this.summary = '提款'
		this.date = o.date.clone()
		this.amount = INVEST_AMOUNT
		this.rest = o.moneyBefore + this.amount
	}
	
}

export default ConsumeFlow