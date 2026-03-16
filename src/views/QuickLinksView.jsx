import React from 'react';

const linksData = [
  {
    title: 'ULagos Virtual',
    description: 'Accede al entorno virtual de aprendizaje institucional.',
    url: 'https://www.ulagosvirtual.cl/',
    icon: '💻',
    color: '#3b82f6'
  },
  {
    title: 'Sistema de Asistencia',
    description: 'Registra y revisa tu asistencia a las clases.',
    url: 'https://asistencia.ulagos.cl/login/',
    icon: '✅',
    color: '#10b981'
  },
  {
    title: 'Portal de Docencia',
    description: 'Gestión académica, notas y solicitudes estudiantiles.',
    url: 'https://docencia.ulagos.cl/notas/login.php',
    icon: '📚',
    color: '#8b5cf6'
  }
];

export default function QuickLinksView() {
  return (
    <div>
      <h2 className="section-title">Accesos Institucionales ULagos</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Enlaces rápidos a las plataformas oficiales de la universidad.
      </p>

      <div style={{
        display: 'grid',
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}>
        {linksData.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1.5rem',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'var(--transition)',
          }} className="link-card">
            
            <div style={{
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: 'var(--radius-md)',
              background: `${link.color}15`, // Adding gentle opacity to background matching icon color
              marginRight: '1.5rem',
              flexShrink: 0
            }}>
              {link.icon}
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', color: link.color, marginBottom: '0.25rem' }}>{link.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{link.description}</p>
            </div>
          </a>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .link-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md) !important;
          border-color: #cbd5e1 !important;
        }
      `}} />
    </div>
  );
}
