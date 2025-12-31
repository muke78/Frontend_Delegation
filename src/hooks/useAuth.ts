import { useEffect, useState, useCallback, useRef } from "react";
import {
	getProfile,
	logout as logoutService,
} from "@/modules/auth/services/auth.services";
import type { UserProfile } from "@/modules/auth/types";

export function useAuth() {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const isLoadingRef = useRef(false);
	const isMountedRef = useRef(true);

	const loadUser = useCallback(async () => {
		if (isLoadingRef.current) return;

		isLoadingRef.current = true;
		setLoading(true);

		try {
			const res = await getProfile();
			if (isMountedRef.current) {
				setUser(Array.isArray(res.data) ? res.data[0] || null : null);
			}
		} catch (error) {
			if (isMountedRef.current) {
				setUser(null);
			}
		} finally {
			if (isMountedRef.current) {
				setLoading(false);
			}
			isLoadingRef.current = false;
		}
	}, []);

	useEffect(() => {
		isMountedRef.current = true;
		loadUser();

		return () => {
			isMountedRef.current = false;
		};
	}, [loadUser]);

	const logout = useCallback(async () => {
		try {
			const res = await logoutService();
			setUser(null);
			return res.message;
		} catch (error) {
			setUser(null);
			throw error;
		}
	}, []);

	return {
		user,
		isAuthenticated: !!user,
		loading,
		logout,
		refreshUser: loadUser,
	};
}
