import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { LibraryProvider } from './context/LibraryContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CoursesProvider } from './context/CoursesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CoursesProvider>
          <LibraryProvider>
            <App />
          </LibraryProvider>
        </CoursesProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
