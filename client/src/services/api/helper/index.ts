import { ErrorResponse } from '../http'

const isFetchErrorResponse = (error: unknown): error is ErrorResponse => {
  return typeof error === 'object' && error !== null && 'status' in error
}

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

export { isFetchErrorResponse, isErrorWithMessage }
