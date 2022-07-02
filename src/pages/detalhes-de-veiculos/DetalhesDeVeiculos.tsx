import { useTheme } from "@mui/material";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDaPagina } from "../../shared/layout";

export const DetalhesDeVeiculos: React.FC = () => {
  return (
    <LayoutBaseDaPagina
      titulo="Detalhes do veículo"
      barraDeFerramentas={<FerramentasDaListagem />}
    >
      teste
    </LayoutBaseDaPagina>
  );
};
