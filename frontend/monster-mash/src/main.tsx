import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { preResolveAllImages } from './services/imageResolver'
import { monsters } from './data/monsters'

// Pre-resolve TMDB images in background on app load
preResolveAllImages(monsters)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
