import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Retrospective } from './components/Retrospective';
import { Strategy } from './components/Strategy';
import { ActionPlanView } from './components/ActionPlanView';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'retrospective':
        return <Retrospective />;
      case 'strategy':
        return <Strategy />;
      case 'actions':
        return <ActionPlanView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;