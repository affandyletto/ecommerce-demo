import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import ReactPaginate from "react-paginate"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee,faCheck } from '@fortawesome/free-solid-svg-icons'
import Modal from '../components/Modal'
import EditModal from '../components/EditModal'
import AddModal from '../components/AddModal'
import Header from "../utils/Header"
import axios from 'axios'

const ManagePage = () => {
  const {products} = useProductsContext()
  const [pageNumber, setPageNumber]=useState(0)
  const [productsPerPage, setProductsPerPage]=useState(5)
  const [modalId,setModalId] = useState("")
  const [editProduct, setEditProduct] = useState({})
  const [search,setSearch] = useState("")
  const pagesVisited = pageNumber * productsPerPage
  const userInfo= localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
  
  const EditProduct=(id)=>{
    setEditProduct(products.find((produk)=>produk.id===id))
    setModalId(id)
  }

  const handleDelete=(id)=>{
    axios.delete(`http://127.0.0.1:8000/api/products/delete/${id}`,
      {headers: {"Authorization" : "Bearer "+ userInfo.token}})
      .then(()=>{
        window.location.reload()
    })
  }
  const handleChange=(event)=>{
    let value=event.target.value
    setProductsPerPage(value)
  }
  const handleSearch=(event)=>{
    let value=event.target.value
    setSearch(value)
  }
  const prodaks = products.filter(product=>product.name.includes(search))
  const displayProducts = prodaks
  .slice(pagesVisited, pagesVisited + productsPerPage)
  .map((product,index)=>{
    return(
        <tbody>
                <tr>
                  <td>{index+1}</td>
                  <td>{product.name}</td>
                  <td>{product.description && product.description.length > 70 ? product.description.substring(0,70) : product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.shipping&&<FontAwesomeIcon icon={faCheckSquare}/>}</td>
                  <td>{product.featured&&<FontAwesomeIcon icon={faCheckSquare}/>}</td>
                  <td>{product.stock}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button onClick={()=>{EditProduct(product.id)}} className="edit" title="Edit" data-toggle="tooltip" data-toggle="modal" data-target="#editProduct"><i className="material-icons"></i></button>
                    <button onClick={()=>{handleDelete(product.id)}} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons"></i></button>
                  </td>
                </tr>                      
        </tbody>
      )
  })
  const pageCount = Math.ceil(products.length / productsPerPage)
  const changePage = ({selected}) =>{
    setPageNumber(selected)
  }
  return <main>
    <Wrapper>
      <body>
      <Header />            
      <div className="container-xl">        
        <Modal />
        <EditModal id={modalId} product={editProduct}/> 
        <AddModal />
        <div className="table-responsive">
          <button type="button" className="btn btn-alternate" data-toggle="modal" data-target="#skUploadSK">
            Upload CSV
          </button>
          {/* 
          <button type="button" className="btn btn-alternate" data-toggle="modal" data-target="#addProduct">
            Add Product
          </button>
          */}
          <div className="table-wrapper">     
            <div className="table-title">
              <div className="row">
                <div className="col-sm-4">
                  <div className="show-entries">
                    <span>Show</span>
                    <select onChange={handleChange}>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                    <span>entries</span>
                  </div>            
                </div>
                <div className="col-sm-4">
                  <h2 className="text-center">Product <b>Details</b></h2>
                </div>
                <div className="col-sm-4">
                  <div className="search-box">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="material-icons"></i></span>
                      <input type="text" onChange={handleSearch} className="form-control" placeholder="Search…" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name <i className="fa fa-sort" /></th>
                  <th>Description</th>
                  <th>Price <i className="fa fa-sort" /></th>
                  <th>Category</th>
                  <th>Free Shipping <i className="fa fa-sort" /></th>
                  <th>Featured</th>
                  <th>Stock</th>
                  <th>Brand</th>
                  <th>Action</th>
                </tr>
              </thead>
              {displayProducts}
            </table>
            <div className="clearfix">
              <div className="hint-text">Showing <b>{products.length>productsPerPage?productsPerPage:products.length}</b> out of <b>{products.length}</b> entries</div>
                <ReactPaginate 
                  previousLabel = {"Previous"}
                  nextLabel = {"Next"}
                  onPageChange = {changePage}
                  containerClassName={"pagination"}
                  pageCount = {pageCount}
                  activeClassName={"paginationActive"}
                  disabledClassName={"paginationDisabled"}
                  nextLinkClassName={"nextBttn"}
                  previousLinkClassName={"previousBttn"}
                />
            </div>
          </div>
        </div>        
      </div>
    </body>
    </Wrapper>
  </main>
}

const Wrapper = styled.div`
  body {
    color: #566787;
    font-family: 'Roboto', sans-serif;
}
.btn{
  background-color:#AB7A5F;
}
.btn:hover{
  background-color:#C5A491;
}
.table-responsive {
    margin: 30px 0;
}
.table-wrapper {
    min-width: 1000px;
    background: #fff;
    padding: 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {
    font-size: 15px;
    padding-bottom: 10px;
    margin: 0 0 10px;
    min-height: 45px;
}
.table-title h2 {
    margin: 5px 0 0;
    font-size: 24px;
}
.table-title select {
    border-color: #ddd;
    border-width: 2px 2px 1px 2px;
    padding: 3px 10px 3px 5px;
    margin: 0 5px;
}
.table-title .show-entries {
    margin-top: 7px;
}
.search-box {
    position: relative;
    float: right;
}
.search-box .input-group {
    min-width: 200px;
    position: absolute;
    right: 0;
}
.search-box .input-group-addon, .search-box input {
    border-color: #ddd;
    border-radius: 0;
}
.search-box .input-group-addon {
    border: none;
    border: none;
    background: transparent;
    position: absolute;
    z-index: 9;
}
.search-box input {
    height: 34px;
    padding-left: 28px;   
    box-shadow: none !important;
    border-width: 0 0 1px 0;
}
.search-box input:focus {
    border-color: #3FBAE4;
}
.search-box i {
    color: #a0a5b1;
    font-size: 19px;
    position: relative;
    top: 8px;
}
table.table tr th, table.table tr td {
    border-color: #e9e9e9;
}
table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}
table.table td:last-child {
    width: 130px;
}
table.table td a {
    color: #a0a5b1;
    display: inline-block;
    margin: 0 5px;
}
table.table td a.view {
    color: #03A9F4;
}
table.table td button.edit {
    color: #FFC107;
    border:none;
    background:none;
    margin:10px;
}
table.table td button.delete {
    color: #E34724;
    border:none;
    background:none;
}
table.table td i {
    font-size: 19px;
}    
.pagination {
    float: right;
    margin: 0 0 5px;
}
.pagination li a {
    border: none;
    font-size: 13px;
    min-width: 30px;
    min-height: 30px;
    padding: 0 10px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 30px !important;
    text-align: center;
}
.pagination li a:hover {
    color: #666;
} 
.paginationActive {
    background: #03A9F4;
}
.pagination li.active a:hover {        
    background: #0397d6;
}
.paginationDisabled {
    color: #ccc;
}
.pagination li i {
    font-size: 16px;
    padding-top: 6px
}
.hint-text {
    float: left;
    margin-top: 10px;
    font-size: 13px;
}
.btn-alternate{
  margin-top:20px;
  margin-left:490px;
}

`

export default ManagePage;