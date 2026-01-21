import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { tariffService } from "@/api"
import { toast } from 'react-toastify'

export default function TariffForm() {
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      cost: 0.50,
      timeUnit: "HORA",
      currency: "USD"
    }
  })

  const handleCreateTariff = async (formData) => {
    try {
      const payload = {
        ...formData,
        cost: parseFloat(formData.cost),
        state: true
      }
      await tariffService.create(payload)
      toast.success("Tarifa creada correctamente")
      navigate("/tariffs") // O volver a dashboard
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateTariff)}
      className="space-y-5"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-normal text-2xl" htmlFor="name">Nombre de la Tarifa</label>
        <input
          id="name"
          type="text"
          placeholder="Ej: Tarifa Plana Estudiantes"
          className="w-full p-3 border-gray-300 border rounded-lg"
          {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
            <label className="font-normal text-2xl" htmlFor="cost">Costo</label>
            <input
            id="cost"
            type="number"
            step="0.01"
            className="w-full p-3 border-gray-300 border rounded-lg"
            {...register("cost", { 
                required: "El costo es obligatorio",
                min: 0 
            })}
            />
            {errors.cost && <p className="text-red-500">{errors.cost.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
            <label className="font-normal text-2xl" htmlFor="timeUnit">Por unidad de:</label>
            <select
            id="timeUnit"
            className="w-full p-3 border-gray-300 border rounded-lg bg-white"
            {...register("timeUnit")}
            >
            <option value="HORA">Hora</option>
            <option value="MINUTO">Minuto</option>
            <option value="DIA">Día</option>
            <option value="MES">Mes</option>
            </select>
        </div>
      </div>

      <input
        type="submit"
        value='Guardar Tarifa'
        className="bg-purple-600 hover:bg-purple-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
      />
    </form>
  )
}
