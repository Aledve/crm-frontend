import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zoneService } from "@/api" // Usamos el nuevo servicio
import { toast } from 'react-toastify'

export default function ZoneForm() {
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      type: "GENERAL", // Valor por defecto
      capacity: 10,
      locationDescription: ""
    }
  })

  const handleCreateZone = async (formData) => {
    try {
      // Aseguramos que capacity sea número entero
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity, 10),
        occupiedSpaces: 0, // Inicializamos en 0
        state: true
      }
      
      await zoneService.create(payload)
      toast.success("Zona creada exitosamente")
      navigate("/") // Volver al dashboard
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateZone)}
      className="space-y-5"
      noValidate
    >
      {/* Nombre de la Zona */}
      <div className="flex flex-col gap-2">
        <label className="font-normal text-2xl" htmlFor="name">Nombre de la Zona</label>
        <input
          id="name"
          type="text"
          placeholder="Ej: Zona Norte, Sótano 1"
          className="w-full p-3 border-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          {...register("name", {
            required: "El nombre de la zona es obligatorio",
          })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Tipo de Zona */}
      <div className="flex flex-col gap-2">
        <label className="font-normal text-2xl" htmlFor="type">Tipo</label>
        <select
          id="type"
          className="w-full p-3 border-gray-300 border rounded-lg bg-white"
          {...register("type", { required: "Selecciona un tipo" })}
        >
          <option value="GENERAL">General</option>
          <option value="VIP">VIP</option>
          <option value="MOTOS">Motos</option>
          <option value="DISCAPACITADOS">Discapacitados</option>
        </select>
        {errors.type && <p className="text-red-500">{errors.type.message}</p>}
      </div>

      {/* Capacidad */}
      <div className="flex flex-col gap-2">
        <label className="font-normal text-2xl" htmlFor="capacity">Capacidad (Vehículos)</label>
        <input
          id="capacity"
          type="number"
          min="1"
          placeholder="Ej: 50"
          className="w-full p-3 border-gray-300 border rounded-lg"
          {...register("capacity", {
            required: "La capacidad es obligatoria",
            min: { value: 1, message: "Debe haber al menos 1 espacio" }
          })}
        />
        {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
      </div>

      {/* Descripción de Ubicación */}
      <div className="flex flex-col gap-2">
        <label className="font-normal text-2xl" htmlFor="locationDescription">Ubicación / Referencia</label>
        <textarea
          id="locationDescription"
          placeholder="Ej: Entrada por la Av. Principal, junto al edificio B"
          className="w-full p-3 border-gray-300 border rounded-lg"
          {...register("locationDescription", {
            required: "La descripción es obligatoria",
          })}
        />
        {errors.locationDescription && <p className="text-red-500">{errors.locationDescription.message}</p>}
      </div>

      <input
        type="submit"
        value='Crear Zona'
        className="bg-purple-600 hover:bg-purple-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
      />
    </form>
  )
}
