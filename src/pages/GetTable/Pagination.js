import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate ,currentPage}) => {
  // const pageNumbers = [];

  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }
  
  let pagination = [], i = 1;
  const totalall = Math.ceil(totalPosts / postsPerPage)
 while (i <= totalall) {
   if (i <= 1 || 
     i >=  totalall - 2|| 
     i >= currentPage - 1 && i <= currentPage + 1) { 
     pagination.push(i);
     i++;
   } else {
     pagination.push('...');

     //jump to the next page to be linked in the navigation
     i = i < currentPage ? currentPage - 1 : totalall - 2;
   }
 }

  return (
    <nav>
      <ul className='pagination'>
        {pagination.map(number => (
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