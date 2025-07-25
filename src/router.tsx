import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import LoginView from "./views/LoginView";
import RegisterForm from "./views/RegisterForm";
import TeamView from "./views/TeamView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<LoginView/>} />
          <Route path="/registerForm" element={<RegisterForm/>} />
          <Route path="/registerTeam" element={<TeamView/>} />
          <Route path="/project" element={<CreateProjectView/>} index/>
          <Route path="/projects/create" element={<CreateProjectView/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
