import { Dispatch } from 'redux';
import {
  initModalStatus,
  updateModalState,
  refreshTableRedux,
  setSelectDataRedux,
} from '../../stores/MyBookList';
import { RootState } from '../../stores';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { IMyBookList } from '../../api/type/login';

export interface IBookListReduxProps {
  visible: boolean;
  refresh: boolean;
  selectData: IMyBookList | null;
  setModalStatus: (status: boolean, btnId?: string) => void;
  refreshTable: () => void;
  setSelectData: (record: IMyBookList) => void;
}

const useModalStateHooks = (modalName?: string): IBookListReduxProps => {
  const reduxState = useSelector(
    (state: RootState) => ({
      visible: state.MyBookList.modalStatus[modalName ?? ''],
      refresh: state.MyBookList.refreshTable,
      selectData: state.MyBookList.selectData,
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
  const setSelectData = (record: IMyBookList) => {
    dispatch(setSelectDataRedux(record ?? {}));
  };

  return { ...reduxState, setModalStatus, refreshTable, setSelectData };
};
export default useModalStateHooks;
