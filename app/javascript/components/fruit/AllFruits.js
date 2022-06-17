import React from 'react'
import Fruit from './Fruit'

const AllFruits = (props) => {
    // var fruits = props.fruits.map((fruit) => {
    return (
        // <div key={fruit.id}>
        //     <div key={fruit.id}>
        //         <Fruit fruit={fruit} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}/>
        //     </div>
        // </div>
        <div>
            <Fruit fruits={props.fruits} allFruite={props.allFruite} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} handlePage={props.handlePage} handleSearch={props.handleSearch} handleSearchDes={props.handleSearchDes} sorting={props.sorting} sortingdesc={props.sortingdesc} sort={props.sort}/>
        </div>
    )
    
    return (
        <div>
            {/* {fruits} */}
        </div>
    )
}
export default AllFruits;
