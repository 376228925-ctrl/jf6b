import React from 'react';
import { metrics2025, metrics2026 } from '../constants';
import { TrendingUp, TrendingDown, Target, AlertOctagon, Briefcase, DollarSign } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Executive Abstract */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 border-l-4 border-l-blue-600">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          管理层摘要 (Management Abstract)
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
             <h4 className="font-semibold text-slate-700 border-b border-gray-100 pb-2">2025 回顾：挑战与阵痛</h4>
             <p className="text-slate-600 leading-relaxed text-sm text-justify">
               2025年是交付六部极其艰难的一年。尽管BPO业务实现了从0到600万+的营收突破，但由于<strong>定价策略失误</strong>与<strong>刚性成本管控失效</strong>，导致出现了严重的“增收不增利”现象。全年营收达成率仅80.1%，毛利润更是大幅跳水，仅达成目标的20%。核心痛点集中在BPO人效低下、非经营性赔偿支出过高（57万）以及新大客户（网易/美团）拓展受阻。
             </p>
          </div>
          <div className="space-y-3">
             <h4 className="font-semibold text-slate-700 border-b border-gray-100 pb-2">2026 展望：稳盘与突围</h4>
             <p className="text-slate-600 leading-relaxed text-sm text-justify">
               2026年战略定调为<span className="text-blue-700 font-bold">“存量稳盘 · 增量突围”</span>。我们将彻底扭转BPO的亏损局面，通过关停低效站点、重议单价实现毛利转正。同时，依托腾讯/百度框架协议，向高毛利的<strong>游戏与泛娱乐</strong>赛道发起冲刺。
               <br/>
               <strong>核心目标：</strong>冲刺营收 <strong>4421万</strong>，毛利 <strong>724万</strong> (GPM ~16.4%)。
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
          <span className="text-xs text-slate-400">单位：万元 (CNY)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics2025.map((m, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                    {m.label.includes('利润') ? <DollarSign className="w-5 h-5 text-slate-600" /> : <TrendingUp className="w-5 h-5 text-slate-600" />}
                 </div>
                 <span className={`px-2 py-1 rounded text-xs font-bold ${m.status === 'danger' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                   {m.status === 'danger' ? '未达标' : '超预期'}
                 </span>
              </div>
              
              <p className="text-sm font-medium text-slate-500">{m.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-3xl font-bold tracking-tight ${m.actual < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                  {m.actual}
                </span>
                <span className="text-xs text-slate-400 font-medium">{m.unit}</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">目标: {m.target}</span>
                  {m.target > 0 && (
                     <span className={`${m.actual >= m.target ? 'text-green-600' : 'text-red-500'} font-semibold`}>
                       达成率: {((m.actual / m.target) * 100).toFixed(1)}%
                     </span>
                  )}
                </div>
                {/* Progress Bar */}
                {m.target > 0 && (
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                    <div 
                      className={`h-1.5 rounded-full ${m.actual >= m.target ? 'bg-green-500' : 'bg-red-500'}`} 
                      style={{ width: `${Math.min(Math.max((m.actual / m.target) * 100, 0), 100)}%` }}
                    ></div>
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-3 leading-snug">
                  {m.analysis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2026 Strategy Cards */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" /> 2026 战略目标预测
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Revenue Goals */}
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target size={120} />
              </div>
              <div>
                <h4 className="text-slate-300 font-medium mb-1">2026 营收目标 (Revenue)</h4>
                <div className="flex items-baseline gap-3 mt-2">
                   <span className="text-5xl font-bold text-white">{metrics2026[1].target}</span>
                   <span className="text-lg text-slate-400">万元 (冲刺)</span>
                </div>
                <div className="mt-2 text-sm text-slate-400">
                  保底目标: {metrics2026[0].target} 万元
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-2">
                   <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                   <span className="text-sm text-slate-300">同比增长预期: +76% (基于2025实际值)</span>
                </div>
              </div>
           </div>

           {/* Profit Goals */}
           <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <DollarSign size={120} />
              </div>
              <div>
                <h4 className="text-slate-500 font-medium mb-1">2026 利润目标 (Profit)</h4>
                <div className="flex items-baseline gap-3 mt-2">
                   <span className="text-5xl font-bold text-green-600">{metrics2026[3].target}</span>
                   <span className="text-lg text-slate-500">万元 (冲刺)</span>
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  保底目标: {metrics2026[2].target} 万元
                </div>
              </div>
              <div className="mt-8 bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="flex justify-between items-center">
                   <span className="text-sm font-semibold text-green-800">目标毛利率 (GPM)</span>
                   <span className="text-xl font-bold text-green-700">16.39%</span>
                </div>
                <p className="text-xs text-green-600 mt-1">对比2025年实际毛利率(2.9%)将实现质的飞跃</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};