import Flow from './Flow'

class ConsumeFlow extends Flow {
	
	constructor(o) {
		super()
		this.parse(o)
	}
	
	parse(o) {
		this.summary = '消费退货'
		this.date = o.date.clone()
		this.amount = parseInt(Math.random() * 100)
		this.rest = o.moneyBefore + this.amount
		this.location = '中国建设银行股份有限公司上海分行运行中心'
	}
	
}

export default ConsumeFlow