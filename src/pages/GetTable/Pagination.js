import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate ,currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
console.log(currentPage,'currentPage')
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className={number === currentPage ? "page-item1" : "page-item"}>
              {number}
              
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;