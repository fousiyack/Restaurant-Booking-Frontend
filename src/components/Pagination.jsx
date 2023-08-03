import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      breakClassName="break-me"
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName="flex justify-center mt-4"
      pageClassName="px-3 py-2 text-gray-800 bg-gray-200 rounded-md cursor-pointer"
      pageLinkClassName="block w-full h-full"
      activeLinkClassName="bg-gray-800 text-white"
      previousClassName="px-3 py-2 text-gray-800 bg-gray-200 rounded-md cursor-pointer"
      nextClassName="px-3 py-2 text-gray-800 bg-gray-200 rounded-md cursor-pointer"
      previousLinkClassName="block w-full h-full"
      nextLinkClassName="block w-full h-full"
    />
  );
};

export default Pagination;
