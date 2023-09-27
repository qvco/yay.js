import { AxiosProxyConfig } from 'axios';
import { HeaderInterceptor } from './HeaderInterceptor';

/**
 * RESTクラスのrequest関数の引数
 */
export type RESTOptions = {
	baseURL: string;
	proxy?: AxiosProxyConfig;
	timeout?: number;
	device: Device;
	cookie?: Cookie;
	defaultHeaders: RequestHeaders;
};

export type RequestOptions = {
	method: RequestMethod;
	route: string;
	requireAuth: boolean;
	params?: Record<string, any>;
	json?: Record<string, any>;
	baseURL?: string;
	accessToken?: string;
	headers?: RequestHeaders;
};

/**
 * Clientインスタンスを作成するときの引数
 */
export type ClientOptions = {
	email?: string;
	password?: string;
	/**
	 * プロキシのアドレス
	 */
	proxy?: AxiosProxyConfig;
	/**
	 * リクエストの待機時間
	 *
	 * @defaultValue `30` 秒
	 */
	timeout?: number;
	/**
	 * リクエストの最大リトライ回数
	 *
	 * @defaultValue `3` 回
	 */
	maxRetries?: number;
	/**
	 * リトライ待機時間の増加割合係数
	 *
	 * @defaultValue `1.5` 倍
	 */
	backoffFactor?: number;
	/**
	 * レート制限を待機するかどうか
	 *
	 * @defaultValue `true`
	 */
	waitOnRateLimit?: boolean;
	/**
	 * クッキーを保存するかどうか
	 *
	 * @defaultValue `true`
	 */
	saveCookie?: boolean;
	/**
	 * クッキーを暗号化して保存する際のパスワード
	 *
	 * @defaultValue `true`
	 */
	cookiePassword?: string;
	/**
	 * クッキーファイルを保存する場所
	 *
	 * @defaultValue `'cookie'`
	 */
	cookieFilePath?: string;
};

export type Cookie = {
	authentication: CookieAuthentication;
	user: CookieUser;
	device: CookieDevice;
};

export type CookieAuthentication = {
	accessToken: string;
	refreshToken: string;
};

export type CookieUser = {
	userId: number;
	email: string;
	uuid: string;
};

export type CookieDevice = {
	deviceUuid: string;
};

export type Device = {
	deviceType: string;
	osVersion: string;
	screenDensity: string;
	screenSize: string;
	model: string;
};

export type Params = Record<string, unknown>;

export type Json = Record<string, unknown>;

export type LoginEmailUserRequest = {
	apiKey: string;
	email: string;
	password: string;
	uuid: string;
};

/**
 * リクエストを送信する際のヘッダー情報
 */
export type RequestHeaders = {
	Authorization?: string;
	Host?: string;
	'User-Agent'?: string;
	'X-Timestamp'?: string;
	'X-App-Version'?: string;
	'X-Device-Info'?: string;
	'X-Device-UUID'?: string;
	'X-Client-IP'?: string;
	'X-Connection-Type'?: string;
	'X-Connection-Speed'?: string;
	'Accept-Language'?: string;
	'Content-Type'?: string;
};

/**
 * リクエストを送信する際のAPIメソッド
 */
export enum RequestMethod {
	DELETE = 'DELETE',
	GET = 'GET',
	PATCH = 'PATCH',
	POST = 'POST',
	PUT = 'PUT',
}

export type ErrorResponse = {
	result: string;
	message: string;
	error_code: number;
	ban_until: number | null;
};

/**
 * 投稿のタイプ
 */
export enum PostType {
	text = 'text',
	media = 'media',
	image = 'image',
	video = 'video',
	survey = 'survey',
	call = 'call',
	shareable_url = 'shareable_url',
}

/**
 * 通話のタイプ
 */
export enum CallType {
	voice = 'voice',
	video = 'vdo',
}

/**
 * 画像のタイプ
 */
export enum ImageType {
	post = 'post',
	chatMessage = 'chat_message',
	chatBackground = 'chat_background',
	report = 'report',
	userAvatar = 'user_avatar',
	userCover = 'user_cover',
	groupIcon = 'group_icon',
	groupCover = 'group_cover',
	groupThreadIcon = 'group_thread_icon',
}

/**
 * 共有のタイプ
 */
export enum ShareableType {
	group = 'group',
	thread = 'thread',
}
