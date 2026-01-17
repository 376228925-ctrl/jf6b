import { FinancialMetric, Issue, StrategyItem, ActionPlan, CompetitorData } from './types';

// 2025 Financial Performance
export const metrics2025: FinancialMetric[] = [
  { 
    label: '总营收', 
    target: 2506.5, 
    actual: 2009.55, 
    unit: '万元', 
    status: 'danger', 
    analysis: '达成率80.1% (含预营收154万)。绩效排名：4。受存量大客户依赖及新客落地滞后影响。' 
  },
  { 
    label: '毛利润', 
    target: 300.33, 
    actual: 60.16, 
    unit: '万元', 
    status: 'danger',
    analysis: '达成率20% (含预毛利21万)。绩效排名：10。BPO亏损与历史赔付是主要拖累。'
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

// 2026 Targets
export const metrics2026: FinancialMetric[] = [
  { label: '保底营收目标', target: 3536.95, actual: 0, unit: '万元', status: 'warning' },
  { label: '冲刺营收目标', target: 4421.18, actual: 0, unit: '万元', status: 'success' },
  { label: '保底毛利润', target: 579.77, actual: 0, unit: '万元', status: 'warning' },
  { label: '冲刺毛利润', target: 724.71, actual: 0, unit: '万元', status: 'success' },
];

// Competitor Analysis Data
export const competitorAnalysis: CompetitorData[] = [
  {
    client: '平安产险 (ITO)',
    ourHeadcount: 65,
    ourRank: 2,
    topCompetitorName: '中软国际',
    topCompetitorHeadcount: 87,
    totalCompetitors: 4,
    trend: 'up',
    description: '我司排名第2 (65人)，仅次于中软(87人)，优于拓保(55人)与法本(52人)。同比去年增加1人，稳住了核心盘。'
  },
  {
    client: '爱奇迹 (ITO)',
    ourHeadcount: 5,
    ourRank: 3,
    topCompetitorName: '友商1',
    topCompetitorHeadcount: 19,
    trend: 'stable',
    description: '目前排名第3，较去年排名持平。主要竞争对手占据大量份额(19人/14人)，需寻找差异化突破口。'
  },
  {
    client: '百度BPO-乌镇基地',
    ourHeadcount: 106,
    ourRank: 3,
    topCompetitorName: '中穆',
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
  }
];

// Detailed Analysis of 2025 Issues
export const keyIssues2025: Issue[] = [
  {
    id: '1',
    category: '财务/经营',
    title: 'BPO业务增收不增利',
    description: 'BPO全年营收612.3万，但最终核算亏损59万。',
    rootCause: '1. 成本结构失衡：人力成本(2433W/月峰值)与房租/折旧等固定支出未能被低单价覆盖。\n2. 基地分散：多地运营(漳州/乌镇/韶关等8地)导致管理半径过长，运营磨合期成本高。\n3. 商业模式：处于"拿规模"阶段，采用了激进定价策略。',
    impact: '拉低整体毛利率至2.9%，导致部门绩效毛利排名全公司倒数(第10)。',
    severity: 'high',
    dataPoints: ['营收: 612.3万', '利润: -59万', '基地数: 8个']
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
    category: '团队/能力',
    title: '交付模式被动与SOP缺位',
    description: '团队思维仍停留在"接单-派人"的被动模式，缺乏主动解决方案能力；BPO业务缺乏标准化SOP。',
    rootCause: '1. 缺乏"专家系统"沉淀，过于依赖个人经验，新人上手慢。\n2. 合作思维局限：仅视自己为甲方的"手脚"，未上升到"大脑"互补的顾问层面。\n3. 缺乏标准化的面试/测试/交付流程文档。',
    impact: '客户粘性低，容易被低价竞品替代；无法产生技术溢价。',
    severity: 'medium',
    dataPoints: ['SOP文档: 缺失', '顾问式交付: 0案例']
  },
  {
    id: '4',
    category: '市场/拓展',
    title: '关键战役失利',
    description: '网易、美团、腾讯PCG等年度框架招标未中选。',
    rootCause: '1. 网易项目：受24年被执行人事件影响，导致25年1月框招未中选。\n2. 美团项目：因缺乏大规模相关离岸交付经验，放弃招标或未通过。\n3. 腾讯PCG：H5项目框架招采未中选。',
    impact: '导致过度依赖平安系(占比87%+)存量业务，抗风险能力未有实质提升。',
    severity: 'high',
    dataPoints: ['网易: 落选', '美团: 放弃', '平安占比: >87%']
  }
];

// Detailed 2026 Strategy
export const strategy2026: StrategyItem[] = [
  {
    id: 's1',
    pillar: '存量稳盘',
    title: '平安系与百度众测基本盘',
    description: '平安产险/寿险维持65+人规模，百度众测目标冲刺800人。',
    tactics: [
      '平安产险：紧盯"理赔共同资源"与"数据智能"组的增量需求，维持排名第2优势。',
      '百度众测：重点投入自驾项目，利用芜湖/沈阳新基地扩充规模，从计时转向计件结算优化利润。',
      '爱奇迹/极致游戏：推动客户技术研发岗位回迁深圳的机会，目标合计40人。'
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
      '百度SQC：依托ACG线推荐，切入大模型与萝卜快跑业务，目标100人。',
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

export const revenueData2025 = [
  { name: '目标', value: 2506.5, fill: '#94a3b8' },
  { name: '实际', value: 2009.55, fill: '#3b82f6' },
];

// Cost Structure based on report
export const costStructureData = [
  { name: '人力成本', value: 77.93 },
  { name: '独立BU成本', value: 14.20 },
  { name: '交付团队成本', value: 3.84 },
  { name: '历史赔付', value: 1.45 },
  { name: '报销/福利/其他', value: 2.58 }, // Combined small items
];