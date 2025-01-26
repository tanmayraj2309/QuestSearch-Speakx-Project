const Pagination_Controller = ({ handlePageChange, page, totalPages }) => {
  return (
    <div className="flex items-center justify-center bg-white text-gray-700 py-4 rounded-lg shadow-lg">
      <button
        className="bg-black hover:bg-gray-800 text-white p-2 px-4 text-sm rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>

      <span className="mx-4 text-lg font-semibold">Page {page} of {totalPages}</span>

      <button
        className="bg-black hover:bg-gray-800 text-white p-2 px-4 text-sm rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination_Controller;
