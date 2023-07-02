import react from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AuthContext from "./store/authContext"
import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import Profile from './components/Profile'

const App = () => {
  let authCtx = react.useContext(AuthContext)
  let auth
  let form
  let profile
  if (authCtx.token) {
    auth = <Navigate to = {"/"} />
    form = <Form />
    profile = <Profile />
  } else {
    auth = <Auth />
    form = <Navigate to = {"/auth"} />
    profile = <Navigate to = {"/auth"} />
  }
  return (
    <div className='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={auth}/>
        <Route path='/form' element={form}/>
        <Route path='/profile' element={profile}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  )
}

export default App
