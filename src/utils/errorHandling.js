export class AppError extends Error {
  constructor(message, code, context = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
  }
}

export function handleSupabaseError(error, context = {}) {
  console.error('Supabase Error:', {
    message: error.message,
    details: error.details,
    hint: error.hint,
    context
  });

  return new AppError(
    error.message || 'An unexpected error occurred',
    error.code || 'UNKNOWN_ERROR',
    { ...context, details: error.details, hint: error.hint }
  );
}

export function isSupabaseError(error) {
  return error && error.code && error.code.startsWith('PGRST');
}
