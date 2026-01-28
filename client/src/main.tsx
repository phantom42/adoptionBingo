import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react';
import './index.css'
import './fireworks.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error('missing Clerk publishable key');
}

createRoot(document.getElementById('root')).render(
  /*<StrictMode>*/
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

    <App />
	<Analytics />

  </ClerkProvider>
  /*</StrictMode>,*/
)
