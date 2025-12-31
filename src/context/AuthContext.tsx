import { createContext } from "react";
import type { UserProfile } from "@/modules/auth/types";

export interface AuthContextType {
	user: UserProfile | null;
	isAuthenticated: boolean;
	loading: boolean;
	logout: () => Promise<string>;
	refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
