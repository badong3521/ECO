import { combineReducers } from '@reduxjs/toolkit';
import map from '../components/Map/reducers';
import homePage from '../features/HomePage/reducers';
import directory from '../features/Directory/reducers';
import searchHistory from '../components/SearchBar/reducers/searchHistory';
import user from '../features/User/reducers';
import bus from '../features/Bus/reducers';
import helpDesk from '../features/HelpDeskScreen/reducers';
import standardSearch from '../features/Bus/reducers/standardSearch';
import electricBill from '../features/ElectricBillScreen/reducers';

export default combineReducers({
  user: user.reducer,
  homePage: homePage.reducer,
  directory: directory.reducer,
  map: map.reducer,
  bus: bus.bus.reducer,
  busCard: bus.busCard.reducer,
  busSettings: bus.busSettings.reducer,
  standardSearch: standardSearch.reducer,
  searchHistory: searchHistory.reducer,
  helpDesk: helpDesk.reducer,
  electricBill: electricBill.reducer,
});
