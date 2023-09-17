/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../../redux/features/Book/bookSlice";
import { addToWishlist } from "../../redux/features/wishList/wishlistSlice";
import { useAppDispatch } from "../../redux/store";

export default function Book() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPublicationYear, setSelectedPublicationYear] = useState("");

  // Update this state to indicate whether a search or filter operation is in progress.
  const [isSearching, setIsSearching] = useState(false);

  const { data, isLoading, refetch } = useGetBooksQuery({
    searchTerm,
    genre: selectedGenre,
    publicationYear: selectedPublicationYear,
  });

  console.log(data);

  useEffect(() => {
    // Use the `isSearching` state to trigger a refetch when searching or filtering.
    if (isSearching) {
      refetch();
      setIsSearching(false); // Reset the state after the refetch.
    }
  }, [searchTerm, selectedGenre, selectedPublicationYear, isSearching]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handlePublicationYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPublicationYear(event.target.value);
  };

  const handleSearchClick = () => {
    console.log("Search Term:", searchTerm);
    console.log("Selected Genre:", selectedGenre);
    console.log("Selected Publication Year:", selectedPublicationYear);

    // Set `isSearching` to true when initiating a search or filter.
    setIsSearching(true);
  };

  const addToWishlistHandler = (book: any) => {
    dispatch(addToWishlist(book));
    toast.success("Added to wishlist");
  };

  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  }

  return (
    <div className="container mx-auto mt-5">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by title, author, or genre"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 bg-white h-10 px-5 rounded-full text-sm focus:outline-none w-full"
        />

        <button
          onClick={handleSearchClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2"
        >
          Search
        </button>
      </div>

      {/* Genre Filter */}
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="border border-gray-300 bg-white h-10 px-5 rounded-full text-sm focus:outline-none mt-2"
      >
        <option value="">All Genres</option>
        <option value="Fiction">Fiction</option>
        <option value="Horror">Horror</option>
        <option value="History">History</option>
        <option value="Comics">Comics</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Romance">Romance</option>
        {/* Populate options based on available genres */}
      </select>

      <select
        value={selectedPublicationYear}
        onChange={handlePublicationYearChange}
        className="border border-gray-300 bg-white h-10 px-5 rounded-full text-sm focus:outline-none m-2"
      >
        <option value="">All Years</option>
        {generateYearOptions()}
      </select>

      {isLoading || isSearching ? ( // Show loading when either initial load or searching/filtering.
        <p className="flex justify-center items-center text-violet-500 mt-5 text-3xl">
          Loading
          <span className="loading loading-dots loading-lg"></span>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {data?.data.map((book: any) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={book.image}
                alt={book.title}
                className="mt-4 w-full h-72 object-cover"
              />

              <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-violet-500 mt-2">
                  {book.title}
                </h2>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded-full"
                  onClick={() => addToWishlistHandler(book)}
                >
                  <FaHeart size={16} />
                </button>
              </div>

              <p className="text-gray-500 mt-2">Author: {book.author}</p>
              <p className="text-gray-500">Genre: {book.genre}</p>
              <p className="text-gray-500">
                Publication Year: {book.publicationDate}
              </p>
              <button
                className="btn btn-primary mt-4 w-full hover:text-white"
                onClick={() => navigate(`/bookdetails/${book.id}`)}
              >
                View details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
