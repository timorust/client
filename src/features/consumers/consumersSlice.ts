import { Consumer } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { consumersApi } from "../../app/services/consumers";
import { RootState } from "../../app/store";

interface InitialState {
  consumers: Consumer[] | null;
}

const initialState: InitialState = {
  consumers: null,
};

const slice = createSlice({
  name: "consumers",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      consumersApi.endpoints.getAllConsumers.matchFulfilled,
      (state, action) => {
        state.consumers = action.payload;
      }
    );
  },
});

export default slice.reducer;
export const selectConsumers = (state: RootState) => state.consumers;
