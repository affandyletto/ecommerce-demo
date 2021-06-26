import React, { useContext, useEffect, useState, useReducer } from 'react'
import reducer from '../reducers/user_reducers'
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT
	}
	from '../actions'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'
import axios from 'axios'

const UserContext = React.createContext()

const userInfoStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('user')):[]

const initialState = {
	userLogin:{
		userInfo:userInfoStorage,
		loading:false
	}
}

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{...state}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
