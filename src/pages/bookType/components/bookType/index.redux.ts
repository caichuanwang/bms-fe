import { Dispatch } from 'redux';
import {
  initModalStatus,
  updateModalState,
  refreshTableRedux,
  setSelectDataRedux,
} from '../../../../stores/book';
import { RootState } from '../../../../stores';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { IBookType } from './components/Table/index.data';

export interface IAddMysqlGroupReduxProps {
  visible: boolean;
  refresh: boolean;
  selectData: IBookType;
  setModalState: (status: boolean, btnId?: string) => void;
  refreshTable: () => void;
  setSelectData: (record: IBookType) => void;
}

const useModalStateHooks = (
  modalName?: string
): {
  visible: boolean;
  refresh: boolean;
  selectData: IBookType | null;
  setModalStatus: (status: boolean, btnId?: string) => void;
  refreshTable: () => void;
  setSelectData: (record: IBookType) => void;
} => {
  const reduxState = useSelector(
    (state: RootState) => ({
      visible: state.bookType.modalStatus[modalName ?? ''],
      refresh: state.bookType.refreshTable,
      selectData: state.bookType.selectData,
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
  const setSelectData = (record: IBookType) => {
    dispatch(setSelectDataRedux(record));
  };

  return { ...reduxState, setModalStatus, refreshTable, setSelectData };
};
export default useModalStateHooks;
