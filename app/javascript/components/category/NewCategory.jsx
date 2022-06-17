import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewCategory() {

    const notify = () => toast("Data Save Successfully");
    const [name, setname] = useState('')
    const history = useNavigate()

    const handlenameChange = event => {
        setname(event.target.value)
    };

    const handleSubmit = event => {
        event.preventDefault();

        const url = 'http://localhost:3000/categories'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })

        };

        fetch(url, requestOptions)
            .then(response => console.log('Submitted successfully'))
            .catch(error => console.log('Form submit error', error))
        // alert("hello")
        history('/')
    };

    return (
        <div>
        {localStorage.getItem("admintoken") &&
            <center>
                <Header />
                <br />
                <Form onSubmit={handleSubmit} style={{ height: "98%", width: "40%" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ paddingRight: "100%" }}><b>Name</b></Form.Label>
                        <Form.Control type="text" onChange={handlenameChange} value={name} placeholder="Enter Category Name" />
                    </Form.Group>
                    <br />
                    <Button variant="primary" onClick={notify} type="submit">
                        Submit
                    </Button>
                    <ToastContainer />
                </Form>
                <Footer />
            </center>
        }
        </div>
    )
}
export default NewCategory;