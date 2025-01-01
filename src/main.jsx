import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Router'
import { HelmetProvider } from 'react-helmet-async'
import AuthProviders from './Context/Providers/AuthProviders'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <HelmetProvider>
        <div className="max-w-screen-2xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </HelmetProvider>
    </AuthProviders>
  </StrictMode>,
)
