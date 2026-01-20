import { FinancialMetric, Issue, StrategyItem, ActionPlan, CompetitorData } from './types';

// 2025 Financial Performance - Updated based on report
export const metrics2025: FinancialMetric[] = [
  { 
    label: '总营收', 
    target: 2506.5, 
    actual: 2009.55, 
    unit: '万元', 
    status: 'danger', 
    analysis: '达成率80.1% (含预营收154万)。绩效排名：4。主要受存量大客户依赖及新客落地滞后影响。' 
  },
  { 
    label: '毛利润', 
    target: 300.33, 
    actual: 60.16, 
    unit: '万元', 
    status: 'danger',
    analysis: '达成率20% (含预毛利21万)。绩效排名：10。BPO亏损(-59万)与历史赔付(45万)是主要拖累。'
  },
  { 
    label: 'BPO业务营收', 
    target: 0, 
    actual: 612.3, 
    unit: '万元', 
    status: 'success',
    analysis: '从0到600万+的突破，但属于"有规模无质量"的增长，集中在百度ACG等业务。'
  },
  { 
    label: 'BPO净利润', 
    target: 0, 
    actual: -59.0, 
    unit: '万元', 
    status: 'danger',
    analysis: '严重利润倒挂。主要受人力成本、房租及折旧摊销影响，尚未跑通盈利模型。'
  },
];

// 2026 Targets - Updated based on new attachment data
export const metrics2026: FinancialMetric[] = [
  { label: '保底营收目标', target: 3188.39, actual: 0, unit: '万元', status: 'warning' },
  { label: '冲刺营收目标', target: 3985.48, actual: 0, unit: '万元', status: 'success' },
  { label: '保底毛利润', target: 499.24, actual: 0, unit: '万元', status: 'warning' },
  { label: '冲刺毛利润', target: 624.05, actual: 0, unit: '万元', status: 'success' },
];

// Competitor Analysis Data - Updated rankings based on slides 9 & 10
export const competitorAnalysis: CompetitorData[] = [
  {
    client: '平安产险 (ITO)',
    ourHeadcount: 65,
    ourRank: 2,
    topCompetitorName: '中软国际',
    topCompetitorHeadcount: 87,
    totalCompetitors: 8,
    trend: 'up',
    description: '我司排名第2 (65人)，仅次于中软(87人)，优于拓保(55人)、紫川(53人)与法本(52人)。同比去年增加1人，稳住了核心盘。'
  },
  {
    client: '爱奇迹 (ITO)',
    ourHeadcount: 5,
    ourRank: 3,
    topCompetitorName: '友商1',
    topCompetitorHeadcount: 19,
    trend: 'stable',
    description: '目前排名第3 (5人)，较去年排名持平。友商1(19人)与友商2(14人)占据主要份额，需寻找差异化突破口。'
  },
  {
    client: '百度BPO-乌镇基地',
    ourHeadcount: 106,
    ourRank: 3,
    topCompetitorName: '嘉兴中穆',
    topCompetitorHeadcount: 118,
    trend: 'up',
    description: '今年新落地基地，迅速扩充至106人(系统在职)，排名第3。与第一名差距极小，具备冲击头部潜力。'
  },
  {
    client: '百度BPO-韶关基地',
    ourHeadcount: 36,
    ourRank: 3,
    topCompetitorName: '中穆',
    topCompetitorHeadcount: 59,
    trend: 'up',
    description: '4月入场时排名第6(19人)，年末攀升至第3(36人)，成长速度快于众蚁、威尔达等友商。'
  },
  {
    client: '百度BPO-湛江基地',
    ourHeadcount: 31,
    ourRank: 3, // Assuming rank 3 based on list position in slide 10 (rank 2 visually but listed after others)
    topCompetitorName: '中炎',
    topCompetitorHeadcount: 34,
    trend: 'up',
    description: '4月入场10人排名第7，现攀升至30人+，目前排名靠前。'
  }
];

