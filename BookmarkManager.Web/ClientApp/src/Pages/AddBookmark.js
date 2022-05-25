import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
const AddBookmark = () => {

    const { user } = useAuthContext();
    const history = useHistory();
    const [bookmark, setBookmark] = useState({ title: '', url: '', userId: '' });


    const onFormSubmit = async () => {
        bookmark.userId = user.id;
        await axios.post('/api/home/addbookmark', bookmark);
        history.push('/mybookmarks');
    };
    const onTextChange = e => {
        const copy = { ...bookmark }
        copy[e.target.name] = e.target.value;
        setBookmark(copy);
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Add Bookmark</h3>
                <input type='text' className="form-control mt-2" placeholder="Title" onChange={onTextChange} name="title"></input>
                <input type='text' className="form-control mt-2" placeholder="Url" onChange={onTextChange} name="url"></input>
                <button className='btn btn-primary mt-2' onClick={onFormSubmit}>Submit</button>
            </div>
        </div>
    )
}
export default AddBookmark;