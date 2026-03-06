import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/layout'
import { LoadingSpinner } from '../components/shared'
import { Home } from '../pages/Home'

const Browse = lazy(() => import('../pages/Browse').then((m) => ({ default: m.Browse })))
const MonsterProfile = lazy(() => import('../pages/MonsterProfile').then((m) => ({ default: m.MonsterProfile })))
const DatePage = lazy(() => import('../pages/DatePage').then((m) => ({ default: m.DatePage })))
const NotFound = lazy(() => import('../pages/NotFound').then((m) => ({ default: m.NotFound })))
const History = lazy(() => import('../pages/History').then((m) => ({ default: m.History })))

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/browse', element: <SuspenseWrapper><Browse /></SuspenseWrapper> },
      { path: '/monster/:id', element: <SuspenseWrapper><MonsterProfile /></SuspenseWrapper> },
      { path: '/date', element: <SuspenseWrapper><DatePage /></SuspenseWrapper> },
      { path: '/history', element: <SuspenseWrapper><History /></SuspenseWrapper> },
      { path: '*', element: <SuspenseWrapper><NotFound /></SuspenseWrapper> },
    ],
  },
])
