/**
 * Created by qianggao on  2018/11/16
 */
const i = {
  loginOn: { url: 'login/login', isMock: true }, // 登录
  getGraduationRequire: { url: 'attestation/graduationRequire', isMock: true }, // 获取毕业要求列表
  getRequireCourses: { url: 'attestation/getRequireCourses', isMock: true }, // 获取要求与课程列表
  getEligibility: { url: 'attestation/getEligibility', isMock: true }, // 获取合格标准列表
  getSetWeights: { url: 'attestation/getSetWeights', isMock: true }, // 获取设置权重列表
  getCourses: { url: 'attestation/getCourses', isMock: true }, // 获取设置权重弹框中列表
  getTrainTarget: { url: 'attestation/getTrainTarget', isMock: true }, // 获取培养目标列表
  getStandards: { url: 'attestation/getStandards', isMock: true }, // 获取认证标准列表
  addDialog: { url: 'attestation/addDialog', isMock: true }, // 添加表格数据
  editDialog: { url: 'attestation/editDialog', isMock: true }, // 编辑选中表格内容
  deleteDialog: { url: 'attestation/deleteDialog', isMock: true }, // 删除选中表格内容
  getSearchData: { url: 'attestation/getSearchData', isMock: true }, // 获取查询的数据
  getChooseData: { url: 'attestation/getChooseData', isMock: true }, // 获取学校/专业/学年列表
  getCourseManage: { url: 'course/getCourseManage', isMock: true }, // 获取课程管理页面数据
  getKnowledge: { url: 'course/getKnowledge', isMock: true }, // 获取章节知识点页面数据
  getIndicator: { url: 'course/getIndicator', isMock: true }, // 获取对应指标点页面数据
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
