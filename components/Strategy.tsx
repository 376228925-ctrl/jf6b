import React, { useMemo } from 'react';
import { strategy2026, monthlyFinancials2026, detailedMonthlyData2026, metrics2026, actionPlan } from '../constants';
import { Shield, TrendingUp, Zap, Scale, Calendar, Activity, Target, Layers, Info, CornerRightUp, AlertTriangle, PieChart, ArrowUpRight, CheckCircle2, User, Flag, ArrowDown, BarChart2, Crown } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Line, Bar, ReferenceDot, LabelList, Cell, ReferenceLine, Legend } from 'recharts';

export const Strategy: React.FC = () => {
  
  // 1. Calculate Grand Totals based on Monthly Data
  const grandTotals = useMemo(() => {
    const totalRev = monthlyFinancials2026.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalProfit = monthlyFinancials2026.reduce((acc, curr) => acc + curr.profit, 0);
    return { totalRev, totalProfit };
  }, []);

  // 2. Data Transformation for Project Cards
  const projectRoadmaps = useMemo(() => {
    const projects = ['平安产险', '百度众测', '爱奇迹', '极致游戏'];
    return projects.map(projName => {
      const monthlyTrends = detailedMonthlyData2026.map(m => {
        const projData = m.projects.find(p => p.name === projName);
        return {
          month: m.month,
          ...(projData || { revenue: 0, cost: 0, profit: 0, margin: 0 })
        };
      });
      const totalRevenue = monthlyTrends.reduce((sum, item) => sum + (item.revenue || 0), 0);
      const totalProfit = monthlyTrends.reduce((sum, item) => sum + (item.profit || 0), 0);
      const avgMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
      return { name: projName, totalRevenue, totalProfit, avgMargin, monthlyTrends };
    });
  }, []);

  const getIcon = (pillar: string) => {
    if (pillar.includes('稳盘')) return Shield;
    if (pillar.includes('增量')) return Zap;
    if (pillar.includes('AI')) return Target;
    if (pillar.includes('数据')) return BarChart2;
    if (pillar.includes('利润')) return TrendingUp;
    if (pillar.includes('价值')) return Crown;
    return Scale;
  };

  const getColor = (index: number) => {
      const colors = [
          'border-blue-500 bg-blue-50 text-blue-700',
          'border-green-500 bg-green-50 text-green-700',
          'border-amber-500 bg-amber-50 text-amber-700',
          'border-cyan-500 bg-cyan-50 text-cyan-700',
          'border-purple-500 bg-purple-50 text-purple-700',
          'border-rose-500 bg-rose-50 text-rose-700'
      ];
      return colors[index % colors.length];
  };

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 border border-slate-200 shadow-xl rounded-xl text-xs z-50">
          <p className="font-bold text-slate-800 mb-2 text-sm border-b border-gray-100 pb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-slate-500">{entry.name}:</span>
              <span className="font-mono font-bold text-slate-700">
                {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
                {entry.unit || ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      
      {/* HEADER */}
      <div className="text-center max-w-4xl mx-auto pt-4 mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">2026 战略规划与落地行动</h2>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            基于2025年核心痛点（BPO亏损、新客不足），制定2026年针对性打法与行动计划，最终推导全年经营预测。
        </p>
      </div>

      {/* SECTION 1: STRATEGIC PILLARS (TACTICS) */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
            <Target className="w-7 h-7 text-blue-700" />
            1. 核心打法 (Strategy) - 我们怎么赢？
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategy2026.map((item, idx) => {
                const Icon = getIcon(item.pillar);
                const colorClass = getColor(idx);
                return (
                    <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 p-8 opacity-5 -mr-4 -mt-4 transform rotate-12 transition-transform group-hover:rotate-45 duration-700 ${colorClass.split(' ')[2]}`}>
                            <Icon size={100} />
                        </div>
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className={`p-2 rounded-lg ${colorClass.split(' ')[1]}`}>
                                <Icon className={`w-5 h-5 ${colorClass.split(' ')[2]}`} />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{item.pillar}</h3>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2 relative z-10">{item.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow relative z-10 min-h-[3rem]">{item.description}</p>
                        
                        {/* Custom rendering for tactics if they are long or specific (optional) */}
                        <div className="space-y-2 mb-4 relative z-10">
                             {item.tactics.map((t, i) => (
                                 <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 bg-slate-50/50 p-1.5 rounded">
                                     <span className="w-1 h-1 bg-current rounded-full mt-1.5 shrink-0 opacity-50"></span>
                                     <span>{t}</span>
                                 </div>
                             ))}
                        </div>

                        <div className="pt-4 border-t border-gray-50 mt-auto relative z-10">
                            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">KPI</div>
                            <div className="text-xs font-bold text-slate-700">{item.kpi}</div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* SECTION 2: ACTION MATRIX (EXECUTION) */}
      <div>
         <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
            <Zap className="w-7 h-7 text-amber-600" />
            2. 重点行动矩阵 (Actions) - 具体怎么做？
        </h2>
        <div className="grid gap-6">
            {actionPlan.map((action, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:border-blue-300 transition-colors">
                {/* Header: Issue -> Strategy */}
                <div className="px-6 py-4 bg-slate-50 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold text-xs shrink-0">
                            #{action.issueId}
                        </span>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-bold mb-0.5">{action.category}</div>
                            <h3 className="text-base font-bold text-slate-800">{action.issueTitle}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 md:text-right pl-12 md:pl-0 relative">
                        <ArrowUpRight className="w-5 h-5 text-slate-300 absolute left-4 md:hidden" />
                        <div>
                             <div className="text-xs text-slate-400 uppercase font-bold mb-0.5">应对策略</div>
                             <div className="text-blue-700 font-bold">{action.strategy}</div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                     {/* Milestones */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                            <Calendar className="w-3 h-3" /> 关键里程碑
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {action.milestones.map((ms, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-gray-50 px-3 py-2 rounded border border-gray-100">
                                    <span className="font-mono font-bold text-blue-600 text-xs mt-0.5">{ms.split(':')[0]}</span>
                                    <span className="text-xs">{ms.split(':')[1]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Outcome & Owner */}
                    <div className="flex flex-col justify-between gap-4 border-l border-gray-100 lg:pl-6">
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 mb-2">
                                <Flag className="w-3 h-3" /> 预期成果
                            </h4>
                            <div className="text-sm font-medium text-green-700 bg-green-50 p-3 rounded-lg border border-green-100 flex gap-2">
                                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                                {action.expectedOutcome}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                             <User className="w-3 h-3" /> 责任人: <span className="font-bold text-slate-700">{action.owner}</span>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>

      {/* CONNECTOR - SIGNIFICANTLY ENHANCED VISUAL */}
      <div className="relative py-12 flex flex-col items-center justify-center">
        {/* Background Separator */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        
        {/* Central Badge Container */}
        <div className="relative z-10 flex flex-col items-center bg-gray-50 p-4">
             {/* Text Badge */}
             <div className="bg-slate-800 text-white px-6 py-2 rounded-t-lg shadow-lg flex items-center gap-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase">STRATEGY TO FORECAST</span>
             </div>
             
             {/* Arrow Container */}
             <div className="bg-blue-600 text-white p-3 rounded-b-xl rounded-t-sm shadow-xl shadow-blue-200 transform transition-transform hover:scale-110 hover:shadow-2xl cursor-default">
                <ArrowDown size={32} strokeWidth={3} className="animate-bounce" />
             </div>
             
             {/* Explainer Text */}
             <span className="mt-3 text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                基于以上行动 · 强力推导
             </span>
        </div>
      </div>

      {/* SECTION 3: FORECAST (RESULT) */}
      <div className="bg-slate-50 rounded-3xl p-4 md:p-8 border border-slate-200">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-2 border-l-4 border-green-500 pl-4">
            <Activity className="w-7 h-7 text-green-600" />
            3. 2026 预期经营盘面 (Forecast) - 最终会达成什么结果？
        </h2>

        {/* 3.1 Overview Cards */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-gray-50 pb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-900 p-2 rounded-lg"><Layers className="w-5 h-5 text-white" /></div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">年度经营指标预测</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {/* Total Revenue */}
                <div className="relative bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100 shadow-sm group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg opacity-90 shadow-sm">
                    冲刺: {metrics2026[1].target}万
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">年度总营收 (保底)</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black tracking-tight text-slate-900">{metrics2026[0].target}</span>
                        <span className="text-xs font-bold text-slate-400">万</span>
                    </div>
                </div>

                {/* Total Profit */}
                <div className="relative bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-green-100 shadow-sm group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg opacity-90 shadow-sm">
                    冲刺: {metrics2026[3].target}万
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">年度总利润 (保底)</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black tracking-tight text-slate-900">{metrics2026[2].target}</span>
                        <span className="text-xs font-bold text-slate-400">万</span>
                    </div>
                </div>

                {/* Margin */}
                <div className="relative bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100 shadow-sm group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg opacity-90 shadow-sm">
                    冲刺: {metrics2026[1].target ? (metrics2026[3].target / metrics2026[1].target * 100).toFixed(2) : '0.00'}%
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">综合毛利率 (保底)</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black tracking-tight text-slate-900">
                                {metrics2026[0].target ? (metrics2026[2].target / metrics2026[0].target * 100).toFixed(2) : '0.00'}
                        </span>
                        <span className="text-xs font-bold text-slate-400">%</span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col justify-center text-white">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-red-300 flex items-center gap-2"><AlertTriangle className="w-3 h-3"/> 2月低谷</span>
                        <span className="text-[10px] text-slate-400">春节</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-amber-300 flex items-center gap-2"><CornerRightUp className="w-3 h-3"/> 6月拐点</span>
                        <span className="text-[10px] text-slate-400">扭亏</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-green-300 flex items-center gap-2"><Target className="w-3 h-3"/> 12月巅峰</span>
                        <span className="text-[10px] text-slate-400">冲刺</span>
                    </div>
                </div>
            </div>
        </div>

        {/* 3.2 Trajectory Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start mb-6 gap-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" /> 
                        营收与利润爬坡路径
                    </h3>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-2 max-w-lg flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-[10px] text-amber-800">
                        <span className="font-bold">波动说明:</span> 5月受五一/社保影响回落，10月受国庆影响回落。
                    </div>
                </div>
            </div>
            
            <div className="h-[350px] w-full select-none">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyFinancials2026} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
                        <defs>
                            <linearGradient id="colorRevenueArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} label={{ value: '营收 (万)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} unit="万" label={{ value: '利润 (万)', angle: 90, position: 'insideRight', fill: '#94a3b8', fontSize: 10 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconType="circle" />
                        
                        <Area yAxisId="left" type="monotone" dataKey="revenue" name="营收趋势" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenueArea)" />
                        <Line yAxisId="right" type="monotone" dataKey="profit" name="利润走势" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />

                        {/* Annotations */}
                        <ReferenceLine yAxisId="right" x="2月" stroke="#ef4444" strokeDasharray="3 3" />
                        <ReferenceDot yAxisId="right" x="2月" y={4.02} r={4} fill="#ef4444" stroke="white" />
                        <ReferenceLine yAxisId="right" x="2月" stroke="none" label={{ position: 'bottom', value: '春节低谷', fill: '#ef4444', fontSize: 10, fontWeight: 'bold', dy: 20 }} />

                        <ReferenceLine yAxisId="right" x="5月" stroke="#f59e0b" strokeDasharray="3 3" />
                        <ReferenceDot yAxisId="right" x="5月" y={37.94} r={4} fill="#f59e0b" stroke="white" />
                        <ReferenceLine yAxisId="right" x="5月" stroke="none" label={{ position: 'top', value: '五一/社保', fill: '#f59e0b', fontSize: 10, dy: -10 }} />

                        <ReferenceLine yAxisId="right" x="6月" stroke="#10b981" strokeDasharray="3 3" />
                        <ReferenceDot yAxisId="right" x="6月" y={60.90} r={4} fill="#10b981" stroke="white" />
                        <ReferenceLine yAxisId="right" x="6月" stroke="none" label={{ position: 'top', value: '爬坡拐点', fill: '#10b981', fontSize: 10, fontWeight: 'bold', dy: -25 }} />

                        <ReferenceLine yAxisId="right" x="10月" stroke="#f59e0b" strokeDasharray="3 3" />
                        <ReferenceDot yAxisId="right" x="10月" y={41.51} r={4} fill="#f59e0b" stroke="white" />
                        <ReferenceLine yAxisId="right" x="10月" stroke="none" label={{ position: 'top', value: '国庆回落', fill: '#f59e0b', fontSize: 10, dy: -10 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* 3.3 Supplier Map */}
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5 text-blue-600" /> 核心供应商作战地图
                </h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {projectRoadmaps.map((project, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col lg:flex-row hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                    <div className="lg:w-64 bg-slate-50/50 p-5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100 flex-shrink-0 relative">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${project.totalProfit < 0 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                        <h4 className="font-bold text-base text-slate-900 mb-4 flex items-center justify-between">
                            {project.name}
                            {project.totalProfit > 50 && <span className="bg-yellow-100 text-yellow-700 text-[9px] px-2 py-0.5 rounded-full">核心</span>}
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">营收</span>
                                <span className="font-bold text-slate-800 text-sm">{project.totalRevenue.toFixed(0)}<span className="text-[10px] text-slate-400 ml-0.5">万</span></span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">利润</span>
                                <span className={`font-bold text-sm ${project.totalProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    {project.totalProfit.toFixed(0)}<span className="text-[10px] text-slate-400 ml-0.5">万</span>
                                </span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">毛利</span>
                                <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${project.avgMargin < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {project.avgMargin.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-4 min-h-[250px]">
                        <ResponsiveContainer width="100%" height={220}>
                            <ComposedChart data={project.monthlyTrends} barGap={0} margin={{top: 35, right: 10, bottom: 0, left: 10}}>
                                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8'}} />
                                <YAxis yAxisId="left" hide />
                                <YAxis yAxisId="right" orientation="right" hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar yAxisId="left" dataKey="revenue" name="营收" radius={[4, 4, 0, 0]} maxBarSize={40}>
                                    {project.monthlyTrends.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.profit < 0 ? '#fee2e2' : '#bfdbfe'} />
                                    ))}
                                    <LabelList 
                                        dataKey="revenue" 
                                        position="top" 
                                        content={(props: any) => {
                                            const { x, y, width, value, index } = props;
                                            const showLabel = [2, 5, 8, 11].includes(index); 
                                            if (!showLabel) return null;
                                            const record = project.monthlyTrends[index];
                                            const isProfitNeg = record.profit < 0;
                                            return (
                                                <g>
                                                    <rect x={x - 12} y={y - 42} width={width + 24} height={40} rx={4} fill="white" stroke="#cbd5e1" strokeWidth={1} filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.05))" />
                                                    <text x={x + width / 2} y={y - 30} fill="#475569" textAnchor="middle" fontSize={8} fontWeight="bold">营收: {value.toFixed(0)}</text>
                                                    <text x={x + width / 2} y={y - 20} fill={isProfitNeg ? '#ef4444' : '#15803d'} textAnchor="middle" fontSize={8} fontWeight="bold">利润: {record.profit.toFixed(1)}</text>
                                                    <text x={x + width / 2} y={y - 10} fill="#64748b" textAnchor="middle" fontSize={8}>毛利: {record.margin.toFixed(1)}%</text>
                                                </g>
                                            );
                                        }} 
                                    />
                                </Bar>
                                <Line yAxisId="right" type="monotone" dataKey="profit" name="利润" stroke={project.totalProfit < 0 ? '#dc2626' : '#16a34a'} strokeWidth={2.5} dot={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>

    </div>
  );
};