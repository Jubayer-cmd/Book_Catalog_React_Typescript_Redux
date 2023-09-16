import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useBookByIdQuery,
  useDeleteBookMutation,
  useUpdatebookMutation,
} from "../../redux/features/Book/bookSlice";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { data } = useBookByIdQuery(id);
  const [deleteBook] = useDeleteBookMutation();
  const [updateBooks] = useUpdatebookMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    image: "",
    publicationDate: "",
    reviews: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Populate formData with existing data when it becomes available
    if (data?.data) {
      setFormData(data.data);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await toast.promise(updateBooks({ id: id, data: formData }), {
        loading: "updating...",
        success: <b>Book Updated</b>,
        error: <b>Could not Update Book.</b>,
      });
      console.log(res);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      // Set loading state back to false when the request is complete (whether success or error)
      setIsLoading(false);
      document.getElementById("my_modal_3").close();
    }
  };

  // Event handler for input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    const res = await toast.promise(deleteBook(id), {
      loading: "Deleting...",
      success: <b>Books Deleted</b>,
      error: <b>Could not delete the book.</b>,
    });
    if (res?.data?.success) {
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="container" style={{ minHeight: "80vh" }}>
        <div className="flex mt-3">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-4"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Update book
          </button>
          <button
            onClick={() => handleDelete(data?.data?.id)}
            className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete book
          </button>
        </div>
        <div className="container ml-2 my-10">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-center">
              <img
                src={data?.data?.image}
                alt={data?.data?.title}
                className="w-60 h-full"
              />

              <div className="ml-6">
                <h1 className="text-3xl font-bold text-violet-500 mt-4">
                  {data?.data?.title}
                </h1>
                <p className="text-gray-500 mt-2">
                  Author: {data?.data?.author}
                </p>
                <p className="text-gray-500 my-2">Genre: {data?.data?.genre}</p>
                <p className="text-gray-500 my-2">
                  Publication Date: {data?.data?.publicationDate}
                </p>
                <p className="text-gray-500">Reviews: {data?.data?.reviews}</p>
              </div>
            </div>
          </div>
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-4">
              Update {data?.data?.title}
            </h3>
            <div className="max-w-md mx-auto mb-5">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-600 font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="author"
                  className="block text-gray-600 font-bold mb-2"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="genre"
                  className="block text-gray-600 font-bold mb-2"
                >
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-600 font-bold mb-2"
                >
                  Image
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="publicationDate"
                  className="block text-gray-600 font-bold mb-2"
                >
                  Publication Date
                </label>
                <input
                  type="text"
                  id="publicationDate"
                  name="publicationDate"
                  value={formData.publicationDate}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reviews"
                  className="block text-gray-600 font-bold mb-2"
                >
                  Reviews
                </label>
                <textarea
                  id="reviews"
                  name="reviews"
                  value={formData.reviews}
                  rows={5}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
      <Footer />
    </>
  );
}
