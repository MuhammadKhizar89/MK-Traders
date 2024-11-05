import Home from './Components/NavPaths/Home'
import Products from './pages/Products'
import Navbar from './Components/Layout/Navbar'
import Footer from './Components/Layout/Footer'
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
