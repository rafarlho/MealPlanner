export enum ProductType {
    Carbs,Protein
}

export interface Product {
    name:string
    ingredients?:string[]
    type:ProductType
    id?:string
}