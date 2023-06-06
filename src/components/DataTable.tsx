import React from 'react';
import { styled } from '@mui/system';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';

interface DataTableProps {
  rows: Row[];
  handleUpdateInventory: (
    part: string,
    locAStock: number,
    locBStock: number
  ) => void;
  handleDeleteRow: (part: string) => void;
}

interface Row {
  part: string;
  altPart: string;
  name: string;
  brand: string;
  model: string;
  engine: string;
  car: string;
  locationA: string;
  locAStock: number;
  locationB: string;
  locBStock: number;
  unit: string;
  rate: string;
  value: string;
  remarks: string;
}

const StyledTableWrapper = styled('div')({
  overflowX: 'auto',
  '@media (max-width: 768px)': {
    width: '100%',
  },
});

const StyledTable = styled(Table)({
  minWidth: 650,
  '@media (max-width: 768px)': {
    minWidth: '100%',
  },
});

const DataTable: React.FC<DataTableProps> = ({
  rows,
  handleUpdateInventory,
  handleDeleteRow,
}) => {
  return (
    <StyledTableWrapper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Part</TableCell>
            <TableCell>Alt_Part</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Engine</TableCell>
            <TableCell>Car</TableCell>
            <TableCell>LocA</TableCell>
            <TableCell>LocA_Stock</TableCell>
            <TableCell>LocB</TableCell>
            <TableCell>LocB_Stock</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Remarks</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.part}>
              <TableCell>{row.part}</TableCell>
              <TableCell>{row.altPart}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell>{row.engine}</TableCell>
              <TableCell>{row.car}</TableCell>
              <TableCell>{row.locationA}</TableCell>
              <TableCell>{row.locAStock}</TableCell>
              <TableCell>{row.locationB}</TableCell>
              <TableCell>{row.locBStock}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{row.rate}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.remarks}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    handleUpdateInventory(
                      row.part,
                      row.locAStock,
                      row.locBStock
                    )
                  }
                >
                  Update Inventory
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteRow(row.part)}
                >
                  Delete Row
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableWrapper>
  );
};

export default DataTable;
