import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { LibraryProvider } from './context/LibraryContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CoursesProvider } from './context/CoursesContext.jsx'
import { EventsProvider } from './context/EventsContext.jsx'
import { ProgramsProvider } from './context/ProgramsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ProgramsProvider>
          <CoursesProvider>
          <LibraryProvider>
            <EventsProvider>
                <App />
            </EventsProvider>
          </LibraryProvider>
        </CoursesProvider>
        </ProgramsProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
