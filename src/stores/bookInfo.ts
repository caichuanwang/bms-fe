import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBookInfo } from '../pages/bookManager/components/bookInfo/components/Table/index.data';
import { ModalState } from '../types';

interface IBookInfoRedux {
  modalStatus: ModalState;
  refreshTable: boolean;
  selectData: IBookInfo | null;
}

const initialState: IBookInfoRedux = {
  modalStatus: {},
  refreshTable: false,
  selectData: null,
};

const bookInfoRedux = createSlice({
  name: 'bookInfoRedux',
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
  },
});
export const {
  initModalStatus,
  updateModalState,
  refreshTableRedux,
  setSelectDataRedux,
} = bookInfoRedux.actions;
export default bookInfoRedux.reducer;
