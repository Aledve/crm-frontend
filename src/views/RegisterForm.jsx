import React, { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RegisterForm() {
  const [roleName, setRoleName] = useState("");
  const [roleElementId, setRoleElementId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identification: "",
    email: "",
    phone: "",
    password: "", // Solo uso local
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${BASE_URL}/roleService`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleName }),
      });

      if (!res.ok) throw new Error("Error al registrar el rol");

      const resText = await res.text();
      const idMatch = resText.match(/ID:\s*(.+)/);
      const id = idMatch?.[1]?.trim();

      if (!id) throw new Error("No se pudo obtener el ID del rol");

      setRoleElementId(id);
      setSuccess("Rol registrado con éxito");
    } catch (err) {
      setError(err.message || "Error desconocido");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const person = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        identification: formData.identification,
        email: formData.email,
        phone: formData.phone,
      };

      const res = await fetch(`${BASE_URL}/personService`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || "Error al registrar persona");
      }

      setSuccess("Persona registrada exitosamente");
      setFormData({
        firstName: "",
        lastName: "",
        identification: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      setError(err.message || "Ocurrió un error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center">Registrar Rol</h2>
        <form onSubmit={handleRoleSubmit} className="space-y-4">
          <input
            type="text"
            name="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
            placeholder="Nombre del Rol"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Registrar Rol
          </button>
        </form>

        <h2 className="text-xl font-semibold text-gray-800 text-center">Registrar Persona</h2>
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Nombre"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Apellido"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="identification"
            value={formData.identification}
            onChange={handleChange}
            required
            placeholder="Identificación"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Teléfono"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Contraseña"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Registrar Persona
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        <div className="text-sm text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
