import { Box, Button, Icon, Paper, useTheme } from "@mui/material";

interface IFerramentasDeDetalheProps {
  mostrarBotaoNovo?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoVoltar?: boolean;
  textoBotaoNovo?: string;
  textoBotaoSalvar?: string;
  textoBotaoVoltar?: string;
  aoClicarEmNovo?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  mostrarBotaoNovo = false,
  mostrarBotaoSalvar = false,
  mostrarBotaoVoltar = false,
  textoBotaoNovo = "Novo",
  textoBotaoSalvar = "Salvar",
  textoBotaoVoltar = "Voltar",
  aoClicarEmNovo,
  aoClicarEmSalvar,
  aoClicarEmVoltar,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={1}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      <Box flex={1} display="flex" justifyContent="start" gap={1}>
        {mostrarBotaoSalvar && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={aoClicarEmSalvar}
            startIcon={<Icon>save</Icon>}
          >
            {textoBotaoSalvar}
          </Button>
        )}
        {mostrarBotaoVoltar && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={aoClicarEmVoltar}
            startIcon={<Icon>arrow_back</Icon>}
          >
            {textoBotaoVoltar}
          </Button>
        )}
      </Box>

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
