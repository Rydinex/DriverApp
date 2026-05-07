// Driver App – API Configuration

const LOCAL_BACKEND_HOST = '10.0.0.206';
const LOCAL_BACKEND_PORT = 8080;

const configuredBackendUrl =
	process.env.EXPO_PUBLIC_BACKEND_URL ||
	process.env.EXPO_PUBLIC_API_URL ||
	process.env.API_URL;

const useLocalBackend =
	process.env.EXPO_PUBLIC_USE_LOCAL_BACKEND === 'true' ||
	process.env.USE_LOCAL_BACKEND === 'true';

// Default to production API unless local mode is explicitly enabled.
const BACKEND_URL =
	configuredBackendUrl ||
	(useLocalBackend
		? `http://${LOCAL_BACKEND_HOST}:${LOCAL_BACKEND_PORT}`
		: 'https://api.rydinex.com');

// Optional: Admin panel domain (for future use)
export const ADMIN_PANEL_URL = 'https://admin.rydinex.com';

// Export main backend URL
export { BACKEND_URL };

// API base URL for all REST endpoints
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Socket server URL (same as backend)
export const SOCKET_URL = BACKEND_URL;

