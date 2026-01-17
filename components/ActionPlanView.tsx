import React from 'react';
import { actionPlan } from '../constants';
import { CheckCircle2, AlertTriangle, User, Calendar, Flag } from 'lucide-react';

export const ActionPlanView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 rounded-xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="text-2xl font-bold mb-2">2026 重点行动矩阵 (Execution Matrix)</h2>
           <p className="text-slate-400 text-sm max-w-2xl">
            本矩阵建立了从“2025问题点”到“2026解决方案”的直接映射。所有行动项均已落实到责任人与季度里程碑，确保战略不悬空。
          </p>
        </div>
        <div className="bg-slate-800 px-6 py-4 rounded-lg border border-slate-700">
           <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">年度核心战役</div>
           <div className="font-bold text-blue-400">BPO扭亏战 · 渠道攻坚战 · 效率升级战</div>
        </div>
      </div>

      {/* Action Table */}
      <div className="grid gap-8">
        {actionPlan.map((action, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Card Header: Problem & Strategy */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-4">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-600 uppercase">{action.category}</span>
                     <span className="text-xs text-slate-400">问题 ID: #{action.issueId}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     <span className="text-red-500">痛点:</span> {action.issueTitle}
                  </h3>
               </div>
               <div className="md:text-right">
                  <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">应对策略 (Strategy)</div>
                  <div className="text-blue-700 font-bold text-lg">{action.strategy}</div>
               </div>
            </div>

            {/* Card Body: Details */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
               
               {/* Milestones */}
               <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" /> 关键里程碑 (Milestones)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {action.milestones.map((ms, i) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded border border-slate-100 text-sm text-slate-700">
                           <span className="bg-white border border-slate-200 text-slate-500 text-xs font-bold px-1.5 py-0.5 rounded min-w-[3rem] text-center mt-0.5">
                             {ms.split(':')[0]}
                           </span>
                           <span>{ms.split(':')[1]}</span>
                        </div>
                    ))}
                  </div>
               </div>

               {/* Meta Info */}
               <div className="space-y-6 lg:border-l lg:border-gray-100 lg:pl-8">
                  
                  {/* Owner */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <User className="w-3 h-3" /> 责任人 (Owner)
                    </h4>
                    <p className="font-medium text-slate-800">{action.owner}</p>
                  </div>

                  {/* Risks */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> 潜在风险 (Risk)
                    </h4>
                    <p className="text-sm text-slate-600 leading-snug">{action.risk}</p>
                  </div>

                   {/* Outcome */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <Flag className="w-3 h-3" /> 预期成果 (Outcome)
                    </h4>
                    <div className="flex items-start gap-2 text-green-700 bg-green-50 p-3 rounded border border-green-100 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {action.expectedOutcome}
                    </div>
                  </div>

               </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Policy Footer */}
      <div className="bg-red-50 border border-red-100 rounded-lg p-6 mt-12">
        <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            不可触碰之红线 (Zero Tolerance Policy)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-red-800">
            <div className="space-y-1">
                <span className="font-bold block text-red-950">01. 负毛利运营</span>
                <p>任何项目连续2个月毛利为负，且无明确扭亏计划书，立即触发熔断机制停止交付。</p>
            </div>
            <div className="space-y-1">
                <span className="font-bold block text-red-950">02. 账期红线</span>
                <p>对于超过合同约定回款期60天的客户，系统自动冻结新需求受理权限。</p>
            </div>
             <div className="space-y-1">
                <span className="font-bold block text-red-950">03. 合规底线</span>
                <p>严禁任何形式的"无绩效证据"辞退。所有PIP必须由HRBP与业务负责人双签归档。</p>
            </div>
        </div>
      </div>
    </div>
  );
};