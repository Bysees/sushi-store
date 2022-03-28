import React, { useEffect, useRef } from 'react'
import cn from 'classnames'

import Input from '../fields/Input'
import Select from '../fields/Select'
import PreviewFileInput from '../fields/PreviewFileInput'

import styles from '../form.module.scss'

const ingredients = [
  { value: 'угорь' },
  { value: 'авокадо' },
  { value: 'рис' },
  { value: 'сливочный сыр' },
  { value: 'водоросли нори' },
  { value: 'огурец' },
  { value: 'омлет' },
  { value: 'тамаго' },
  { value: 'соус унаги' },
  { value: 'кунжут' }
]

const labels = [
  { value: 'new', title: 'Новинка' },
  { value: 'hit', title: 'Хит' },
  { value: 'hot', title: 'Острое' },
  { value: 'vegan', title: 'Веган' },
]

const ProductForm = ({
  onSubmit, register, errors, validate,
  successfulMessage, setSuccessfulMessage, serverError,
  img, setPreviewImg, setImgFile,
  isLoading, onHide }) => {

  const formRef = useRef(null)

  useEffect(() => {
    const removeMessage = (e) => {
      const tagNames = ['INPUT', 'BUTTON', 'OPTION']
      if (tagNames.includes(e.target.tagName)) {
        setSuccessfulMessage('')
      }
    }

    const formElement = formRef.current
    formElement.addEventListener('click', removeMessage)
    return () => {
      formElement.removeEventListener('click', removeMessage)
    }
  }, [setSuccessfulMessage])

  return (
    <div className={styles.wrapper__product}>
      <form
        className={cn(styles.form, styles.form__product)}
        ref={formRef}
        onSubmit={onSubmit}
        autoComplete='off'>

        <button type='button' className={styles.exit} onClick={onHide}>
          <span>&times;</span>
        </button>

        <div className={styles.column}>
          <h2 className={styles.title}>Описание продукта</h2>

          <Input
            className={styles.field}
            label={'Название: '}
            name={'title'}
            placeholder={'~Унаги роллы'}

            validate={validate.productTitle()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Цена: '}
            name={'price'}
            type={'number'}
            placeholder={'~400'}

            validate={validate.number()}
            register={register}
            errors={errors}
          />
          <Select
            className={styles.field}
            label={'Лейблы: '}
            name={'labels'}
            values={labels}
            multiple
            size={3}

            register={register}
          />
          <PreviewFileInput
            className={styles.field__file}
            label={'Поменять изображение'}
            setPreviewImg={setPreviewImg}
            setImgFile={setImgFile}
            img={img}
            accept={'.png,.jpg,.jpeg'}
          />
        </div>

        <div className={styles.column}>
          <h2 className={styles.title}>Описание состава</h2>

          <Input
            className={styles.field}
            label={'Калории: '}
            name={'structure.calorie'}
            type={'number'}
            placeholder={'~500'}

            validate={validate.number()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Углеводы: '}
            name={'structure.carbohydrates'}
            type={'number'}
            placeholder={'~50'}

            validate={validate.number()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Жир: '}
            name={'structure.fat'}
            type={'number'}
            placeholder={'~50'}

            validate={validate.number()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Протеин: '}
            name={'structure.protein'}
            type={'number'}
            placeholder={'~50'}

            validate={validate.number()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Вес: '}
            name={'structure.weight'}
            type={'number'}
            placeholder={'~300'}

            validate={validate.number()}
            register={register}
            errors={errors}
          />
          <Select
            className={styles.field}
            label={'Ингридиенты: '}
            name={'structure.ingredients'}
            values={ingredients}
            multiple
            size={3}

            register={register}
          />
        </div>

        {serverError &&
          <div className={styles.serverError}>{serverError}</div>}

        {successfulMessage &&
          <div className={styles.success}>{successfulMessage}</div>}

        <div className={styles.button}>
          <button disabled={isLoading}>Подтвердить</button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm