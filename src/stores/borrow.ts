import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBorrow } from '../api/type/login';
import { ModalState } from '../types';

interface IBorrowRedux {
  modalStatus: ModalState;
  refreshTable: boolean;
  selectData: IBorrow | null;
}

const initialState: IBorrowRedux = {
  modalStatus: {},
  refreshTable: false,
  selectData: null,
};

const borrowRedux = createSlice({
  name: 'borrowRedux',
  initialState,
  reducers: {
    initModalStatus: (state, action: PayloadAction<ModalState>) => {
      state.modalStatus = action.payload;
    },
    updateModalState: (
      state,
      action: PayloadAction<{ btnId: string; status: boolean }>
    ) => {
      state.modalStatus[action.payload.btnId] = action.payload.status;
    },
    refreshTableRedux: (state) => {
      state.refreshTable = !state.refreshTable;
    },
    setSelectDataRedux: (state, action: PayloadAction<IBorrow>) => {
      state.selectData = action.payload;
    },
  },
});
export const {
  initModalStatus,
  updateModalState,
  refreshTableRedux,
  setSelectDataRedux,
} = borrowRedux.actions;
export default borrowRedux.reducer;
