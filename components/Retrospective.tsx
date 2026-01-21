
import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ComposedChart, Line } from 'recharts';
import { costStructureData, keyIssues2025, competitorAnalysis, bpoTrendData } from '../constants';
import { AlertTriangle, TrendingDown, Search, XCircle, Users, ArrowUp, Minus, Crown, Medal, ArrowRight, BarChart2 } from 'lucide-react';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#6366f1', '#ec4899'];

export const Retrospective: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(keyIssues2025[0].id);

  // Helper to render rank badge
  const renderRankBadge = (rank: number) => {
    let colorClass = "bg-slate-100 text-slate-600 border-slate-200";
    let icon = <span className="font-bold text-xs">NO.{rank}</span>;

    if (rank === 1) {
        colorClass = "bg-amber-100 text-amber-800 border-amber-200";
        icon = <Crown className="w-3.5 h-3.5 fill-current" />;
    } else if (rank === 2) {
        colorClass = "bg-slate-200 text-slate-700 border-slate-300"; // Silver-ish
        icon = <Medal className="w-3.5 h-3.5" />;
    } else if (rank === 3) {
        colorClass = "bg-orange-100 text-orange-800 border-orange-200"; // Bronze-ish
        icon = <Medal className="w-3.5 h-3.5" />;
    }

    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${colorClass} shadow-sm`}>
            {icon}
            <span className="text-xs font-bold uppercase tracking-wide">第 {rank} 名</span>
        </div>
    );
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2">2025 营收与利润缺口分析</h3>
          <p className="text-xs text-slate-500 mb-6">营收缺口154万(含预估)，利润缺口严重，主要受BPO亏损拖累</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { category: '总营收', 目标: 2506.5, 实际: 2009.55 },
                { category: '毛利润', 目标: 300.33, 实际: 60.16 }
              ]} barGap={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="目标" fill="#94a3b8" radius={[6, 6, 0, 0]} barSize={40} />
                <Bar dataKey="实际" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2">2025 成本结构拆解</h3>
          <p className="text-xs text-slate-500 mb-6">人力成本占比77.93%，独立BU成本占比14.2%</p>
          <div className="h-72 flex items-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costStructureData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costStructureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* BPO Trend Analysis (New based on report detailed data) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-red-500" /> BPO 业务月度盈亏趋势 (2024.12 - 2025.12)
          </h3>
          <p className="text-xs text-slate-500 mb-6">自25年4月起亏损显著扩大，单月最高亏损35万，营收增长与利润严重背离。</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={bpoTrendData} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                    <CartesianGrid stroke="#f5f5f5" vertical={false} />
                    <XAxis dataKey="month" scale="band" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="BPO营收(万)" barSize={20} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="profit" name="BPO利润(万)" stroke="#ef4444" strokeWidth={3} />
                </ComposedChart>
            </ResponsiveContainer>
          </div>
      </div>

      {/* Competitor Benchmarking Section (Visual Enhancement) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="p-6 border-b border-gray-200 bg-slate-50 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">友商对标分析 (Competitor Comparison)</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
           {competitorAnalysis.map((comp, idx) => {
             const maxVal = Math.max(comp.ourHeadcount, comp.topCompetitorHeadcount);
             return (
               <div key={idx} className="border border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 bg-white group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                       <span className="font-bold text-slate-800 text-sm truncate pr-2 max-w-[120px]">{comp.client}</span>
                       {renderRankBadge(comp.ourRank)}
                    </div>
                    
                    {/* Visual Comparison Bar */}
                    <div className="space-y-3 mb-5">
                       {/* Us */}
                       <div>
                         <div className="flex justify-between text-xs mb-1">
                            <span className="font-bold text-blue-600">我方</span>
                            <span className="font-bold text-blue-600">{comp.ourHeadcount}人</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${(comp.ourHeadcount / maxVal) * 100}%`}}></div>
                         </div>
                       </div>
                       
                       {/* Competitor */}
                       <div>
                         <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500 font-medium">友商 ({comp.topCompetitorName})</span>
                            <span className="text-slate-500 font-medium">{comp.topCompetitorHeadcount}人</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-slate-400 h-2.5 rounded-full" style={{width: `${(comp.topCompetitorHeadcount / maxVal) * 100}%`}}></div>
                         </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                       {comp.trend === 'up' ? (
                           <span className="flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">
                               <ArrowUp className="w-3 h-3" /> 份额提升
                           </span>
                       ) : (
                           <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">
                               <Minus className="w-3 h-3" /> 份额持平
                           </span>
                       )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-500 leading-relaxed border-t border-gray-50 pt-3 mt-1">
                     {comp.description}
                  </p>
               </div>
             );
           })}
        </div>
      </div>

      {/* Deep Dive Analysis Section (Interactivity Enhancement) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-bold text-slate-800">问题深度分析 (2025)</h3>
        </div>
        
        {/* Responsive Flex Layout: Column on Mobile, Row on Desktop */}
        <div className="flex flex-col md:flex-row md:h-[600px] h-auto">
          {/* Tabs: Full width and scrollable on mobile */}
          <div className="w-full md:w-1/3 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 overflow-x-hidden overflow-y-auto max-h-[300px] md:max-h-full">
            <div className="flex flex-col">
                {keyIssues2025.map((issue) => (
                <button
                    key={issue.id}
                    onClick={() => setActiveTab(issue.id)}
                    className={`w-full text-left p-4 md:p-5 transition-all duration-200 border-b border-gray-100 last:border-0 md:last:border-b-0 ${
                    activeTab === issue.id 
                        ? 'bg-blue-600 text-white shadow-md z-10 relative' 
                        : 'text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            activeTab === issue.id 
                            ? 'bg-white/20 text-white'
                            : issue.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                            {issue.category}
                        </span>
                        {activeTab === issue.id && <ArrowRight className="w-4 h-4 ml-auto text-white/50" />}
                    </div>
                    <h4 className={`font-bold text-sm mb-1 ${activeTab === issue.id ? 'text-white' : 'text-slate-900'}`}>
                        {issue.title}
                    </h4>
                    <p className={`text-xs line-clamp-1 ${activeTab === issue.id ? 'text-blue-100' : 'text-slate-400'}`}>
                        {issue.description}
                    </p>
                </button>
                ))}
            </div>
          </div>

          {/* Content: Takes remaining space */}
          <div className="w-full md:w-2/3 p-4 md:p-8 overflow-y-auto bg-white relative min-h-[500px] md:min-h-0">
             {keyIssues2025.map(issue => {
                 if (issue.id !== activeTab) return null;
                 return (
                     <div key={issue.id} className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6 md:space-y-8">
                         <div>
                             <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{issue.title}</h2>
                             <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50 py-2 rounded-r-lg">
                                 {issue.description}
                             </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             {issue.dataPoints?.map((dp, idx) => (
                                 <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center shadow-sm">
                                     <span className="block text-xs text-slate-400 uppercase tracking-wide mb-1 font-bold">关键数据</span>
                                     <span className="font-bold text-slate-800 text-lg">{dp}</span>
                                 </div>
                             ))}
                         </div>

                         <div>
                             <h4 className="flex items-center gap-2 font-bold text-red-700 mb-3 text-lg">
                                 <XCircle className="w-5 h-5" /> 根本原因
                             </h4>
                             <div className="bg-red-50 rounded-xl p-4 md:p-6 border border-red-100 text-sm text-slate-700 space-y-3 leading-relaxed whitespace-pre-line shadow-sm">
                                 {issue.rootCause}
                             </div>
                         </div>

                         <div>
                             <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-lg">
                                 <TrendingDown className="w-5 h-5 text-slate-500" /> 业务影响
                             </h4>
                             <p className="text-sm text-slate-600 bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-200">
                                 {issue.impact}
                             </p>
                         </div>
                     </div>
                 );
             })}
          </div>
        </div>
      </div>
    </div>
  );
};