// Detailed Analysis of 2025 Issues
export const keyIssues2025: Issue[] = [
  {
    id: '1',
    category: '财务/经营',
    title: 'BPO业务增收不增利',
    description: 'BPO全年营收612.3万，但最终核算亏损59万。月度数据显示，自2025年4月起亏损显著扩大。',
    rootCause: '1. 成本结构失衡：人力成本(2433W/月峰值)与房租/折旧等固定支出未能被低单价覆盖。\n2. 基地分散：多地运营(漳州/乌镇/韶关等8地)导致管理半径过长，运营磨合期成本高。\n3. 商业模式：处于"拿规模"阶段，采用了激进定价策略。',
    impact: '拉低整体毛利率至2.9%，导致部门绩效毛利排名全公司倒数(第10)。',
    severity: 'high',
    dataPoints: ['营收: 612.3万', '利润: -59万', '4月单月亏损: -28万']
  },
  {
    id: '2',
    category: '成本/合规',
    title: '非经营性成本(赔偿)高企',
    description: '全年涉及赔偿15人，应赔付57万，实际赔付45万。',
    rootCause: '1. 历史遗留：包含员工公积金追溯(15.5%)及闲置员工社保追缴(23%)。\n2. 人员结构调整：为优化BPO成本进行的人员替换产生的N+1成本。\n3. 员工关怀不足：部分争议未能通过沟通化解，直接转化为仲裁成本。',
    impact: '虽然通过谈判节省了12万(21%)，但45万的绝对值依然侵蚀了约15%的年度目标毛利。',
    severity: 'medium',
    dataPoints: ['案件: 15起', '实际赔付: 45万', '历史追溯占比: ~38%']
  },
  {
    id: '3',
    category: '市场/拓展',
    title: '关键战役失利',
    description: '网易、美团、腾讯PCG等年度框架招标未中选。',
    rootCause: '1. 网易项目：受24年被执行人事件影响，导致25年1月框招未中选。\n2. 美团项目：因缺乏大规模相关离岸交付经验，放弃招标或未通过。\n3. 腾讯PCG：H5项目框架招采未中选。',
    impact: '导致过度依赖平安系(占比75%+)存量业务，抗风险能力未有实质提升。',
    severity: 'high',
    dataPoints: ['网易: 落选', '美团: 放弃', '平安占比: >75%']
  },
  {
    id: '4',
    category: '交付/运营',
    title: '交付模式被动与回款风险',
    description: '团队思维停留在"接单-派人"，且出现新客户回款逾期风险（爱奇迹逾期6.7万）。',
    rootCause: '1. 缺乏"专家系统"沉淀，过于依赖个人经验，新人上手慢。\n2. 合作思维局限：仅视自己为甲方的"手脚"。\n3. 流程衔接：新增供应商流程未跑通导致回款滞后。',
    impact: '客户粘性低，容易被低价竞品替代；资金周转压力增加。',
    severity: 'medium',
    dataPoints: ['SOP文档: 缺失', '爱奇迹逾期: 6.7万']
  }
];

// Detailed 2026 Strategy
export const strategy2026: StrategyItem[] = [
  {
    id: 's1',
    pillar: '存量稳盘',
    title: '平安系与百度众测基本盘',
    description: '平安产险维持65+人规模，百度众测目标冲刺800人。',
    tactics: [
      '平安产险：紧盯"理赔共同资源"与"数据智能"组的增量需求，维持排名第2优势。',
      '百度众测：重点投入自驾项目，利用芜湖/沈阳新基地扩充规模。',
      '爱奇迹/极致游戏：推动客户技术研发岗位26年6月前回迁深圳，目标合计40人。'
    ],
    kpi: '平安系营收 > 1900万; 百度BPO毛利率 > 20%'
  },
  {
    id: 's2',
    pillar: '增量突围',
    title: '腾讯TEG与百度SQC新赛道',
    description: '依托新获取的框架或入库资格，实现BPO业务的规模化复制。',
    tactics: [
      '腾讯TEG：3月通过集采获取入驻资格，复制百度BPO经验，目标100人。',
      '百度SQC：1月依托ACG线牵线引入，切入大模型与萝卜快跑业务，目标100人。',
      '渠道拓展：通过内部推荐与校招，降低对昂贵招聘渠道的依赖。'
    ],
    kpi: '新增BPO人数 > 200人; 新客户营收贡献 > 450万'
  },
  {
    id: 's3',
    pillar: '效能升级',
    title: 'AI驱动与顾问式转型',
    description: '摆脱单纯的"人力租赁"模式，向"解决方案专家"转型。利用AI工具重塑交付SOP。',
    tactics: [
      '工具赋能：强制推行AI编程/测试助手，提升单兵作战效率，释放创造力。',
      '知识沉淀：建立垂直领域知识库(Expert System)，输出行业解决方案白皮书。',
      '角色转型：设立"Prompt Engineer"岗位，从"被动接单"转向"主动诊断"。'
    ],
    kpi: '核心骨干AI工具覆盖率100%; 建立标准SOP体系'
  },
  {
    id: 's4',
    pillar: '利润优化',
    title: 'BPO扭亏与人效提升',
    description: '从"规模优先"转向"利润优先"，重构成本模型。',
    tactics: [
      '计件制改革：百度BPO推行(客户结算-平台成本)*0.8的薪酬模式，锁定20%毛利。',
      '基地优化：重点扶植东莞、韶关等低成本高效能基地，缩减高成本站点。',
      '薪酬控制：严格控制计时项目底薪(2100)与补贴结构，杜绝无效人力成本。'
    ],
    kpi: 'BPO净利转正; 整体毛利率达到16.39%'
  }
];

