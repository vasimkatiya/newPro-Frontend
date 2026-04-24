import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/auth.context.jsx'
import { HomeContextProvider } from './context/hoem.context.jsx'
import { CommentContextProvider } from './context/comment.context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContextProvider>
  <HomeContextProvider>
  <CommentContextProvider>
    <App />
  </CommentContextProvider>
  </HomeContextProvider>
  </AuthContextProvider>
  </BrowserRouter>
)
