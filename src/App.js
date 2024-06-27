import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './screen/Home';
import Login from './screen/Login';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Signup from './screen/Signup.js';
import CartProvider from './components/ContextReducer.js';
import MyOrder from './screen/MyOrder.js';

function App() {
  return (<>
    <Router>
      <div>
        <CartProvider>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/myOrder' element={<MyOrder />} />
        </Routes>

        </CartProvider>
        </div>
    </Router>
    </>
  );
}

export default App;
