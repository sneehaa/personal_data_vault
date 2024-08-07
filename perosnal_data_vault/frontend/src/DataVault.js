import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from './actions/dataActions';

const DataVault = () => {
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div>
      <h1>Data Vault</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>{item.type}: {item.data}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataVault;
