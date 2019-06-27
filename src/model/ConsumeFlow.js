import Flow from './Flow'

const INTEREST = .003

class ConsumeFlow extends Flow {
	
	constructor(o) {
		super()
		this.parse(o)
	}
	
	parse(o) {
		this.summary = '消费'
		this.date = o.date.clone()
		this.amount = this.getAmount()
		this.rest = o.moneyBefore + this.amount
	}
	
	getAmount(moneyBefore) {
		let result = -50 - 100 * Math.random()
		result = result.toFixed(1)
		result = parseFloat(result)
		return result
	}
	
}

export default ConsumeFlow