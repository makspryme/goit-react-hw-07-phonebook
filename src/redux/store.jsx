import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { filterReducer } from './filterReducer/filterReducer';
import contactsReducer from './contactsReducer/contactsReducer';

const rootReducers = combineReducers({
  contacts: contactsReducer.reducer,
  filter: filterReducer.reducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export { store };
export const { add, remove } = contactsReducer.actions;
export const { changeFilter } = filterReducer.actions;
