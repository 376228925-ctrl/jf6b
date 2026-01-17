import React from 'react';
import { strategy2026 } from '../constants';
import { Shield, TrendingUp, Zap, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Strategy: React.FC = () => {
  const getIcon = (pillar: string) => {
    if (pillar.includes('稳盘')) return Shield;
    if (pillar.includes('增效')) return TrendingUp;
    if (pillar.includes('突围')) return Zap;
    return Scale;
  };

  const getColor = (index: number) => {
      const colors = [
          'border-blue-500 bg-blue-50 text-blue-700',
          'border-amber-500 bg-amber-50 text-amber-700',
          'border-green-500 bg-green-50 text-green-700',
          'border-purple-500 bg-purple-50 text-purple-700'
      ];
      return colors[index % colors.length];
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">2026 战略规划全景图</h2>
        <div className="inline-block bg-blue-100 text-blue-800 px-6 py-2 rounded-full font-bold text-sm mb-6">
          主题：存量稳盘 · 增量突围 · 利润回正
        </div>
        <p className="text-slate-600 leading-relaxed text-sm">
          面对2025年的利润失守，2026年我们将采取更激进的成本管控与更聚焦的市场策略。
          战略核心在于处理好“规模”与“效益”的平衡，坚决砍掉负资产，将资源集中在泛娱乐高毛利赛道。
        </p>
      </div>

      {/* Strategic Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {strategy2026.map((item, idx) => {
            const Icon = getIcon(item.pillar);
            const colorClass = getColor(idx);
            
            return (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between ${colorClass.split(' ')[1]}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-white bg-opacity-60`}>
                                <Icon className={`w-6 h-6 ${colorClass.split(' ')[2]}`} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800">{item.pillar.split(' ')[0]}</h3>
                                <p className="text-xs text-slate-500 uppercase">{item.pillar.split(' ')[1] || 'STRATEGY'}</p>
                            </div>
                        </div>
                        <span className="text-4xl font-black text-slate-200 opacity-50">0{idx + 1}</span>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                        <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                            {item.description}
                        </p>

                        <div className="space-y-4 mb-8 flex-1">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">关键举措 (Key Tactics)</h5>
                            <ul className="space-y-3">
                                {item.tactics.map((tactic, tIdx) => (
                                    <li key={tIdx} className="flex items-start gap-3 text-sm text-slate-700">
                                        <ArrowRight className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                        <span>{tactic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 mt-auto">
                            <div className="flex items-center gap-2 mb-1">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-bold text-slate-500 uppercase">考核指标 (KPI)</span>
                            </div>
                            <p className="text-sm font-semibold text-slate-800">{item.kpi}</p>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>

      {/* Financial Roadmap Table */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-5 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">2026 季度财务预测 (Financial Projection)</h3>
          <span className="text-xs text-slate-500 italic">*基于冲刺目标测算</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-slate-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-8 py-4 w-1/5">季度 (Quarter)</th>
                <th className="px-8 py-4 w-1/5">营收预期</th>
                <th className="px-8 py-4 w-1/5">成本控制</th>
                <th className="px-8 py-4 w-1/5">毛利率 (GPM)</th>
                <th className="px-8 py-4 w-1/5 text-right">经营趋势</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-slate-700">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 font-semibold text-slate-900">Q1 (1-3月)</td>
                <td className="px-8 py-5">~800 万</td>
                <td className="px-8 py-5">~720 万</td>
                <td className="px-8 py-5 text-orange-600 font-medium">~10.0%</td>
                <td className="px-8 py-5 text-right"><span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">调整期</span></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 font-semibold text-slate-900">Q2 (4-6月)</td>
                <td className="px-8 py-5">~1100 万</td>
                <td className="px-8 py-5">~930 万</td>
                <td className="px-8 py-5 text-blue-600 font-medium">~15.5%</td>
                <td className="px-8 py-5 text-right"><span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">爬坡期</span></td>
              </tr>
               <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 font-semibold text-slate-900">Q3 (7-9月)</td>
                <td className="px-8 py-5">~1300 万</td>
                <td className="px-8 py-5">~1050 万</td>
                <td className="px-8 py-5 text-green-600 font-medium">~19.2%</td>
                 <td className="px-8 py-5 text-right"><span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs">爆发期</span></td>
              </tr>
               <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 font-semibold text-slate-900">Q4 (10-12月)</td>
                <td className="px-8 py-5">~1220 万</td>
                <td className="px-8 py-5">~1000 万</td>
                <td className="px-8 py-5 text-green-600 font-medium">~18.0%</td>
                 <td className="px-8 py-5 text-right"><span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs">稳定期</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};