import React from 'react'
import cn from 'classnames'

import Input from '../fields/Input'
import Select from '../fields/Select'

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

const ProductForm = ({ onSubmit, register, errors, validate, img }) => {

  return (
    <div className={styles.wrapper__product}>
      <form
        className={cn(styles.form, styles.form__product)}
        onSubmit={onSubmit}
        autoComplete='off'>

        <div className={styles.column}>
          <h2 className={styles.title}>Описание продукта</h2>

          <Input
            className={styles.field}
            label={'Название: '}
            name={'title'}
            placeholder={'~Унаги роллы'}

            validate={validate.required()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Цена: '}
            name={'price'}
            type={'number'}
            placeholder={'~400'}

            validate={validate.positive()}
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
          <Input
            className={styles.field}
            label={'Фотография: '}
            name={'img'}
            type={'file'}

            validate={validate.required()}
            register={register}
            errors={errors}
          />

          {img &&
            <div className={styles.img}>
              <img src={img} alt='sake' />
            </div>
          }
        </div>

        <div className={styles.column}>
          <h2 className={styles.title}>Описание состава</h2>

          <Input
            className={styles.field}
            label={'Калории: '}
            name={'structure.calorie'}
            type={'number'}
            placeholder={'~500'}

            validate={validate.positive()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Углеводы: '}
            name={'structure.carbohydrates'}
            type={'number'}
            placeholder={'~50'}

            validate={validate.positive()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Жир: '}
            name={'structure.fat'}
            type={'number'}
            placeholder={'~50'}

            validate={validate.positive()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Протеин: '}
            name={'structure.protein'}
            type={'number'}
            placeholder={'~50'}

            validate={validate.positive()}
            register={register}
            errors={errors}
          />
          <Input
            className={styles.field}
            label={'Вес: '}
            name={'structure.weight'}
            type={'number'}
            placeholder={'~300'}

            validate={validate.positive()}
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

        <div className={styles.button}>
          <button>Подтвердить</button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm