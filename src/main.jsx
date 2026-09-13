import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
import { shadesOfPurple } from '@clerk/themes'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPublishableKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
     publishableKey={clerkPublishableKey}
     appearance={{
      baseTheme: shadesOfPurple,
     }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)