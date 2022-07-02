import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, ListagemDeVeiculos } from "../pages";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: "Página Inicial",
        icon: "home",
        path: "/pagina-inicial",
      },
      {
        label: "Veículos",
        icon: "directions_car_icon",
        path: "/veiculos",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/veiculos" element={<ListagemDeVeiculos />} />
      <Route path="/veiculos/detalhe/:id" element={<p>detalhes</p>} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
