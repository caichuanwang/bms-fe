import { Dispatch } from 'redux';
import {
  initModalStatus,
  updateModalState,
  refreshTableRedux,
  setSelectDataRedux,
} from '../../../../stores/bookInfo';
import { RootState } from '../../../../stores';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { IBookInfo } from './components/Table/index.data';

export interface IBookInfoReduxProps {
  visible: boolean;
  refresh: boolean;
  selectData: IBookInfo;
  setModalState: (status: boolean, btnId?: string) => void;
  refreshTable: () => void;
  setSelectData: (record: IBookInfo) => void;
}

const useModalStateHooks = (
  modalName?: string
): {
  visible: boolean;
  refresh: boolean;
  selectData: IBookInfo | null;
  setModalStatus: (status: boolean, btnId?: string) => void;
  refreshTable: () => void;
  setSelectData: (record: IBookInfo) => void;
} => {
  const reduxState = useSelector(
    (state: RootState) => ({
      visible: state.bookInfo.modalStatus[modalName ?? ''],
      refresh: state.bookInfo.refreshTable,
      selectData: state.bookInfo.selectData,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const setModalStatus = React.useCallback(
    (status: boolean, btnId?: string) => {
      dispatch(updateModalState({ btnId: btnId ?? modalName ?? '', status }));
    },
    [dispatch]
  );

  const refreshTable = React.useCallback(() => {
    dispatch(refreshTableRedux());
  }, [dispatch]);
  const setSelectData = (record: IBookInfo) => {
    dispatch(setSelectDataRedux(record));
  };

  return { ...reduxState, setModalStatus, refreshTable, setSelectData };
};
export default useModalStateHooks;
