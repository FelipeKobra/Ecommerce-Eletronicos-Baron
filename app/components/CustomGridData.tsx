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
      {...props}
    />
  );
};

export default CustomDataGrid;
