import Home from './components_/Hero'
import Products from './pages/Products'
import Navbar from './components_/Navbar'
import Footer from './components_/Footer'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <>
      <Home/>
      <Navbar/>
      <Outlet/>
      <Footer/>
 </>
  )
}
export default App
