import React, { useMemo } from 'react';
import { strategy2026, monthlyFinancials2026, detailedMonthlyData2026, metrics2026 } from '../constants';
import { Shield, TrendingUp, Zap, Scale, Calendar, Activity, Target, Layers, Info, CornerRightUp, AlertTriangle, PieChart, ArrowUpRight, Minus } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Line, Bar, ReferenceDot, LabelList, Cell, ReferenceLine, Legend } from 'recharts';

export const Strategy: React.FC = () => {
  
  // 1. Calculate Grand Totals based on Monthly Data
  const grandTotals = useMemo(() => {
    const totalRev = monthlyFinancials2026.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalProfit = monthlyFinancials2026.reduce((acc, curr) => acc + curr.profit, 0);
    
    // Find Peak and Trough
    const sortedByProfit = [...monthlyFinancials2026].sort((a, b) => a.profit - b.profit);
    const lowestMonth = sortedByProfit[0];
    const highestMonth = sortedByProfit[sortedByProfit.length - 1];

    return { totalRev, totalProfit, lowestMonth, highestMonth };
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
    if (pillar.includes('利润')) return TrendingUp;
    return Scale;
  };

  const getColor = (index: number) => {
      const colors = [
          'border-blue-500 bg-blue-50 text-blue-700',
          'border-green-500 bg-green-50 text-green-700',
          'border-amber-500 bg-amber-50 text-amber-700',
          'border-purple-500 bg-purple-50 text-purple-700'
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
      
      {/* 1. Header & Vision */}
      <div className="text-center max-w-4xl mx-auto pt-4">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">2026 战略规划全景图</h2>
        <div className="flex justify-center gap-2 mb-6">
           <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold border border-blue-200">BPO 扭亏</span>
           <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-bold border border-purple-200">渠道攻坚</span>
           <span className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-bold border border-amber-200">AI 提效</span>
        </div>
      </div>

      {/* 2. 2026 Overview Dashboard (Refined Hierarchy) */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
        
        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="bg-slate-900 p-2 rounded-lg"><Layers className="w-5 h-5 text-white" /></div>
            <div>
                <h3 className="text-xl font-bold text-slate-900">2026 经营盘面总览</h3>
                <p className="text-xs text-slate-500">Overview of 2026 Fiscal Year Targets</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {/* Total Revenue */}
            <div className="relative bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg opacity-90 shadow-sm">
                   冲刺: {metrics2026[1].target}万
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">年度总营收 (保底)</p>
                    <Activity className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black tracking-tight text-slate-900">{metrics2026[0].target}</span>
                        <span className="text-sm font-bold text-slate-400">万</span>
                    </div>
                    <div className="mt-2 text-xs text-blue-600 font-medium flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>务必达成 (Committed)</span>
                    </div>
                </div>
            </div>

            {/* Total Profit */}
            <div className="relative bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm group hover:shadow-md transition-all">
                 <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg opacity-90 shadow-sm">
                   冲刺: {metrics2026[3].target}万
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">年度总利润 (保底)</p>
                    <Activity className="w-5 h-5 text-green-500" />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black tracking-tight text-slate-900">{metrics2026[2].target}</span>
                        <span className="text-sm font-bold text-slate-400">万</span>
                    </div>
                    <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>核心考核指标</span>
                    </div>
                </div>
            </div>

            {/* Margin */}
            <div className="relative bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 shadow-sm group hover:shadow-md transition-all">
                 <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg opacity-90 shadow-sm">
                   冲刺: {metrics2026[1].target ? (metrics2026[3].target / metrics2026[1].target * 100).toFixed(2) : '0.00'}%
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">综合毛利率 (保底)</p>
                    <PieChart className="w-5 h-5 text-purple-500" />
                </div>
                 <div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black tracking-tight text-slate-900">
                             {metrics2026[0].target ? (metrics2026[2].target / metrics2026[0].target * 100).toFixed(2) : '0.00'}
                        </span>
                        <span className="text-sm font-bold text-slate-400">%</span>
                    </div>
                    <div className="mt-2 text-xs text-purple-600 font-medium flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>同比 2025 (+12%)</span>
                    </div>
                </div>
            </div>

            {/* Timeline Milestones */}
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex flex-col justify-between text-white">
                <div>
                    <span className="text-xs font-bold text-slate-400 uppercase mb-3 block border-b border-slate-700 pb-2">关键时间节点</span>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-red-300 flex items-center gap-2"><AlertTriangle className="w-3 h-3"/> 2月低谷</span>
                            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300">春节假期</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-amber-300 flex items-center gap-2"><CornerRightUp className="w-3 h-3"/> 6月拐点</span>
                            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300">扭亏为盈</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-green-300 flex items-center gap-2"><Target className="w-3 h-3"/> 12月巅峰</span>
                            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300">全速冲刺</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 3. Main Trajectory Chart (Professional Optimization) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
         <div className="flex flex-col lg:flex-row justify-between items-start mb-6 gap-6">
             <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" /> 
                    2026 营收与利润爬坡路径
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    全景视图：包含季节性波动因子（五一/十一/春节）
                </p>
             </div>
             
             {/* Insight Card */}
             <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 max-w-lg flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800">
                    <span className="font-bold block mb-1">波动原因说明 (Key Variations):</span>
                    <ul className="list-disc list-inside space-y-0.5 opacity-90">
                        <li><strong>5月回落：</strong>受五一假期(工时减少)及社保调基影响。</li>
                        <li><strong>10月回落：</strong>受国庆长假影响，计件制营收减少约20%。</li>
                    </ul>
                </div>
             </div>
         </div>
         
         <div className="h-[400px] w-full select-none">
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
                    
                    {/* Revenue Area - Smooth Curve */}
                    <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        name="营收趋势" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRevenueArea)" 
                    />
                    
                    {/* Profit Line - Smooth Curve */}
                    <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="profit" 
                        name="利润走势" 
                        stroke="#10b981" 
                        strokeWidth={3} 
                        dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}}
                        activeDot={{r: 6}}
                    />

                    {/* Annotations with Optimized Positioning (Avoid overlap) */}
                    
                    {/* 2月: Bottom Label */}
                    <ReferenceLine yAxisId="right" x="2月" stroke="#ef4444" strokeDasharray="3 3" />
                    <ReferenceDot yAxisId="right" x="2月" y={4.02} r={4} fill="#ef4444" stroke="white" />
                    <ReferenceLine yAxisId="right" x="2月" stroke="none" label={{ position: 'bottom', value: '春节低谷', fill: '#ef4444', fontSize: 10, fontWeight: 'bold', dy: 20 }} />

                    {/* 5月: Top Label */}
                    <ReferenceLine yAxisId="right" x="5月" stroke="#f59e0b" strokeDasharray="3 3" />
                    <ReferenceDot yAxisId="right" x="5月" y={37.94} r={4} fill="#f59e0b" stroke="white" />
                    <ReferenceLine yAxisId="right" x="5月" stroke="none" label={{ position: 'top', value: '五一/社保', fill: '#f59e0b', fontSize: 10, dy: -10 }} />

                    {/* 6月: Top Label (Offset slightly) */}
                    <ReferenceLine yAxisId="right" x="6月" stroke="#10b981" strokeDasharray="3 3" />
                    <ReferenceDot yAxisId="right" x="6月" y={60.90} r={4} fill="#10b981" stroke="white" />
                    <ReferenceLine yAxisId="right" x="6月" stroke="none" label={{ position: 'top', value: '爬坡拐点', fill: '#10b981', fontSize: 10, fontWeight: 'bold', dy: -25 }} />

                    {/* 10月: Top Label */}
                    <ReferenceLine yAxisId="right" x="10月" stroke="#f59e0b" strokeDasharray="3 3" />
                    <ReferenceDot yAxisId="right" x="10月" y={41.51} r={4} fill="#f59e0b" stroke="white" />
                    <ReferenceLine yAxisId="right" x="10月" stroke="none" label={{ position: 'top', value: '国庆回落', fill: '#f59e0b', fontSize: 10, dy: -10 }} />

                </ComposedChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 4. Detailed Supplier/Project Roadmap (Upgraded Labels & Charts) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="font-bold text-slate-800 flex items-center gap-2 text-xl">
             <Calendar className="w-6 h-6 text-blue-600" /> 2026 核心供应商作战地图
           </h3>
           <span className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
             <Info className="w-3 h-3" /> 关键节点自动透出指标
           </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {projectRoadmaps.map((project, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col lg:flex-row hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                {/* Left: Summary Panel */}
                <div className="lg:w-72 bg-slate-50/50 p-6 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100 flex-shrink-0 relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${project.totalProfit < 0 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    <h4 className="font-bold text-lg text-slate-900 mb-6 flex items-center justify-between">
                        {project.name}
                        {project.totalProfit > 50 && <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full">核心利润源</span>}
                    </h4>
                    
                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-medium">年度营收</span>
                            <span className="font-bold text-slate-800 text-lg">{project.totalRevenue.toFixed(0)}<span className="text-xs text-slate-400 ml-0.5">万</span></span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-medium">贡献利润</span>
                            <span className={`font-bold text-lg ${project.totalProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {project.totalProfit.toFixed(0)}<span className="text-xs text-slate-400 ml-0.5">万</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-medium">毛利率</span>
                            <span className={`font-bold px-2 py-0.5 rounded text-xs ${project.avgMargin < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {project.avgMargin.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Professional Dual Axis Chart */}
                <div className="flex-1 p-6 min-h-[300px]">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">月度经营数据看板</h5>
                        <div className="flex items-center gap-4 text-[10px] text-slate-500">
                             <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-200 rounded-sm"></div>营收 (柱状)</span>
                             <span className="flex items-center gap-1"><div className="w-4 h-0.5 bg-green-600"></div>利润 (曲线)</span>
                        </div>
                    </div>
                    
                    <ResponsiveContainer width="100%" height={260}>
                        <ComposedChart data={project.monthlyTrends} barGap={0} margin={{top: 35, right: 10, bottom: 0, left: 10}}>
                            <CartesianGrid vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                            <YAxis yAxisId="left" hide />
                            <YAxis yAxisId="right" orientation="right" hide />
                            <Tooltip content={<CustomTooltip />} />
                            
                            {/* Revenue Bar (Left Axis) */}
                            <Bar yAxisId="left" dataKey="revenue" name="营收" radius={[4, 4, 0, 0]} maxBarSize={40}>
                                {project.monthlyTrends.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.profit < 0 ? '#fee2e2' : '#bfdbfe'} />
                                ))}
                                <LabelList 
                                    dataKey="revenue" 
                                    position="top" 
                                    content={(props: any) => {
                                        const { x, y, width, value, index } = props;
                                        // Indexes: 2=Mar, 5=Jun, 8=Sep, 11=Dec
                                        const showLabel = [2, 5, 8, 11].includes(index); 
                                        if (!showLabel) return null;
                                        
                                        const record = project.monthlyTrends[index];
                                        const isProfitNeg = record.profit < 0;

                                        return (
                                            <g>
                                                {/* Background Box */}
                                                <rect x={x - 12} y={y - 42} width={width + 24} height={40} rx={4} fill="white" stroke="#cbd5e1" strokeWidth={1} filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.05))" />
                                                
                                                {/* Labels in Chinese */}
                                                <text x={x + width / 2} y={y - 30} fill="#475569" textAnchor="middle" fontSize={8} fontWeight="bold">
                                                    营收: {value.toFixed(0)}
                                                </text>
                                                <text x={x + width / 2} y={y - 20} fill={isProfitNeg ? '#ef4444' : '#15803d'} textAnchor="middle" fontSize={8} fontWeight="bold">
                                                    利润: {record.profit.toFixed(1)}
                                                </text>
                                                <text x={x + width / 2} y={y - 10} fill="#64748b" textAnchor="middle" fontSize={8}>
                                                    毛利: {record.margin.toFixed(1)}%
                                                </text>
                                            </g>
                                        );
                                    }} 
                                />
                            </Bar>
                            
                            {/* Profit Line (Right Axis) */}
                            <Line yAxisId="right" type="monotone" dataKey="profit" name="利润" stroke={project.totalProfit < 0 ? '#dc2626' : '#16a34a'} strokeWidth={2.5} dot={false} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
            ))}
        </div>
      </div>

      {/* 5. Strategic Pillars (Moved to Bottom) */}
      <div className="pt-8 border-t border-gray-100 mt-12">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
            <Target className="w-7 h-7 text-blue-700" />
            2026 年打法 (Key Strategies)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategy2026.map((item, idx) => {
                const Icon = getIcon(item.pillar);
                const colorClass = getColor(idx);
                return (
                    <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${colorClass.split(' ')[1]}`}>
                                <Icon className={`w-5 h-5 ${colorClass.split(' ')[2]}`} />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{item.pillar}</h3>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">{item.description}</p>
                        <div className="pt-4 border-t border-gray-50 mt-auto">
                            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">KPI</div>
                            <div className="text-xs font-bold text-slate-700">{item.kpi}</div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

    </div>
  );
};