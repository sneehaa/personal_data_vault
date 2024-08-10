import React, { useState, useEffect } from 'react';
import { addDataApi, getAllDataApi } from '../apis/api';
import { toast } from 'react-toastify';
import '../styles/sidebar.css'

const AddData = () => {
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dataImage, setDataImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllDataApi().then((res) => {
            setData(res.data.data);
        });
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setDataImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('dateOfBirth', dateOfBirth); // Correct key for dateOfBirth
        formData.append('address', address);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('dataImage', dataImage);

        addDataApi(formData)
            .then((res) => {
                if (!res.data.success) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    setData((prevData) => [...prevData, res.data.data]);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Internal Server Error!');
            });
    };

    return (
        <div className='m-4'>
            <div className='d-flex justify-content-between'>
                <h1>Add Data</h1>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Your Data
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create your new data</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="fullName" className="form-label">Full Name</label>
                                        <input
                                            onChange={(e) => setFullName(e.target.value)}
                                            className='form-control'
                                            type="text"
                                            id="fullName"
                                            placeholder='Enter your full name'
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                                        <input
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                            className='form-control'
                                            type="date"
                                            id="dateOfBirth"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input
                                            onChange={(e) => setAddress(e.target.value)}
                                            className='form-control'
                                            type="text"
                                            id="address"
                                            placeholder='Enter your address'
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                        <input
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className='form-control'
                                            type="text"
                                            id="phoneNumber"
                                            placeholder='Enter your phone number'
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            className='form-control'
                                            type="email"
                                            id="email"
                                            placeholder='Enter your email'
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="dataImage" className="form-label">Your Image</label>
                                        <input
                                            onChange={handleImageUpload}
                                            type="file"
                                            className='form-control'
                                            id="dataImage"
                                            required
                                        />
                                    </div>
                                    {previewImage && <img src={previewImage} className='img-fluid rounded object-cover mt-2' alt="Preview" />}
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className='table mt-4'>
                <thead className='table-dark'>
                    <tr>
                        <th>Your Image</th>
                        <th>Full Name</th>
                        <th> Date of Birth</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
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
                        
                        </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddData;
