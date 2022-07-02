import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FerramentasDaListagem } from "../shared/components";
import { LayoutBaseDaPagina } from "../shared/layout";

export const ListagemDeVeiculos = () => {
  return (
    <LayoutBaseDaPagina
      titulo="Listagem de Veiculos"
      barraDeFerramentas={<FerramentasDaListagem />}
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Entrada</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>João</TableCell>
              <TableCell>ABC12345</TableCell>
              <TableCell>10:00 01/07/2022</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutBaseDaPagina>
  );
};
