import React from "react";

export interface RestaurantModel {
    id: number;       // question mark means optional
    name: string;
    address: string;
    phone:string;
    review_count:number;
    rating:number;
    latitude:number;
    longitude:number;
    transactions:string;
    price: string;
    image:string;
    city:string;
    zipcode:number;
    state:string;
    status:string;
    categories:any;
}