import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom' // Importamos useNavigate

export default function NavMenu() {
  
  // Hook para redireccionar al salir (opcional, si implementas logout)
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí iría tu lógica real de logout (limpiar token, context, etc.)
    localStorage.removeItem('AUTH_TOKEN'); 
    navigate('/auth/login');
  };

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-white">
        <Bars3Icon className='w-8 h-8 text-white ' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <p className='text-center mb-2 border-b pb-2 text-purple-600'>Menú Principal</p>
            
            <Link
              to='/'
              className='block p-2 hover:bg-purple-50 hover:text-purple-700 rounded-md'
            >Dashboard (Zonas)</Link>

            <Link
              to='/vehicles'
              className='block p-2 hover:bg-purple-50 hover:text-purple-700 rounded-md'
            >Vehículos</Link>

            <Link
              to='/reservations'
              className='block p-2 hover:bg-purple-50 hover:text-purple-700 rounded-md'
            >Reservas</Link>

            <Link
              to='/tariffs'
              className='block p-2 hover:bg-purple-50 hover:text-purple-700 rounded-md'
            >Tarifas</Link>

            <Link
              to='/sensors'
              className='block p-2 hover:bg-purple-50 hover:text-purple-700 rounded-md'
            >Monitoreo (Sensores)</Link>

            <div className="border-t my-2"></div> {/* Separador */}

            <Link
              to='/profile'
              className='block p-2 hover:bg-purple-50 hover:text-purple-700 rounded-md'
            >Mi Perfil</Link>

            <button
              className='block w-full text-left p-2 hover:bg-red-50 hover:text-red-600 rounded-md text-red-500'
              type='button'
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
