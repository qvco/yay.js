import { Walkthrough } from '../util/Models';
import { BaseClient } from '../client/BaseClient';
import { HttpMethod } from '../util/Types';

/**
 * **ゲームAPI**
 *
 * @remarks
 * ゲームAPIのエンドポイントと連携するためのクラスです
 *
 * @see https://github.com/qvco/yay.js
 *
 */
export class GameAPI {
	public constructor(private readonly base: BaseClient) {}

	public getWalkthroughs = async (options: { appId: number }): Promise<Walkthrough[]> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/games/apps/${options.appId}/walkthroughs`,
			requireAuth: false,
		});
	};

	public requestWalkthrough = async (options: { groupId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.groupId}/request_walkthrough`,
			requireAuth: false,
		});
	};
}
