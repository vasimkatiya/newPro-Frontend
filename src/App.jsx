import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './config/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Comments from './pages/comments.jsx'
import { Toaster } from "react-hot-toast";
import SinglePage from './pages/SinglePost.jsx'
import CreatePost from './pages/CreatePost.jsx'
import Profile from './pages/Profile.jsx'
import Search from './pages/Search.jsx'
import SearchProfile from './pages/SearchProfile.jsx'


const App = () => {
  return (
    <div className=''>
      <Toaster position='top center' />
      <Navbar />
      <Routes >
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/' element={
          <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />

      <Route path='/comments/:id' element={
        <ProtectedRoute>
            <Comments />
        </ProtectedRoute>
      } />

      <Route path='/post/:id' element={
        <ProtectedRoute>
        <SinglePage />
        </ProtectedRoute>
      } />

      <Route path='/post' element={
        <ProtectedRoute>
          <CreatePost />
        </ProtectedRoute>
      } />

      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path='/search' element={
        <ProtectedRoute>
          <Search />
        </ProtectedRoute>
      } />

      <Route path='/user/:id' element={
        <ProtectedRoute>
          <SearchProfile />
        </ProtectedRoute>
      } />

      </Routes>
    </div>
  )
}

export default App