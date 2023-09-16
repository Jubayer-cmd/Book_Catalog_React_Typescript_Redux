/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { removeFromWishlist } from "../redux/features/wishList/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export default function WishList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlists = useAppSelector((state) => state.wishlist.items);

  const removeFromWishlistHandler = (bookId: string) => {
    dispatch(removeFromWishlist(bookId));
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "80vh" }}>
        {wishlists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {wishlists.map((book: any) => (
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
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-1 rounded-full"
                    onClick={() => removeFromWishlistHandler(book.id)}
                  >
                    <AiFillDelete size={16} />
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
        ) : (
          <p className="text-4xl text-center text-blue-500 mt-10">
            You have no WishList
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
