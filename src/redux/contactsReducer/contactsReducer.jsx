// import { nanoid } from 'nanoid';
import {
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import {
  getContact,
  addContact,
  deleteContact,
} from 'redux/operations/operations';

const contactsReducer = createSlice({
  name: 'contacts',
  initialState: { entrities: [], isLoading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(getContact.fulfilled, (state, { payload }) => {
        state.isLoading = true;
        state.entrities = payload;
      })
      .addCase(
        addContact.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.entrities.push(payload);
        }
        // reducer(state, { payload }) {
        //   state.isLoading = false;
        //   state.entrities.push(payload);
        // },
        // prepare({ name, number }) {
        //   return {
        //     payload: {
        //       name,
        //       number,
        //       id: nanoid(),
        //     },
        //   };
        // },
      )
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.entrities.findIndex(contact => {
          return contact.id === payload.id;
        });
        state?.entrities.splice(index, 1);
      })
      .addMatcher(
        isAnyOf(isPending(getContact, addContact, deleteContact)),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(isFulfilled(getContact, addContact, deleteContact), state => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isRejected(getContact, addContact, deleteContact),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      )
      .addDefaultCase((state, action) => {});
  },
});
export default contactsReducer;

// extraReducers: {
//   [getContact.pending]: (state, action) => {
//     state.isLoading = true;
//   },
//   [getContact.fulfilled]: (state, { payload }) => {
//     state.isLoading = false;
//     state.entrities = payload;
//   },
//   [getContact.rejected]: (_, { payload }) => {},
//   [addContact.pending]: (state, action) => {
//     state.isLoading = true;
//   },
//   [addContact.fulfilled]: {
//     reducer(state, { payload }) {
//       state.isLoading = false;
//       state.entrities.push(payload);
//     },
//     prepare({ name, number }) {
//       return {
//         payload: {
//           name,
//           number,
//           id: nanoid(),
//         },
//       };
//     },
//   },
//   [addContact.rejected]: (_, { payload }) => {},
//   [deleteContact.pending]: (state, action) => {
//     state.isLoading = true;
//   },
//   [deleteContact.fulfilled]: (state, { payload }) => {
//     state.isLoading = false;
//     const index = state.entrities.findIndex(contact => {
//       return contact.id === payload.id;
//     });
//     state?.entrities.splice(index, 1);
//   },
//   [deleteContact.rejected]: (_, { payload }) => {},
// },
