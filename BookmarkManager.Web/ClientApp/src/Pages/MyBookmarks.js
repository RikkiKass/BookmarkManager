import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import PersonalTableRow from '../Components/PersonalTableRow';
const MyBookmarks = () => {
    const [myBookmarks, setMyBookmarks] = useState([]);
    const { user } = useAuthContext();

    const getMyBookmarks = async () => {
        const { data } = await axios.get('/api/home/getmybookmarks');
        setMyBookmarks(data);
    }
    useEffect(() => {
        getMyBookmarks();

    }, []);


    const onDeleteClick = async (id) => {
        await axios.post('/api/home/deletebookmark', { id });
        getMyBookmarks();
    }
    const onUpdateClick = async (id, title) => {
        await axios.post('/api/home/updatebookmark', { id, title });
        getMyBookmarks();
    }

    return (

        <div className='container'>
            <h1>Welcome Back {user.firstName} {user.lastName}!</h1>

            <Link to='/addbookmark'><button className='btn btn-log btn-block btn-primary'>Add Bookmark</button></Link>

            <table className='table table-bordered table-hover table-striped'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {myBookmarks.map(b => <PersonalTableRow bookmark={b}
                        key={b.id}
                        onDeleteClick={() => onDeleteClick(b.id)}
                        onUpdateClick={onUpdateClick}

                    />)}

                </tbody>
            </table>
        </div>
    )

}
export default MyBookmarks;