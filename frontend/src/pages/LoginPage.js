import React,{useState, useEffect} from 'react'
import { Link,useHistory,useParams } from 'react-router-dom'
import "../assets/login.css"
import axios from 'axios'
import styled from 'styled-components'
import { faCheckSquare, faCoffee,faCheck } from '@fortawesome/free-solid-svg-icons'
import { FaFacebookF,FaGooglePlusG,FaLinkedinIn } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LoginPage() {
  let history = useHistory();
  const [toggle, setToggle] = useState('login')
  const [input, setInput] = useState({username:"",password:"",nameR:"",usernameR:"",passwordR:"",emailR:""})
  const [sent,setSent] = useState(false)
  const [emailSent, setEmailSent] = useState("")
  const Active=(x)=>{
    setToggle(x)
  }

  const handleChange=(event)=>{
    let value=event.target.value
    let typeOfInput = event.target.name
    setInput({...input,[typeOfInput]:value})
  }

  const handleLogin =(e)=>{
    e.preventDefault()

    const {username,password} = input
    const config = {
        headers:{
          'Content-type':'application/json'},
      }
    const {data} = axios.post(
      'http://127.0.0.1:8000/api/users/login/',
      {'username':username,'password':password},
      config
      ).then(
        (res)=>{
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          history.push("/")
          window.location.reload()  
        }        
      ).catch((err)=>{
        alert(err)      
      })

  }

  const handleRegister =(e)=>{
    e.preventDefault()
    const config = {
        headers:{
          'Content-type':'application/json'},
      }
    const {data} = axios.post(
      'http://127.0.0.1:8000/api/users/register/',
      {'username':input.usernameR,'password':input.passwordR,'name':input.nameR,'email':input.emailR},
      config
      ).then(
        (res)=>{
          setSent(true)
          setEmailSent(input.emailR)          
        }        
      ).catch((err)=>{
        alert(err)      
      })
  }
	return (
    <Wrapper>
      <body>
        <div className={toggle==="signup"?"container right-panel-active":"container"} id="container">
          <div className="form-container sign-up-container">
            <form action="#" onSubmit={handleRegister}>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social"><FaFacebookF/></a>
                <a href="#" className="social"><FaGooglePlusG /></a>
                <a href="#" className="social"><FaLinkedinIn /></a>
              </div>
              {sent? <div className="alert-box warning"><span>Success: </span>Email verification sent to {emailSent}, please check your email</div>:<span>or use your email for registration</span>}
                         
              <input name="nameR" onChange={handleChange} type="text" placeholder="Name" />
              <input name="usernameR" onChange={handleChange} type="text" placeholder="Username" />
              <input name="emailR" onChange={handleChange} type="email" placeholder="Email" />
              <input name="passwordR" onChange={handleChange} type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#" onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="social-container">
                <a href="#" className="social"><FaFacebookF/></a>
                <a href="#" className="social"><FaGooglePlusG /></a>
                <a href="#" className="social"><FaLinkedinIn /></a>
              </div>              
              <span>or use your account</span>
              <input name="username" placeholder="Username" onChange={handleChange}/>
              <input name="password" type="password" placeholder="Password" onChange={handleChange}/>
              <a href="#">Forgot your password?</a>
              <button>Login</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn" onClick={()=>{setToggle("login")}}>Login</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Register</h1>
                <p>Don't have an account yet ? please register</p>
                <button className="ghost" id="signUp" onClick={()=>{setToggle("signup")}}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <p>
            Created with <i className="fa fa-heart" /> by
            <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
            - Read how I created this and how you can join the challenge
            <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
          </p>
        </footer>
        </body>
      </Wrapper>
	)
}
const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}
.alert-box {
    color:#226231;
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
    background:#D4EDD9 url('images/warning.png') no-repeat 10px 50%;
    border:1px solid #226231;
}
body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
      0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 968px;
  max-width: 100%;
  min-height: 580px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container{
  transform: translateX(-100%);
}

.overlay {
  background: #FF416C;
  background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
  background: linear-gradient(to right, #FF4B2B, #FF416C);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
    transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}
`
export default LoginPage