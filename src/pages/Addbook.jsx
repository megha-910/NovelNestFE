import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Addbook.css";
import api from "../services/api";

function Addbook() {

    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        author: "",
        category: ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setBook({
            ...book,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !book.title ||
            !book.description ||
            !book.price ||
            !book.stock ||
            !book.imageUrl ||
            !book.author ||
            !book.category
        ) {
            alert("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/novel/save",
                {
                    title: book.title,
                    description: book.description,
                    price: Number(book.price),
                    stock: Number(book.stock),
                    imageUrl: book.imageUrl,
                    author: book.author,
                    category: book.category
                }
            );

            alert(
                response.data.message ||
                "Book added successfully"
            );

            navigate("/admin/books");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to add book"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="add-book-container">

            <div className="add-book-card">

                <div className="add-book-header">

                    <h2>Add New Book</h2>

                    <p>
                        Add a new book to NovelNest
                    </p>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* TITLE */}

                    <div className="form-group">

                        <label>
                            Book Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                            placeholder="Enter book title"
                        />

                    </div>


                    {/* AUTHOR */}

                    <div className="form-group">

                        <label>
                            Author
                        </label>

                        <input
                            type="text"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                            placeholder="Enter author name"
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={book.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={book.description}
                            onChange={handleChange}
                            placeholder="Enter book description"
                            rows="5"
                        />

                    </div>


                    {/* PRICE + STOCK */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={book.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                min="0"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={book.stock}
                                onChange={handleChange}
                                placeholder="Enter stock"
                                min="0"
                            />

                        </div>

                    </div>


                    {/* IMAGE URL */}

                    <div className="form-group">

                        <label>
                            Image URL
                        </label>

                        <input
                            type="text"
                            name="imageUrl"
                            value={book.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter book image URL"
                        />

                    </div>


                    {/* IMAGE PREVIEW */}

                    {book.imageUrl && (

                        <div className="image-preview">

                            <p>Image Preview</p>

                            <img
                                src={book.imageUrl}
                                alt="Book Preview"
                                onError={(e) => {
                                    e.target.style.display =
                                        "none";
                                }}
                            />

                        </div>

                    )}


                    {/* BUTTONS */}

                    <div className="form-buttons">

                        {/* <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate("/admin/books")
                            }
                        >
                            Cancel
                        </button> */}


                        <button
                            type="submit"
                            className="save-book-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding..."
                                : "Add Book"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default Addbook;