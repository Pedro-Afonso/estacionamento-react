import { TextField, Box, Paper, Grid, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDaPagina } from "../../shared/layout";
import { VeiculosService } from "../../shared/services/api/veiculos/VeiculosService";

export const DetalhesDeVeiculos: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const { id = "nova" } = useParams<"id">();

  type FormValues = {
    usuario: string;
    placa: string;
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true);
    if (id !== "novo") {
      VeiculosService.updateById(Number(id), data).then((res) => {
        setIsLoading(false);
        if (res instanceof Error) {
          alert("Ocorreu um erro ao carregar os dados.");
        } else {
          navigate("/veiculos");
        }
      });
    } else {
      const timeElapsed = Date.now();
      const dataTempo = new Date(timeElapsed).toLocaleString("pt-BR");

      const dataWithTime = { ...data, entrada: dataTempo };

      VeiculosService.create(dataWithTime).then((res) => {
        if (res instanceof Error) {
          alert("Ocorreu um erro ao carregar os dados.");
        } else {
          navigate("/veiculos");
        }
      });
    }
    console.log("teste");
    console.log(data);
  };

  useEffect(() => {
    if (id !== "novo") {
      setIsLoading(true);
      VeiculosService.getById(Number(id)).then((res) => {
        setIsLoading(false);
        if (res instanceof Error) {
          alert("Ocorreu um erro ao carregar os dados.");
        } else {
          setValue("usuario", res.usuario);
          setValue("placa", res.placa);
        }
      });
    } else {
      setIsLoading(false);
      setValue("usuario", "");
      setValue("placa", "");
    }
  }, [id]);

  return (
    <LayoutBaseDaPagina
      titulo={id === "novo" ? "Adicionar novo veículo" : "Detalhes do veículo"}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoSalvar
          mostrarBotaoVoltar
          mostrarBotaoNovo={id !== "novo"}
          aoClicarEmSalvar={handleSubmit(onSubmit)}
          aoClicarEmVoltar={() => navigate("/veiculos")}
          aoClicarEmNovo={() => navigate("/veiculos/detalhe/novo")}
        />
      }
    >
      <form>
        <Box component={Paper} variant="outlined" margin={1}>
          <Grid container display="flex" flexDirection="column" spacing={2} padding={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}
            <Grid item>
              <Controller
                control={control}
                name="usuario"
                defaultValue=""
                rules={{ required: "Insira o nome do usuário." }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    disabled={isLoading}
                    label="Usuário"
                    value={value}
                    onChange={onChange}
                    helperText={errors.usuario?.message}
                    error={!!errors.usuario}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="placa"
                defaultValue=""
                rules={{ required: "Insira a placa do veículo." }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    disabled={isLoading}
                    label="Placa"
                    value={value}
                    onChange={onChange}
                    helperText={errors?.placa?.message}
                    error={!!errors.placa}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </LayoutBaseDaPagina>
  );
};
