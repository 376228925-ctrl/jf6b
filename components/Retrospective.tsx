import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { revenueData2025, profitData2025, costStructureData, keyIssues2025 } from '../constants';
import { AlertTriangle, TrendingDown, Search, XCircle, FileWarning } from 'lucide-react';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

export const Retrospective: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(keyIssues2025[0].id);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2">2025 营收与利润缺口分析</h3>
          <p className="text-xs text-slate-500 mb-6">营收缺口主要在Q3/Q4显现，利润因BPO亏损被严重侵蚀</p>
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
          <p className="text-xs text-slate-500 mb-6">刚性人力成本占比高达78%，压缩空间有限，需优化结构</p>
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

      {/* Deep Dive Analysis Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-bold text-slate-800">关键问题归因分析 (Root Cause Analysis)</h3>
        </div>
        
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Tabs */}
          <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            {keyIssues2025.map((issue) => (
              <button
                key={issue.id}
                onClick={() => setActiveTab(issue.id)}
                className={`w-full text-left p-5 border-l-4 transition-all hover:bg-white ${
                  activeTab === issue.id 
                    ? 'bg-white border-l-blue-600 shadow-sm' 
                    : 'border-l-transparent text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        issue.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                        {issue.category}
                    </span>
                </div>
                <h4 className={`font-semibold text-sm ${activeTab === issue.id ? 'text-slate-900' : 'text-slate-600'}`}>
                    {issue.title}
                </h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {issue.description}
                </p>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="w-full md:w-2/3 p-8 overflow-y-auto">
             {keyIssues2025.map(issue => {
                 if (issue.id !== activeTab) return null;
                 return (
                     <div key={issue.id} className="animate-in fade-in duration-300 space-y-8">
                         <div>
                             <h2 className="text-2xl font-bold text-slate-900 mb-2">{issue.title}</h2>
                             <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-slate-200 pl-4">
                                 {issue.description}
                             </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             {issue.dataPoints?.map((dp, idx) => (
                                 <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-100 text-center">
                                     <span className="block text-xs text-slate-400 uppercase tracking-wide mb-1">关键数据</span>
                                     <span className="font-bold text-slate-700">{dp}</span>
                                 </div>
                             ))}
                         </div>

                         <div>
                             <h4 className="flex items-center gap-2 font-bold text-red-700 mb-3">
                                 <XCircle className="w-5 h-5" /> 根本原因 (Root Causes)
                             </h4>
                             <div className="bg-red-50 rounded-lg p-5 border border-red-100 text-sm text-slate-700 space-y-3 leading-relaxed whitespace-pre-line">
                                 {issue.rootCause}
                             </div>
                         </div>

                         <div>
                             <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3">
                                 <TrendingDown className="w-5 h-5 text-slate-500" /> 业务影响
                             </h4>
                             <p className="text-sm text-slate-600 bg-gray-50 p-4 rounded-lg">
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