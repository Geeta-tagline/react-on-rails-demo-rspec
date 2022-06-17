import React from "react"
import Form from 'react-bootstrap/Form'
import { Button } from "react-bootstrap";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { Container } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Page from "../layout/Page"

class Fruit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            description: "",
            loading: true,
            imageIndex: [],
            fruits: [],
            pageData: false,
            editchange: false,
        }
        this.handleEdit = this.handleEdit.bind(this)
    }
    handleEdit(val) {

        this.setState({
            id: val.id
        })
        this.setState({
            name: val.name
        })
        this.setState({
            description: val.description
        })

        if (this.state.editable) {

            this.props.handleUpdate(this.state)
            this.setState({
                editable: !this.state.editable,
                id: "",

            })
        }
        this.setState({
            editable: !this.state.editable
        })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            editchange: true
        })
    }

    render() {
        console.log("searchdata", this.props)
        return (
            <div style={{  marginRight: "1%",marginLeft: "1%"}}>
                <MDBTable>
                    <MDBTableHead info>
                        <tr>
                            <th onClick={() => this.props.sorting()}>Name ↑</th>
                            <th onClick={() => this.props.sortingdesc()}>Description ↑</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>
                                <Container>
                                    <Form.Control value={this.props.name} onChange={(e) => this.props.handleSearch(e)} style={{ width: "39%"}} size="sm" name="" placeholder="search" />
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Form.Control value={this.props.description} onChange={(e) => this.props.handleSearchDes(e)}  style={{ width: "39%" }} size="sm" name="" placeholder="search" />
                                </Container>
                            </td>
                        </tr>
                    </MDBTableHead >
                    {this.props.fruits.length === 0 && !this.state.pageData &&

                        <tbody> <tr><td colSpan="2" ><center><p>data not found</p></center></td></tr></tbody>
                    }
                    {
                        this.props.fruits.map((val, key) => {
                            return (
                                <MDBTableBody >
                                    <tr key={key} style={{ background: "#AAA9A8", color: "white" }} >
                                        <td>{this.state.id === val.id ? <input className="form-control-sm" type='text' name="name" onChange={(e) => this.handleChange(e)} defaultValue={val.name} /> : val.name}</td>
                                        <td>{this.state.id === val.id ? <input className="form-control-sm" type='text' name="description" onChange={(e) => this.handleChange(e)} defaultValue={val.description} /> : val.description}</td>
                                        <td> <Button variant="dark" onClick={() => this.handleEdit(val)}>{this.state.id === val.id ? 'Submit' : 'Edit'}</Button></td>
                                        <td> <Button variant="dark" onClick={() => this.props.handleDelete(val.id)}>Delete</Button></td>
                                    </tr>
                                </MDBTableBody>
                            )
                        })}
                </MDBTable>
                <Page alldata={this.state.allFruite} handlePage={this.handlePage} />
            </div>
        )
    }
}

export default Fruit;