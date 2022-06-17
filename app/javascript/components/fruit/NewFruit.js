import React from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const NewFruit = (props) => {

    let formFields = {}
    return (
        <div style={{marginLeft: "1%", width: "40%"}}>
            <Form onSubmit={(e) => {
                e.preventDefault();
                props.handleFormSubmit(
                    formFields.name.value,
                    formFields.description.value
                );
                e.target.reset();
            }
            }>
                <br />
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" 
                        ref={input => formFields.name = input} placeholder='Enter the name of the item' required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text"
                        ref={input => formFields.description = input} placeholder='Enter a description' />
                    <span style={{ color: 'red' }}>{}</span>
                </Form.Group>
                <br />
                <center><Button style={{ marginRight: "75%" }} className="btn btn-secondary" variant="dark" type="submit">
                    Add new fruit
                </Button></center>
            </Form>
        </div>
    )
}
export default NewFruit;