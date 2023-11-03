import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { booksContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function BookOutList() {
    const navTo = useNavigate();

    //delete functionality
    const deleteOutBook = async (bookId) => {
        const response = await fetch(
            `https://654516ac5a0b4b04436d9ba9.mockapi.io/library-mana/lib_manage/${bookId}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        if (data) {
            const remainingbooks = outBooks.filter(
                (stud, idx) => stud.id !== bookId
            );
            setOutBooks(remainingbooks);
        }
    };
    //Getting books data
    const { outBooks, setOutBooks } = useContext(booksContext);

    return (
        <div className="container w-100 ">
            <h1>Book Out List</h1>
            <div className="row justify-content-around p-3">
                {outBooks.map((data, idx) => (
                    <Card
                        className="card col-sm-6 col-md-4 col-lg-3 border border-lightdark shadow rounded m-3 h-100 "
                        key={idx}
                    >
                        <Card.Body>

                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>{data.roll_no}</Card.Text>
                            <Card.Text>{data.book_name}</Card.Text>
                            <Card.Text>{data.register_date}</Card.Text>
                            <Card.Text>{data.no_of_days_allowed}</Card.Text>
                            <Button className="mx-3 px-3" variant="primary" onClick={() => navTo(`/editOutbook/${data.id}`)}>
                                <i className="fa-solid fa-pen"></i>
                            </Button>
                            <Button className="mx-3 px-3" variant="danger" onClick={() => deleteOutBook(data.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
