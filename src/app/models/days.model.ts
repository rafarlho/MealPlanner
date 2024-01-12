import { Product } from "./product.model"

export interface DayModel {
    id?:string
    name:string
    step:number
    lunch:Product[]
    dinner:Product[]
    day:number
}