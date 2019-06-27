<template>
	<div class="c-print" :style='{ width: 800 }' v-if='tableData'>
		<div class="l-seal">
			<seal
				:width='160'
				:height='160'
				:startAngle='-100'
				:endAngle='100'
				:fontSize='16'
				fontFamily='汉仪长宋简'
				color='#d02d2d'
				company='中国建设银行股份有限公司上海高化支行'>
			</seal>
		</div>
		<div class="l-title">
			<h3>
				中国建设银行个人账户收入交易明细
			</h3>
		</div>
		<div class='l-subTitle'>
			<span>卡号/帐号：6217001210075271237</span>
			<span>客户名称：惠连鹏</span>
			<span>币别：人命币元</span>
			<span>钞汇标志：钞</span>
			<span>起始日期：2019年04月09日</span>
			<span>截止日期：2019年10月09日</span>
		</div>
		<div class="l-table">
			<el-table :data='tableData' border
				:width='800'>
			  <el-table-column
				prop="index"
				label=""
						width="27" />
			  <el-table-column
				prop="summary"
				label="摘要"
						width="70" />
			  <el-table-column
				prop="date"
				label="交易日期"
						width="64" />
			  <el-table-column
				prop="amount"
				label="交易金额"
						width="96" />
			  <el-table-column
				prop="rest"
				label="账户金额"
						width="110"  />
			  <el-table-column
				prop="location"
				label="交易地点/附言"
						width="176"  />
			  <el-table-column
				prop="target"
				label="对方账号和户名"
					width="256"  />
			</el-table>
		</div>
  </div>
</template>

<script>
	
import Account from '../model/Account'
import SalaryFlow from '../model/SalaryFlow'
import InterestFlow from '../model/InterestFlow.js'
import ConsumeFlow from '../model/ConsumeFlow.js'
import moment from 'moment'
import Seal from './seal/Seal.vue'
	
