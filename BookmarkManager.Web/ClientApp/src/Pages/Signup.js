import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });


    const onFormSubmit = async () => {
        await axios.post('/api/account/signup', user);
        history.push('/login');
    };
    const onTextChange = e => {
        const copy = { ...user }
        copy[e.target.name] = e.target.value;
        setUser(copy);
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Signup for a new account</h3>

                <input type='text' className="form-control mt-2" placeholder="First Name" onChange={onTextChange} name="firstName"></input>
                <input type='text' className="form-control mt-2" placeholder="Last Name" onChange={onTextChange} name="lastName"></input>
                <input type='text' className="form-control mt-2" placeholder="Email" onChange={onTextChange} name="email"></input>
                <input type='text' className="form-control mt-2" placeholder="Password" onChange={onTextChange} name="password"></input>
                <button className="btn btn-primary mt-2" onClick={onFormSubmit}>Signup</button>

            </div>
        </div>
    )

}
export default Signup;