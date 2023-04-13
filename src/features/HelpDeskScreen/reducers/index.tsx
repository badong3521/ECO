import { useDispatch, useSelector } from 'react-redux';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Multilanguage } from '../../../services/api/types/api';

export type TicketStatus = 'all' | 'open' | 'closed' | 'response';
export type TicketRating = 'bad' | 'ok' | 'good';

type DepartmentName = 'EcoPM' | 'Ecotek' | undefined;

export interface UserRole {
  id: number;
  name: Multilanguage;
  avatar: string;
  ecofeedbackTopics: Topic[];
}

export interface DepartmentShort {
  id: number;
  name: DepartmentName;
}

export interface Department extends DepartmentShort {
  ecofeedbackTopics?: Topic[];
  selectedTopicId?: number;
  logo?: string;
}

export interface Topic {
  id: number;
  name: Multilanguage;
  avatar: string;
  department: Department;
}

export interface Ticket {
  id: number;
  subject: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  latestCommentCreatedAt: string;
  ecofeedbackTopic?: Topic;
}

interface HelpDeskState {
  shouldRefreshTickets: boolean;
  departments?: Department[];
  roles?: UserRole[];
}

const initialState: HelpDeskState = {
  shouldRefreshTickets: false,
  departments: undefined,
};

const helpDeskSlice = createSlice({
  name: 'helpDesk',
  initialState,
  reducers: {
    setShouldRefreshTickets(state, action: PayloadAction<boolean>) {
      state.shouldRefreshTickets = action.payload;
    },
    setDepartments(state, action: PayloadAction<Department[]>) {
      state.departments = action.payload;
    },
    setRoles(state, action: PayloadAction<UserRole[]>) {
      state.roles = action.payload;
    },
  },
});

export function useHelpDeskState() {
  const helpDeskState = useSelector(
    (state: any) => state.helpDesk,
  ) as HelpDeskState;
  const dispatch = useDispatch();
  const actions = {
    setShouldRefreshTickets: (payload: boolean) =>
      dispatch(helpDeskSlice.actions.setShouldRefreshTickets(payload)),
    setDepartments: (payload: Department[]) =>
      dispatch(helpDeskSlice.actions.setDepartments(payload)),
    setRoles: (payload: UserRole[]) =>
      dispatch(helpDeskSlice.actions.setRoles(payload)),
  };
  return [helpDeskState, actions] as [typeof helpDeskState, typeof actions];
}

export default helpDeskSlice;
