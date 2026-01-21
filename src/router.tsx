import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import DashboardView from '@/views/DashboardView'; // Dashboard General (Zonas Disponibles)
import LoginView from '@/views/LoginView';
import RegisterForm from '@/views/RegisterForm';

import CreateZoneView from '@/views/zones/CreateZoneView';
import VehicleView from '@/views/vehicles/VehicleView';

// Notas: 
// 1. Asegúrate de actualizar también los 'imports' DENTRO de esos archivos 
//    (ej. en CreateZoneView importar ZoneForm en lugar de ProjectForm).
// 2. Si aún no creas las vistas de Tarifas/Reservas, comenta esas líneas.

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* --- AUTENTICACIÓN (Público, sin Menú Lateral) --- */}
                <Route path='/auth/login' element={<LoginView />} />
                <Route path='/auth/register' element={<RegisterForm />} />

                {/* --- APLICACIÓN PRIVADA (Con Layout y Menú) --- */}
                <Route element={<AppLayout />}>
                    
                    {/* Home: Dashboard de Disponibilidad */}
                    <Route path='/' element={<DashboardView />} index />

                    {/* Gestión de Zonas (Antes Proyectos) */}
                    <Route path='/zones/create' element={<CreateZoneView />} />
                    
                    {/* Gestión de Vehículos (Antes Equipos) */}
                    <Route path='/vehicles' element={<VehicleView />} />
                    
                    {/* Gestión de Reservas (Futuro) */}
                    {/* <Route path='/reservations' element={<ReservationView />} /> */}

                    {/* Gestión de Tarifas (Futuro) */}
                    {/* <Route path='/tariffs' element={<TariffView />} /> */}

                    {/* Sensores (Futuro) */}
                    {/* <Route path='/sensors' element={<SensorView />} /> */}

                </Route>

                {/* Redirección por defecto si la ruta no existe */}
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
