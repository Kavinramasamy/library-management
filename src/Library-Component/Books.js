import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Books() {
    return (
        <div className="fixed-container">
            <div className="row bg-dark justify-content-around">
                <div className="col-md-12">
                    <Link className="btn text-light w-100" to="addbook">
                        Add book
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
