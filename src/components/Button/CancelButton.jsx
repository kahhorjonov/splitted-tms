import { Button as MuiButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CancelButton = ({ label, onClick }) => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            color: "#004599",
            minWidth: "100px",
            textTransform: "initial",
            padding: "9px 17px",
            borderRadius: "8px",
            fontSize: "14px",
            height: "40px",
            border: "1px solid gray",
            ":hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
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

export default CancelButton;
