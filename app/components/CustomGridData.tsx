import { DataGrid, ptBR } from "@mui/x-data-grid";

const CustomDataGrid = (props: any) => {
  return (
    <DataGrid
      experimentalFeatures={{ newEditingApi: true }}
      className="text-center w-full bg-base-100 text-base-content shadow-xl"
      localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection
      disableSelectionOnClick
      autoHeight
      sx={{
        "& .MuiDataGrid-root": {
          color: "oklch(var(--bc)) !important",
        },
        "& .MuiTablePagination-root": {
          color: "oklch(var(--bc)) !important",
        },
        "& .MuiTablePagination-selectIcon": {
          color: "oklch(var(--bc)) !important",
        },
        "& .MuiTablePagination-spacer": {
          color: "oklch(var(--bc)) !important",
        },
        "& .MuiCheckbox-root": {
          color: "oklch(var(--bc)) !important",
        },
      }}
      {...props}
    />
  );
};

export default CustomDataGrid;
