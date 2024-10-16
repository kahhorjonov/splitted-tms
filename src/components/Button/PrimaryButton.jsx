import { Button as MuiButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const PrimaryButton = ({ label, onClick }) => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#004599",
            color: "#fff",
            display: "flex",
            gap: "5px",
            minWidth: "120px",
            textTransform: "initial",
            padding: "9px 17px",
            borderRadius: "8px",
            fontSize: "14px",
            height: "40px",
            ":hover": {
              backgroundColor: "rgba(0,69,153,0.85)",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiButton onClick={onClick}>{label}</MuiButton>
    </ThemeProvider>
  );
};

export default PrimaryButton;
