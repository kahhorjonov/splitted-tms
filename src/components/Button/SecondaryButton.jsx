import { Button as MuiButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const SecondaryButton = ({ label, onClick, ...rest }) => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#E6F1FF",
            color: "#004599",
            textTransform: "initial",
            padding: "11px 33px",
            height: "40px",
            borderRadius: "8px",
            fontSize: "14px",
            ":hover": {
              backgroundColor: "rgba(25, 118, 210, 0.2)",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiButton onClick={onClick} {...rest}>
        {label}
      </MuiButton>
    </ThemeProvider>
  );
};

export default SecondaryButton;
