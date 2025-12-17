export interface User {
    username: string
    password?: string
    full_name: string
    email: string
    role: string
}

export interface UserProfile extends User {
    user_id: string
    last_login: string
}

export interface LoginPayload {
    email: string
    password: string
}

