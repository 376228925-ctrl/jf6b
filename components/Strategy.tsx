import React, { useMemo } from 'react';
import { strategy2026, monthlyFinancials2026, detailedMonthlyData2026 } from '../constants';
import { Shield, TrendingUp, Zap, Scale, ArrowRight, CheckCircle2, Cpu, Calendar, DollarSign, PieChart, AlertTriangle, Activity, Target, Layers } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Line, Bar, ReferenceDot, LabelList, Cell, ReferenceLine } from 'recharts';

export const Strategy: React.FC = () => {
  
  // 1. Calculate Grand Totals for 2026 Overview
  const grandTotals = useMemo(() => {
    const totalRev = monthlyFinancials2026.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalCost = monthlyFinancials2026.reduce((acc, curr) => acc + curr.cost, 0);
    const totalProfit = monthlyFinancials2026.reduce((acc, curr) => acc + curr.profit, 0);
    const avgMargin = (totalProfit / totalRev) * 100;
    
    // Find Peak and Trough
    const sortedByProfit = [...monthlyFinancials2026].sort((a, b) => a.profit - b.profit);
    const lowestMonth = sortedByProfit[0];
    const highestMonth = sortedByProfit[sortedByProfit.length - 1];

    return { totalRev, totalCost, totalProfit, avgMargin, lowestMonth, highestMonth };
  }, []);

  // 2. Data Transformation for Project Cards
  const projectRoadmaps = useMemo(() => {
    const projects = ['平安产险', '百度众测', '爱奇迹', '极致游戏'];
    return projects.map(projName => {
      const monthlyTrends = detailedMonthlyData2026.map(m => {
        const projData = m.projects.find(p => p.name === projName);
        return {
          month: m.month,
          ...projData,
          // Add a flag for quarterly months to show labels
          isQuarterEnd: ['3月', '6月', '9月', '12月'].includes(m.month)
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
        <div className="bg-white/90 backdrop-blur-sm p-4 border border-slate-200 shadow-xl rounded-xl text-xs">
          <p className="font-bold text-slate-800 mb-2 text-sm">{label}</p>
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
        <p className="text-slate-600 leading-relaxed text-sm max-w-2xl mx-auto">
          以<strong>"稳存量、拓新增"</strong>为双轮驱动，建立专家系统与标准化SOP，实现从"人力租赁"向"解决方案合作伙伴"的身份跨越。
        </p>
      </div>

      {/* 2. 2026 Overview Dashboard (New Section) */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Target size={300} />
        </div>
        
        <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="bg-blue-500 p-2 rounded-lg"><Layers className="w-5 h-5 text-white" /></div>
            <h3 className="text-xl font-bold">2026 经营盘面总览 (Overview)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {/* Total Revenue */}
            <div className="space-y-1">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">年度总营收</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight text-white">{grandTotals.totalRev.toFixed(1)}</span>
                    <span className="text-sm text-slate-400">万</span>
                </div>
                <div className="inline-flex items-center gap-1 text-green-400 text-xs font-medium bg-green-500/10 px-2 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3" /> 同比 +98.3%
                </div>
            </div>

            {/* Total Profit */}
            <div className="space-y-1">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">年度总利润</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight text-green-400">{grandTotals.totalProfit.toFixed(1)}</span>
                    <span className="text-sm text-slate-400">万</span>
                </div>
                <div className="inline-flex items-center gap-1 text-green-400 text-xs font-medium bg-green-500/10 px-2 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3" /> 净利回正
                </div>
            </div>

            {/* Margin */}
            <div className="space-y-1">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">综合毛利率</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight text-blue-400">{grandTotals.avgMargin.toFixed(2)}</span>
                    <span className="text-sm text-slate-400">%</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">目标: 锁定15%基准线</p>
            </div>

            {/* Key Milestones */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-red-300 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> 低谷期</span>
                    <span className="text-sm font-bold text-white">{grandTotals.lowestMonth.month}</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full mb-3"></div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-green-300 flex items-center gap-1"><Target className="w-3 h-3"/> 巅峰期</span>
                    <span className="text-sm font-bold text-white">{grandTotals.highestMonth.month}</span>
                </div>
            </div>
        </div>
      </div>

      {/* 3. Main Trajectory Chart (Enhanced) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
             <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" /> 
                    2026 营收与利润爬坡路径
                </h3>
                <p className="text-sm text-slate-500 mt-1">全景视图：关键拐点与增长趋势</p>
             </div>
             <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-slate-600 font-medium">营收规模</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-slate-600 font-medium">净利润</span>
                </div>
             </div>
         </div>
         
         <div className="h-[400px] w-full select-none">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyFinancials2026} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <defs>
                        <linearGradient id="colorRevenueMain" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} unit="万" />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Revenue Area */}
                    <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        name="营收" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorRevenueMain)" 
                    />
                    
                    {/* Profit Line */}
                    <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="profit" 
                        name="利润" 
                        stroke="#10b981" 
                        strokeWidth={3} 
                        dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}}
                        activeDot={{r: 6}}
                    />

                    {/* Annotations for Key Inflection Points */}
                    {/* Feb: Trough */}
                    <ReferenceDot yAxisId="right" x="2月" y={4.02} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2}>
                    </ReferenceDot>
                    
                    {/* June: Ramp Up */}
                    <ReferenceDot yAxisId="right" x="6月" y={60.90} r={6} fill="#f59e0b" stroke="#fff" strokeWidth={2}>
                    </ReferenceDot>

                    {/* Annotations Text */}
                    <ReferenceLine yAxisId="right" x="2月" stroke="none" label={{ position: 'bottom', value: '春节低谷', fill: '#ef4444', fontSize: 12, fontWeight: 'bold', dy: 20 }} />
                    <ReferenceLine yAxisId="right" x="6月" stroke="none" label={{ position: 'top', value: '盈利爆发点', fill: '#f59e0b', fontSize: 12, fontWeight: 'bold', dy: -20 }} />

                </ComposedChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* 4. Strategic Pillars (Cards) */}
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

      {/* 5. Detailed Supplier/Project Roadmap (Refined Visuals) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="font-bold text-slate-800 flex items-center gap-2 text-xl">
             <Calendar className="w-6 h-6 text-blue-600" /> 2026 核心供应商作战地图
           </h3>
           <span className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
             *图表数值仅在季度末(3/6/9/12月)显示
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

                {/* Right: Professional Bar Chart */}
                <div className="flex-1 p-6 min-h-[200px]">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">月度营收与利润趋势 (Monthly Revenue & Profit)</h5>
                    <ResponsiveContainer width="100%" height={180}>
                        <ComposedChart data={project.monthlyTrends} barGap={0} margin={{top: 20, right: 0, bottom: 0, left: 0}}>
                            <CartesianGrid vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                            <Tooltip content={<CustomTooltip />} />
                            
                            {/* Revenue Bar with dynamic coloring and Labels */}
                            <Bar dataKey="revenue" name="营收" radius={[4, 4, 0, 0]} maxBarSize={40}>
                                {project.monthlyTrends.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.profit < 0 ? '#fca5a5' : '#93c5fd'} />
                                ))}
                                {/* Only show labels for quarterly months (Mar, Jun, Sep, Dec) */}
                                <LabelList 
                                    dataKey="revenue" 
                                    position="top" 
                                    content={(props: any) => {
                                        const { x, y, width, value, index } = props;
                                        // Indexes: 2=Mar, 5=Jun, 8=Sep, 11=Dec
                                        const showLabel = [2, 5, 8, 11].includes(index); 
                                        if (!showLabel) return null;
                                        return (
                                            <text x={x + width / 2} y={y - 10} fill="#64748b" textAnchor="middle" fontSize={10} fontWeight="bold">
                                                {value.toFixed(0)}
                                            </text>
                                        );
                                    }} 
                                />
                            </Bar>
                            
                            {/* Profit Line overlay */}
                            <Line type="monotone" dataKey="profit" name="利润" stroke={project.totalProfit < 0 ? '#dc2626' : '#16a34a'} strokeWidth={2} dot={false} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
            ))}
        </div>
      </div>

    </div>
  );
};