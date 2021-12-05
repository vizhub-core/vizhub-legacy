// Hitting this endpoint clears the httpOnly cookie that contains the auth JWT.
export const fetchSignOut = () => fetch('/api/auth/signOut', { method: 'GET' });
