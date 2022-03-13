import React from 'react'
import { useForm } from 'react-hook-form'

import Validate from '../Validate'

import Modal from '../../common/Modal'
import ProductForm from './ProductForm'

import sakeImg from '../../../images/food/sushi_sake.jpg'

const sake = {
  id: "c5e8f345",
  img: '',
  labels: ['new'],
  price: 420,
  structure: {
    calorie: 505,
    carbohydrates: 47,
    fat: 29,
    ingredients: ['угорь', 'авокадо', 'рис', 'сливочный сыр', 'водоросли нори', 'огурец', 'омлет тамаго', 'соус унаги', 'кунжут'],
    protein: 15,
    weight: 230,
  },
  title: "РОЛЛ С УГРЁМ И АВОКАДО"
}

const EditProductForm = ({ onHide }) => {

  const { formState: { errors }, handleSubmit, register } = useForm({
    defaultValues: sake
  })

  const onSubmit = (formData) => {
    console.log(formData)
  }


  return (
    <Modal onHide={onHide}>
      <ProductForm
        img={sakeImg}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        validate={Validate}
        errors={errors}
      />
    </Modal>
  )
}

export default EditProductForm