import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
    </Routes>
  );
};
