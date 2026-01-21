import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { authService } from "@/api" // Importamos el servicio actualizado
import { toast } from 'react-toastify'
import { useState } from "react"

export default function RegisterForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      identification: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  })

  const password = watch("password");

  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      // Preparamos el objeto tal cual lo espera Java (SignUp.java)
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        identification: formData.identification,
        email: formData.email,
        phone: formData.phone,
        username: formData.username, // El usuario para el login
        password: formData.password
      }

      await authService.register(payload)
      
      toast.success("Cuenta creada exitosamente. Por favor inicia sesión.")
      navigate("/auth/login") // Redirigir al login
      
    } catch (error) {
      console.error(error)
      toast.error(error.message || "Error al registrar la cuenta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200">
        
        <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-purple-600">Crear Cuenta</h1>
            <p className="text-gray-500 mt-2">Únete al Sistema de Parking Inteligente</p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4" noValidate>
          
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
                <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Juan"
                {...register("firstName", { required: "El nombre es obligatorio" })}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Apellido</label>
                <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Pérez"
                {...register("lastName", { required: "El apellido es obligatorio" })}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Identificación y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Cédula / ID</label>
                <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="171..."
                {...register("identification", { required: "La cédula es obligatoria" })}
                />
                {errors.identification && <p className="text-red-500 text-xs mt-1">{errors.identification.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Teléfono</label>
                <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="099..."
                {...register("phone", { required: "El teléfono es obligatorio" })}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="juan@ejemplo.com"
              {...register("email", { 
                required: "El email es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido"
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nombre de Usuario</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="juanperez123"
              {...register("username", { required: "El usuario es obligatorio" })}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="********"
              {...register("password", { 
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" }
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirmar Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Repetir Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="********"
              {...register("confirmPassword", { 
                required: "Repite tu contraseña",
                validate: value => value === password || "Las contraseñas no coinciden"
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <input
            type="submit"
            value={loading ? "Registrando..." : "Crear Cuenta"}
            disabled={loading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg cursor-pointer transition-colors mt-4 uppercase ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </form>

        <nav className="mt-8 text-center">
            <Link to="/auth/login" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">
                ¿Ya tienes una cuenta? <span className="font-bold">Inicia Sesión</span>
            </Link>
        </nav>
      </div>
    </div>
  )
}
