import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../shared'

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/SplashPage.jpg)' }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-horror-bg/70 via-horror-bg/50 to-horror-bg" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <motion.h1
          className="text-6xl md:text-8xl font-[Creepster] text-horror-red mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Monster Mash
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-horror-bone mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Where every monster finds their match
        </motion.p>

        <motion.p
          className="text-horror-mist mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Browse iconic movie monsters. Pick two. Watch the sparks fly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Button
            variant="primary"
            className="text-lg px-8 py-4"
            onClick={() => navigate('/browse')}
          >
            Start Swiping
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
