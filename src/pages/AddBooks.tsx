/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { usePostBookMutation } from "../redux/features/Book/bookSlice";

const AddBooks = () => {
  const [postBooks] = usePostBookMutation();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    image: "",
    publicationDate: "",
    reviews: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await toast.promise(postBooks(formData), {
        loading: "Saving...",
        success: <b>New Book added</b>,
        error: <b>Could not add new book.</b>,
      });
      if (res?.data?.success === true) {
        // Clear the form input fields by setting formData to an object with empty values
        setFormData({
          title: "",
          author: "",
          genre: "",
          image: "",
          publicationDate: "",
          reviews: "",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />

      <div className="max-w-md mx-auto mb-5">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title} // Add the value attribute to bind the input to formData
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
            value={formData.author} // Add the value attribute for each input field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-600 font-bold mb-2">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre} // Add the value attribute for each input field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600 font-bold mb-2">
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image} // Add the value attribute for each input field
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
            value={formData.publicationDate} // Add the value attribute for each input field
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
            value={formData.reviews} // Add the value attribute for the textarea
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
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddBooks;
