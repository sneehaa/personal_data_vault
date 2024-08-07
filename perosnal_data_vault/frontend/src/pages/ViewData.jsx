import React, { useEffect, useState } from 'react';
import { viewDataApi } from '../apis/Api';


const ViewData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewDataApi();
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>View Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <p>Name: {item.fullName}</p>
            <p>DOB: {item.dateOfBirth}</p>
            <p>Address: {item.address}</p>
            <p>Phone: {item.phoneNumber}</p>
            <p>Email: {item.email}</p>
            {item.document && (
              <p>
                Document: <a href={`/uploads/${item.document}`} target="_blank" rel="noopener noreferrer">View</a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewData;
