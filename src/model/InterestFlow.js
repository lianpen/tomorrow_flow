import Flow from './Flow'

const INTEREST = .003

class InterestFlow extends Flow {
	
	constructor(o) {
		super()
		this.parse(o)
	}
	
	parse(o) {
		this.summary = '利息存入'
		this.date = o.date.clone()
		this.amount = this.getInterest(o.moneyBefore)
		this.rest = o.moneyBefore + this.amount
	}
	
	getInterest(moneyBefore) {
		let result = moneyBefore * INTEREST * .25
		return result
	}
	
}

export default InterestFlow