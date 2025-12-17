const BASE_URL = import.meta.env.VITE_API_URL

export interface ApiValidationError {
  type: "validation"
  messages: string[]
}

export interface ApiGenericError {
  type: "error"
  message: string
}

export type ApiError = ApiValidationError | ApiGenericError

interface BackendValidationError {
  code: "VALIDATION"
  errores: { field: string; message: string }[]
}

interface BackendGenericError {
  error?: { message?: string }
  message?: string
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
    ...options,
  })

  const data: unknown = await res.json().catch(() => null)

  if (!res.ok) {
    const validation = data as BackendValidationError
    const generic = data as BackendGenericError

    if (validation?.code === "VALIDATION" && Array.isArray(validation.errores)) {
      throw {
        type: "validation",
        messages: validation.errores.map(e => e.message),
      } satisfies ApiValidationError
    }

    throw {
      type: "error",
      message:
        generic?.error?.message ??
        generic?.message ??
        "Error inesperado",
    } satisfies ApiGenericError
  }

  return data as T
}
