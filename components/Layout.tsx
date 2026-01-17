import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, History, Telescope, ClipboardCheck, BarChart3, FileText } from 'lucide-react';

interface LayoutProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onViewChange, children }) => {
  const menuItems = [
    { id: 'dashboard' as ViewState, label: '执行摘要', icon: LayoutDashboard },
    { id: 'retrospective' as ViewState, label: '深度复盘 (2025)', icon: History },
    { id: 'strategy' as ViewState, label: '战略规划 (2026)', icon: Telescope },
    { id: 'actions' as ViewState, label: '落地行动矩阵', icon: ClipboardCheck },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col border-r border-slate-800 shadow-2xl">
        <div className="p-6 border-b border-slate-700 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-wide">Cisetech</h1>
              <p className="text-xs text-slate-400 mt-1">交付六部 · 年度战略报告</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
           <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">报告导航</p>
           <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 group ${
                  currentView === item.id
                    ? 'bg-blue-600 text-white shadow-lg translate-x-1 font-semibold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
                }`}
              >
                <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-5 sticky top-0 z-20 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              {menuItems.find(i => i.id === currentView)?.label}
            </h2>
             <p className="text-sm text-slate-500 mt-1">
              Delivery Dept 6 Annual Strategic Review & 2026 Outlook
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
              内部绝密资料
            </span>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
          {children}
        </div>
      </main>
    </div>
  );
};