import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMyBookList } from '../api/type/login';
import { ModalState } from '../types';

interface IBookListRedux {
  modalStatus: ModalState;
  refreshTable: boolean;
  selectData: IMyBookList | null;
}

const initialState: IBookListRedux = {
  modalStatus: {},
  refreshTable: false,
  selectData: null,
};

const myBookListRedux = createSlice({
  name: 'myBookListRedux',
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
    setSelectDataRedux: (state, action: PayloadAction<IMyBookList>) => {
      state.selectData = action.payload;
    },
  },
});
export const {
  initModalStatus,
  updateModalState,
  refreshTableRedux,
  setSelectDataRedux,
} = myBookListRedux.actions;
export default myBookListRedux.reducer;
