export type Label = 'all' | 'hot' | 'hit' | 'new' | 'vegan'

export interface IStructure {
  calorie: number;
  carbohydrates: number;
  fat: number;
  protein: number;
  weight: number;
  ingredients: string[];
}

export interface IProduct {
  img: string;
  price: number;
  title: string;
  structure: IStructure;
  labels: Label[];
  id: string;
}

export interface ICategory {
  eng: string,
  rus: string
}


//! Для проверки, потом удалить
export const productTest: IProduct = {
  id: 'qwe',
  img: 'qwe',
  title: 'qwe',
  price: 123,
  labels: ["all"],
  structure: {
    calorie: 123,
    carbohydrates: 123,
    fat: 123,
    protein: 123,
    weight: 123,
    ingredients: ['qwe', 'qwe', 'qwe']
  }
}
