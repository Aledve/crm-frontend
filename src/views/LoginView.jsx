import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { personService } from "../api";

export default function LoginView() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await personService.getAll();
        console.log(data);
        setPeople(data);
      } catch (err) {
        console.error("Error al obtener personas:", err.message);
      }
    };

    fetchPeople();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const personExists = people.some(
      (person) =>
        person.email?.trim().toLowerCase() ===
        formData.username.trim().toLowerCase()
    );

    if (!personExists) {
      setError("Usuario no registrado");
      return;
    }

    // Redirigir si se encuentra el email
    navigate("/project");
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Usuario (correo)
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </button>

        <div className="text-sm text-center">
          ¿No tienes cuenta?{" "}
          <Link to="/registerForm" className="text-blue-600 hover:underline">
            Crear cuenta
          </Link>
        </div>
      </form>
    </div>
  );
}
