import { CookieManager } from '../src/util/CookieManager';
import { CookieOptions } from '../src/util/Types';

describe('CookieManager', () => {
	let cookieManager: CookieManager;
	// 暗号化用
	let cookieEncryptManager: CookieManager;

	const testFilePath = './testCookie.json';
	const testEncryptFilePath = './testEncryptCookie.json';

	beforeAll(() => {
		cookieManager = new CookieManager(testFilePath);
		cookieEncryptManager = new CookieManager(testEncryptFilePath, 'test-password');
	});

	afterAll(() => {
		cookieManager.deleteCookie();
		cookieEncryptManager.deleteCookie();
	});

	const testCookie: CookieOptions = {
		user: {
			email: 'test@example.com',
			userId: 123,
			uuid: 'test-uuid',
		},
		device: {
			deviceUuid: 'test-device-uuid',
		},
		authentication: {
			accessToken: 'test-access-token',
			refreshToken: 'test-refresh-token',
		},
	};

	it('クッキーデータをセットして保存する', async () => {
		cookieManager.setCookie(testCookie);
		await cookieManager.saveCookie();

		const loadedCookie = await cookieManager.loadCookie();
		expect(loadedCookie).toEqual(testCookie);
	});

	it('クッキーデータをセットし、暗号化して保存する', async () => {
		cookieEncryptManager.setCookie(testCookie);
		await cookieEncryptManager.saveCookie();

		const loadedCookie = await cookieEncryptManager.loadCookie();
		expect(loadedCookie).toEqual(testCookie);
	});
});