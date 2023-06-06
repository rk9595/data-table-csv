import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Row {
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
export type RootState = {
	inventory: InventoryState;
	// other slices and their respective state types
};

interface InventoryState {
	data: Row[];
}

const initialState: InventoryState = {
	data: [],
};

const inventorySlice = createSlice({
	name: "inventory",
	initialState,
	reducers: {
		importCSVData: (state, action: PayloadAction<Row[]>) => {
			state.data = action.payload;
		},
		updateInventory: (
			state,
			action: PayloadAction<{
				part: string;
				locAStock: number;
				locBStock: number;
			}>
		) => {
			const { part, locAStock, locBStock } = action.payload;
			const index = state.data.findIndex((row) => row.part === part);

			if (index !== -1) {
				state.data[index].locAStock = locAStock;
				state.data[index].locBStock = locBStock;
			}
		},
		deleteRow: (state, action: PayloadAction<string>) => {
			const part = action.payload;
			state.data = state.data.filter((row) => row.part !== part);
		},
		filterData: (state, action: PayloadAction<string>) => {
			const userInput = action.payload;
			const regex = new RegExp(userInput, "i");
			state.data = state.data.filter(
				(item) => regex.test(item.part) || regex.test(item.altPart)
			);
		},
	},
});

export const { importCSVData, updateInventory, deleteRow, filterData } =
	inventorySlice.actions;
export default inventorySlice.reducer;
