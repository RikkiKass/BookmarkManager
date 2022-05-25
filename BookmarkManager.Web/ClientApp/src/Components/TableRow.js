import React from 'react';
const TableRow = ({ bookmark }) => {
    const { url, count } = bookmark;
    return (

        <tr>
            <td>
                <a target="_blank" href={url}>{url}</a>
            </td>
            <td>{count}</td>
        </tr>

    )
}
export default TableRow;