import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Dashboard } from './pages/Dashboard'



const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element= {<Home/>} />
      <Route path='/dashboard' element= {<Dashboard/>} />
      <Route path='/login'  element= {<Login/>} />
      <Route path='/signup'  element= {<SignUp/>} />
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div >
      {routes}
    </div>
  )
}

export default App

