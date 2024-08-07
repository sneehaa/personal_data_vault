import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './reducers/authReducer';
import dataReducer from './reducers/dataReducer';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import DataVault from './DataVault';

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/data-vault" element={<DataVault />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
