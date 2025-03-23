import Layout from './Layout'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/main/Home'
import About from './pages/main/About'
import Contact from './pages/main/Contact'
import Login from './pages/profile/Login'
import Register from './pages/profile/Register'
import User from './pages/profile/User'
import Main from './component/body/Main'
import Details from './component/body/Details'
import PurchaseHistory from './pages/profile/History'
import { useAuth } from './context/Auth'
import './App.css'


function App() {
  const { user } = useAuth()

  return (
    <>
    <Layout>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />}/>
          <Route path="/userpage" element={user ? <User /> : <Navigate to="/login" replace />} />
          <Route path='/product' element={<Main />} />
            <Route path='/product/:id' element={<Details />} />
          <Route path='/history' element={<PurchaseHistory />} />
        </Routes>
    </Layout>
    </>
  )
}

export default App
