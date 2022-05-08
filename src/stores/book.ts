import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBookType } from '../pages/bookType/components/bookType/components/Table/index.data';
import { ModalState } from '../types';

interface IBookTypeRedux {
  modalStatus: ModalState;
  refreshTable: boolean;
  selectData: IBookType | null;
}

const initialState: IBookTypeRedux = {
  modalStatus: {},
  refreshTable: false,
  selectData: null,
};

const bookTypeRedux = createSlice({
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
    setSelectDataRedux: (state, action: PayloadAction<IBookType>) => {
      state.selectData = action.payload;
    },
  },
});
export const {
  initModalStatus,
  updateModalState,
  refreshTableRedux,
  setSelectDataRedux,
} = bookTypeRedux.actions;
export default bookTypeRedux.reducer;
