import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchSearch } from '../store/slices/searchSlice';

function LinkKeyword({ path, className, keyMap, content }) {
    const dispatch = useDispatch();

    return (
        <Link to={path} className={className} key={keyMap} onClick={() => {
            dispatch(fetchSearch(content));
        }}>{content}</Link>
    )
}

export default LinkKeyword;