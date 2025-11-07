import { ICategory } from "./category.interface"

export interface IProduct {
	id: number
	name: string
	description: string
	photo: string
	price: number
	mark: number
	category: ICategory
}