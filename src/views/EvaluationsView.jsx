import React, { useState, useEffect } from 'react';

// For this prototype, we're using mock local storage
export default function EvaluationsView({ role }) {
  const [evaluations, setEvaluations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEval, setNewEval] = useState({ subject: '', date: '', description: '' });

  useEffect(() => {
    // Load evaluations from localStorage
    const saved = localStorage.getItem('evaluationsData');
    if (saved) {
      setEvaluations(JSON.parse(saved));
    } else {
      // Mock initial data
      const initial = [
        { id: 1, subject: 'Programación web', date: '2026-04-15', description: 'Prueba 1: React Basics' },
        { id: 2, subject: 'Minería de Datos', date: '2026-04-20', description: 'Entrega Proyecto 1' },
      ];
      setEvaluations(initial);
      localStorage.setItem('evaluationsData', JSON.stringify(initial));
    }
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newEval.subject || !newEval.date) return;
    
    const evalData = {
      id: Date.now(),
      ...newEval
    };
    
    const updated = [...evaluations, evalData].sort((a,b) => new Date(a.date) - new Date(b.date));
    setEvaluations(updated);
    localStorage.setItem('evaluationsData', JSON.stringify(updated));
    setShowModal(false);
    setNewEval({ subject: '', date: '', description: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta evaluación?')) {
      const updated = evaluations.filter(e => e.id !== id);
      setEvaluations(updated);
      localStorage.setItem('evaluationsData', JSON.stringify(updated));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Calendario de Evaluaciones</h2>
        
        {/* Only admins see this button */}
        {role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Agregar Evaluación
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {evaluations.length === 0 ? (
          <div className="empty-state">No hay evaluaciones programadas.</div>
        ) : (
          evaluations.map(ev => (
            <div key={ev.id} style={{
              padding: '1.5rem', 
              background: 'white', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{ev.subject}</h3>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                📅 {new Date(ev.date).toLocaleDateString()}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{ev.description}</p>
              
              {role === 'admin' && (
                 <button 
                  onClick={() => handleDelete(ev.id)}
                  className="btn btn-outline" 
                  style={{ marginTop: '1rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderColor: '#fee2e2', color: '#ef4444' }}>
                   Eliminar
                 </button>
              )}
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)',
            width: '90%', maxWidth: '400px', boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Nueva Evaluación</h3>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Ramo</label>
                <input required type="text" value={newEval.subject} onChange={e => setNewEval({...newEval, subject: e.target.value})} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Fecha</label>
                <input required type="date" value={newEval.date} onChange={e => setNewEval({...newEval, date: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Descripción (Opcional)</label>
                <textarea value={newEval.description} onChange={e => setNewEval({...newEval, description: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
