import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDaPagina } from "../../shared/layout";

export const Dashboard = () => {
  return (
    <LayoutBaseDaPagina titulo="Painel" barraDeFerramentas={<FerramentasDaListagem />}>
      teste
    </LayoutBaseDaPagina>
  );
};
