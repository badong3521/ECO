import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType, CategoryType } from '../../../components/Card/types';
import { ReminderType } from '../../../services/api/types/reminder';
import { LixiStatusType } from '../../../services/api/types/lixi';

export interface HomePageState {
  features?: CardType[];
  news?: CardType[];
  events?: CardType[];
  specialEvents?: CardType[];
  categories?: CategoryType[];
  reminders?: ReminderType[];
  lixiStatus?: LixiStatusType;
}

const initialState: HomePageState = {
  features: undefined,
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setFeatures(state, action: PayloadAction<CardType[]>) {
      state.features = action.payload;
    },
    setNews(state, action: PayloadAction<CardType[]>) {
      state.news = action.payload;
    },
    setEvents(state, action: PayloadAction<CardType[]>) {
      state.events = action.payload;
    },
    setSpecialEvents(state, action: PayloadAction<CardType[]>) {
      state.specialEvents = action.payload;
    },
    setCategories(state, action: PayloadAction<CategoryType[]>) {
      state.categories = action.payload;
    },
    setReminders(state, action: PayloadAction<ReminderType[]>) {
      state.reminders = action.payload;
    },
    setLixiStatus(state, action: PayloadAction<LixiStatusType>) {
      state.lixiStatus = action.payload;
    },
  },
});

export function useHomePageState() {
  const homePageState = useSelector(
    (state: any) => state.homePage,
  ) as HomePageState;
  const dispatch = useDispatch();
  const actions = {
    setFeatures: (payload: CardType[]) =>
      dispatch(homePageSlice.actions.setFeatures(payload)),
    setNews: (payload: CardType[]) =>
      dispatch(homePageSlice.actions.setNews(payload)),
    setEvents: (payload: CardType[]) =>
      dispatch(homePageSlice.actions.setEvents(payload)),
    setSpecialEvents: (payload: CardType[]) =>
      dispatch(homePageSlice.actions.setSpecialEvents(payload)),
    setCategories: (payload: CategoryType[]) =>
      dispatch(homePageSlice.actions.setCategories(payload)),
    setReminders: (payload: ReminderType[]) =>
      dispatch(homePageSlice.actions.setReminders(payload)),
    setLixiStatus: (payload: LixiStatusType) =>
      dispatch(homePageSlice.actions.setLixiStatus(payload)),
  };
  return [homePageState, actions] as [typeof homePageState, typeof actions];
}

export default homePageSlice;
