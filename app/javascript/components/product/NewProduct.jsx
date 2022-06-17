import React, { useState, useEffect, useDebugValue } from 'react';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dropdown/style.css';
import Select from 'react-select';
import axios from 'axios';

function NewProduct() {

    const notify = () => toast("Data Save Successfully");
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [prize, setPrize] = useState('')
    const [size, setSize] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [actions, setValue] = useState('');
    const [post, setPost] = useState('');
    const [id, setId] = useState('');
    const [dropvalue, setdropvalue] = useState('')
    const [catname, setcatname] = useState('')

    const history = useNavigate()
   
    useEffect(() => {
        axios.get('categories.json').then(response => {
            const category = response.data.category
            console.log("actionsss", post)
            if (category){
                const options = category.map(d => ({
                    "value": d.id,
                    "label": d.name
                }))
                setPost(options);
            }
        });
    }, []);
    
    const handlenameChange = event => {
        setname(event.target.value)
    };
    const handledescriptionChange = event => {
        setdescription(event.target.value)
    };
    const handleprizeChange = event => {
        setPrize(event.target.value)
    };
    const handlesizeChange = event => {
        setSize(event.target.value)
    };
    const handlecategoryIdChange = event => {
        setCategoryId(event.target.value)
    };
    const handleChange = event => {
        setId(event.value)
        setcatname(event.label)
    };

    const handleSubmit = event => {
        event.preventDefault();
        const url = 'http://localhost:3000/products'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, description: description, prize: prize, size: size, category_id: id  })
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
                <Form onSubmit={handleSubmit} style={{ height: "98%", width: "40%" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ paddingRight: "100%" }}><b>Name</b></Form.Label>
                        <Form.Control type="text" onChange={handlenameChange} value={name} placeholder="Enter product Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ paddingRight: "100%" }}><b>Description</b></Form.Label>
                        <Form.Control type="text" onChange={handledescriptionChange} value={description} placeholder="enter product description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ paddingRight: "100%" }}><b>Prize</b></Form.Label>
                        <Form.Control type="text" onChange={handleprizeChange} value={prize} placeholder="enter product description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ paddingRight: "100%" }}><b>Size</b></Form.Label>
                        <Form.Control type="text" onChange={handlesizeChange} value={size} placeholder="enter product description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ paddingRight: "100%" }}><b>Category</b></Form.Label>
                        <Select options={post} onChange={handleChange} />
                    </Form.Group>
                    <br />
                    {/* <Button variant="primary" onClick={notify} type="submit">
                        Submit
                    </Button> */}
                    <Button variant="primary" type="submit">Submit</Button>
                    {/* <ToastContainer /> */}
                </Form>
                <Footer />
            </center>
        }
        </div>
    )
}
export default NewProduct;