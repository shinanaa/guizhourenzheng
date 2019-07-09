/**
 * Created by qianggao on  2018/11/16
 */
const i = {
  loginOn: { url: 'login/login', isMock: true }, // 登录
  getGraduationRequire: { url: 'attestation/graduationRequire', isMock: true }, // 获取毕业要求列表
  addDialog: { url: 'attestation/addDialog', isMock: true }, // 添加表格数据
  editDialog: { url: 'attestation/editDialog', isMock: true }, // 编辑选中表格内容
  deleteDialog: { url: 'attestation/deleteDialog', isMock: true }, // 删除选中表格内容
  getSearchData: { url: 'attestation/getSearchData', isMock: true }, // 获取查询的数据
  mouthReport: { url: 'yunying/monthReport', isMock: false }, // 运营月度报告
  dailyRepayment: { url: 'yunying/dailyRepayment', isMock: false }, // 当日还款计划
  dailyStatistics: { url: 'yunying/dailyStatistics', isMock: false }, // 当日产品销售统计
  unrepayRecord: { url: 'yunying/unrepayRecord', isMock: false }, // 待收总览
  getLineData: { url: 'yunying/countDaily', isMock: false }, // 整点报数对比图
  getSourceCount: { url: 'yunying/sourceCountDaily', isMock: false }, // 充值提现信息
  getSourceFund: { url: 'yunying/sourceFundAndIncomeDaily', isMock: false }, // 应收本金收益
  getMaturityCont: { url: 'yunying/expireHistory', isMock: false }, // 到期明细
  getMaturityContPage: { url: 'yunying/expireHistoryPage', isMock: false } // 到期明细
}

export default i
