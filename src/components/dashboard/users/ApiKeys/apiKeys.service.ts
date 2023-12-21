import { ActionStatus } from 'common/interfaces/ActionStatus';
import { ApiKeyRecord, ApiTypesResponse } from 'common/interfaces/UserApiKeys';
import { fetchApiData, Status } from 'services/user.service';

export const getUserApiKeysList = (useruid: string): Promise<ApiKeyRecord[]> => {
    return fetchApiData<ApiKeyRecord[]>('GET', `user/${useruid}/apikeys`);
};

export const getApiKey = (keyuid: string): Promise<ApiKeyRecord[]> => {
    return fetchApiData<ApiKeyRecord[]>('GET', `user/${keyuid}/apikey`);
};

export const getApiKeysTypes = (): Promise<ApiTypesResponse> => {
    return fetchApiData<ApiTypesResponse>('GET', 'user/listapikeys');
};

export const setUserApiKey = (uid: string, data?: Partial<ApiKeyRecord>): Promise<ActionStatus> => {
    return fetchApiData<ActionStatus>('POST', `user/${uid}/apikeyset`, { data });
};

export const deleteUserApiKey = (keyuid: string): Promise<ActionStatus> => {
    return fetchApiData<ActionStatus>('POST', `user/${keyuid}/apikeydelete`);
};

export const undeleteUserApiKey = (keyuid: string): Promise<Status> => {
    return fetchApiData<Status>('POST', `user/${keyuid}/apikeyundelete`);
};
