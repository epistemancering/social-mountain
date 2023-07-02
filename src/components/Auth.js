import axios from "axios"
import react, {useState} from 'react'
import AuthContext from "../store/authContext"
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
   const submitHandler = e => {
       e.preventDefault()
 
       console.log('submitHandler called')
       let endpoint
       if (register) {
        endpoint = "/register"
       } else {
        endpoint = "/login"
       }
       axios.post(endpoint, { "username": username, "password": password }).then(function(response) {
        console.log(response.data)
        authCtx.login(response.data.userId, response.data.token, response.data.exp)
       }).catch(function(error) {
        console.log(error)
        alert("Invalid credentials.")
       })
   }
   let authCtx = react.useContext(AuthContext)
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input placeholder = {"username"} onChange = {function(event) {
                setUsername(event.target.value)
               }}
                   className='form-input'/>
               <input placeholder = {"password"} type = {"password"} onChange = {function(event) {
                setPassword(event.target.value)
               }}
                   className='form-input'/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick = {function() {
            setRegister(!register)
           }}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth