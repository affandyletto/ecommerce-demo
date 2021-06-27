import React, { useEffect,useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import axios from 'axios'

const SingleProductPage = () => {
  const {id} = useParams()
  const [trigger,setTrigger]=useState(false)
  const history = useHistory()
  const userInfo= localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
  const [input, setInput] = useState({rating:1, comment:""}) 
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct
  } = useProductsContext()

  const handleChange=(event)=>{
    let value=event.target.value
    let typeOfInput = event.target.name
    setInput({...input,[typeOfInput]:value})
  }

  const config = {
        headers:{
          'Content-type':'application/json'},
      }
  const writeReview = (e) =>{
    e.preventDefault()
    
    axios.post(
      `http://letto-ecommerce.herokuapp.com/api/products/review/${id}`,
      {'rating':input.rating,'comment':input.comment}
      ,{headers: {"Authorization" : "Bearer "+ userInfo.token}}
      ).then(
        (res)=>{
          window.location.reload()
        }        
      ).catch((err)=>{
        alert(err)      
      })
  }
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
  }, [id])

  if(loading){
    return <Loading />
  }
  if(error){
    return <Error/>
  }
  const {name, price, description, stock, stars, id:sku, brand, images,color,review} = product
  
  return <Wrapper>
    <PageHero title={name} product/>    
    <div className="section section-center page">
      <Link to="/products" className='btn'>
        back to products
      </Link>
      <div className="product-center">
        {images&&<><ProductImages images={images}/></>}
        <section className="content">
          {review&&<><Stars review={review}/> </>  }                
          <h5 className="price">{formatPrice(price)}</h5>
          <p className='desc'>{description}</p>
          <p className="info">
            <span>SKU : </span>
            {sku}
          </p>
          <p className="info">
            <span>Available : </span>
            {stock > 0 ? 'In stock':'Out of stock'}
          </p>
          <p className="info">
            <span>Brand : </span>
            {brand}
          </p>
          <hr/>
          {stock > 0 && <AddToCart product={product}/>}
        </section>
      </div>
      <h3 className="topRev">Reviews</h3>

      {review&&review.map((x)=>{
        return(
          <div className="reviews">
            {x.rating >= 1 ?<BsStarFill/>: x.rating >=0.5 ? <BsStarHalf />:<BsStar/>}<span>
            {x.rating >= 2 ?<BsStarFill/>: x.rating >=1.5 ? <BsStarHalf />:<BsStar/>}</span><span>
            {x.rating >= 3 ?<BsStarFill/>: x.rating >=2.5 ? <BsStarHalf />:<BsStar/>}</span><span>
            {x.rating >= 4 ?<BsStarFill/>: x.rating >=3.5 ? <BsStarHalf />:<BsStar/>}</span><span>
            {x.rating >= 5 ?<BsStarFill/>: x.rating >=4.5 ? <BsStarHalf />:<BsStar/>}</span>

            <p style={{"margin-top":"15px"}}>{x.name}</p>
            <p style={{"margin-top":"-20px"}}>{x.created}</p>
            <p >{x.comment}</p>
            <hr style={{"margin-bottom":"30px"}}/>
          </div>
          )
        })}
      
      <h3>Write A Review</h3>
      {userInfo?<>
      <form onSubmit={writeReview}>
        <label htmlFor="rating">Rating</label>
        <br/>
        <select value={input.rating} onChange={handleChange} id="rating" name="rating" className="select" style={{"margin-bottom":"20px"}}> 
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very Good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fairy</option>
          <option value="1">1 - Poor</option>
        </select>
        <br/>
        <label htmlFor="review">Review</label>
        <br/>
        <textarea value={input.comment} onChange={handleChange} name="comment" rows="4" style={{"margin-bottom":"20px"}}/>
        <br/>
        <button type="submit" className="btn" value="Update">Simpan</button>
      </form>
       </>:<div className="alert-box warning"><span>warning: </span>Please login to write a review</div>
      }
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .alert-box {
    color:#555;
    border-radius:10px;
    font-family:Tahoma,Geneva,Arial,sans-serif;font-size:11px;
    padding:10px 10px 10px 36px;
    margin:10px;
}
  .alert-box span {
    font-weight:bold;
    text-transform:uppercase;
}
  .warning {
    background:#fff8c4 url('images/warning.png') no-repeat 10px 50%;
    border:1px solid #f2c779;
}
  .topRev{
    margin-bottom:40px;
  }
  label{
    margin-bottom:60px;
  }
  textarea{
    width:50%;
    font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
  font-size: 18px;
  }
  .select{
    position: relative;
  width: 50%;
  margin: 0 auto;
  font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
  font-size: 18px;
  }


  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
