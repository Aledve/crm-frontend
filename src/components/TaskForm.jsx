import React, { useState } from 'react';
import { taskService } from '../api';

const TaskForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: '',
    state: false,
    startDate: '',
    endDate: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await taskService.create(formData);
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Error al guardar la tarea');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center text-gray-800">Nueva Tarea</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Nombre"
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
        type="text"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        required
        placeholder="Prioridad"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="state"
          checked={formData.state}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <span className="text-gray-700">¿Completada?</span>
      </label>

      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Guardar Tarea
      </button>
    </form>
  );
};

export default TaskForm;