let fontListStr = `ACaslonPro-Bold,ACaslonPro-BoldItalic,ACaslonPro-Italic,ACaslonPro-Regular,ACasl
onPro-Semibold,ACaslonPro-SemiboldItalic,AdobeArabic-Bold,AdobeArabic-BoldItalic
,AdobeArabic-Italic,AdobeArabic-Regular,AdobeDevanagari-Bold,AdobeDevanagari-Bol
dItalic,AdobeDevanagari-Italic,AdobeDevanagari-Regular,AdobeFangsongStd-Regular,
AdobeFanHeitiStd-Bold,AdobeGothicStd-Bold,AdobeHebrew-Bold,AdobeHebrew-BoldItali
c,AdobeHebrew-Italic,AdobeHebrew-Regular,AdobeHeitiStd-Regular,AdobeKaitiStd-Reg
ular,AdobeMingStd-Light,AdobeMyungjoStd-Medium,AdobeNaskh-Medium,AdobeSongStd-Li
ght,AGaramondPro-Bold,AGaramondPro-BoldItalic,AGaramondPro-Italic,AGaramondPro-R
egular,ahronbd,andlso,angsa,angsab,angsai,angsau,angsaub,angsaui,angsauz,angsaz,
aparaj,aparajb,aparajbi,aparaji,arabtype,arial,arialbd,arialbi,ariali,ariblk,Axu
reHandwriting-Bold,AxureHandwriting-BoldItalic,AxureHandwriting-Italic,AxureHand
writing,batang,BirchStd,BlackoakStd,browa,browab,browai,browau,browaub,browaui,b
rowauz,browaz,BrushScriptStd,calibri,calibrib,calibrii,calibril,calibrili,calibr
iz,cambria,cambriab,cambriai,cambriaz,Candara,Candarab,Candarai,Candaraz,Chaparr
alPro-Bold,ChaparralPro-BoldIt,ChaparralPro-Italic,ChaparralPro-LightIt,Chaparra
lPro-Regular,CharlemagneStd-Bold,comic,comicbd,consola,consolab,consolai,consola
z,constan,constanb,constani,constanz,CooperBlackStd-Italic,CooperBlackStd,corbel
,corbelb,corbeli,corbelz,cordia,cordiab,cordiai,cordiau,cordiaub,cordiaui,cordia
uz,cordiaz,cour,courbd,courbi,coure,couri,daunpenh,david,davidbd,DejaVuSansMono-
BoldOblique_0,DejaVuSansMono-Bold_0,DejaVuSansMono-Oblique_0,DejaVuSansMono_0,do
kchamp,ebrima,ebrimabd,estre,euphemia,framd,framdit,frank,Gabriola,gautami,gauta
mib,georgia,georgiab,georgiai,georgiaz,GiddyupStd,gisha,gishabd,gulim,himalaya,H
oboStd,impact,iskpota,iskpotab,kaiu,kalinga,kalingab,kartika,kartikab,KhmerUI,Kh
merUIb,kokila,kokilab,kokilabi,kokilai,KozGoPr6N-Bold,KozGoPr6N-ExtraLight,KozGo
Pr6N-Heavy,KozGoPr6N-Light,KozGoPr6N-Medium,KozGoPr6N-Regular,KozGoPro-Bold,KozG
oPro-ExtraLight,KozGoPro-Heavy,KozGoPro-Light,KozGoPro-Medium,KozGoPro-Regular,K
ozMinPr6N-Bold,KozMinPr6N-ExtraLight,KozMinPr6N-Heavy,KozMinPr6N-Light,KozMinPr6
N-Medium,KozMinPr6N-Regular,KozMinPro-Bold,KozMinPro-ExtraLight,KozMinPro-Heavy,
KozMinPro-Light,KozMinPro-Medium,KozMinPro-Regular,LaoUI,LaoUIb,latha,lathab,lee
lawad,leelawdb,LetterGothicStd-Bold,LetterGothicStd-BoldSlanted,LetterGothicStd-
Slanted,LetterGothicStd,LithosPro-Black,LithosPro-Regular,lucon,lvnm,lvnmbd,l_10
646,majalla,majallab,malgun,malgunbd,mangal,mangalb,meiryo,meiryob,MesquiteStd,m
icross,mingliu,mingliub,MinionPro-Bold,MinionPro-BoldCn,MinionPro-BoldCnIt,Minio
nPro-BoldIt,MinionPro-It,MinionPro-Medium,MinionPro-MediumIt,MinionPro-Regular,M
inionPro-Semibold,MinionPro-SemiboldIt,modern,monbaiti,moolbor,mriam,mriamc,msgo
thic,msjh,msjhbd,msmincho,msuighur,msyh,msyhbd,msyi,MTExtra,mvboli,MyriadArabic-
Bold,MyriadArabic-BoldIt,MyriadArabic-It,MyriadArabic-Regular,MyriadHebrew-Bold,
MyriadHebrew-BoldIt,MyriadHebrew-It,MyriadHebrew-Regular,MyriadPro-Bold,MyriadPr
o-BoldCond,MyriadPro-BoldCondIt,MyriadPro-BoldIt,MyriadPro-Cond,MyriadPro-CondIt
,MyriadPro-It,MyriadPro-Regular,MyriadPro-Semibold,MyriadPro-SemiboldIt,nrkis,nt
ailu,ntailub,NuevaStd-Bold,NuevaStd-BoldCond,NuevaStd-BoldCondItalic,NuevaStd-Co
nd,NuevaStd-CondItalic,NuevaStd-Italic,nyala,OCRAStd,OratorStd-Slanted,OratorStd
,pala,palab,palabi,palai,phagspa,phagspab,plantc,PoplarStd,PrestigeEliteStd-Bd,p
rintFont,raavi,raavib,rod,roman,RosewoodStd-Regular,script,segoepr,segoeprb,sego
esc,segoescb,segoeui,segoeuib,segoeuii,segoeuil,segoeuiz,seguisb,seguisym,serife
,Shonar,Shonarb,shruti,shrutib,simfang,simhei,simkai,simpbdo,simpfxo,simpo,simsu
n,simsunb,smalle,sserife,StencilStd,svgafix,svgasys,sylfaen,symbol,tahoma,tahoma
bd,taile,taileb,TektonPro-Bold,TektonPro-BoldCond,TektonPro-BoldExt,TektonPro-Bo
ldObl,times,timesbd,timesbi,timesi,tradbdo,trado,TrajanPro-Bold,TrajanPro-Regula
r,trebuc,trebucbd,trebucbi,trebucit,tunga,tungab,upcdb,upcdbi,upcdi,upcdl,upceb,
upcebi,upcei,upcel,upcfb,upcfbi,upcfi,upcfl,upcib,upcibi,upcii,upcil,upcjb,upcjb
i,upcji,upcjl,upckb,upckbi,upcki,upckl,upclb,upclbi,upcli,upcll,utsaah,utsaahb,u
tsaahbi,utsaahi,Vani,Vanib,verdana,verdanab,verdanai,verdanaz,vga936,vijaya,vija
yab,vrinda,vrindab,webdings,wingding,方正粗黑宋简体,汉仪长宋简
`
	
