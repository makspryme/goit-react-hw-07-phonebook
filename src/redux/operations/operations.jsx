import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://653119c24d4c2e3f333c60d5.mockapi.io/contacts';

export const getContact = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await axios.get();
    return response.data;
  } catch (error) {
    alert('Ooops.. Please reload the page!');
  }
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    try {
      const response = await axios.post('', contact);
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      alert('Ooops.. Please reload the page!');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    try {
      const response = await axios.delete(`/${contactId}`);
      return response.data;
    } catch (error) {
      alert('Ooops.. Please reload the page!');
    }
  }
);
