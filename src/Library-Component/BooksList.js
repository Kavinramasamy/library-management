import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { booksContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function BooksList() {
    const navTo = useNavigate();

    //delete functionality
    const deleteBook = async (bookId) => {
        const response = await fetch(
            `https://6478876c362560649a2df68b.mockapi.io/library/${bookId}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        if (data) {
            const remainingbooks = books.filter(
                (stud, idx) => stud.id !== bookId
            );
            setBooks(remainingbooks);
        }
    };
    //Getting books data
    const { books, setBooks } = useContext(booksContext);


    return (
        <div className="container w-100 ">
            <h1>Book List</h1>
            <div className="row justify-content-around p-3">
                {books.map((data, idx) => (
                    <Card
                        className="card col-sm-6 col-md-4 col-lg-3 border border-lightdark shadow rounded m-3 h-100 "
                        key={idx}
                    >
                        <Card.Body>

                            <Card.Title>{data.title}</Card.Title>
                            <Card.Text>{data.author}</Card.Text>
                            <Card.Text>{data.catagory}</Card.Text>
                            <Card.Text>{data.publisher}</Card.Text>
                            <Card.Text>{data.edition}</Card.Text>
                            <Button className="mx-3 px-3" variant="warning" onClick={() => navTo(`/editBook/${data.id}`)}>
                                <i className="fa-solid fa-pen"></i>
                            </Button>
                            <Button className="mx-3 px-3" variant="danger" onClick={() => deleteBook(data.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
