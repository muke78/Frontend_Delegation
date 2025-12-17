import { apiFetch } from '@/services/api/api.ts';
import type { LoginPayload, UserProfile, User } from '../types.ts';
import type { ApiSuccessResponse } from '@/services/api/types.ts';

export const login = (payload: LoginPayload) => {
    return apiFetch<ApiSuccessResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
    })
};

export const logout = () => {
    return apiFetch<ApiSuccessResponse>("/auth/logout", {
        method: "POST",
    })
};

export const register = (payload: User) => {
    return apiFetch<ApiSuccessResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
    })
};

export function getProfile() {
    return apiFetch<ApiSuccessResponse<UserProfile[]>>("/users/profile", {
        method: "GET",
    })
}