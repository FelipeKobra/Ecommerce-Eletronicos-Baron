
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

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
            color: "oklch(var(--bc)) !important", // Define your custom color for the checkbox
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        className="w-10/12  text-center flex justify-center my-6 bg-base-100 text-base-content shadow-xl"
        initialState={{
          pagination: {
            paginationModel: { page: 5, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 15]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        {...props}
      />
    </ThemeProvider>
  );
};

export default CustomDataGrid;
