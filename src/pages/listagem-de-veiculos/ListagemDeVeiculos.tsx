import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

import { Environment } from "../../shared/environment";
import {
  VeiculosService,
  IListagemVeiculo,
} from "../../shared/services/api/veiculos/VeiculosService";
import { LayoutBaseDaPagina } from "../../shared/layout";
import { FerramentasDaListagem } from "../../shared/components/ferramentas-da-listagem/FerramentasDaListagem";
import { useDebounce } from "../../shared/hooks";

export const ListagemDeVeiculos = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemVeiculo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { debounce } = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
    debounce(() => {
      VeiculosService.getAll(pagina, busca).then((res) => {
        setIsLoading(false);

        if (res instanceof Error) {
          alert(res.message);
        } else {
          setTotalCount(res.totalCount);
          setRows(res.data);
        }
      });
    });
  }, [pagina, busca]);

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      VeiculosService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => [...oldRows.filter((oldRow) => oldRow.id !== id)]);
          alert("Registro apagado com sucesso!");
        }
      });
    }
  };

  return (
    <LayoutBaseDaPagina
      titulo="Listagem de Veiculos"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarBotaoVoltar
          mostrarBotaoNovo
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
          aoClicarEmVoltar={() => navigate("/pagina-inicial")}
          aoClicarEmNovo={() => navigate("/veiculos/detalhe/novo")}
        />
      }
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
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell size="small">
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton onClick={() => navigate(`/veiculos/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.usuario}</TableCell>
                <TableCell>{row.placa}</TableCell>
                <TableCell>{row.entrada}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDaPagina>
  );
};