// Detailed Action Matrix
export const actionPlan: ActionPlan[] = [
  {
    issueId: '1',
    category: 'BPO运营',
    issueTitle: 'BPO业务严重亏损',
    strategy: '模式重构：计时转计件+基地优选',
    milestones: [
      'Q1: 完成百度众测计件制薪酬改革，锁定20%毛利空间。',
      'Q2: 落地芜湖/沈阳新基地，低成本置换高成本人力。',
      '全年: 严格执行(客户结算-平台成本)*0.8的结算公式。'
    ],
    owner: '交付总监/王峰',
    risk: '员工对新薪酬模式抵触 (对策：超额绩效补贴50%激励高产出)',
    expectedOutcome: 'BPO业务毛利贡献 > 320万 (目标323万)'
  },
  {
    issueId: '3',
    category: '能力转型',
    issueTitle: '交付模式被动/SOP缺失',
    strategy: '数智化升级：AI+标准化体系',
    milestones: [
      'Q1: 搭建内部AI工具库，开展全员AI技能培训。',
      'Q2: 完成BPO业务标准SOP文档(面试/入场/交付)编写。',
      'Q3: 试点"顾问式交付"，产出1份高质量行业解决方案。'
    ],
    owner: '技术负责人/交付经理',
    risk: '团队惯性思维难改变 (对策：树立标杆案例，绑定绩效考核)',
    expectedOutcome: '交付效率提升20%，建立知识资产库。'
  },
  {
    issueId: '2',
    category: '市场拓展',
    issueTitle: '新客户(腾讯/百度SQC)进入',
    strategy: '借船出海：利用集采与友商关系',
    milestones: [
      '1月: 百度SQC通过ACG线牵线引入。',
      '3月: 腾讯TEG通过集采获取入驻资格，明确进驻标准。',
      '5月: 腾讯TEG首批20人入场。'
    ],
    owner: '方正/唐总',
    risk: '入库流程繁琐延期 (对策：前期可挂靠友商先做业务)',
    expectedOutcome: '新增营收 > 450万 (腾讯250万+百度SQC 200万)'
  },
  {
    issueId: '4',
    category: '人力成本',
    issueTitle: '赔偿金/非经营成本过高',
    strategy: '合规前置：源头降本',
    milestones: [
      'Q1: 完成所有存量员工合同/绩效书换签。',
      '全年: 严格执行PIP证据链留存，降低仲裁败诉率。'
    ],
    owner: 'HRBP',
    risk: '员工流动性增加 (对策：加强员关，处理历史社保遗留问题)',
    expectedOutcome: '赔偿金额控制在营收0.5%以内。'
  }
];

export const costStructureData = [
  { name: '人力成本', value: 77.93 },
  { name: '独立BU成本', value: 14.20 },
  { name: '交付团队成本', value: 3.84 },
  { name: '历史赔付', value: 1.45 },
  { name: '报销/福利', value: 1.64 }, 
  { name: '招聘/资产', value: 0.21 },
  { name: '收购成本', value: 0.73 }
];

