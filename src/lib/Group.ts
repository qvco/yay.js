import { HttpMethod } from '../util/Types';
import { BaseClient } from '../client/BaseClient';
import {
	CreateGroupResponse,
	CreateQuotaResponse,
	GroupCategoriesResponse,
	GroupNotificationSettingsResponse,
	GroupResponse,
	GroupUserResponse,
	GroupUsersResponse,
	GroupsResponse,
	UnreadStatusResponse,
	UsersByTimestampResponse,
	UsersResponse,
} from '../util/Responses';

export class GroupAPI {
	public constructor(private readonly base: BaseClient) {}

	public acceptModeratorOffer = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.id}/deputize`,
			requireAuth: false,
		});
	};

	public acceptOwnershipOffer = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/${options.id}/transfer`,
			requireAuth: false,
		});
	};

	public acceptUserRequest = async (options: { id: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.id}/accept/${options.userId}`,
			requireAuth: false,
		});
	};

	public addRelatedGroups = async (options: { id: number; relatedGroupId: number }) => {
		return await this.base.request({
			method: HttpMethod.PUT,
			route: `v1/groups/v${options.id}/related`,
			params: { 'related_group_id[]': options.relatedGroupId },
			requireAuth: false,
		});
	};

	public banUser = async (options: { id: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.id}/ban/${options.userId}`,
			requireAuth: false,
		});
	};

	public checkUnreadStatus = async (options: { fromTime: number }): Promise<UnreadStatusResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/unread_status`,
			params: { from_time: options.fromTime },
			requireAuth: false,
		});
	};

	public create = async (options: {
		topic: string;
		description?: string;
		secret?: string;
		hideReportedPosts?: boolean;
		hideConferenceCall?: boolean;
		isPrivate?: boolean;
		onlyVerifiedAge?: boolean;
		onlyMobileVerified?: boolean;
		callTimelineDisplay?: boolean;
		allowOwnershipTransfer?: boolean;
		allowThreadCreationBy?: string;
		gender?: number;
		generationGroupsLimit?: number;
		groupCategoryId?: number;
		coverImageFilename?: string;
		groupIconFilename?: string;
		uuid: string;
		apiKey: string;
		timestamp: string;
		signedInfo: string;
		subCategoryId?: string;
		hideFromGameEight?: boolean;
		allowMembersToPostImageAndVideo?: boolean;
		allowMembersToPostUrl?: boolean;
		guidelines?: string;
	}): Promise<CreateGroupResponse> => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v3/groups/new`,
			json: {
				topic: options.topic,
				description: options.description,
				secret: options.secret,
				hide_reported_posts: options.hideReportedPosts,
				hide_conference_call: options.hideConferenceCall,
				is_private: options.isPrivate,
				only_verified_age: options.onlyVerifiedAge,
				only_mobile_verified: options.onlyMobileVerified,
				call_timeline_display: options.callTimelineDisplay,
				allow_ownership_transfer: options.allowOwnershipTransfer,
				allow_thread_creation_by: options.allowThreadCreationBy,
				gender: options.gender,
				generation_groups_limit: options.generationGroupsLimit,
				group_category_id: options.groupCategoryId,
				cover_image_filename: options.coverImageFilename,
				group_icon_filename: options.groupIconFilename,
				uuid: options.uuid,
				api_key: options.apiKey,
				timestamp: options.timestamp,
				signed_info: options.signedInfo,
				sub_category_id: options.subCategoryId,
				hide_from_game_eight: options.hideFromGameEight,
				allow_members_to_post_image_and_video: options.allowMembersToPostImageAndVideo,
				allow_members_to_post_url: options.allowMembersToPostUrl,
				guidelines: options.guidelines,
			},
			requireAuth: false,
		});
	};

	public createPinGroup = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/pinned/groups`,
			json: { id: options.id },
			requireAuth: false,
		});
	};

	public declineModeratorOffer = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/groups/${options.id}/deputize`,
			requireAuth: false,
		});
	};

	public declineOwnershipOffer = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v1/groups/${options.id}/transfer`,
			requireAuth: false,
		});
	};

	public declineUserRequest = async (options: { id: number; userId: number }) => {
		return await this.base.request({
			method: HttpMethod.POST,
			route: `v1/groups/${options.id}/decline/${options.userId}`,
			requireAuth: false,
		});
	};

	public deleteCover = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v3/groups/${options.id}/cover`,
			requireAuth: false,
		});
	};

	public deleteIcon = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `v3/groups/${options.id}/icon`,
			requireAuth: false,
		});
	};

	public deletePinGroup = async (options: { id: number }) => {
		return await this.base.request({
			method: HttpMethod.DELETE,
			route: `/v1/pinned/groups/${options.id}`,
			requireAuth: false,
		});
	};

	public getBannedMembers = async (options: { id: number; page?: number }): Promise<UsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.id}/ban_list`,
			params: { page: options.page },
			requireAuth: false,
		});
	};

	public getCategories = async (options: { page?: number; number?: number }): Promise<GroupCategoriesResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/categories`,
			params: { page: options.page, number: options.number },
			requireAuth: false,
		});
	};

	public getCreateQuota = async (): Promise<CreateQuotaResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/created_quota`,
			requireAuth: false,
		});
	};

	public getGroup = async (options: { id: number }): Promise<GroupResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.id}`,
			requireAuth: false,
		});
	};

	public getGroupNotificationSettings = async (options: { id: number }): Promise<GroupNotificationSettingsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/notification_settings/groups/${options.id}`,
			requireAuth: false,
		});
	};

	public getGroups = async (options: {
		groupCategoryId?: number;
		keyword?: string;
		fromTimestamp?: number;
		subCategoryId?: number;
	}): Promise<GroupsResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/groups`,
			params: {
				group_category_id: options.groupCategoryId,
				keyword: options.keyword,
				from_timestamp: options.fromTimestamp,
				sub_category_id: options.subCategoryId,
			},
			requireAuth: false,
		});
	};

	public getInvitableUsers = async (options: {
		groupId: number;
		fromTimestamp?: number;
		// user[nickname]
		nickname?: string;
	}): Promise<UsersByTimestampResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.groupId}/users/invitable`,
			params: {
				from_timestamp: options.fromTimestamp,
				nickname: options.nickname,
			},
			requireAuth: false,
		});
	};

	public getJoinedStatuses = async (options: { ids: number[] }): Promise<Record<string, string>> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/joined_statuses`,
			params: { 'ids[]': options.ids },
			requireAuth: false,
		});
	};

	public getMember = async (options: { id: number; userId: number }): Promise<GroupUserResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v1/groups/${options.id}/members/${options.userId}`,
			requireAuth: false,
		});
	};

	public getMembers = async (options: {
		id: number;
		mode?: string;
		keyword?: string;
		fromId?: number;
		fromTimestamp?: number;
		orderBy?: string;
		followedByMe?: boolean;
	}): Promise<GroupUsersResponse> => {
		return await this.base.request({
			method: HttpMethod.GET,
			route: `v2/groups/${options.id}/members`,
			params: {
				mode: options.mode,
				keyword: options.keyword,
				from_id: options.fromId,
				from_timestamp: options.fromTimestamp,
				order_by: options.orderBy,
				followed_by_me: options.followedByMe,
			},
			requireAuth: false,
		});
	};
}
