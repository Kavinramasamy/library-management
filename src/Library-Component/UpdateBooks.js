import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import { booksContext } from "../App";

export default function UpdateBooks() {
    var index;
    var i = 0;
    const navTo = useNavigate();
    //Getting books data using context....
    const { books, setBooks } = useContext(booksContext);
    //Getting book id.....
    const { id } = useParams();
    //Setting required Form fields....
    const fieldvalidationscheme = yup.object({
        title: yup.string().required("Please enter title"),
        author: yup.string().required("Please enter author"),
        publisher: yup.string().required("Please enter publisher"),
        edition: yup.string().required("Please enter edition"),
        catagory: yup.string().required("Please enter edition"),
    });
    //Getting the books data which we have to edit....
    const editBook = books.filter((ele) => { if (ele.id == id) { index = i; return ele; } i++; });
    //Assigning the values for initial value....
    const [title, setTitle] = useState(editBook[0].title);
    const [author, setAuthor] = useState(editBook[0].author);
    const [edition, setEdition] = useState(editBook[0].edition);
    const [publisher, setpublisher] = useState(editBook[0].publisher);
    const [catagory, setCatagory] = useState(editBook[0].catagory);

    //Formik for form validation....
    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
        useFormik({
            initialValues: {
                id,
                title,
                author,
                publisher,
                edition,
                catagory
            },
            validationSchema: fieldvalidationscheme,
            onSubmit: async function updateBook() {
                //updated book data
                const updatedObject = {
                    title: values.title,
                    author: values.author,
                    edition: values.edition,
                    publisher: values.publisher,
                    catagory: values.catagory,
                    id,
                };
                const response = await fetch(
                    `https://6478876c362560649a2df68b.mockapi.io/library/${id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(updatedObject),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();
                if (data) {
                    books[index] = data;
                    setBooks([...books]);
                    navTo('/booksList')
                }
            },
        });
    return (
        <div className="">
            <h1 className="page-title m-5">EDIT BOOK</h1>
            <form
                onSubmit={handleSubmit}
                title={"Add update book"}
                description={"You can update book data here"}
            >
                <div className="m-3 pt-5 pb-3  border border-3 shadow rounded d-flex flex-column align-items-center justify-content-start">
                    <div className=" form-floating mb-3 ">
                        <input
                            id="title"
                            className={`form-control shadow ${touched.title && errors.title ? " border-danger " : ""
                                }`}
                            placeholder="Enter title"
                            type="text"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="title" className="text-muted">
                            {touched.title && errors.title ? errors.title : "Enter title"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="author"
                            className={`form-control shadow ${touched.author && errors.author ? " border-danger " : ""
                                }`}
                            placeholder="Enter author"
                            type="text"
                            value={values.author}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="author" className="text-muted">
                            {touched.author && errors.author ? errors.author : "Enter author"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="catagory"
                            className={`form-control shadow ${touched.catagory && errors.catagory ? " border-danger " : ""
                                }`}
                            placeholder="Enter catagory"
                            type="text"
                            value={values.catagory}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="catagory" className="text-muted">
                            {touched.catagory && errors.catagory ? errors.catagory : "Enter catagory"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="edition"
                            className={`form-control shadow ${touched.edition && errors.edition ? " border-danger " : ""
                                }`}
                            placeholder="Enter edition"
                            type="text"
                            value={values.edition}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="edition" className="text-muted">
                            {touched.edition && errors.edition ? errors.edition : "Enter edition"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="publisher"
                            className={`form-control shadow ${touched.publisher && errors.publisher
                                ? " border-danger "
                                : ""
                                }`}
                            placeholder="Enter publisher"
                            type="text"
                            value={values.publisher}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="publisher" className="text-muted">
                            {touched.publisher && errors.publisher
                                ? errors.publisher
                                : "Enter publisher"}
                        </label>
                    </div>
                    <button className="btn btn-success shadow" type="submit">
                        Update
                    </button>
                </div>
            </form>
            <footer>you can add new book data here</footer>
        </div>
    );
}
