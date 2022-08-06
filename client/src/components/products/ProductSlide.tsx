import { FC } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { IProduct } from '../../models/product'

import Rotate from '../animation/Rotate'
import ProductDescription from './description/ProductDescription'

import { convertAlt } from '../../utils/converter'
import { Paths } from '../../routes/links'
import { useToogle } from '../../hooks/useToogle'
import { useMouseDebounce } from '../../hooks/useMouseDebounce'

import styles from './products.module.scss'

const emptyImg = '/picture/no_image.jpg'

interface Props extends Pick<IProduct, 'img' | 'labels' | 'structure' | 'id'> {
  width: number
  category: string
}

const ProductSlide: FC<Props> = ({
  img,
  labels,
  structure,
  width,
  id,
  category
}) => {
  const imgSrc = img || emptyImg

  const [isImage, showImage, hideImage] = useToogle(true)
  const [isDescription, showDescription, hideDescription] = useToogle(false)

  const { onMouseLeaveHandler, onMouseOverHandler } = useMouseDebounce(
    hideDescription,
    isDescription,
    2000
  )

  return (
    <div
      className={styles.product}
      style={{ width }}
      onMouseLeave={onMouseLeaveHandler}
      onMouseOver={onMouseOverHandler}>
      <div className={cn(styles.rowOne, styles.rowOne_slide)}>
        <Rotate
          isFirst={isImage}
          showFirstComponent={showImage}
          isSecond={isDescription}
          showSecondComponent={showDescription}
          renderFirstComponent={() => (
            <div className={styles.img}>
              <img src={imgSrc} alt={convertAlt(img)} draggable={false} />
              {isImage && (
                <>
                  <Link
                    className={styles.findPrompt}
                    to={`${Paths.menu}/${category}?id=${id}`}
                    onMouseDownCapture={(e) => e.stopPropagation()}>
                    Найти в меню!
                  </Link>
                  <button
                    className={styles.descriptionPrompt}
                    onClick={hideImage}
                    onMouseDownCapture={(e) => e.stopPropagation()}
                  />
                </>
              )}
            </div>
          )}
          renderSecondComponent={() => (
            <ProductDescription
              onHide={hideDescription}
              labels={labels}
              structure={structure}
            />
          )}
        />
      </div>
    </div>
  )
}

export default ProductSlide
