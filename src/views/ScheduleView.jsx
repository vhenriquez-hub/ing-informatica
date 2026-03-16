import React, { useState, useEffect } from 'react';
import './ScheduleView.css';

const scheduleData = [
  {
    time: "19:00 - 19:45",
    lunes: { name: "Robótica y Automatización", prof: "Ricardo Inostroza", color: "robotica" },
    martes: { name: "Minería de Datos", prof: "Nelson Muñoz", color: "mineria" },
    miercoles: { name: "Inglés I", prof: "Carmen Cantillana", color: "ingles" },
    jueves: { name: "Programación web", prof: "Francisco Calfun", color: "progweb" },
    viernes: { name: "Roberto Guineo", prof: "Big Data", color: "bigdata" }
  },
  {
    time: "19:45 - 20:30",
    lunes: { name: "Robótica y Automatización", prof: "Ricardo Inostroza", color: "robotica" },
    martes: { name: "Minería de Datos", prof: "Nelson Muñoz", color: "mineria" },
    miercoles: { name: "Inglés I", prof: "Carmen Cantillana", color: "ingles" },
    jueves: { name: "Programación web", prof: "Francisco Calfun", color: "progweb" },
    viernes: { name: "Roberto Guineo", prof: "Big Data", color: "bigdata" }
  },
  {
    time: "20:40 - 21:25",
    lunes: { name: "Robótica y Automatización", prof: "Ricardo Inostroza", color: "robotica" },
    martes: { name: "Minería de Datos", prof: "Nelson Muñoz", color: "mineria" },
    miercoles: { name: "Seguridad y Auditoria", prof: "Eduardo Barria", color: "seguridad" },
    jueves: { name: "Programación web", prof: "Francisco Calfun", color: "progweb" },
    viernes: { name: "Roberto Guineo", prof: "Big Data", color: "bigdata" }
  },
  {
    time: "21:25 - 22:10",
    lunes: { name: "Programación web", prof: "Francisco Calfun", color: "progweb" },
    martes: { name: "Minería de Datos", prof: "Nelson Muñoz", color: "mineria" },
    miercoles: { name: "Seguridad y Auditoria", prof: "Eduardo Barria", color: "seguridad" },
    jueves: null,
    viernes: { name: "Roberto Guineo", prof: "Big Data", color: "bigdata" }
  },
  {
    time: "22:15 - 23:00",
    lunes: { name: "Programación web", prof: "Francisco Calfun", color: "progweb" },
    martes: null,
    miercoles: { name: "Seguridad y Auditoria", prof: "Eduardo Barria", color: "seguridad" },
    jueves: null,
    viernes: null
  },
  {
    time: "23:00 - 23:45",
    lunes: null,
    martes: null,
    miercoles: null,
    jueves: null,
    viernes: null
  }
];

function ClassCell({ block }) {
  if (!block) return <td></td>;
  
  return (
    <td className={`class-cell bg-${block.color}`}>
      <div className="class-name">{block.name}</div>
      <div className="class-prof">{block.prof}</div>
    </td>
  );
}

export default function ScheduleView({ role }) {
  const [uploadedSchedules, setUploadedSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ title: '', imageBase64: '' });

  useEffect(() => {
    const saved = localStorage.getItem('uploadedSchedules');
    if (saved) {
      try {
        setUploadedSchedules(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse schedules");
      }
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSchedule({ ...newSchedule, imageBase64: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newSchedule.title || !newSchedule.imageBase64) return;
    
    const schedData = {
      id: Date.now(),
      ...newSchedule
    };
    
    const updated = [...uploadedSchedules, schedData];
    setUploadedSchedules(updated);
    localStorage.setItem('uploadedSchedules', JSON.stringify(updated));
    setShowModal(false);
    setNewSchedule({ title: '', imageBase64: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este horario?')) {
      const updated = uploadedSchedules.filter(s => s.id !== id);
      setUploadedSchedules(updated);
      localStorage.setItem('uploadedSchedules', JSON.stringify(updated));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Horarios y Semestres</h2>
        
        {role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Subir Horario (Imagen)
          </button>
        )}
      </div>
      
      {/* Base Text Schedule */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Horario 3er Semestre: Ing. Informática (Vespertino)</h3>
        <div className="table-responsive">
          <table className="schedule-table">
            <thead>
              <tr>
                <th className="time-col">Hora</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, idx) => (
                <tr key={idx}>
                  <td className="time-col">{row.time}</td>
                  <ClassCell block={row.lunes} />
                  <ClassCell block={row.martes} />
                  <ClassCell block={row.miercoles} />
                  <ClassCell block={row.jueves} />
                  <ClassCell block={row.viernes} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Uploaded Schedules Iteration */}
      {uploadedSchedules.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {uploadedSchedules.map(sched => (
            <div key={sched.id} style={{
              background: 'white', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary-color)' }}>{sched.title}</h3>
                {role === 'admin' && (
                  <button 
                    onClick={() => handleDelete(sched.id)}
                    className="btn btn-outline" 
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderColor: '#fee2e2', color: '#ef4444' }}>
                    Eliminar
                  </button>
                )}
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <img src={sched.imageBase64} alt={sched.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for adding image schedules */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)',
            width: '90%', maxWidth: '500px', boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Subir Nuevo Horario</h3>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Nombre del Semestre / Sección</label>
                <input required type="text" placeholder="Ej: 4to Semestre - Diurno" value={newSchedule.title} onChange={e => setNewSchedule({...newSchedule, title: e.target.value})} 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Imagen del Horario</label>
                <input required type="file" accept="image/*" onChange={handleImageUpload}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                {newSchedule.imageBase64 && (
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Vista Previa:</p>
                    <img src={newSchedule.imageBase64} alt="Preview" style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px', border: '1px solid #e5e7eb' }} />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => { setShowModal(false); setNewSchedule({title: '', imageBase64: ''}); }}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={!newSchedule.title || !newSchedule.imageBase64}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
