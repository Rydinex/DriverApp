// Driver App – API Configuration

const LOCAL_BACKEND_HOST = '10.0.0.206';
const LOCAL_BACKEND_PORT = 8080;

const PRODUCTION_BACKEND_URL = 'https://api.rydinex.com';

const configuredBackendUrl =
	process.env.EXPO_PUBLIC_BACKEND_URL ||
	process.env.EXPO_PUBLIC_API_URL ||
	process.env.API_URL;

const useLocalBackend =
	process.env.EXPO_PUBLIC_USE_LOCAL_BACKEND === 'true' ||
	process.env.USE_LOCAL_BACKEND === 'true';

const isPrivateHost = (hostname: string): boolean => {
	const normalized = hostname.toLowerCase();
	if (normalized === 'localhost' || normalized === '0.0.0.0') {
		return true;
	}
	if (normalized.startsWith('127.') || normalized.startsWith('10.') || normalized.startsWith('192.168.')) {
		return true;
	}
	return /^172\.(1[6-9]|2\d|3[0-1])\./.test(normalized);
};

const normalizeBackendUrl = (rawUrl: string): string => {
	const trimmed = rawUrl.trim().replace(/\/+$/, '');
	if (!trimmed) {
		return PRODUCTION_BACKEND_URL;
	}

	const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

	try {
		const parsed = new URL(withProtocol);
		const host = parsed.hostname;
		if (!useLocalBackend && isPrivateHost(host)) {
			return PRODUCTION_BACKEND_URL;
		}
		if (!useLocalBackend && parsed.protocol === 'http:') {
			parsed.protocol = 'https:';
		}
		return parsed.origin;
	} catch {
		return PRODUCTION_BACKEND_URL;
	}
};

// Default to production API unless local mode is explicitly enabled.
const BACKEND_URL = configuredBackendUrl
	? normalizeBackendUrl(configuredBackendUrl)
	: useLocalBackend
		? `http://${LOCAL_BACKEND_HOST}:${LOCAL_BACKEND_PORT}`
		: PRODUCTION_BACKEND_URL;

// Optional: Admin panel domain (for future use)
export const ADMIN_PANEL_URL = 'https://admin.rydinex.com';

// Export main backend URL
export { BACKEND_URL };

// API base URL for all REST endpoints
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Socket server URL (same as backend)
export const SOCKET_URL = BACKEND_URL;

