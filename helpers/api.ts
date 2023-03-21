const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_URLS = {
	auth: `${BASE_URL}/auth`,
	main: `${BASE_URL}`,
	coin: `https://dd5c-187-73-24-232.sa.ngrok.io`,
};

function path(root: string, sublink: string) {
	return `${root}${sublink}`;
}

export const AUTH_SERVICE_ROUTES = {
	nonce: (wallet: string) => path(API_URLS.auth, `/${wallet}/auth-message`),
	signature: path(API_URLS.auth, `/`),
};
