export type Label = 'hot' | 'hit' | 'new' | 'vegan'
export type LabelExtented = 'all' | Label

export interface IStructure {
  calorie: number
  carbohydrates: number
  fat: number
  protein: number
  weight: number
  ingredients: string[]
}

export interface IProduct {
  img: string
  price: number
  title: string
  structure: IStructure
  labels: Label[]
  id: string
}

export interface ICategory {
  eng: string
  rus: string
}
