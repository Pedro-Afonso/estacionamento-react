import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDaPagina } from "../../shared/layout";

export const Dashboard = () => {
  return (
    <LayoutBaseDaPagina titulo="Painel" barraDeFerramentas={<FerramentasDeDetalhe />}>
      teste
    </LayoutBaseDaPagina>
  );
};
