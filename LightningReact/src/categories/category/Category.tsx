import React, {Component} from "react";
import {CategoryModel} from "../../models/category.model";


const Category = (props: CategoryProps) => {


        return(
            <div>
                <p><img src={require('../../assets/images/'+props.name+'.jpg')} alt={props.name}/></p>
                <br/>
                <p>{props.name}</p>
            </div>
        )
}


export default Category;


interface CategoryProps {
    name:string;
}