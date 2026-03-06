import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { Button } from './Button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl font-[Creepster] text-horror-red mb-4">
            Something escaped the crypt...
          </h2>
          <p className="text-horror-mist mb-6">
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try Again
            </Button>
            <a
              href="/"
              className="px-6 py-2 bg-horror-surface text-horror-bone border border-horror-red/20 rounded-lg hover:border-horror-red/50 transition-colors inline-flex items-center"
            >
              Go Home
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
