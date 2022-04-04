import React, { useEffect, useRef } from 'react'
import cn from 'classnames'

import Rotate from '../animation/Rotate'
import ProductDescription from './description/ProductDescription'

import { useToogle } from '../../hooks/useToogle'

import styles from './products.module.scss'
import { Link } from 'react-router-dom'


const ProductSlide = ({ img, labels, structure, width, id, type }) => {

  const [isImage, showImage, hideImage] = useToogle(true)
  const [isDescription, showDescription, hideDescription] = useToogle(false)

  const timeoutId = useRef(null)

  const onMouseLeaveHandler = () => {
    timeoutId.current = setTimeout(hideDescription, 2000)
  }

  const onMouseOverHandler = () => {
    clearTimeout(timeoutId.current)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutId.current)
  })

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
              <img src={img} alt="sushi" draggable={false} />
              <Link className={styles.findPrompt} to={`menu/${type}?id=${id}`}>
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