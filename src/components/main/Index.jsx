import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

// Importa tus componentes
import NewTicket from "../NewTicket";
import QrReader from "../QrReader";

// Define la navegación sin tipos
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "light", // O "dark", según tu preferencia
    background: {
      default: "#f0f0f0", // Color de fondo principal
      paper: "#ffffff", // Color de fondo para elementos como tarjetas o contenedores
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      {/* Renderiza el componente basado en el pathname */}
      {pathname === "/ticket" ? (
        <NewTicket />
      ) : pathname === "/scanner" ? (
        <QrReader />
      ) : (
        <Typography>Bienvenido a la página de inicio</Typography> // Opcional: mensaje por defecto
      )}
    </Box>
  );
}

export default function DashboardLayoutNavigationActions(props) {

  const { window } = props;
  const router = useDemoRouter("/index");
  

  const demoWindow = window !== undefined ? window() : undefined;

  return  (
    <AppProvider
      branding={{
        logo: (
          <img
            src=""
            alt=""
          />
        ),
        title: "ISA-SCAN",
      }}
      navigation={[
        {
          segment: "home",
          title: "Home",
          icon: <AddHomeIcon />,
        },
        {
          segment: "ticket",
          title: "Tickets",
          icon: <ConfirmationNumberIcon />,
        },
        {
          segment: "scanner",
          title: "Escanear",
          icon: <QrCodeScannerIcon />,
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  ) 
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

DashboardLayoutNavigationActions.propTypes = {
  window: PropTypes.func.isRequired,
};
