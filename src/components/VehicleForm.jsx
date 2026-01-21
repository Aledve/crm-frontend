import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { vehicleService } from "@/api"
import { toast } from 'react-toastify'

export default function VehicleForm() {
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      plate: "",
      brand: "",
      model: "",
      color: "",
      type: "AUTOMOVIL"
    }
  })

  const handleRegisterVehicle = async (formData) => {
    try {
      const payload = {
        ...formData,
        state: true // Activo por defecto
      }
      await vehicleService.create(payload)
      toast.success("Vehículo registrado exitosamente")
      navigate("/") // O redirigir a la lista de vehículos
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterVehicle)}
      className="space-y-5"
      noValidate
    >
      {/* Placa */}
      <div className="flex flex-col gap-2">
        <label className="font-normal text-2xl" htmlFor="plate">Placa</label>
        <input
          id="plate"
          type="text"
          placeholder="Ej: PAB-1234"
          className="w-full p-3 border-gray-300 border rounded-lg uppercase"
          {...register("plate", {
            required: "La placa es obligatoria",
            pattern: {
                // Regex básico para placas (ajusta a tu país si es necesario)
                value: /^[A-Z0-9-]+$/i,
                message: "Formato de placa inválido"
            }
          })}
        />
        {errors.plate && <p className="text-red-500">{errors.plate.message}</p>}
      </div>

      {/* Marca y Modelo (Grid de 2 columnas) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
            <label className="font-normal text-2xl" htmlFor="brand">Marca</label>
            <input
            id="brand"
            type="text"
            placeholder="Ej: Toyota"
            className="w-full p-3 border-gray-300 border rounded-lg"
            {...register("brand", { required: "La marca es obligatoria" })}
            />
            {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
            <label className="font-normal text-2xl" htmlFor="model">Modelo</label>
            <input
            id="model"
            type="text"
            placeholder="Ej: Yaris"
            className="w-full p-3 border-gray-300 border rounded-lg"
            {...register("model", { required: "El modelo es obligatorio" })}
            />
            {errors.model && <p className="text-red-500">{errors.model.message}</p>}
        </div>
      </div>

      {/* Color y Tipo */}
      <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-normal text-2xl" htmlFor="color">Color</label>
            <input
              id="color"
              type="text"
              placeholder="Ej: Rojo"
              className="w-full p-3 border-gray-300 border rounded-lg"
              {...register("color", { required: "El color es obligatorio" })}
            />
            {errors.color && <p className="text-red-500">{errors.color.message}</p>}
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-normal text-2xl" htmlFor="type">Tipo</label>
            <select
              id="type"
              className="w-full p-3 border-gray-300 border rounded-lg bg-white"
              {...register("type")}
            >
              <option value="AUTOMOVIL">Automóvil</option>
              <option value="MOTOCICLETA">Motocicleta</option>
              <option value="CAMIONETA">Camioneta</option>
            </select>
          </div>
      </div>

      <input
        type="submit"
        value='Registrar Vehículo'
        className="bg-purple-600 hover:bg-purple-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
      />
    </form>
  )
}
