import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewOffer() {

    const notify = () => toast("Data Save Successfully");
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [image, setImages] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const history = useNavigate()

    const handlenameChange = event => {
        setname(event.target.value)
    };
    const handledescriptionChange = event => {
        setdescription(event.target.value)
    };

    const handleSubmit = event => {
        event.preventDefault();

        const url = 'http://localhost:3000/offers'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, description: description, image: selectedImage })
            
        };

        fetch(url, requestOptions)
            .then(response => console.log('Submitted successfully'))
            .catch(error => console.log('Form submit error', error))
            history('/')
    };
        
    return (
        <div>
        {localStorage.getItem("admintoken") &&
        <center>
        <Header />
        <br />
        <Form onSubmit={handleSubmit} style={{height: "98%", width: "40%"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{paddingRight: "100%"}}><b>Name</b></Form.Label>
                <Form.Control type="text" onChange={handlenameChange} value={name} placeholder="Enter Offer Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{paddingRight: "100%"}}><b>Description</b></Form.Label>
                <Form.Control type="text" onChange={handledescriptionChange} value={description} placeholder="enter Offer description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{paddingRight: "86%"}}><b>Add Image</b></Form.Label>
                <Form.Control type="file"  onChange={(event) => { setSelectedImage(event.target.files[0]); }}  placeholder="" />
            </Form.Group>
                {selectedImage && (
                    <div>
                        <img alt="not fount" width={"500px"} src={URL.createObjectURL(selectedImage)} />
                        <Button onClick={() => setSelectedImage(null)} variant="danger" type="submit">
                            remove
                        </Button>
                    </div>
                )}
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
export default NewOffer;