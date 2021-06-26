import React from 'react'
import styled from 'styled-components'
import './App.css';
import {Navbar, Sidebar, Footer} from './components'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee,faCheck } from '@fortawesome/free-solid-svg-icons'

import {Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute,  
} from './pages'
import ManagePage from './pages/ManagePage'
import LoginPage from './pages/LoginPage'
import MyProfilePage from './pages/MyProfilePage'
library.add(faCheck, faCheckSquare, faCoffee)

function App() {
  const userInfo= localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
  
  return (
    <Router>      
      <Navbar/>
      <Sidebar/>
      
      <Switch>
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route exact path="/cart">
          <Cart/>
        </Route>
        <Route exact path="/products">
          <Products/>
        </Route>
        <Route exact path="/api/products/:id" children={ <SingleProduct/> }>
          <SingleProduct/>
        </Route>
        <Route exact path="/checkout">
          <Checkout/>
        </Route>
        <Route exact path="/logout">
        </Route>
        {userInfo&&userInfo.username==="super"&&
        <Route exact path="/manage_products">
          <ManagePage/>
        </Route>
        }
        <Route path="*">
          <Error/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
    
    
  );
}

export default App;
