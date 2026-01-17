import React from 'react';
import { metrics2025, metrics2026 } from '../constants';
import { TrendingUp, TrendingDown, Target, AlertOctagon, Briefcase, DollarSign, Trophy, Percent } from 'lucide-react';

export const Dashboard: React.FC = () => {
  // Helper to extract rank from analysis string if present
  const getRankFromAnalysis = (text?: string) => {
    const match = text?.match(/排名[：:]\s*(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Executive Abstract */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 border-l-4 border-l-blue-600">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          管理层摘要 (Executive Summary)
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
             <h4 className="font-semibold text-slate-700 border-b border-gray-100 pb-2">2025 回顾：增收不增利</h4>
             <p className="text-slate-600 leading-relaxed text-sm text-justify">
               2025年交付六部营收达成 <strong className="text-slate-900 bg-slate-100 px-1 rounded">2009.55万</strong> (达成率80.1%)，排名公司 <strong className="text-blue-600">第4</strong>；但毛利仅 <strong className="text-slate-900 bg-red-50 text-red-700 px-1 rounded">60.16万</strong> (达成率20%)，排名 <strong className="text-red-600">第10</strong>。
               <br/>
               <strong>核心症结：</strong>BPO业务虽实现从0到612万的突破，但因定价激进、基地分散及人力成本刚性，导致BPO亏损59万。此外，历史遗留的社保/公积金追溯及离职赔偿(45万)进一步侵蚀了利润。
             </p>
          </div>
          <div className="space-y-3">
             <h4 className="font-semibold text-slate-700 border-b border-gray-100 pb-2">2026 展望：扭亏与突围</h4>
             <p className="text-slate-600 leading-relaxed text-sm text-justify">
               2026年战略目标为冲刺营收 <strong className="text-blue-700 text-lg">4421万</strong>，冲刺毛利 <strong className="text-green-700 text-lg">724万</strong> (GPM 16.39%)。
               <br/>
               <strong>关键路径：</strong>
               1. <strong>稳存量：</strong>巩固平安产险(65人)与百度众测基本盘。
               2. <strong>拓新增：</strong>突破腾讯TEG与百度SQC业务，目标新增200人。
               3. <strong>提利润：</strong>BPO全面推行计件制结算，锁定20%毛利空间。
             </p>
          </div>
        </div>
      </div>

      {/* 2025 KPI Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-slate-500" /> 2025 核心财务指标复盘
          </h3>
          <span className="text-xs text-slate-400 font-mono">单位: 万 (CNY)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics2025.map((m, idx) => {
            const rank = getRankFromAnalysis(m.analysis);
            const percentage = m.target > 0 ? ((m.actual / m.target) * 100).toFixed(1) : null;
            
            return (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group hover:shadow-lg hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2">
                     <div className={`p-2 rounded-lg ${m.status === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'} transition-colors`}>
                        {m.label.includes('利润') ? <DollarSign className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                     </div>
                     <span className="text-sm font-bold text-slate-600">{m.label.split('(')[0]}</span>
                   </div>
                   {rank && (
                     <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">
                        <Trophy className="w-3 h-3 text-amber-500" />
                        <span>NO.{rank}</span>
                     </div>
                   )}
                </div>
                
                <div className="mt-2 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold tracking-tight tabular-nums ${m.actual < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                    {m.actual}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">{m.unit}</span>
                </div>
                
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">目标值</span>
                        <span className="text-sm font-semibold text-slate-600 tabular-nums">{m.target}</span>
                    </div>
                    {percentage && (
                       <div className={`text-right ${Number(percentage) >= 100 ? 'text-green-600' : 'text-red-500'}`}>
                         <span className="text-2xl font-bold italic tracking-tight">{percentage}%</span>
                         <span className="text-[10px] font-bold uppercase ml-1">达成</span>
                       </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  {m.target > 0 && (
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full ${Number(percentage) >= 100 ? 'bg-green-500' : 'bg-red-500'}`} 
                        style={{ width: `${Math.min(Math.max(Number(percentage), 0), 100)}%` }}
                      ></div>
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-500 mt-3 leading-snug line-clamp-2">
                    {m.analysis?.replace(/达成率.*?。/, '')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2026 Strategy Cards */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" /> 2026 战略目标预测
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Revenue Goals */}
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Target size={140} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                    <h4 className="text-blue-100 font-semibold tracking-wide uppercase text-sm">营收目标 (Revenue)</h4>
                </div>
                <div className="flex items-baseline gap-3 mt-4">
                   <span className="text-6xl font-black tracking-tighter text-white tabular-nums">{metrics2026[1].target}</span>
                   <span className="text-xl font-medium text-slate-400">万</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                   <span className="text-xs text-slate-300">保底目标:</span>
                   <span className="text-sm font-bold text-white tabular-nums">{metrics2026[0].target}</span>
                </div>
              </div>
              <div className="mt-10 relative z-10 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 text-green-400">
                      <TrendingUp className="w-6 h-6" />
                   </div>
                   <div>
                       <div className="text-2xl font-bold text-green-400 tabular-nums">+120%</div>
                       <div className="text-xs text-slate-400 font-medium uppercase">同比 2025 增长率</div>
                   </div>
                </div>
              </div>
           </div>

           {/* Profit Goals */}
           <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <DollarSign size={140} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                    <h4 className="text-slate-500 font-semibold tracking-wide uppercase text-sm">利润目标 (Profit)</h4>
                </div>
                <div className="flex items-baseline gap-3 mt-4">
                   <span className="text-6xl font-black tracking-tighter text-green-600 tabular-nums">{metrics2026[3].target}</span>
                   <span className="text-xl font-medium text-slate-400">万</span>
                </div>
                 <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                   <span className="text-xs text-slate-500">保底目标:</span>
                   <span className="text-sm font-bold text-slate-700 tabular-nums">{metrics2026[2].target}</span>
                </div>
              </div>
              <div className="mt-10 relative z-10 border-t border-gray-100 pt-6">
                 <div className="flex items-center justify-between bg-green-50 rounded-xl p-4 border border-green-100">
                    <div>
                        <div className="text-xs font-bold text-green-800 uppercase mb-1">目标毛利率</div>
                        <div className="text-3xl font-black text-green-700 tracking-tight tabular-nums">16.39%</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-green-600 mb-1">vs 2025 (2.9%)</div>
                        <div className="inline-block bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded-lg">
                            +13.4 pts
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};