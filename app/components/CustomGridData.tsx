import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DataGrid,ptBR } from "@mui/x-data-grid";

const CustomDataGrid = (props: any) => {
  const theme = createTheme({
    components: {
      MuiTablePagination: {
        styleOverrides: {
          root: {
            color: "oklch(var(--bc)) !important",
          },
          selectIcon: {
            color: "oklch(var(--bc)) !important",
          },
          spacer: {
            color: "oklch(var(--bc)) !important",
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: "oklch(var(--bc)) !important",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        experimentalFeatures={{ newEditingApi: true }}
        className="text-center w-full bg-base-100 text-base-content shadow-xl"
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        {...props}
      />
    </ThemeProvider>
  );
};

export default CustomDataGrid;
