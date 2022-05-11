import { Dispatch } from 'redux';
import {
  initModalStatus,
  updateModalState,
  refreshTableRedux,
  setSelectDataRedux,
} from '../../../../stores/borrow';
import { RootState } from '../../../../stores';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { IBorrow } from '../../../../api/type/login';

export interface IBorrowReduxProps {
  visible: boolean;
  refresh: boolean;
  selectData: IBorrow | null;
  setModalStatus: (status: boolean, btnId?: string) => void;
  refreshTable: () => void;
  setSelectData: (record: IBorrow) => void;
}

const useModalStateHooks = (modalName?: string): IBorrowReduxProps => {
  const reduxState = useSelector(
    (state: RootState) => ({
      visible: state.borrow.modalStatus[modalName ?? ''],
      refresh: state.borrow.refreshTable,
      selectData: state.borrow.selectData,
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
  const setSelectData = (record: IBorrow) => {
    dispatch(setSelectDataRedux(record ?? {}));
  };

  return { ...reduxState, setModalStatus, refreshTable, setSelectData };
};
export default useModalStateHooks;