const FONT_FAMILY_LIST = fontListStr.split(',')

export default {
	components: {
		seal: Seal
	},
	name: 'Print',
	props: {
		startTime: String,
		startMoney: Number,
		endTime: String,
		salary: Number,
		rewardDate: Number
	},
	data() {
		return {
			money: 0,
			flowList: [],
			tableData: []
		}
	},
	created() {
		this.money = this.startMoney
		let startMoment = moment(this.startTime, 'YYYYMMDD')
		let endMoment = moment(this.endTime, 'YYYYMMDD')
		let momentPointer = startMoment.clone()
		while(momentPointer.isBefore(endMoment)) {
			this._handleDate(momentPointer)
			momentPointer.add(1, 'd')
		}
		let incomeFlowList = this.flowList.filter(flow => flow.amount > 0)
		this.tableData = incomeFlowList.map(flow => flow.assign())
	},
	methods: {
		/**
		 * 单日处理
		 * 1. 36912月21日 发放利息
		 * 2. 每日随机消费50-150元
		 * 3. 每月15号发工资
		 */
		_handleDate(momentPointer) {
			this._handleInterest(momentPointer)
			this._handleConsume(momentPointer)
			this._handleSalary(momentPointer)
		},
		/**
		 * 利息 36912月21日 利率0.3%
		 */
		_handleInterest(momentPointer) {
			let month = momentPointer.month()
			let date = momentPointer.date()
			const INTEREST_DATE = 21
			const INTEREST_MONTH_LIST = [3, 6, 9, 12]
			let hit = (
				date == INTEREST_DATE 
				&&
				INTEREST_MONTH_LIST.includes(month + 1)
			) 
			if (!hit) return
			let flow = new InterestFlow({
				date: momentPointer,
				moneyBefore: this.money
			})
			this.money += flow.amount
			this.flowList.push(flow)
		},
		/**
		 * 工资
		 */
		_handleSalary(momentPointer) {
			if (momentPointer.date() == this.rewardDate) {
				let flow = new SalaryFlow({
					date: momentPointer,
					salary: this.salary,
					moneyBefore: this.money
				})
				this.money += flow.amount
				this.flowList.push(flow)
			}
		},
		/**
		 * 消费
		 */
		_handleConsume(momentPointer) {
			let flow = new ConsumeFlow({
				date: momentPointer,
				moneyBefore: this.money
			})
			this.money += flow.amount
			this.flowList.push(flow)
		}
		
	}
}

</script>

<style lang='stylus'>
#p-print
	.c-print
		transform: scale(.9)
		font-size: 12px
		font-family: monospace
		color: #000
		line-height: 1
		.l-title
			h3
				text-align: center
				margin-bottom: 20px
				font-size: 17px
				line-height: 1
		.l-subTitle
			margin-bottom: 10px
			span
				margin-right: 10px
		.l-table
			table
				background: none
				border-color: #000
				tr
					background: none
					border-color: #000
					th
						height: 34px
						background: none
					td
						height: 32px
					td, th
						font-weight: normal
						color: #000
						border-color: #000
						padding: 0
						div
							padding: 0
			.el-table 
				color: #000
				border-color: #000
				font-size: 12px
				background: none
			.el-table:before, .el-table:after
				background-color: #000
</style>
