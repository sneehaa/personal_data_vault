import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './actions/authActions';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    dispatch(login(credentials));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
