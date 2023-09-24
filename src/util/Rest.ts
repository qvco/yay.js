import axios, { AxiosInstance, AxiosProxyConfig, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import { v4 as uuid } from 'uuid';

import { RequestMethod } from './Types';
import { RESTOptions, RequestHeaders } from './Types';
import { BASE_API_URL } from './Constants';
import {
	AuthenticationError,
	BadRequestError,
	ForbiddenError,
	HTTPError,
	NotFoundError,
	RateLimitError,
	ServerError,
} from '../lib/Errors';

/**
 * Represents the class that manages handlers for endpoints
 */
export class REST {
	private host: string;
	private api: AxiosInstance;

	public constructor(
		host: string = 'https://api.yay.space',
		timeout: number = 30,
		proxy?: AxiosProxyConfig,
		headers?: AxiosHeaders,
	) {
		this.host = host;
		this.api = axios.create({
			baseURL: this.host,
			proxy: proxy || undefined,
			timeout: timeout * 1000,
			headers: headers,
			validateStatus: function (status) {
				return true;
			},
		});
	}

	public async request(options: RESTOptions): Promise<any> {
		// if (requireAuth) {

		// 	headers?.Authorization
		// }

		const config: AxiosRequestConfig = {
			method: options.method,
			url: this.host + options.route,
			params: options.params,
			data: options.json,
		};

		try {
			const response: AxiosResponse = await this.api(config);
			const { status, data } = response;

			switch (status) {
				case 400:
					throw new BadRequestError(data);
				case 401:
					throw new AuthenticationError(data);
				case 403:
					throw new ForbiddenError(data);
				case 404:
					throw new NotFoundError(data);
				case 429:
					throw new RateLimitError(data);
				case 500:
					throw new ServerError(data);
				default:
					if (status >= 200 && status < 300) {
						return data;
					} else {
						throw new HTTPError(data);
					}
			}
		} catch (error) {
			throw error;
		}
	}
}