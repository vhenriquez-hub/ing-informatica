import React from 'react';

export default function AcademicCalendarView() {
  return (
    <div style={{ textAlign: 'center', padding: '1rem', height: '100%' }}>
      <h2 className="section-title">Calendario Académico 2026</h2>
      <div style={{
        marginTop: '1rem',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-color)',
        height: '75vh'
      }}>
        <iframe 
          src="/calendario-2026.pdf" 
          width="100%" 
          height="100%" 
          title="Calendario Académico 2026"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}
