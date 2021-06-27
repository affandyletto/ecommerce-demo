import React, { useEffect,useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios'
import styled from 'styled-components'

const EditModal=({id,product})=>{
	const userInfo= localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
  
	const [input, setInput] = useState({})
	const [file, setFile] = useState()
	useEffect(() => {
		if(product.images){
		 setInput({name:product.name,
		 description:product.description,
		 category:product.category,
		 price:product.price,
		 shipping:product.shipping,
		 featured:product.featured,
		 stock:product.stock,
		 brand:product.brand,	
		})	    	}
	  }, [id])
	
	const handleChange=(event)=>{
	    let value=event.target.value
	    let typeOfInput = event.target.name
	    console.log(typeOfInput)
	    setInput({...input,[typeOfInput]:value})
  	}

  	const handleSubmit=(e)=>{
  		e.preventDefault()    
  		const config = {
	        headers:{
	      		"Authorization" : "Bearer "+ userInfo.token},
	      }	
  		axios.put(
	      `/api/products/edit/${id}`,input,config
	      ).then(
	        (res)=>{
	          window.location.reload()
	        }        
	      ).catch((err)=>{
	        alert(err)      
	      })
  	}
  	const handleFileUpload =(e)=>{
  		const files = e.target.files[0];
  		setFile(files)
  	}
	return<Wrapper>
		<div>
    	<div className="modal fade" id="editProduct" role="dialog" aria-labelledby="editProduct" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{"width":"1000px", "margin-left":"-250px"}}>
            <form encType="multipart/form-data" onSubmit={handleSubmit} >
              <div className="modal-header">
                <h5 className="modal-title" id="skUploadLabel">Upload Products</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="position-relative form-group files">
                  <label >Name</label>
                  <input  name="name" type="text" value={input.name} onChange={handleChange} className="form-control" />
                  <label>Description</label>
                  <textarea  name="description" value={input.description} onChange={handleChange} className="form-control" />
                  <label>Category</label>
                  <input  name="category" type="text" value={input.category} onChange={handleChange} className="form-control" />
                  <label>Price</label>
                  <input  name="price" type="text" value={input.price} onChange={handleChange} className="form-control" />
                  <label>Shipping</label>
                  <input  name="shipping" type="text" value={input.shipping} onChange={handleChange} className="form-control" />
                  <label>Featured</label>
                  <input  name="featured" type="text" value={input.featured} onChange={handleChange} className="form-control" />
                  <label>Stock</label>
                  <input  name="stock" type="text" value={input.stock} onChange={handleChange} className="form-control" />
                  <label>Brand</label>
                  <input  name="brand" type="text" value={input.brand} onChange={handleChange} className="form-control" />
                  <br/> 
                  {/*
                  <label>Change image</label><br/>
                  <input type="text" value={input.image} className="form-control" disabled/>
                  <input type="file" name="file" onChange={handleFileUpload} className="form-control"/>
                */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                <button type="submit" className="btn btn-danger">Upload</button>
              </div>              
            </form>
          </div>
        </div>
      </div>
      </div>
	</Wrapper>
}
const Wrapper = styled.main`
	input{
		margin-bottom:20px;
	}
	textarea{
		margin-bottom:20px;
	}
`
export default EditModal