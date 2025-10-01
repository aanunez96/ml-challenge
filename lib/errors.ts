import { NextResponse } from 'next/server'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message)
  }
}

// Error codes for API responses
export type ErrorCode = 'NOT_FOUND' | 'VALIDATION_ERROR' | 'INTERNAL'

export interface ApiErrorResponse {
  error: {
    code: ErrorCode
    message: string
  }
}

// Helper functions to create standardized error responses
export function createErrorResponse(
  statusCode: number,
  code: ErrorCode,
  message: string
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      error: {
        code,
        message,
      },
    },
    { status: statusCode }
  )
}

export function notFoundResponse(
  message: string = 'Resource not found'
): NextResponse<ApiErrorResponse> {
  return createErrorResponse(404, 'NOT_FOUND', message)
}

export function validationErrorResponse(message: string): NextResponse<ApiErrorResponse> {
  return createErrorResponse(400, 'VALIDATION_ERROR', message)
}

export function internalErrorResponse(
  message: string = 'Internal server error'
): NextResponse<ApiErrorResponse> {
  return createErrorResponse(500, 'INTERNAL', message)
}
