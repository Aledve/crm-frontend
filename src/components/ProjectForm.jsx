import React, { useState } from 'react';
import { projectService } from '../api';

const ProjectForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    creationDate: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await projectService.create(formData);
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Error al guardar el proyecto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center text-gray-800">Nuevo Proyecto</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Nombre del proyecto"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Descripción"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        name="creationDate"
        value={formData.creationDate}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Guardar Proyecto
      </button>
    </form>
  );
};

export default ProjectForm;
