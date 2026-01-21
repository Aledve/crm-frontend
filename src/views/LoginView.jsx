import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/api"; // Asegúrate de importar authService
import { toast } from 'react-toastify'; // Opcional, para mensajes bonitos

export default function LoginView() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Llamada real al backend (Auth Service)
      const response = await authService.login({
        username: formData.username,
        password: formData.password
      });

      // 2. Guardar el token (Asumiendo que el backend devuelve { token: "..." } o similar)
      // Ajusta 'response.token' según la estructura exacta de tu respuesta JSON
      if (response && response.token) {
        localStorage.setItem('AUTH_TOKEN', response.token);
        
        // Opcional: Guardar datos del usuario si vienen en la respuesta
        // localStorage.setItem('USER_DATA', JSON.stringify(response.user)); 

        toast.success("Bienvenido al Sistema de Parking");
        
        // 3. Redirigir al Dashboard Principal (Zonas)
        navigate("/"); 
      } else {
         // Si el backend no devuelve token pero responde 200 (caso raro)
         setError("Error en la respuesta del servidor");
      }

    } catch (err) {
      console.error("Login error:", err);
      // Mensaje de error amigable
      setError("Credenciales incorrectas o usuario no registrado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-200"
      >
        <div className="text-center">
            <h1 className="text-3xl font-black text-purple-600">Smart Parking</h1>
            <h2 className="text-lg font-medium text-gray-500 mt-2">
            Iniciar Sesión
            </h2>
        </div>

        <div>
          <label className="block mb-1 text-sm font-bold text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            name="username"
            placeholder="Ej: admin o correo@uce.edu.ec"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-bold text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center font-bold border border-red-200">
                {error}
            </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg transition-colors
            ${loading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'}
          `}
        >
          {loading ? 'Autenticando...' : 'Ingresar'}
        </button>

        <div className="text-sm text-center text-gray-500 mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/auth/register" className="text-purple-600 hover:text-purple-800 font-bold hover:underline">
            Solicitar Acceso
          </Link>
        </div>
      </form>
    </div>
  );
}
