import type { BackendGenericError, BackendValidationError, ApiError} from "./types";

const BASE_URL = import.meta.env.VITE_API_URL

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

  const data: unknown = await res.json().catch((err) => err)

  if (!res.ok) {
    const validation = data as BackendValidationError
    const generic = data as BackendGenericError

    if (validation?.code === "VALIDATION" && Array.isArray(validation.errores)) {
      throw {
        type: "validation",
        errors: validation.errores,
      } satisfies ApiError
    }

    throw {
      type: "error",
      message:
        generic?.error?.message ??
        generic?.message ??
        "Error inesperado",
    } satisfies ApiError
  }

  return data as T
}
