import { AppError, errorHandler, NetworkError, ValidationError } from '../errorHandler';

describe('errorHandler', () => {
  describe('handleApiError', () => {
    test('should handle 400 status error', () => {
      const error = {
        response: {
          status: 400,
          data: {
            error: {
              message: 'Invalid data',
              field: 'email'
            }
          }
        }
      };

      const result = errorHandler.handleApiError(error);
      expect(result).toBeInstanceOf(ValidationError);
      expect(result.message).toBe('Invalid data');
      expect(result.field).toBe('email');
    });

    test('should handle 404 status error', () => {
      const error = {
        response: {
          status: 404,
          data: {}
        }
      };

      const result = errorHandler.handleApiError(error);
      expect(result).toBeInstanceOf(AppError);
      expect(result.code).toBe('NOT_FOUND');
    });

    test('should handle network error', () => {
      const error = {
        request: {}
      };

      const result = errorHandler.handleApiError(error);
      expect(result).toBeInstanceOf(NetworkError);
      expect(result.message).toBe('No se pudo conectar al servidor');
    });
  });

  describe('formatErrorForUser', () => {
    test('should format network error', () => {
      const error = new NetworkError('Connection failed');
      const result = errorHandler.formatErrorForUser(error);
      expect(result).toBe('No se pudo conectar al servidor. Verifica tu conexión a internet.');
    });

    test('should format validation error', () => {
      const error = new ValidationError('Email is required');
      const result = errorHandler.formatErrorForUser(error);
      expect(result).toBe('Email is required');
    });
  });
});