
class Flow {
	
	constructor(o) {
	    
	}
	
	assign() {
		let result = {
			summary: this.summary,
			date: this.date && this.date.format('YYYYMMDD'),
			amount: this.amount.toFixed(2),
			rest: this.rest.toFixed(2),
			location: this.location,
			target: this.target
		}
		return result
	}
	
}

export default Flow