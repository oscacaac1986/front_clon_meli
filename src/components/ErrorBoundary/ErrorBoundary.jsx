import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import React from 'react';
import { errorHandler } from '../../utils/errorHandler';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Actualizar el state para mostrar la UI de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Manejar el error
    const appError = errorHandler.handleComponentError(error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      errorId: appError.timestamp
    });

    // Log del error
    console.error('💥 Error Boundary caught an error:', error);
    console.error('📍 Error Info:', errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // UI de error personalizada
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Oops! Algo salió mal
            </h1>
            
            <p className="text-gray-600 mb-6">
              Ha ocurrido un error inesperado en la aplicación. 
              Nuestro equipo ha sido notificado.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-red-800 mb-2">Error Details (Dev Mode):</h3>
                <p className="text-sm text-red-700 mb-2">
                  <strong>Error:</strong> {this.state.error?.message}
                </p>
                <p className="text-sm text-red-700 mb-2">
                  <strong>ID:</strong> {this.state.errorId}
                </p>
                {this.state.errorInfo && (
                  <details className="text-xs text-red-600">
                    <summary className="cursor-pointer font-medium">Stack Trace</summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Intentar nuevamente</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Ir al inicio</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Error ID: {this.state.errorId}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;