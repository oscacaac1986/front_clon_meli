/**
 * Utilidades para manejo de errores en el frontend
 */

export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', details = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

export class NetworkError extends AppError {
  constructor(message, status = null) {
    super(message, 'NETWORK_ERROR');
    this.status = status;
  }
}

export class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, 'VALIDATION_ERROR');
    this.field = field;
  }
}

export const errorHandler = {
  /**
   * Maneja errores de la API
   */
  handleApiError: (error) => {
    console.error('🔴 API Error:', error);
    
    if (error.response) {
      // Error de respuesta HTTP
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return new ValidationError(
            data?.error?.message || 'Datos inválidos',
            data?.error?.field
          );
        case 401:
          return new AppError('No autorizado', 'UNAUTHORIZED');
        case 403:
          return new AppError('Acceso prohibido', 'FORBIDDEN');
        case 404:
          return new AppError('Recurso no encontrado', 'NOT_FOUND');
        case 500:
          return new AppError('Error interno del servidor', 'SERVER_ERROR');
        default:
          return new NetworkError(`Error HTTP ${status}`, status);
      }
    } else if (error.request) {
      // Error de red
      return new NetworkError('No se pudo conectar al servidor');
    } else {
      // Error de configuración
      return new AppError(error.message || 'Error desconocido');
    }
  },

  /**
   * Maneja errores de componentes React
   */
  handleComponentError: (error, errorInfo) => {
    console.error('🔴 Component Error:', error);
    console.error('🔴 Error Info:', errorInfo);
    
    // Aquí podrías enviar el error a un servicio de tracking
    // como Sentry, LogRocket, etc.
    
    return new AppError(
      'Error en la interfaz',
      'COMPONENT_ERROR',
      { error: error.message, errorInfo }
    );
  },

  /**
   * Formatea errores para mostrar al usuario
   */
  formatErrorForUser: (error) => {
    if (error instanceof AppError) {
      switch (error.code) {
        case 'NETWORK_ERROR':
          return 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
        case 'NOT_FOUND':
          return 'El recurso solicitado no fue encontrado.';
        case 'VALIDATION_ERROR':
          return error.message;
        case 'SERVER_ERROR':
          return 'Error en el servidor. Intenta nuevamente más tarde.';
        default:
          return error.message;
      }
    }
    
    return 'Ha ocurrido un error inesperado.';
  }
};

/**
 * Hook para manejo de errores en componentes
 */
export const useErrorHandler = () => {
  const handleError = (error) => {
    const appError = errorHandler.handleApiError(error);
    const userMessage = errorHandler.formatErrorForUser(appError);
    
    return {
      error: appError,
      userMessage,
      shouldRetry: appError.code === 'NETWORK_ERROR'
    };
  };

  return { handleError };
};