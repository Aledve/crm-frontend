import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { zoneService } from '@/api'
import { toast } from 'react-toastify'

export default function DashboardView() {
    
    // Estado para guardar las zonas traídas del backend
    const [zones, setZones] = useState([])
    const [loading, setLoading] = useState(true)

    // Efecto para cargar datos al montar la vista
    useEffect(() => {
        const fetchZones = async () => {
            try {
                // Llamamos al endpoint /zoneService/available (o getAll según prefieras)
                const data = await zoneService.getAvailable() 
                setZones(data || [])
            } catch (error) {
                console.error(error)
                // toast.error('Error cargando zonas') // Opcional
            } finally {
                setLoading(false)
            }
        }
        fetchZones()
    }, [])

    if (loading) return <div className="text-center p-10">Cargando estado del parqueadero...</div>

    return (
        <>
            <h1 className="text-5xl font-black text-gray-800">Dashboard de Parqueo</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">
                Estado actual de las zonas
            </p>

            <nav className='my-5'>
                <Link
                    className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg shadow-md'
                    to='/zones/create'
                >
                    Nueva Zona
                </Link>
            </nav>

            {zones.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {zones.map((zone) => {
                        // Cálculo de porcentaje de ocupación para la barra de progreso
                        const occupancyRate = zone.capacity > 0 
                            ? Math.round((zone.occupiedSpaces / zone.capacity) * 100) 
                            : 0;
                        
                        // Color dinámico: Rojo si está muy lleno (>80%), Verde si está libre
                        const barColor = occupancyRate > 80 ? 'bg-red-500' : 'bg-green-500';

                        return (
                            <div key={zone.elementId} className="bg-white shadow-lg p-6 rounded-xl border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800">{zone.name}</h3>
                                    <span className="text-xs font-bold uppercase tracking-wide text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                                        {zone.type}
                                    </span>
                                </div>
                                
                                <p className="text-gray-500 mb-4 text-sm h-10 overflow-hidden">
                                    {zone.locationDescription}
                                </p>

                                {/* Indicador de Ocupación */}
                                <div className='mb-2 flex justify-between font-semibold text-gray-700'>
                                    <span>Ocupación:</span>
                                    <span>{zone.occupiedSpaces} / {zone.capacity}</span>
                                </div>

                                {/* Barra de Progreso Visual */}
                                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                                    <div 
                                        className={`${barColor} h-4 rounded-full transition-all duration-500`} 
                                        style={{ width: `${occupancyRate}%` }}
                                    ></div>
                                </div>

                                <Link 
                                    to={`/zones/${zone.elementId}`} 
                                    className='text-purple-600 hover:text-purple-800 font-bold text-sm uppercase'
                                >
                                    Ver Detalle &rarr;
                                </Link>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-xl">No hay zonas de parqueo registradas aún.</p>
                    <p className="text-gray-400 mt-2">Crea una zona para comenzar a monitorear.</p>
                </div>
            )}
        </>
    )
}
