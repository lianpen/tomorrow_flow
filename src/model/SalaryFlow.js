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
		this.location = '中国建设银行股份有限公司上海分行'
		this.target = '欧游酒店管理（上海）有限公司'
	}
	
	getMoney(salary) {
		let result = (1 - FLOAT_RATE + Math.random() * 2 * FLOAT_RATE) * salary
		result = parseInt(result)
		let month = this.date.month()
		/**
		 * 年终3薪
		 */
		if (month == 9) {
			result -= 5000
		}
		return result
	}
	
}

export default SalaryFlow