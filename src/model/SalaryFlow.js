import Flow from './Flow'

const FLOAT_RATE = .02

class SalaryFlow extends Flow {
	
	constructor(o) {
		super()
		this.parse(o)
	}
	
	parse(o) {
		this.summary = '转账存入'
		this.date = o.date.clone()
		let money = this.getMoney(o.salary)
		this.amount = money
		this.rest = o.moneyBefore + money
		this.location = '中国建设银行股份有限公司荆门分行'
		this.target = '6236682700000850028李荣'
	}
	
	getMoney(salary) {
		let result = (1 - FLOAT_RATE + Math.random() * 2 * FLOAT_RATE) * salary
		result = parseInt(result)
		return result
	}
	
}

export default SalaryFlow