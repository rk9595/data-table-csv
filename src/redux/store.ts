import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./slices";

const store = configureStore({
	reducer: {
		inventory: inventoryReducer,
	},
});

export default store;
