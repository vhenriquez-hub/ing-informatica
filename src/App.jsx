import { useState, useEffect } from 'react';
import './App.css'; // Left empty but imported to prevent Vite errors if present
import Header from './components/Header';
import Tabs from './components/Tabs';
import ScheduleView from './views/ScheduleView';
import EvaluationsView from './views/EvaluationsView';
import AcademicCalendarView from './views/AcademicCalendarView';
import QuickLinksView from './views/QuickLinksView';

function App() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [role, setRole] = useState('student'); // 'student' or 'admin'

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <ScheduleView role={role} />;
      case 'evaluations':
        return <EvaluationsView role={role} />;
      case 'academic-calendar':
        return <AcademicCalendarView />;
      case 'quick-links':
        return <QuickLinksView />;
      default:
        return <ScheduleView role={role} />;
    }
  };

  return (
    <div className="app-container">
      <Header role={role} onRoleChange={handleRoleChange} />
      
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="view-container">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