export const bpoTrendData = [
  { month: '24-12', revenue: 16.1, profit: -12.2 },
  { month: '25-01', revenue: 20.5, profit: -6.8 },
  { month: '25-02', revenue: 18.0, profit: -4.9 },
  { month: '25-03', revenue: 32.6, profit: -10.6 },
  { month: '25-04', revenue: 30.6, profit: -28.4 },
  { month: '25-05', revenue: 37.8, profit: -35.3 },
  { month: '25-06', revenue: 51.6, profit: -19.1 },
  { month: '25-07', revenue: 71.2, profit: -4.6 },
  { month: '25-08', revenue: 58.9, profit: -7.1 },
  { month: '25-09', revenue: 66.1, profit: 10.4 },
  { month: '25-10', revenue: 71.2, profit: 17.5 },
  { month: '25-11', revenue: 77.9, profit: 22.6 },
  { month: '25-12', revenue: 78.7, profit: 19.6 }
];

// Detailed Composite Data for 2026 Forecast
export const detailedMonthlyData2026 = [
  {
    month: '1月',
    revenue: 231.13, cost: 195.33, profit: 35.80, margin: 15.49,
    projects: [
      { name: '爱奇迹', revenue: 8.45, cost: 7.67, profit: 0.78, margin: 9.23 },
      { name: '极致游戏', revenue: 0, cost: 0, profit: 0, margin: 0 },
      { name: '百度众测', revenue: 82.17, cost: 65.73, profit: 16.43, margin: 20.00 },
      { name: '平安产险', revenue: 140.51, cost: 121.92, profit: 18.58, margin: 13.23 }
    ]
  },
  {
    month: '2月',
    revenue: 179.60, cost: 175.58, profit: 4.02, margin: 2.24,
    projects: [
      { name: '爱奇迹', revenue: 9.10, cost: 8.26, profit: 0.84, margin: 9.23 },
      { name: '极致游戏', revenue: 0, cost: 0, profit: 0, margin: 0 },
      { name: '百度众测', revenue: 56.74, cost: 45.39, profit: 11.34, margin: 20.00 },
      { name: '平安产险', revenue: 113.74, cost: 121.92, profit: -8.17, margin: -7.19 }
    ]
  },
  {
    month: '3月',
    revenue: 255.95, cost: 210.35, profit: 45.60, margin: 17.82,
    projects: [
      { name: '爱奇迹', revenue: 10.39, cost: 9.43, profit: 0.95, margin: 9.23 },
      { name: '极致游戏', revenue: 3.75, cost: 3.12, profit: 0.62, margin: 16.67 },
      { name: '百度众测', revenue: 87.90, cost: 70.32, profit: 17.58, margin: 20.00 },
      { name: '平安产险', revenue: 153.89, cost: 127.46, profit: 26.42, margin: 17.17 }
    ]
  },
  {
    month: '4月',
    revenue: 307.09, cost: 251.99, profit: 55.10, margin: 17.94,
    projects: [
      { name: '爱奇迹', revenue: 12.99, cost: 11.79, profit: 1.19, margin: 9.23 },
      { name: '极致游戏', revenue: 9.60, cost: 8.00, profit: 1.60, margin: 16.67 },
      { name: '百度众测', revenue: 121.68, cost: 97.34, profit: 24.33, margin: 20.00 },
      { name: '平安产险', revenue: 162.81, cost: 134.85, profit: 27.96, margin: 17.17 }
    ]
  },
  {
    month: '5月',
    revenue: 317.45, cost: 279.51, profit: 37.94, margin: 11.95,
    projects: [
      { name: '爱奇迹', revenue: 13.57, cost: 12.31, profit: 1.25, margin: 9.23 },
      { name: '极致游戏', revenue: 14.85, cost: 12.37, profit: 2.47, margin: 16.67 },
      { name: '百度众测', revenue: 140.71, cost: 112.56, profit: 28.14, margin: 20.00 },
      { name: '平安产险', revenue: 148.31, cost: 142.24, profit: 6.07, margin: 4.10 }
    ]
  },
  {
    month: '6月',
    revenue: 342.71, cost: 281.81, profit: 60.90, margin: 17.77,
    projects: [
      { name: '爱奇迹', revenue: 17.61, cost: 15.98, profit: 1.62, margin: 9.23 },
      { name: '极致游戏', revenue: 17.10, cost: 14.25, profit: 2.85, margin: 16.67 },
      { name: '百度众测', revenue: 125.11, cost: 100.08, profit: 25.02, margin: 20.00 },
      { name: '平安产险', revenue: 182.88, cost: 151.47, profit: 31.40, margin: 17.17 }
    ]
  },
  {
    month: '7月',
    revenue: 332.51, cost: 267.37, profit: 65.15, margin: 19.59,
    projects: [
      { name: '爱奇迹', revenue: 20.79, cost: 18.87, profit: 1.91, margin: 9.23 },
      { name: '极致游戏', revenue: 18.52, cost: 15.43, profit: 3.08, margin: 16.67 },
      { name: '百度众测', revenue: 99.64, cost: 79.71, profit: 19.92, margin: 20.00 },
      { name: '平安产险', revenue: 193.53, cost: 153.32, profit: 40.20, margin: 20.77 }
    ]
  },
  {
    month: '8月',
    revenue: 408.12, cost: 341.80, profit: 66.33, margin: 16.25,
    projects: [
      { name: '爱奇迹', revenue: 23.39, cost: 21.23, profit: 2.15, margin: 9.23 },
      { name: '极致游戏', revenue: 20.25, cost: 16.87, profit: 3.37, margin: 16.67 },
      { name: '百度众测', revenue: 185.64, cost: 148.51, profit: 37.12, margin: 20.00 },
      { name: '平安产险', revenue: 178.83, cost: 155.17, profit: 23.65, margin: 13.23 }
    ]
  },
  {
    month: '9月',
    revenue: 411.88, cost: 344.91, profit: 66.97, margin: 16.26,
    projects: [
      { name: '爱奇迹', revenue: 25.35, cost: 23.01, profit: 2.34, margin: 9.23 },
      { name: '极致游戏', revenue: 21.37, cost: 17.81, profit: 3.56, margin: 16.67 },
      { name: '百度众测', revenue: 188.44, cost: 150.75, profit: 37.68, margin: 20.00 },
      { name: '平安产险', revenue: 176.70, cost: 153.32, profit: 23.37, margin: 13.23 }
    ]
  },
  {
    month: '10月',
    revenue: 349.38, cost: 307.87, profit: 41.51, margin: 11.88,
    projects: [
      { name: '爱奇迹', revenue: 22.00, cost: 19.97, profit: 2.03, margin: 9.23 },
      { name: '极致游戏', revenue: 16.80, cost: 14.00, profit: 2.80, margin: 16.67 },
      { name: '百度众测', revenue: 150.69, cost: 120.55, profit: 30.13, margin: 20.00 },
      { name: '平安产险', revenue: 159.87, cost: 153.32, profit: 6.54, margin: 4.10 }
    ]
  },
  {
    month: '11月',
    revenue: 413.80, cost: 346.86, profit: 66.93, margin: 16.17,
    projects: [
      { name: '爱奇迹', revenue: 27.94, cost: 25.36, profit: 2.57, margin: 9.23 },
      { name: '极致游戏', revenue: 21.37, cost: 17.81, profit: 3.56, margin: 16.67 },
      { name: '百度众测', revenue: 185.64, cost: 148.51, profit: 37.12, margin: 20.00 },
      { name: '平安产险', revenue: 178.83, cost: 155.17, profit: 23.65, margin: 13.23 }
    ]
  },
  {
    month: '12月',
    revenue: 435.89, cost: 358.06, profit: 77.82, margin: 17.85,
    projects: [
      { name: '爱奇迹', revenue: 30.55, cost: 27.73, profit: 2.82, margin: 9.23 },
      { name: '极致游戏', revenue: 21.37, cost: 17.81, profit: 3.56, margin: 16.67 },
      { name: '百度众测', revenue: 194.37, cost: 155.50, profit: 38.87, margin: 20.00 },
      { name: '平安产险', revenue: 189.57, cost: 157.02, profit: 32.55, margin: 17.17 }
    ]
  },
];

// For the chart, we can just use the top level of the detailed data
export const monthlyFinancials2026 = detailedMonthlyData2026.map(m => ({
    month: m.month,
    revenue: m.revenue,
    cost: m.cost,
    profit: m.profit,
    margin: m.margin
}));