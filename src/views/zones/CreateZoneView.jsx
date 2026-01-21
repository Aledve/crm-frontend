import { useEffect, useState } from "react";
import { projectService, taskService, objectiveService } from "../../api";
import ProjectForm from "../../components/ProjectForm";
import TaskForm from "../../components/TaskForm";
import ObjectiveForm from "../../components/ObjectiveForm";

export default function CreateProjectView() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [objectives, setObjectives] = useState([]);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      console.error("Error al obtener proyectos:", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      console.error("Error al obtener tareas:", err);
    }
  };

  const fetchObjectives = async () => {
    try {
      const data = await objectiveService.getAll();
      setObjectives(data);
    } catch (err) {
      console.error("Error al obtener objetivos:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchObjectives();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Proyectos</h2>

        {projects.length === 0 ? (
          <p className="text-gray-600">No hay proyectos creados aún.</p>
        ) : (
          <ul className="text-left list-disc list-inside text-gray-700 space-y-1">
            {projects.map((p, i) => (
              <li key={i}>
                <strong>{p.name}</strong> - {p.description}
              </li>
            ))}
          </ul>
        )}

        <hr className="my-4" />

        <h2 className="text-xl font-semibold text-gray-800">Tareas</h2>

        {tasks.length === 0 ? (
          <p className="text-gray-600">No hay tareas registradas.</p>
        ) : (
          <ul className="text-left list-disc list-inside text-gray-700 space-y-1">
            {tasks.map((t, i) => (
              <li key={i}>
                <strong>{t.name}</strong> - Prioridad: {t.priority} - Estado:{" "}
                {t.state ? "Completada" : "Pendiente"}
              </li>
            ))}
          </ul>
        )}

        <hr className="my-4" />

        <h2 className="text-xl font-semibold text-gray-800">Objetivos</h2>

        {objectives.length === 0 ? (
          <p className="text-gray-600">No hay objetivos creados.</p>
        ) : (
          <ul className="text-left list-disc list-inside text-gray-700 space-y-1">
            {objectives.map((o, i) => (
              <li key={i}>
                <strong>{o.name}</strong> - {o.description}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => setShowProjectModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Crear Proyecto
          </button>

          <button
            onClick={() => setShowTaskModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Crear Tarea
          </button>

          <button
            onClick={() => setShowObjectiveModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Crear Objetivo
          </button>
        </div>
      </div>

      {/* Modal Proyecto */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl">
            <button
              onClick={() => setShowProjectModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <ProjectForm
              onSuccess={() => {
                setShowProjectModal(false);
                fetchProjects();
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Tarea */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl">
            <button
              onClick={() => setShowTaskModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <TaskForm
              onSuccess={() => {
                setShowTaskModal(false);
                fetchTasks();
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Objetivo */}
      {showObjectiveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl">
            <button
              onClick={() => setShowObjectiveModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <ObjectiveForm
              onSuccess={() => {
                setShowObjectiveModal(false);
                fetchObjectives();
              }}
            />
          </div>
        </div>
      )}
     
    </div>
  );
}
