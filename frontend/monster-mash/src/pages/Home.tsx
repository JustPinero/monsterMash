import { HeroSection } from '../components/landing'
import { PageTransition } from '../components/shared'

export function Home() {
  return (
    <PageTransition>
      <HeroSection />
    </PageTransition>
  )
}
