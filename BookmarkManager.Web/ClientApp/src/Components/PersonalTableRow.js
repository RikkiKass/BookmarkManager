import React, { useState } from 'react';
const PersonalTableRow = ({ bookmark, onDeleteClick, onUpdateClick }) => {


    const { url, title, id } = bookmark;
    const realTitle = title;
    const [editMode, setEditMode] = useState(false);

    const onTextChange = e => {
        bookmark.title = e.target.value;
    }
    const updateClick = () => {
        setEditMode(false);

        onUpdateClick(id, bookmark.title);
    }

    return (

        <tr>
            <td>{editMode ? <input type='text' defaultValue={realTitle} className='form-control' onChange={onTextChange} /> : title}</td>
            <td>
                <a target="_blank" href={url}>{url}</a>
            </td>
            <td>
                {editMode ? <div> <button className='btn btn-info' onClick={updateClick}>Update</button>
                    <button className='btn btn-warning' onClick={() => (setEditMode(false), bookmark.title = realTitle)}>Cancel</button></div> :
                    <button className='btn btn-success' onClick={() => setEditMode(true)}>Edit Title</button>}

                <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>

    )
}
export default PersonalTableRow;