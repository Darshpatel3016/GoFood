import Home from './Screens/Home'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "bootsrap/dist/css/bootstrap.min.css"
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import { CartProvider } from './Components/ContexReducer';
import MyOrder from './Screens/MyOrder';




function App() {

  return (

    <CartProvider>
      <HashRouter>

        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myOrder' element={<MyOrder />} />
          </Routes>
        </div>

      </HashRouter>
    </CartProvider>
  )
}




export default App;