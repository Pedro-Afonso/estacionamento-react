import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { LayoutBaseDaPagina } from "../../shared/layout";
import { VeiculosService } from "../../shared/services/api/veiculos/VeiculosService";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [isLoadingVeiculos, setIsLoadingVeiculos] = useState(true);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);

  useEffect(() => {
    setIsLoadingVeiculos(true);

    VeiculosService.getAll().then((res) => {
      setIsLoadingVeiculos(false);

      if (res instanceof Error) {
        alert(res.message);
      } else {
        setVagasOcupadas(res.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBaseDaPagina
      titulo="Painel"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoNovo
          aoClicarEmNovo={() => navigate("/veiculos/detalhe/novo")}
        />
      }
    >
      <Box width="100%" display="flex">
        <Grid container margin={3} gap={1}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  Disponíveis
                </Typography>
                <Box>
                  {!isLoadingVeiculos && (
                    <Typography
                      variant="h1"
                      align="center"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {Environment.TOTAL_DE_VAGAS - vagasOcupadas}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  align="center"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Ocupadas
                </Typography>
                <Box>
                  {!isLoadingVeiculos && (
                    <Typography variant="h1" align="center">
                      {vagasOcupadas}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  align="center"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Total de vagas
                </Typography>
                <Box>
                  {!isLoadingVeiculos && (
                    <Typography variant="h1" align="center">
                      {Environment.TOTAL_DE_VAGAS}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDaPagina>
  );
};
