import React from 'react';

function Header({ role, onRoleChange }) {
  const toggleRole = () => {
    const newRole = role === 'student' ? 'admin' : 'student';
    onRoleChange(newRole);
  };

  return (
    <header className="app-header">
      <h1 className="app-title">Mi Horario Universitario</h1>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className="role-badge">
          {role === 'admin' ? 'Coordinador/Profesor' : 'Estudiante'}
        </span>
        
        <button 
          className={`btn ${role === 'admin' ? 'btn-outline' : 'btn-primary'}`} 
          onClick={toggleRole}
        >
          {role === 'admin' ? 'Cerrar Sesión Admin' : 'Ingreso Evaluación (Admin)'}
        </button>
      </div>
    </header>
  );
}

export default Header;
