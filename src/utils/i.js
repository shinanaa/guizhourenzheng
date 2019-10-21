/**
 * Created by qianggao on  2018/11/16
 */
const i = {
  loginOn: { url: 'login/login', isMock: false }, // 登录
  getGraduationRequire: { url: 'attestation/graduationRequire', isMock: false }, // 获取毕业要求列表
  getRequireCourses: { url: 'attestation/getRequireCourses', isMock: false }, // 获取要求与课程列表
  getEligibility: { url: 'attestation/getEligibility', isMock: false }, // 获取合格标准列表
  getSetWeights: { url: 'attestation/getSetWeights', isMock: false }, // 获取设置权重列表
  setWeights: { url: 'attestation/setWeights', isMock: false }, // 提交设置的权重
  getCourses: { url: 'attestation/getCourses', isMock: false }, // 获取设置权重弹框中列表
  getTrainTarget: { url: 'attestation/getTrainTarget', isMock: false }, // 获取培养目标列表
  getStandards: { url: 'attestation/getStandards', isMock: false }, // 获取认证标准列表
  addDialog: { url: 'attestation/addDialog', isMock: false }, // 添加表格数据
  editDialog: { url: 'attestation/editDialog', isMock: false }, // 编辑选中表格内容
  deleteDialog: { url: 'attestation/deleteDialog', isMock: false }, // 删除选中表格内容
  getSearchData: { url: 'attestation/getSearchData', isMock: false }, // 获取查询的数据
  getChooseData: { url: 'attestation/getChooseData', isMock: false }, // 获取学校/专业/学年列表
  getCourseManage: { url: 'course/getCourseManage', isMock: false }, // 获取课程管理页面数据
  getKnowledge: { url: 'course/getKnowledge', isMock: false }, // 获取章节知识点页面数据
  getKnowledgeDetails: { url: 'course/knowledge/setKnowledge', isMock: false }, // 获取章节知识点下知识点详情的数据
  editKnowledge: { url: 'course/knowledge/editKnowledge', isMock: false }, // 修改知识点详情数据
  getIndicator: { url: 'course/getIndicator', isMock: false }, // 获取对应指标点页面数据
  getCourseData: { url: 'course/target/getCourseData', isMock: false }, // 获取课程安排页面课程选择列表
  getCoursesTarget: { url: 'course/target/getCoursesTarget', isMock: false }, // 获取课程安排页面课程目标标签页下的内容
  getCoursesModule: { url: 'course/target/getCoursesModule', isMock: false }, // 获取课程安排页面课程模块标签页下的内容
  getCoursesContent: { url: 'course/target/getCoursesContent', isMock: false }, // 获取课程安排页面课程内容标签页下的内容
  getCoursesCheck: { url: 'course/target/getCoursesCheck', isMock: false }, // 获取课程安排页面考核要点标签页下的内容
  getCoursesStandard: { url: 'course/target/getCoursesStandard', isMock: false }, // 获取课程安排页面考评分标准标签页下的内容
  getCoursesForm: { url: 'course/getCoursesForm', isMock: false }, // 获取课程组成页面数据
  setCourseDispose: { url: 'course/setCourseDispose', isMock: false }, // 课程组成页面设置课程配置
  getCourseDetails: { url: 'course/getCourseDetails', isMock: false }, // 获取课程组成页面查看详情的数据内容
  getPeaseDetails: { url: 'statistics/getPeaseDetails', isMock: false }, // 获取课程组成详情页的平时成绩详情内容
  // getRequireAchievement: { url: 'statistics/getRequireAchievement', isMock: false }, // 获取毕业要求达成度页面数据
  getRequireAchievement: { url: 'statistics/getRequireAchievementNormal', isMock: false }, // 获取毕业要求达成度页面数据
  getRequireDetails: { url: 'statistics/getRequireDetails', isMock: false }, // 获取毕业要求达成度页面中每一个毕业要求对应的数据
  // getStatisticsStandards: { url: 'statistics/getStatisticsStandards', isMock: false }, // 获取博野要求达成度页面专业想对应的合格标准数据
  getAchievementTable: { url: 'statistics/getAchievementTable', isMock: false }, // 获取要求达成度计算表页面数据
  getCourseAchievement: { url: 'statistics/getCourseAchievement', isMock: false }, // 获取课程达成度页面表格数据
  getCourseAchievementDetails: { url: 'statistics/getCourseAchievementDetails', isMock: false }, // 获取课程达成度详情表格数据
  getExamManage: { url: 'getExamManagement/getExamManagement', isMock: false } // 获取考试管理页面数据
  // mouthReport: { url: 'yunying/monthReport', isMock: false }, // 运营月度报告
  // dailyRepayment: { url: 'yunying/dailyRepayment', isMock: false }, // 当日还款计划
  // dailyStatistics: { url: 'yunying/dailyStatistics', isMock: false }, // 当日产品销售统计
  // unrepayRecord: { url: 'yunying/unrepayRecord', isMock: false }, // 待收总览
  // getLineData: { url: 'yunying/countDaily', isMock: false }, // 整点报数对比图
  // getSourceCount: { url: 'yunying/sourceCountDaily', isMock: false }, // 充值提现信息
  // getSourceFund: { url: 'yunying/sourceFundAndIncomeDaily', isMock: false }, // 应收本金收益
  // getMaturityCont: { url: 'yunying/expireHistory', isMock: false }, // 到期明细
  // getMaturityContPage: { url: 'yunying/expireHistoryPage', isMock: false } // 到期明细
}

export default i
