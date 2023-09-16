/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../../redux/features/Book/bookSlice";
import { addToWishlist } from "../../redux/features/wishList/wishlistSlice";
import { useAppDispatch } from "../../redux/store";
export default function Book() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useGetBooksQuery({});
  console.log(data);
  const addToWishlistHandler = (book: any) => {
    dispatch(addToWishlist(book));
  };
  return (
    <div className="container">
      <div className="mx-auto text-gray-600 mt-5">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 rounded-full text-sm focus:outline-none w-full "
          style={{ width: "500px" }}
          type="search"
          name="search"
          placeholder="Search"
        />
      </div>
      {/* Mapping through the book data to create cards */}
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
                <FaHeart size={16} /> {/* FontAwesome heart icon */}
              </button>
            </div>

            <p className="text-gray-500 mt-2">Author: {book.author}</p>
            <p className="text-gray-500">Genre: {book.genre}</p>
            <p className="text-gray-500">
              Publication Date: {book.publicationDate}
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
    </div>
  );
}
