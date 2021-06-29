import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { useProductsContext } from '../context/products_context'
import GridView from './GridView'
import ListView from './ListView'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'

const ProductList = () => {
	const {filtered_products:products, grid_view} = useFilterContext()
	const {products_loading} = useProductsContext()
	console.log(products_loading)
	if(products_loading){
		return <Loading />
		}else if(products.length < 1){
		return <h5 style={{textTransform:'none'}}>Sorry, no products matched your search...</h5>
	
	}
	if(grid_view === false){
		return <ListView products={products} />
	}
	return <GridView products = {products}/>
}

export default ProductList
