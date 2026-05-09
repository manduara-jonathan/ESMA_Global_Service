/**
 * API Error handler utility
 * Centralized error handling for API routes
 */

export interface ApiError {
  status: number
  message: string
  code?: string
  details?: unknown
}

export class ValidationError extends Error {
  status = 400
  code = "VALIDATION_ERROR"

  constructor(message: string, public details?: unknown) {
    super(message)
  }
}

export class AuthError extends Error {
  status = 401
  code = "AUTH_ERROR"

  constructor(message: string = "Non authentifié") {
    super(message)
  }
}

export class ForbiddenError extends Error {
  status = 403
  code = "FORBIDDEN_ERROR"

  constructor(message: string = "Accès refusé") {
    super(message)
  }
}

export class NotFoundError extends Error {
  status = 404
  code = "NOT_FOUND_ERROR"

  constructor(message: string = "Ressource non trouvée") {
    super(message)
  }
}

export class TooManyRequestsError extends Error {
  status = 429
  code = "TOO_MANY_REQUESTS_ERROR"

  constructor(
    message: string = "Trop de requêtes",
    public retryAfter?: number
  ) {
    super(message)
  }
}

export class ServerError extends Error {
  status = 500
  code = "SERVER_ERROR"

  constructor(message: string = "Erreur serveur interne") {
    super(message)
  }
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error
  )
}

export function getErrorResponse(error: unknown): {
  status: number
  body: ApiError
} {
  if (error instanceof ValidationError) {
    return {
      status: 400,
      body: {
        status: 400,
        message: error.message,
        code: error.code,
        details: error.details,
      },
    }
  }

  if (error instanceof AuthError) {
    return {
      status: 401,
      body: {
        status: 401,
        message: error.message,
        code: error.code,
      },
    }
  }

  if (error instanceof ForbiddenError) {
    return {
      status: 403,
      body: {
        status: 403,
        message: error.message,
        code: error.code,
      },
    }
  }

  if (error instanceof NotFoundError) {
    return {
      status: 404,
      body: {
        status: 404,
        message: error.message,
        code: error.code,
      },
    }
  }

  if (error instanceof TooManyRequestsError) {
    return {
      status: 429,
      body: {
        status: 429,
        message: error.message,
        code: error.code,
      },
    }
  }

  if (error instanceof ServerError) {
    return {
      status: 500,
      body: {
        status: 500,
        message: error.message,
        code: error.code,
      },
    }
  }

  // Default to 500 for unknown errors
  console.error("Unhandled error:", error)
  return {
    status: 500,
    body: {
      status: 500,
      message: "Erreur serveur interne",
      code: "INTERNAL_SERVER_ERROR",
    },
  }
}
