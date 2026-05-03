import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle React component errors
 * Prevents white screen of death on component errors
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a1f] text-white">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-white/70 mb-6 max-w-md">
              {this.state.error?.message || 'An unexpected error occurred. Please try reloading the page.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#00f0ff] text-[#0a0a1f] rounded-full font-medium hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all duration-300"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
