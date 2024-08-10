import React, { useState, useEffect } from 'react';
import { getAllDataApi, deleteDataApi } from '../apis/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ViewData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllDataApi().then((res) => {
            setData(res.data.data);
        });
    }, []);

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this data?");
        if (!confirm) return;

        deleteDataApi(id).then((res) => {
            if (!res.data.success) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                setData((prevData) => prevData.filter((item) => item._id !== id));
            }
        });
    };

    return (
        <div className='m-4'>
            <div className='d-flex justify-content-between'>
                <h1>View Data</h1>
                <Link to="/add" className="btn btn-primary">Add New Data</Link>
            </div>
            <table className='table mt-4'>
                <thead className='table-dark'>
                    <tr>
                        <th>Your Image</th>
                        <th>Full Name</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td><img src={item.dataImageUrl} height={40} width={40} alt="Data" /></td>
                            <td>{item.fullName}</td>
                            <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>
                            <td>{item.address}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.email}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <Link to={`/edit/${item._id}`} className="btn btn-success">Edit</Link>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewData;
