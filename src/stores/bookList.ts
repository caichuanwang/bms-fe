import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBookInfo } from '../pages/bookInfo/components/bookInfo/components/Table/index.data';
import { ModalState } from '../types';

interface IBookListRedux {
  modalStatus: ModalState;
  refreshTable: boolean;
  selectData: IBookInfo | null;
  selectBookList: string[];
}

const initialState: IBookListRedux = {
  modalStatus: {},
  refreshTable: false,
  selectData: null,
  selectBookList: [],
};

const bookListRedux = createSlice({
  name: 'bookTypeRedux',
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
    setSelectDataRedux: (state, action: PayloadAction<IBookInfo>) => {
      state.selectData = action.payload;
    },
    setSelectBookListRedux: (state, action: PayloadAction<string[]>) => {
      state.selectBookList = action.payload;
    },
  },
});
export const {
  initModalStatus,
  updateModalState,
  refreshTableRedux,
  setSelectDataRedux,
  setSelectBookListRedux,
} = bookListRedux.actions;
export default bookListRedux.reducer;
