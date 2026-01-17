import React from 'react';
import { strategy2026 } from '../constants';
import { Shield, TrendingUp, Zap, Scale, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';

export const Strategy: React.FC = () => {
  const getIcon = (pillar: string) => {
    if (pillar.includes('稳盘')) return Shield;
    if (pillar.includes('增量') || pillar.includes('突围')) return Zap;
    if (pillar.includes('利润')) return TrendingUp;
    if (pillar.includes('AI') || pillar.includes('转型')) return Cpu;
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

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">2026 战略规划全景图</h2>
        <div className="inline-block bg-blue-100 text-blue-800 px-6 py-2 rounded-full font-bold text-sm mb-6">
          核心战役：BPO扭亏 · 渠道攻坚 · AI提效
        </div>
        <p className="text-slate-600 leading-relaxed text-sm">
          2026年，我们将以<strong>"稳存量、拓新增"</strong>为双轮驱动，并全面引入<strong>AI与顾问式交付</strong>思维。
          在解决生存问题(利润回正)的同时，通过建立专家系统与标准化SOP，实现从"人力租赁"向"解决方案合作伙伴"的身份跨越。
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
          <h3 className="font-bold text-slate-800">2026 财务月度/季度预测</h3>
          <span className="text-xs text-slate-500 italic">*基于冲刺营收4421万测算</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-slate-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">时间节点</th>
                <th className="px-6 py-4">营收预期</th>
                <th className="px-6 py-4">成本预测</th>
                <th className="px-6 py-4">毛利润</th>
                <th className="px-6 py-4">毛利率</th>
                <th className="px-6 py-4 text-right">经营状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-slate-700">
              <tr className="bg-slate-50">
                <td className="px-6 py-3 font-bold text-slate-900">Q1 (1-3月)</td>
                <td className="px-6 py-3">662.5 万</td>
                <td className="px-6 py-3">579.8 万</td>
                <td className="px-6 py-3 font-semibold text-green-600">82.8 万</td>
                <td className="px-6 py-3">12.5%</td>
                <td className="px-6 py-3 text-right"><span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">调整期</span></td>
              </tr>
              <tr>
                 <td className="px-6 py-3 font-bold text-slate-900">Q2 (4-6月)</td>
                 <td className="px-6 py-3">997.8 万</td>
                 <td className="px-6 py-3">838.3 万</td>
                 <td className="px-6 py-3 font-semibold text-green-600">159.5 万</td>
                 <td className="px-6 py-3">16.0%</td>
                 <td className="px-6 py-3 text-right"><span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">爬坡期</span></td>
              </tr>
              <tr className="bg-slate-50">
                 <td className="px-6 py-3 font-bold text-slate-900">Q3 (7-9月)</td>
                 <td className="px-6 py-3">1309.5 万</td>
                 <td className="px-6 py-3">1074.1 万</td>
                 <td className="px-6 py-3 font-semibold text-green-600">235.3 万</td>
                 <td className="px-6 py-3">17.9%</td>
                 <td className="px-6 py-3 text-right"><span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">爆发期</span></td>
              </tr>
              <tr>
                 <td className="px-6 py-3 font-bold text-slate-900">Q4 (10-12月)</td>
                 <td className="px-6 py-3">1451.2 万</td>
                 <td className="px-6 py-3">1164.1 万</td>
                 <td className="px-6 py-3 font-semibold text-green-600">287.1 万</td>
                 <td className="px-6 py-3">19.7%</td>
                 <td className="px-6 py-3 text-right"><span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">稳定期</span></td>
              </tr>
               <tr className="bg-blue-600 text-white font-bold">
                 <td className="px-6 py-4">2026 全年合计</td>
                 <td className="px-6 py-4">4421.18 万</td>
                 <td className="px-6 py-4">3696.47 万</td>
                 <td className="px-6 py-4">724.71 万</td>
                 <td className="px-6 py-4">16.39%</td>
                 <td className="px-6 py-4 text-right">目标达成</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};