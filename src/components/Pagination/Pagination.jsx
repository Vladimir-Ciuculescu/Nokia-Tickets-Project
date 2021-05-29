import React from 'react';
import './Paginations.css';
import { Link } from 'react-router-dom';

const Pagination = ({ postsPerPage, totalPosts }) => {
    

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }

   

    return (
        <div>
            
                {pageNumbers.map(number => (
                     <button onClick={() => { localStorage.setItem("currentPage", number);window.location.reload(false);}}>
                            {number}
                        </button>
                ))}
            
        </div>
    )
}

export default Pagination;