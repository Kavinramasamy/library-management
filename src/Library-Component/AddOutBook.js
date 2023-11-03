import { useFormik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import { booksContext } from "../App";

export default function AddOutBooks() {
    const navTo = useNavigate();
    //Getting books data using context....
    const { outBooks, setOutBooks } = useContext(booksContext);
    //Setting required Form fields....
    const fieldvalidationscheme = yup.object({
        name: yup.string().required("Please enter name"),
        roll_no: yup.string().required("Please enter roll_no"),
        book_name: yup.string().required("Please enter book_name"),
        register_date: yup.string().required("Please enter register_date"),
        no_days_allowed: yup.string().required("Please enter register_date"),
    });
    //Formik for form validation....
    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
        useFormik({
            initialValues: {
                name: "",
                roll_no: "",
                book_name: "",
                register_date: new Date().toLocaleDateString(),
                no_days_allowed: ""
            },
            validationSchema: fieldvalidationscheme,
            onSubmit: async function addOutBook() {
                console.log("hello")
                //new book data
                const newOutBook = {
                    name: values.name,
                    roll_no: values.roll_no,
                    register_date: values.register_date,
                    book_name: values.book_name,
                    no_days_allowed: values.no_days_allowed,
                };
                const response = await fetch(
                    `https://654516ac5a0b4b04436d9ba9.mockapi.io/library-mana/lib_manage`,
                    {
                        method: "POST",
                        body: JSON.stringify(newOutBook),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();
                if (data) {
                    setOutBooks([...outBooks, newOutBook]);
                    navTo('/outBooks')
                }
            },
        });
    return (
        <div className="">
            <h1 className="page-name m-5">ADD OUT BOOK</h1>
            <form
                onSubmit={handleSubmit}
                name={"Add update book"}
                description={"You can update book data here"}
            >
                <div className="m-3 pt-5 pb-3  border border-3 shadow rounded d-flex flex-column align-items-center justify-content-start">
                    <div className=" form-floating mb-3 ">
                        <input
                            id="name"
                            className={`form-control shadow ${touched.name && errors.name ? " border-danger " : ""
                                }`}
                            placeholder="Enter name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="name" className="text-muted">
                            {touched.name && errors.name ? errors.name : "Enter name"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="roll_no"
                            className={`form-control shadow ${touched.roll_no && errors.roll_no ? " border-danger " : ""
                                }`}
                            placeholder="Enter roll_no"
                            type="text"
                            value={values.roll_no}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="roll_no" className="text-muted">
                            {touched.roll_no && errors.roll_no ? errors.roll_no : "Enter roll_no"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="no_days_allowed"
                            className={`form-control shadow ${touched.no_days_allowed && errors.no_days_allowed ? " border-danger " : ""
                                }`}
                            placeholder="Enter no_days_allowed"
                            type="text"
                            value={values.no_days_allowed}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="no_days_allowed" className="text-muted">
                            {touched.no_days_allowed && errors.no_days_allowed ? errors.no_days_allowed : "Enter no_days_allowed"}
                        </label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <input
                            id="book_name"
                            className={`form-control shadow ${touched.book_name && errors.book_name
                                ? " border-danger "
                                : ""
                                }`}
                            placeholder="Enter book_name"
                            type="text"
                            value={values.book_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="book_name" className="text-muted">
                            {touched.book_name && errors.book_name
                                ? errors.book_name
                                : "Enter book_name"}
                        </label>
                    </div>
                    <button className="btn btn-success shadow" type="submit" >
                        Add Out Book
                    </button>
                </div>
            </form>
            <footer>you can add new out book data here</footer>
        </div>
    );
}
