import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Managebooks.css";
import api from "../services/api";

function Managebooks() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // =========================
    // FETCH BOOKS
    // =========================

    const fetchBooks = async () => {

        try {

            const response =
                await api.get("/novel/all");

            console.log(response.data);

            setBooks(response.data.data);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to load books"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchBooks();

    }, []);


    // =========================
    // DELETE BOOK
    // =========================

    const deleteBook = async (bookId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this book?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            const response =
                await api.delete(
                    `/novel/${bookId}`
                );

            alert(
                response.data.message ||
                "Book deleted successfully"
            );

            fetchBooks();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete book"
            );
        }
    };


    // =========================
    // FILTER
    // =========================

    const categories = [
        ...new Set(
            books
                .map(book => book.category)
                .filter(Boolean)
        )
    ];


    const filteredBooks = books.filter(
        (book) => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                book.title
                    ?.toLowerCase()
                    .includes(searchText)
                ||
                book.author
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                categoryFilter === "ALL" ||
                book.category === categoryFilter;

            return (
                matchesSearch &&
                matchesCategory
            );
        }
    );


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="admin-books">
                <h2>Loading books...</h2>
            </div>
        );
    }


    return (

        <div className="admin-books">

            {/* HEADER */}

            <div className="books-header">

                <div>

                    <h2>Manage Books</h2>

                    <p>
                        Manage NovelNest books
                    </p>

                </div>

                <div className="book-count">
                    Total Books: {books.length}
                </div>

            </div>


            {/* SEARCH + FILTER + ADD */}

            <div className="books-controls">

                <input
                    type="text"
                    placeholder="Search title or author"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select
                    value={categoryFilter}
                    onChange={(e) =>
                        setCategoryFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="ALL">
                        All Categories
                    </option>

                    {categories.map(
                        (category) => (

                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>

                        )
                    )}

                </select>


                <button
                    className="add-book-btn"
                    onClick={() =>
                        navigate("/admin/saveb")
                    }
                >
                    + Add Book
                </button>

            </div>


            {/* BOOK TABLE */}

            <div className="books-table">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Book</th>

                            <th>Author</th>

                            <th>Category</th>

                            <th>Price</th>

                            <th>Stock</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredBooks.length > 0 ? (

                            filteredBooks.map(
                                (book) => (

                                    <tr
                                        key={book.id}
                                    >

                                        <td>
                                            #{book.id}
                                        </td>


                                        <td>

                                            <div className="book-info">

                                                <img
                                                    src={
                                                        book.imageUrl
                                                    }
                                                    alt={
                                                        book.title
                                                    }
                                                />

                                                <span>
                                                    {book.title}
                                                </span>

                                            </div>

                                        </td>


                                        <td>
                                            {book.author ||
                                                "N/A"}
                                        </td>


                                        <td>
                                            <span className="category-badge">
                                                {book.category ||
                                                    "N/A"}
                                            </span>
                                        </td>


                                        <td>
                                            ₹{book.price}
                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    book.stock === 0
                                                        ? "out-stock"
                                                        : book.stock <= 5
                                                        ? "low-stock"
                                                        : "in-stock"
                                                }
                                            >
                                                {book.stock}
                                            </span>

                                        </td>


                                        <td>

                                            <button
                                                className="edit-book-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/novel/${book.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                className="delete-book-btn"
                                                onClick={() =>
                                                    deleteBook(
                                                        book.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="no-books"
                                >
                                    No books found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Managebooks;