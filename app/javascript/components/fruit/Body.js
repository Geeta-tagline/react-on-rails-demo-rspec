import React from "react";
import AllFruits from "./AllFruits"
import NewFruit from "./NewFruit"


class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fruits: [],
            allFruite: "",
            name: "",
            description: "",
            sort: "",
            sortname: "",
            sortdesc: "",
            sortdescription: ""
        };
        let sort = this.state.sortdesc || ''

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.addNewFruit = this.addNewFruit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteFruit = this.deleteFruit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateFruit = this.updateFruit.bind(this)
        this.handlePage = this.handlePage.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSearchDes = this.handleSearchDes.bind(this)
        this.sorting = this.sorting.bind(this)
        this.sortingdesc = this.sortingdesc.bind(this)
        let fetch = "/api/v1/fruits"
        let url = "http://localhost:3000/api/v1/fruits/"
    }
    handleUpdate(fruit) {
        fetch(`url${fruit.id}`,
            {
                method: 'PUT',
                body: JSON.stringify({ fruit: fruit }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.updateFruit(fruit)
            })
    }
    updateFruit(fruit) {
        let newFruits = this.state.fruits.filter((f) => f.id !== fruit.id)
        newFruits.push(fruit)
        this.setState({
            fruits: newFruits
        })
    }


    handleFormSubmit(name, description) {
        let body = JSON.stringify({ fruit: { name: name, description: description } })
        fetch('url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response) => { return response.json() })
            .then((fruit) => {
                this.addNewFruit(fruit)
            })

    }
    addNewFruit(fruit) {
        this.setState({
            fruits: this.state.fruits.concat(fruit)
        })
    }
    
    handleDelete(id) {
        fetch(`url${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.deleteFruit(id)
                console.log('Item was deleted!')
            })
    }

    deleteFruit(id) {
        let newFruits = this.state.fruits.filter((fruit) => fruit.id !== id)
        this.setState({
            fruits: newFruits
        })
    }

    componentDidMount() {
        fetch('fetch.json')

            .then((response) => { return response.json() })
            .then((data) => { this.setState({ fruits: data.fruitdata, allFruite: data.allfruit }) });
        console.log("data all")

    }
    handleSearch(e) {
        this.setState({name: e.target.value})
        let body = JSON.stringify({ searchdata: {name: e.target.value}} )
        fetch('fetch.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        })
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ fruits: data.fruitdata, allFruite: data.allfruit }) });
    }

    handleSearchDes(e) {
        let body = JSON.stringify({ searchdata: { description: e.target.value } })
        fetch('fetch.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        })
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ fruits: data.fruitdata, allFruite: data.allfruit }) });
    }
    sorting(){
        if (!this.state.sort === true){
            this.setState({sort: true})
            let body = JSON.stringify({ searchdata: { sort: true } })
            fetch('fetch.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            })
                .then((response) => { return response.json() })
                .then((data) => { this.setState({ fruits: data.fruitdata, allFruite: data.allfruit }) });
            // return '↑';

        }else{
            this.setState({ sort: false })
            this.setState({ sortname: true })
            let body = JSON.stringify({ searchdata: { sortname: true } })
            fetch('fetch.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            })
                .then((response) => { return response.json() })
                .then((data) => { this.setState({ fruits: data.fruitdata, allFruite: data.allfruit }) });
            // return '↓';
        }
        
    }
    sortingdesc() {
        if (!this.state.sortdesc === true) {
            this.setState({ sortdesc: true })
            let body = JSON.stringify({ searchdata: { sortdesc: true } })
            fetch('fetch.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            })
                .then((response) => { return response.json() })
                .then((data) => { this.setState({ fruits: data.fruitdata, allFruite: data.allfruit }) });
            // return '↑';

        } else {
            this.setState({ sortdesc: false })
            this.setState({ sortdescription: true })
            let body = JSON.stringify({ searchdata: { sortdescription: true } })
            fetch('fetch.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            })
                .then((response) => { return response.json() })
                .then((data) => { this.setState({ fruits: data.fruitdata, allFruite: data.allfruit }) });
            // return '↓';
        }

    }
    
    handlePage = (e, { activePage }) => {
        let gotopage = { activePage }
        let pagenum = gotopage.activePage
        let pagestring = pagenum.toString()
        this.setState({
            loading: true,
            pageData: true
        })
        const url = "api/v1/fruits/?page=" + pagestring
        fetch(url)
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ fruits: data.fruitdata }) });

    }
    render() {
        console.log("sort", this.sort)
        return (
            <div>
                <NewFruit handleFormSubmit={this.handleFormSubmit} />
                <AllFruits fruits={this.state.fruits} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} handlePage={this.handlePage} allFruite={this.state.allFruite} handleSearch={this.handleSearch} handleSearchDes={this.handleSearchDes} sorting={this.sorting} sortingdesc={this.sortingdesc} sort={this.sort}/>
            </div>
        )
    }
}
export default Body;
    