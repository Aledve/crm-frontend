import { Link } from "react-router-dom";
export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Proyectos</h1>
      <p className="text-2xl font-light text-gray-500 my-5">
        Maneja y administra los proyectos
      </p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-10 rounded cursor-pointer transition-colors"
          to={"/projects/create"}>
          Nuevo Proyecto
        </Link>
      </nav>
    </>
  );
}
