export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class GitHubAPIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

export class CacheError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CacheError';
  }
}

export class DataNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataNotFoundError';
  }
}

export class DuplicateIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateIdError';
  }
}

export function handleError(error: unknown): { message: string; status: number } {
  if (error instanceof ValidationError) {
    return { message: error.message, status: 400 };
  }
  if (error instanceof GitHubAPIError) {
    return { message: error.message, status: error.statusCode || 500 };
  }
  if (error instanceof CacheError) {
    return { message: error.message, status: 500 };
  }
  if (error instanceof DataNotFoundError) {
    return { message: error.message, status: 404 };
  }
  if (error instanceof DuplicateIdError) {
    return { message: error.message, status: 400 };
  }
  if (error instanceof Error) {
    return { message: error.message, status: 500 };
  }
  return { message: '未知错误', status: 500 };
} 