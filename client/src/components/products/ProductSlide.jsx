import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import Rotate from '../animation/Rotate'
import ProductDescription from './description/ProductDescription'

import { convertAlt } from '../../utils/converter'
import { appRoutes } from '../../consts/links'
import { useToogle } from '../../hooks/useToogle'
import { useMouseDebounce } from '../../hooks/useMouseDebounce'

import styles from './products.module.scss'


const ProductSlide = ({ img, labels, structure, width, id, category }) => {

  const [isImage, showImage, hideImage] = useToogle(true)
  const [isDescription, showDescription, hideDescription] = useToogle(false)

  const { onMouseLeaveHandler, onMouseOverHandler } = useMouseDebounce(hideDescription, 2000)

  return (
    <div
      className={styles.product}
      style={width}
      onMouseLeave={onMouseLeaveHandler}
      onMouseOver={onMouseOverHandler}
    >

      <div className={cn(styles.rowOne, styles.rowOne_slide)}>
        <Rotate
          isFirst={isImage}
          showFirstComponent={showImage}
          isSecond={isDescription}
          showSecondComponent={showDescription}

          renderFirst={() => (
            <div className={styles.img}>
              <img src={img} alt={convertAlt(img)} draggable={false} />
              <Link className={styles.findPrompt} to={`${appRoutes.menu}/${category}?id=${id}`}>
                Найти в меню!
              </Link>
              <button className={styles.descriptionPrompt} onClick={hideImage} />
            </div>
          )}

          renderSecond={() => (
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