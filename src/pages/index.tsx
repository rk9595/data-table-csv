import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from '@mui/material';

import DataTable from '@/components/DataTable';
import {
  RootState,
  updateInventory,
  deleteRow,
  importCSVData,
  filterData,
} from '../redux/slices';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [importError, setImportError] = useState('');
  const [fileSelected, setFileSelected] = useState(false); // Added state to track if a file is selected

  const rows = useSelector((state: RootState) => {
    const regex = new RegExp(userInput, 'i');
    return state.inventory.data.filter(
      (item) =>
        regex.test(item.part) ||
        regex.test(item.altPart) ||
        regex.test(item.name)
    );
  });

  const dispatch = useDispatch();

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleFilterData = () => {
    dispatch(filterData(userInput));
  };

  const importCSV = () => {
    const fileInput = document.getElementById(
      'csvFileInput'
    ) as HTMLInputElement | null;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onloadstart = () => {
        setIsLoading(true);
        setImportError('');
      };

      reader.onload = function (e: ProgressEvent<FileReader>) {
        const csv = e.target?.result as string;
        if (csv) {
          parseCSV(csv);
        }
      };

      reader.onerror = function () {
        setIsLoading(false);
        setImportError('Error occurred while importing the CSV file.');
      };

      reader.readAsText(file);
      setFileSelected(true); // Set fileSelected to true when the Import button is clicked
    }
  };

  const parseCSV = (csv: string) => {
    try {
      const lines = csv.split('\n');

      // Parsing CSV data and storing it in csvData array
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        const lineData = lines[i].split(',');
        data.push({
          part: lineData[0],
          altPart: lineData[1],
          name: lineData[2],
          brand: lineData[3],
          model: lineData[4],
          engine: lineData[5],
          car: lineData[6],
          locationA: lineData[7],
          locAStock: parseInt(lineData[8], 10),
          locationB: lineData[9],
          locBStock: parseInt(lineData[10], 10),
          unit: lineData[11],
          rate: lineData[12],
          value: lineData[13],
          remarks: lineData[14],
        });
      }

      dispatch(importCSVData(data));
      setIsTableVisible(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setImportError('Error occurred while parsing the CSV file.');
    }
  };

  const handleUpdateInventory = (
    part: string,
    locAStock: number,
    locBStock: number
  ) => {
    const updatedLocAStock = parseInt(
      prompt(
        `Enter the updated LocA_Stock for ${part}:`,
        locAStock.toString()
      ) || '0',
      10
    );
    const updatedLocBStock = parseInt(
      prompt(
        `Enter the updated LocB_Stock for ${part}:`,
        locBStock.toString()
      ) || '0',
      10
    );

    dispatch(
      updateInventory({
        part,
        locAStock: updatedLocAStock,
        locBStock: updatedLocBStock,
      })
    );
  };

  const handleDeleteRow = (part: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the row with Part ${part}?`
      )
    ) {
      dispatch(deleteRow(part));
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>Data Table</h1>

      {!isTableVisible && (
        <div>
          <input type="file" id="csvFileInput" accept=".csv" />
          <Button variant="contained" color="primary" onClick={importCSV}>
            Import
          </Button>
          <br />
          <br />

          {/* Display the message when a file is not selected */}
          {!fileSelected && <p>Please Choose the file to Import</p>}

          {isLoading && <CircularProgress />}
          {importError && <p>{importError}</p>}
        </div>
      )}

      {isTableVisible && (
        <div>
          <label htmlFor="userInput">Search:</label>
          <TextField
            type="text"
            id="userInput"
            value={userInput}
            onChange={handleUserInput}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterData}
            disabled={isLoading}
          >
            Filter
          </Button>
          <br />
          <br />
          <div className={styles.tableContainer}>
            <DataTable
              rows={rows}
              handleUpdateInventory={handleUpdateInventory}
              handleDeleteRow={handleDeleteRow}
            />
          </div>
        </div>
      )}
    </div>
  );
}
