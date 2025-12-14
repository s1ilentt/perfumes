import { IProduct } from "./product.interface";

export interface ICartQueryResult extends IProduct{
	quantity: number
}