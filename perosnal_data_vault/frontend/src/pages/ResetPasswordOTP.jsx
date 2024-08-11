import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // For the spinner (install react-bootstrap for this)

const RequestOtpForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    }
    // Basic email format validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      return 'Invalid email address';
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      return;
    }
    setEmailError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5500/api/send-otp', { email });
      setMessage(response.data.message);
      navigate('/reset-password');
    } catch (error) {
      setMessage(error.response.data.message || 'Error requesting OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#f0f8f4', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card mt-5 shadow-lg rounded" style={{ border: '1px solid #d0e2d8' }}>
            <div className="card-body">
              <h2 className="text-center mb-4" style={{ color: '#006400' }}>Forgot Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    placeholder="Enter your email"
                    required
                    style={{ borderRadius: '20px', border: '1px solid #006400' }}
                  />
                  {emailError && <div className="invalid-feedback d-block">{emailError}</div>}
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-block"
                  disabled={loading}
                  style={{ borderRadius: '20px' }}
                >
                  {loading ? <Spinner animation="border" size="sm" variant="light" /> : 'Send OTP'}
                </button>
              </form>
              {message && (
                <p className={`mt-3 text-center ${message.includes('Error') ? 'text-danger' : 'text-success'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestOtpForm;
