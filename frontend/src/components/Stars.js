import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({review}) => {
  var stars=0
  
  review.map((x)=>{
    stars=stars+x.rating
  })
  stars = stars/review.length

  return <Wrapper>
    <div className="stars">
      <span>
        {stars >= 1 ?<BsStarFill/>: stars >=0.5 ? <BsStarHalf />:<BsStar/>}<span>
        {stars >= 2 ?<BsStarFill/>: stars >=1.5 ? <BsStarHalf />:<BsStar/>}</span><span>
        {stars >= 3 ?<BsStarFill/>: stars >=2.5 ? <BsStarHalf />:<BsStar/>}</span><span>
        {stars >= 4 ?<BsStarFill/>: stars >=3.5 ? <BsStarHalf />:<BsStar/>}</span><span>
        {stars >= 5 ?<BsStarFill/>: stars >=4.5 ? <BsStarHalf />:<BsStar/>}</span>
      </span>
    </div>
    <p className="reviews">{review.length} (customer reviews)</p>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
