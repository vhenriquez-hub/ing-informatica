import React from 'react';

function Tabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'schedule', label: 'Horarios y Semestres' },
    { id: 'evaluations', label: 'Evaluaciones y Fechas' },
    { id: 'academic-calendar', label: 'Calendario Académico' },
    { id: 'quick-links', label: 'Accesos Directos' }
  ];

  return (
    <nav className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default Tabs;
