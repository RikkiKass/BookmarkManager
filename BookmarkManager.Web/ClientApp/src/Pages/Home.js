import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRow from '../Components/TableRow';
const Home = () => {

    const [popularBookmarks, setPopularBookmarks] = useState([{ url: '', count: '' }]);

    useEffect(() => {
        const getPopularBookmarks = async () => {
            const { data } = await axios.get('/api/home/getPopularBookmarks');
            setPopularBookmarks(data);
        }
        getPopularBookmarks();

    }, []);

    return (

        <div className='container'>
            <h1>Welcome to the Bookmark Application!</h1>
            <h4>Five most popular links</h4>
            <table className='table table-bordered table-hover table-striped'>
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>

                    {popularBookmarks.map(b => <TableRow bookmark={b} />)}
                </tbody>
            </table>
        </div>
    )
}
export default Home;