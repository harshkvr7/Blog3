import React,{ useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Single from './pages/Single';
import Write from './pages/Write';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {User} from './pages/User';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Navbar/>
      <Home />
      <Footer />
    </>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/post/:id",
    element: <>
      <Navbar/>
      <Single />
      <Footer />
    </>,
  },
  {
    path: "/write",
    element: <>
      <Navbar/>
      <Write />
      <Footer />
    </>,
  },
  {
    path: "/user",
    element: <>
      <Navbar/>
      <User />
      <Footer />
    </>,
  },
]);

function App() {
  return (
    <div className='app'>
      <div className="app-container">
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App;
