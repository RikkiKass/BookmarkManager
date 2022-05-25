import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import { useHistory, Link } from 'react-router-dom';


const Login = () => {
    const history = useHistory();
    const { setUser } = useAuthContext();

    const [loginUser, setLoginUser] = useState({ password: '', email: '' });
    const [isValid, setIsValid] = useState(true);

    const onTextChange = e => {
        const copy = { ...loginUser };
        copy[e.target.name] = e.target.value;
        setLoginUser(copy);
    }

    const onFormSubmit = async () => {

        const { data } = await axios.post('/api/account/login', loginUser);
        const validLogin = !!data;
        setIsValid(validLogin);
        if (validLogin) {
            setUser(data);
            history.push('/');
        }

    };



    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Login</h3>
                {!isValid && <h6 className='text-danger'>Incorrect password/username. Please try again!</h6>}

                <input type='text' className="form-control mt-2" placeholder="Email" onChange={onTextChange} name="email"></input>
                <input type='text' className="form-control mt-2" placeholder="Password" onChange={onTextChange} name="password"></input>
                <button className='btn btn-primary mt-2' onClick={onFormSubmit}>Login</button>

                <Link to='/signup'>  Don't have an account? Signup now!</Link>
            </div>
        </div>
    )
}
export default Login;