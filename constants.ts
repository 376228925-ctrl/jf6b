import { FinancialMetric, Issue, StrategyItem, ActionPlan } from './types';

// 2025 Data - Financials
export const metrics2025: FinancialMetric[] = [
  { 
    label: '总营收 (Revenue)', 
    target: 2506.5, 
    actual: 2009.55, 
    unit: '万元', 
    status: 'danger',
    analysis: '达成率仅80.1%。主要受制于核心大客户缩编及新客户拓展落地滞后。' 
  },
  { 
    label: '毛利润 (Gross Profit)', 
    target: 300.33, 
    actual: 60.16, 
    unit: '万元', 
    status: 'danger',
    analysis: '达成率仅20%。主要归因于BPO业务严重亏损(-59万)及历史遗留赔偿金支出。'
  },
  { 
    label: 'BPO业务营收', 
    target: 0, 
    actual: 612.3, 
    unit: '万元', 
    status: 'success',
    analysis: '虽形成流水规模，但属于"有规模无质量"的增长，人效模型未跑通。'
  },
  { 
    label: 'BPO净利润', 
    target: 0, 
    actual: -59.0, 
    unit: '万元', 
    status: 'danger',
    analysis: '严重利润倒挂。低单价合同与高刚性人力成本的结构性矛盾爆发。'
  },
];

// 2026 Targets
export const metrics2026: FinancialMetric[] = [
  { label: '保底营收目标', target: 3536.95, actual: 0, unit: '万元', status: 'warning' },
  { label: '冲刺营收目标', target: 4421.18, actual: 0, unit: '万元', status: 'success' },
  { label: '保底利润目标', target: 579.77, actual: 0, unit: '万元', status: 'warning' },
  { label: '冲刺利润目标', target: 724.71, actual: 0, unit: '万元', status: 'success' },
];

// Detailed Analysis of 2025 Issues
export const keyIssues2025: Issue[] = [
  {
    id: '1',
    category: '财务经营 (Financial)',
    title: 'BPO业务线利润结构性坍塌',
    description: 'BPO业务虽然贡献了612万流水，但最终核算亏损59万，直接拉低了部门整体毛利。',
    rootCause: '1. 报价策略失误：2024年初为切入市场，采用了低于市场均价15%的渗透定价，但未预料到人力成本刚性上涨。\n2. 场地空置率高：武汉、西安交付中心扩建后，座位利用率长期低于65%。\n3. 管理半径过大：异地交付管理成本超标，差旅及远程沟通损耗严重。',
    impact: '直接导致部门年度净利归零，且占用了大量现金流（垫资周期长）。',
    severity: 'high',
    dataPoints: ['营收贡献: 612.3万', '净利润: -59.0万', '利润率: -9.6%']
  },
  {
    id: '2',
    category: '市场拓展 (Growth)',
    title: '核心客户依赖度过高与新拓败北',
    description: '营收达成率仅80%，主要源于对存量客户（如平安）的依赖，且新客户（网易、美团）切入失败。',
    rootCause: '1. 售前方案能力不足：在网易项目中，未能提供具有差异化的测试解决方案，仅停留在"卖人头"阶段。\n2. 资质壁垒：美团项目因缺乏同类大规模离岸交付案例被拒。\n3. 商务协同脱节：交付团队与销售团队信息拉通滞后，错失投标窗口期。',
    impact: '客户结构单一风险加剧，部门抗风险能力减弱。排名跌至公司第8位。',
    severity: 'high',
    dataPoints: ['网易项目: 竞标失败', '美团项目: 资质预审不通过', '目标达成率: 80%']
  },
  {
    id: '3',
    category: '成本控制 (Cost)',
    title: '非经营性人力成本失控',
    description: '全年产生15起离职赔偿/仲裁案件，总金额达57万，实际赔付45万。',
    rootCause: '1. 绩效管理证据链缺失：员工淘汰过程中，缺乏合规的PIP（绩效改进计划）记录，导致仲裁必败。\n2. 历史遗留问题：部分赔付源于2023年以前社保公积金欠缴的历史旧账。\n3. 待岗管理松懈：外包人员退场后，在"资源池"停留时间过长，产生无效薪资成本。',
    impact: '直接吞噬了约15%的年度毛利，严重影响部门ROI。',
    severity: 'medium',
    dataPoints: ['赔付总额: 57万', '实际支出: 45万', '案件数: 15起']
  },
  {
    id: '4',
    category: '交付运营 (Delivery)',
    title: '应收账款周转率低下',
    description: '新业务（如爱奇艺）出现长达67天的逾期回款现象。',
    rootCause: '1. 结算流程不清晰：合同中对于验收节点的定义模糊，导致客户以此为由拖延对账。\n2. 催收机制缺位：缺乏分级预警机制，往往等到逾期发生后才介入干预。',
    impact: '造成部门现金流紧张，增加了财务垫资成本。',
    severity: 'medium',
    dataPoints: ['爱奇艺逾期: 6.7万', '平均回款周期: 延误15天']
  }
];

