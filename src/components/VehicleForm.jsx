import React, { useState } from 'react';

const TeamForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    state: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await teamService.create(formData);
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Error al guardar el equipo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        name="name"
        required
        placeholder="Nombre del equipo"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        name="startDate"
        required
        value={formData.startDate}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="date"
        name="endDate"
        required
        value={formData.endDate}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="state"
          checked={formData.state}
          onChange={handleChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="text-gray-700">Estado activo</span>
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Guardar Equipo
      </button>
    </form>
  );
};

export default TeamForm;
