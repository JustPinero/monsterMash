import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAudioStore, useAmbientAudio } from '../../hooks/useAudio'

export function Header() {
  const { muted, toggleMute } = useAudioStore()
  const { start, stop } = useAmbientAudio()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleAudio = () => {
    if (muted) {
      start()
    } else {
      stop()
    }
    toggleMute()
  }

  return (
    <header className="bg-horror-shadow/80 backdrop-blur-sm border-b border-horror-red/20 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="text-3xl font-[Creepster] text-horror-red hover:text-horror-cyan transition-colors">
          Monster Mash
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-horror-bone hover:text-horror-cyan transition-colors cursor-pointer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/browse" className="text-horror-bone hover:text-horror-cyan transition-colors">
            Browse
          </Link>
          <Link to="/date" className="text-horror-bone hover:text-horror-red transition-colors">
            Date Night
          </Link>
          <Link to="/history" className="text-horror-bone hover:text-horror-mist transition-colors">
            History
          </Link>
          <button
            onClick={handleToggleAudio}
            className="text-horror-mist hover:text-horror-cyan transition-colors text-lg cursor-pointer"
            aria-label={muted ? 'Unmute audio' : 'Mute audio'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-horror-shadow/95 backdrop-blur-sm border-b border-horror-red/20 sm:hidden">
            <div className="flex flex-col px-4 py-3 gap-3">
              <Link to="/browse" onClick={() => setMenuOpen(false)} className="text-horror-bone hover:text-horror-cyan transition-colors py-2">
                Browse
              </Link>
              <Link to="/date" onClick={() => setMenuOpen(false)} className="text-horror-bone hover:text-horror-red transition-colors py-2">
                Date Night
              </Link>
              <Link to="/history" onClick={() => setMenuOpen(false)} className="text-horror-bone hover:text-horror-mist transition-colors py-2">
                History
              </Link>
              <button
                onClick={() => { handleToggleAudio(); setMenuOpen(false) }}
                className="text-horror-mist hover:text-horror-cyan transition-colors text-lg cursor-pointer text-left py-2"
                aria-label={muted ? 'Unmute audio' : 'Mute audio'}
              >
                {muted ? '🔇 Unmute' : '🔊 Mute'}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
