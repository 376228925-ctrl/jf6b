import React from 'react';
import { strategy2026, monthlyFinancials2026 } from '../constants';
import { Shield, TrendingUp, Zap, Scale, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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

  // Categorize operating status based on margin
  const getStatus = (margin: number, month: string) => {
      const m = parseInt(month);
      if (m <= 3) return { text: '调整期', class: 'bg-orange-100 text-orange-600' };
      if (m <= 6) return { text: '爬坡期', class: 'bg-blue-100 text-blue-600' };
      if (m <= 9) return { text: '爆发期', class: 'bg-green-100 text-green-600' };
      return { text: '稳定期', class: 'bg-purple-100 text-purple-600' };
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

       {/* Growth Trajectory Chart */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
         <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" /> 2026 营收与利润爬坡轨迹
         </h3>
         <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyFinancials2026} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Area type="monotone" dataKey="revenue" name="营收(万)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                    <Area type="monotone" dataKey="profit" name="利润(万)" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
         </div>
       </div>

      {/* Financial Roadmap Table */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-5 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">2026 财务月度预测明细</h3>
          <span className="text-xs text-slate-500 italic">*基于冲刺营收4421万测算</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-slate-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">月份</th>
                <th className="px-6 py-4">营收预期</th>
                <th className="px-6 py-4">成本预测</th>
                <th className="px-6 py-4">毛利润</th>
                <th className="px-6 py-4">毛利率</th>
                <th className="px-6 py-4 text-right">经营状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-slate-700">
              {monthlyFinancials2026.map((row, idx) => {
                  const status = getStatus(row.margin, row.month);
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-900">{row.month}</td>
                        <td className="px-6 py-3">{row.revenue.toFixed(2)} 万</td>
                        <td className="px-6 py-3">{row.cost.toFixed(2)} 万</td>
                        <td className={`px-6 py-3 font-semibold ${row.profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>{row.profit.toFixed(2)} 万</td>
                        <td className="px-6 py-3">{row.margin.toFixed(2)}%</td>
                        <td className="px-6 py-3 text-right">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${status.class}`}>
                                {status.text}
                            </span>
                        </td>
                    </tr>
                  );
              })}
               <tr className="bg-blue-600 text-white font-bold text-base">
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