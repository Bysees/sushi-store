import cheesy from '../../images/food/cheesy_baked.jpg'
import spicy from '../../images/food/spicy_baked.jpg'
import chukka from '../../images/food/sushi_chukka1.jpg'
import ebi from '../../images/food/sushi_ebi.jpg'
import sake from '../../images/food/sushi_sake.jpg'
import salmo from '../../images/food/sushi_spicy_salmon.jpg'
import shrimp from '../../images/food/sushi_spicy_shrimp1.jpg'
import unagi from '../../images/food/sushi_unagi.jpg'
import List from '../common/List'

export const productItems = [
  cheesy, spicy, chukka, ebi, sake, salmo, shrimp, unagi
]

const Products = ({ renderProduct }) => {

  return <List items={productItems} renderItem={renderProduct} />
}

export default Products