// Detailed 2026 Strategy
export const strategy2026: StrategyItem[] = [
  {
    id: 's1',
    pillar: '存量稳盘 (Stabilize)',
    title: '构建"平安系"核心防御阵地',
    description: '在确保现有65+人力的基础上，通过提升交付SLA来筑高竞争壁垒，防止友商切入。',
    tactics: [
      '建立"24h快速补员"机制：搭建针对性的后备人才库，确保离职补员T+3到岗。',
      '实施"客户满意度(NPS)"季度巡检：主动发现服务痛点，将客诉消灭在萌芽状态。',
      '关键岗位（Key Role）加固：对项目经理、技术骨干实施专项激励。'
    ],
    kpi: '核心团队流失率 < 10%，客户满意度评分 > 4.5分'
  },
  {
    id: 's2',
    pillar: '降本增效 (Optimize)',
    title: 'BPO业务扭亏为盈专项行动',
    description: '通过场地整合、费率重议和人员结构优化，强制将BPO业务毛利拉回正值。',
    tactics: [
      '关停并转：Q1内关闭负毛利的西安三期交付中心，业务回流至总部或低成本驻点。',
      '价格重塑：与甲方重新谈判Unit Price，对不接受涨价的亏损项目坚决执行退场机制。',
      '技术降本：引入自动化测试工具（AutoTest）替代纯手工重复性人力，提升人效。'
    ],
    kpi: 'BPO毛利率 > 15%，场地空置率 < 10%'
  },
  {
    id: 's3',
    pillar: '增量突围 (Expand)',
    title: '泛娱乐行业(游戏/短剧)攻坚战',
    description: '依托腾讯TEG、百度SQC框架，重点突破高毛利的游戏测试与短剧审核业务。',
    tactics: [
      '建立"游戏专项交付组"：招聘具备游戏测试背景的专家Lead，提升方案专业度。',
      '全员营销(Referral)：利用内部推荐机制低成本获取商机，特别是吉致、爱奇艺等新赛道。',
      '案例包装：Q2前完成一份高质量的"泛娱乐行业交付白皮书"，用于打动新客户。'
    ],
    kpi: '新增游戏/泛娱乐类Headcount > 50人，新签合同额 > 1000万'
  },
  {
    id: 's4',
    pillar: '风控合规 (Compliance)',
    title: '用工风险"防火墙"建设',
    description: '从源头遏制非经营性赔偿支出，建立全周期的合规用工管理体系。',
    tactics: [
      '入职即合规：严格审查背调，签署明确的岗位KPI确认书。',
      '过程留痕：建立月度绩效面谈签字制度，为可能的优胜劣汰留存法律证据。',
      '资源池红线：设定待岗期上限（如7天），超时即启动转岗或协商解除流程。'
    ],
    kpi: '全年劳动仲裁案件 < 2起，赔偿金总额控制在营收的0.5%以内'
  }
];

// Detailed Action Matrix
export const actionPlan: ActionPlan[] = [
  {
    issueId: '1',
    category: '财务/盈利',
    issueTitle: 'BPO业务亏损 (-59万)',
    strategy: '止血复苏：成本重构与定价修正',
    milestones: [
      'Q1: 完成所有负毛利项目盘点，发出调价函。',
      'Q2: 关闭低效交付中心，完成人员分流。',
      'Q3: 引入自动化工具，降低10%人力成本。',
      'Q4: 实现单月净利回正。'
    ],
    owner: '交付总监 / 财务BP',
    risk: '客户拒绝调价导致合同终止 (风险预案：提前储备替换项目)',
    expectedOutcome: '2026年BPO业务毛利达到16%以上，净利转正。'
  },
  {
    issueId: '2',
    category: '合规/成本',
    issueTitle: '离职赔偿金过高 (57万)',
    strategy: '合规盾牌：全流程用工风险管控',
    milestones: [
      '1月: 发布《交付部门员工绩效管理规范V2.0》。',
      '3月: 完成所有在岗员工的绩效目标书补签。',
      '全年: 实施"红黄灯"预警，对绩效后10%员工提前介入辅导。'
    ],
    owner: 'HRBP / 项目经理',
    risk: '管理动作过硬引发员工抵触 (对策：加强情感关怀与面谈技巧培训)',
    expectedOutcome: '赔偿金总额同比下降50% (目标控制在20万以内)。'
  },
  {
    issueId: '3',
    category: '增长/市场',
    issueTitle: '营收增长乏力/新客拓展失败',
    strategy: '铁三角协同：售前+交付+招聘联动',
    milestones: [
      'Q1: 组建"攻坚项目组"，锁定百度/腾讯新财年预算。',
      'Q2: 落地1-2个游戏行业标杆案例。',
      'Q3: 冲刺双十一/年终旺季，扩大外包编制。'
    ],
    owner: '销售总监 / 交付负责人',
    risk: '竞品低价恶性竞争 (对策：强调交付质量SLA与已有的大厂背书)',
    expectedOutcome: '实现冲刺营收4421万，新客户占比提升至20%。'
  },
  {
    issueId: '4',
    category: '运营/回款',
    issueTitle: '应收账款逾期',
    strategy: '现金为王：结算流程标准化',
    milestones: [
      '每月5号: 强制完成上月工时对账。',
      '每月15号: 完成发票开具与寄送。',
      '逾期30天: 启动商务函催收。',
      '逾期60天: 启动服务暂停熔断机制。'
    ],
    owner: '项目助理 / 商务经理',
    risk: '客户内部流程繁琐 (对策：高层定期拜访客户财务/采购部门疏通)',
    expectedOutcome: 'DSO (应收账款周转天数) 控制在60天以内，逾期率 < 5%。'
  }
];

export const revenueData2025 = [
  { name: '目标 (Target)', value: 2506.5, fill: '#94a3b8' },
  { name: '实际 (Actual)', value: 2009.55, fill: '#3b82f6' },
];

export const profitData2025 = [
  { name: '目标 (Target)', value: 300.33, fill: '#94a3b8' },
  { name: '实际 (Actual)', value: 60.16, fill: '#ef4444' },
];

export const costStructureData = [
  { name: '人力成本 (Labor)', value: 77.93 },
  { name: '独立核算BU成本', value: 14.20 },
  { name: '交付运营费用', value: 3.84 },
  { name: '历史赔付/坏账', value: 1.45 },
  { name: '其他分摊', value: 2.58 },
];
