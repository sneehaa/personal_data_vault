import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSingleDataApi, updateDataApi } from '../apis/api'

const EditData = () => {
    // receive data id from url
    const { id } = useParams()

    // load data
    useEffect(() => {
        getSingleDataApi(id).then((res) => {
            console.log(res.data)
            setFullName(res.data.data.fullName)
            setDateOfBirth(res.data.data.dateOfBirth)
            setAddress(res.data.data.address)
            setPhoneNumber(res.data.data.phoneNumber)
            setEmail(res.data.data.email)
            setOldImage(res.data.data.dataFileUrl)
        })
    }, [id])

    // Make useState
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [oldImage, setOldImage] = useState('')

    // make useState for image
    const [dataFile, setDataFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // image upload function
    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        console.log(file)
        setDataFile(file)
        setPreviewImage(URL.createObjectURL(file))
    }

    // handle submit function
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullName', fullName);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('address', address);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('dataFile', dataFile);

        // make an api call
        updateDataApi(id, formData).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
                navigate('/')
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Internal Server Error!')
        })
    }

    return (
        <>
            <div className='m-4'>
                <h3>Editing Data - <span className='text-danger'>{fullName}</span></h3>
                <div className='d-flex gap-3'>
                    <form>
                        <label>Full Name</label>
                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className='form-control mb-2' type="text" placeholder='Enter full name' />

                        <label>Date of Birth</label>
                        <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className='form-control mb-2' type="date" placeholder='Enter date of birth' />

                        <label>Address</label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} className='form-control mb-2' type="text" placeholder='Enter address' />

                        <label>Phone Number</label>
                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='form-control mb-2' type="tel" placeholder='Enter phone number' />

                        <label>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='form-control mb-2' type="email" placeholder='Enter email' />

                        <label>Image</label>
                        <input onChange={handleImageUpload} type="file" className='form-control' />

                        <button onClick={handleSubmit} className='btn btn-primary w-100 mt-2'>Update Data</button>
                    </form>
                    <div>
                        <h6>Old Image Preview</h6>
                        <img className='img-fluid rounded-4 object-fit-cover' width={300} height={300} src={oldImage} alt="" />

                        <h6 className='mt-4'>New Image</h6>
                        {previewImage ? (
                            <img src={previewImage} alt="Data Image" className='img-fluid rounded-4 object-fit-cover' width={300} height={300} />
                        ) : (
                            <p>No image selected!</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditData
