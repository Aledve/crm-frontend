import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import TeamForm from "../components/TeamForm";
import { useEffect, useState } from "react";
import { teamService } from "../api";

export default function TeamView() {
     const [teams, setTeams] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchTeams = async () => {
    try {
      const data = await teamService.getAll();
      setTeams(data);
    } catch (err) {
      console.error('Error al obtener equipos:', err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Equipos</h2>

        {teams.length === 0 ? (
          <>
            <p className="text-gray-600">No hay equipos creados aún.</p>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Crear Equipo
            </button>
          </>
        ) : (
          <ul className="text-left list-disc list-inside text-gray-700">
            {teams.map((team, i) => (
              <li key={i}>
                <strong>{team.name}</strong> - {team.state ? 'Activo' : 'Inactivo'}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Crear nuevo equipo
                  </Dialog.Title>

                  <TeamForm
                    onSuccess={() => {
                      setIsOpen(false);
                      fetchTeams();
                    }}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
