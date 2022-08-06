import { Dispatch, FC, SetStateAction } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import cn from 'classnames'

import { IProduct } from '../../../models/product'

import Input from '../fields/Input'
import Select from '../fields/Select'
import PreviewFileInput from '../fields/PreviewFileInput'

import { ingredients, labels } from './defaultValues'

import styles from '../form.module.scss'
import { Validate } from '../helper/validate'

interface Props {
  onSubmit: () => void
  register: UseFormRegister<IProduct>
  errors: FieldErrors<IProduct>
  serverError: string
  clearNotifications: () => void
  previewImg: string
  setPreviewImg: Dispatch<SetStateAction<string>>
  setImgFile: Dispatch<SetStateAction<File | null>>
  isLoading: boolean
  onHide: () => void
}

const ProductForm: FC<Props> = ({
  onSubmit,
  register,
  errors,
  serverError,
  clearNotifications,
  previewImg,
  setPreviewImg,
  setImgFile,
  isLoading,
  onHide
}) => {
  return (
    <div className={styles.wrapper__product}>
      <form
        className={cn(styles.form, styles.form__product)}
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
            placeholder={'~Унаги роллы'}
            onFocus={clearNotifications}
            register={register('title', Validate.productTitle())}
            error={errors.title}
          />

          <Input
            className={styles.field}
            label={'Цена: '}
            type={'number'}
            placeholder={'~400'}
            onFocus={clearNotifications}
            register={register('price', Validate.number())}
            error={errors.price}
          />

          <Select
            className={styles.field}
            label={'Лейблы: '}
            onFocus={clearNotifications}
            values={labels}
            multiple
            size={3}
            register={register('labels')}
          />

          <PreviewFileInput
            className={styles.field__file}
            label={'Поменять изображение'}
            setPreviewImg={setPreviewImg}
            onFocus={clearNotifications}
            setImgFile={setImgFile}
            previewImg={previewImg}
            accept={'.png,.jpg,.jpeg'}
          />
        </div>

        <div className={styles.column}>
          <h2 className={styles.title}>Описание состава</h2>

          <Input
            className={styles.field}
            label={'Калории: '}
            type={'number'}
            placeholder={'~500'}
            onFocus={clearNotifications}
            register={register('structure.calorie', Validate.number())}
            error={errors.structure?.calorie}
          />

          <Input
            className={styles.field}
            label={'Углеводы: '}
            type={'number'}
            placeholder={'~50'}
            onFocus={clearNotifications}
            register={register('structure.carbohydrates', Validate.number())}
            error={errors.structure?.calorie}
          />

          <Input
            className={styles.field}
            label={'Жир: '}
            type={'number'}
            placeholder={'~50'}
            onFocus={clearNotifications}
            register={register('structure.fat', Validate.number())}
            error={errors.structure?.fat}
          />

          <Input
            className={styles.field}
            label={'Протеин: '}
            type={'number'}
            placeholder={'~50'}
            onFocus={clearNotifications}
            register={register('structure.protein', Validate.number())}
            error={errors.structure?.protein}
          />

          <Input
            className={styles.field}
            label={'Вес: '}
            type={'number'}
            placeholder={'~300'}
            onFocus={clearNotifications}
            register={register('structure.weight', Validate.number())}
            error={errors.structure?.weight}
          />

          <Select
            className={styles.field}
            label={'Ингридиенты: '}
            onFocus={clearNotifications}
            values={ingredients}
            multiple
            size={5}
            register={register('structure.ingredients')}
          />
        </div>

        {serverError && <div className={styles.serverError}>{serverError}</div>}

        <div className={styles.button}>
          <button disabled={isLoading}>Подтвердить</button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
