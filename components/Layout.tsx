import React, { useState } from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, History, Telescope, BarChart3, Menu, X, Milestone } from 'lucide-react';

interface LayoutProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onViewChange, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard' as ViewState, label: '执行摘要', icon: LayoutDashboard },
    { id: 'retrospective' as ViewState, label: '深度复盘 (2025)', icon: History },
    { id: 'strategy' as ViewState, label: '战略与行动 (2026)', icon: Telescope }, // Renamed and combined
  ];

  const handleMobileNavClick = (id: ViewState) => {
    onViewChange(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900 text-white flex flex-col animate-in slide-in-from-left duration-200 md:hidden">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-tight tracking-wide">Cisetech</h1>
                </div>
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg">
                <X className="w-6 h-6 text-slate-400" />
             </button>
          </div>
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
             {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileNavClick(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-6 h-6 ${currentView === item.id ? 'text-white' : 'text-slate-500'}`} />
                <span className="font-medium text-lg">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="p-6 border-t border-slate-800 text-xs text-slate-500 text-center">
            &copy; 2025 Cisetech Delivery Dept.
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
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
      <main className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-10 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
                className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(true)}
            >
                <Menu className="w-6 h-6" />
            </button>
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight line-clamp-1">
                {menuItems.find(i => i.id === currentView)?.label}
                </h2>
                <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">
                Delivery Dept 6 Annual Strategic Review & 2026 Outlook
                </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 md:px-3 md:py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] md:text-xs font-semibold border border-blue-100 whitespace-nowrap">
              内部绝密
            </span>
          </div>
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-20 w-full">
          {children}
        </div>
      </main>
    </div>
  );
};