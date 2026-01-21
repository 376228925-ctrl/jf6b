import React from 'react';
import { metrics2025, metrics2026 } from '../constants';
import { TrendingUp, TrendingDown, Target, AlertOctagon, Briefcase, DollarSign, Trophy, Percent, Crown } from 'lucide-react';

export const Dashboard: React.FC = () => {
  // Helper to extract rank from analysis string if present
  const getRankFromAnalysis = (text?: string) => {
    const match = text?.match(/排名[：:]\s*(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Executive Abstract */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 border-l-4 border-l-blue-600">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          25 年复盘总结
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-3">
             <h4 className="font-semibold text-slate-700 border-b border-gray-100 pb-2">2025 自省：规模与利润的背离</h4>
             <p className="text-slate-600 leading-relaxed text-sm text-justify">
               2025年营收达成 <strong className="text-slate-900 bg-slate-100 px-1 rounded">2009.55万</strong>，但毛利仅 <strong className="text-slate-900 bg-red-50 text-red-700 px-1 rounded">60.16万</strong>。
               <br/>
               <strong className="text-red-600">核心痛点：</strong>
               1. <strong>BPO利润倒挂：</strong>月度数据显示4-6月亏损最严重，单月最高亏损35万，主要受人力与固定成本双高挤压。
               2. <strong>非经营成本高企：</strong>历史遗留赔付(45万)侵蚀了近15%的年度目标毛利。
               3. <strong>关键战役失利：</strong>网易/美团/腾讯PCG等框架招标未中选，导致对平安系(75%+)依赖依旧严重。
             </p>
          </div>
          <div className="space-y-3">
             <h4 className="font-semibold text-slate-700 border-b border-gray-100 pb-2">2026 规划：BPO扭亏与新赛道突围</h4>
             <p className="text-slate-600 leading-relaxed text-sm text-justify">
               2026年战略目标：保底营收 <strong className="text-blue-700">3188.39万</strong>，保底毛利 <strong className="text-green-700">499.24万</strong>。
               <br/>
               <strong>关键举措：</strong>
               1. <strong>BPO重构：</strong>全面推行计件制（(结算-成本)*0.8），锁定20%毛利，重点投入百度自驾与大模型项目。
               2. <strong>数据驱动：</strong>建立“基地人均产值”与“风险预警”看板，杜绝无效工时与结算差异。
               3. <strong>价值跃迁：</strong>沉淀行业Know-how，构建“知识资产”护城河，从“人力交付”向“专家服务”转型。
             </p>
          </div>
        </div>
      </div>

      {/* 2025 KPI Cards */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-slate-500" /> 2025 核心财务指标复盘
          </h3>
          <span className="text-xs text-slate-400 font-mono">单位: 万 (CNY)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {metrics2025.map((m, idx) => {
            const rank = getRankFromAnalysis(m.analysis);
            const percentage = m.target > 0 ? ((m.actual / m.target) * 100).toFixed(1) : null;
            
            return (
              <div key={idx} className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 group hover:shadow-lg hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
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
                  <span className={`text-3xl md:text-4xl font-extrabold tracking-tight tabular-nums ${m.actual < 0 ? 'text-red-600' : 'text-slate-900'}`}>
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
                         <span className="text-xl md:text-2xl font-bold italic tracking-tight">{percentage}%</span>
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
           <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-200 flex flex-col justify-between relative overflow-hidden group hover:border-blue-300 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Target size={140} className="text-blue-600" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                        <h4 className="text-slate-500 font-bold tracking-wide uppercase text-sm">营收目标 (Revenue)</h4>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 items-end">
                   <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-5xl font-black tracking-tighter text-blue-900 tabular-nums">{metrics2026[0].target}</span>
                            <span className="text-lg font-medium text-slate-400">万</span>
                        </div>
                        <div className="mt-1 text-xs font-bold text-blue-600 uppercase tracking-wider">
                           保底目标 (Baseline)
                        </div>
                   </div>
                   
                   {/* Enhanced Sprint Visual */}
                   <div className="text-right border-l border-gray-100 pl-4">
                        <div className="flex items-baseline gap-2 justify-end text-amber-600">
                             <Crown className="w-4 h-4" />
                             <span className="text-2xl md:text-3xl font-black tracking-tighter tabular-nums">{metrics2026[1].target}</span>
                             <span className="text-sm font-medium text-amber-400">万</span>
                        </div>
                        <div className="mt-1 text-xs font-bold text-amber-500 uppercase tracking-wider">
                           冲刺目标 (Sprint)
                        </div>
                   </div>
                </div>
              </div>

              <div className="mt-6 relative z-10 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-2 gap-4">
                   {/* Baseline Growth */}
                   <div className="flex items-center gap-2">
                       <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 shrink-0">
                          <TrendingUp className="w-4 h-4" />
                       </div>
                       <div>
                           <div className="text-lg font-bold text-slate-700 tabular-nums leading-none">
                            {((metrics2026[0].target - metrics2025[0].actual) / metrics2025[0].actual * 100).toFixed(1)}%
                           </div>
                           <div className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">保底同比增长</div>
                       </div>
                   </div>

                   {/* Sprint Growth - Added */}
                   <div className="flex items-center gap-2 justify-end">
                       <div className="text-right">
                           <div className="text-lg font-bold text-amber-600 tabular-nums leading-none">
                            {((metrics2026[1].target - metrics2025[0].actual) / metrics2025[0].actual * 100).toFixed(1)}%
                           </div>
                           <div className="text-[10px] text-amber-500/80 font-medium uppercase mt-0.5">冲刺同比增长</div>
                       </div>
                       <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-600 shrink-0">
                          <TrendingUp className="w-4 h-4" />
                       </div>
                   </div>
                </div>
              </div>
           </div>

           {/* Profit Goals */}
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <DollarSign size={140} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                        <h4 className="text-slate-400 font-bold tracking-wide uppercase text-sm">利润目标 (Profit)</h4>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 items-end">
                   <div>
                       <div className="flex items-baseline gap-2">
                           <span className="text-4xl md:text-5xl font-black tracking-tighter text-white tabular-nums">{metrics2026[2].target}</span>
                           <span className="text-lg font-medium text-slate-400">万</span>
                       </div>
                       <div className="mt-1 text-xs font-bold text-green-400 uppercase tracking-wider">
                           保底目标 (Baseline)
                        </div>
                   </div>

                   {/* Enhanced Sprint Visual */}
                   <div className="text-right border-l border-white/10 pl-4">
                        <div className="flex items-baseline gap-2 justify-end text-green-300">
                             <Crown className="w-4 h-4" />
                             <span className="text-2xl md:text-3xl font-black tracking-tighter tabular-nums">{metrics2026[3].target}</span>
                             <span className="text-sm font-medium text-green-500/80">万</span>
                        </div>
                        <div className="mt-1 text-xs font-bold text-green-500 uppercase tracking-wider">
                           冲刺目标 (Sprint)
                        </div>
                   </div>
                </div>
              </div>

              <div className="mt-6 relative z-10 border-t border-white/10 pt-4">
                 <div className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-sm">
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">保底毛利率</div>
                        <div className="text-xl md:text-2xl font-black text-green-400 tracking-tight tabular-nums">
                            {((metrics2026[2].target / metrics2026[0].target) * 100).toFixed(2)}%
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-slate-400 mb-0.5">vs 2025 (2.9%)</div>
                        <div className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-2 py-0.5 rounded-lg">
                            +12.7 pts
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