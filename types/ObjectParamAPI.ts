import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { ActivateTenantRequest } from '../models/ActivateTenantRequest';
import { CreateTenantRequest } from '../models/CreateTenantRequest';
import { CreateTokenRequest } from '../models/CreateTokenRequest';
import { CreateUserRequest } from '../models/CreateUserRequest';
import { ModelError } from '../models/ModelError';
import { Paging } from '../models/Paging';
import { Tenant } from '../models/Tenant';
import { TenantCompanyInfo } from '../models/TenantCompanyInfo';
import { Token } from '../models/Token';
import { TokenList } from '../models/TokenList';
import { TotpEnableRequest } from '../models/TotpEnableRequest';
import { TotpEnableResponse } from '../models/TotpEnableResponse';
import { UpdateTenantRequest } from '../models/UpdateTenantRequest';
import { UpdateUserRequest } from '../models/UpdateUserRequest';
import { User } from '../models/User';

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiUsersEmailAuthRequest {
    /**
     * The magic link token the user sent
     * @type string
     * @memberof AuthApiusersEmailAuth
     */
    payload: string
}

export interface AuthApiUsersEmailSendRequest {
    /**
     * Id of the user you want to send magic link to
     * @type string
     * @memberof AuthApiusersEmailSend
     */
    userId: string
}

export interface AuthApiUsersTotpAuthRequest {
    /**
     * Id of the user you want to verify TOTP code for
     * @type string
     * @memberof AuthApiusersTotpAuth
     */
    userId: string
    /**
     * The totp token the user sent
     * @type string
     * @memberof AuthApiusersTotpAuth
     */
    payload: string
}

export interface AuthApiUsersTotpToggleRequest {
    /**
     * Id of the user you want to enable TOTP for
     * @type string
     * @memberof AuthApiusersTotpToggle
     */
    userId: string
    /**
     * 
     * @type TotpEnableRequest
     * @memberof AuthApiusersTotpToggle
     */
    totpEnableRequest?: TotpEnableRequest
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Gives back user data for the magic link token
     * @param param the request object
     */
    public usersEmailAuth(param: AuthApiUsersEmailAuthRequest, options?: Configuration): Promise<User> {
        return this.api.usersEmailAuth(param.payload,  options).toPromise();
    }

    /**
     * This endpoint will be used when you want to send a magic login link to specified user
     * @param param the request object
     */
    public usersEmailSend(param: AuthApiUsersEmailSendRequest, options?: Configuration): Promise<void> {
        return this.api.usersEmailSend(param.userId,  options).toPromise();
    }

    /**
     * Verify users TOTP token
     * @param param the request object
     */
    public usersTotpAuth(param: AuthApiUsersTotpAuthRequest, options?: Configuration): Promise<User> {
        return this.api.usersTotpAuth(param.userId, param.payload,  options).toPromise();
    }

    /**
     * When you want your users to be able to use TOTP authentication you need to send enable set to true as payload to this endpoint. To turn off TOTP set enable to false. When enabling you will recieve the secret key and a QR code link. The QR code you need to show your user for them to scan.
     * Enables or disables Time-based One-Time Password authentication method for specified user
     * @param param the request object
     */
    public usersTotpToggle(param: AuthApiUsersTotpToggleRequest, options?: Configuration): Promise<TotpEnableResponse | void> {
        return this.api.usersTotpToggle(param.userId, param.totpEnableRequest,  options).toPromise();
    }

}

import { ObservableImagesApi } from "./ObservableAPI";
import { ImagesApiRequestFactory, ImagesApiResponseProcessor} from "../apis/ImagesApi";

export interface ImagesApiImagesTotpRequest {
    /**
     * The company name you your users to see in their TOTP application
     * @type string
     * @memberof ImagesApiimagesTotp
     */
    tenantName?: string
    /**
     * The userId of the user you want to create the TOTP QR image for
     * @type string
     * @memberof ImagesApiimagesTotp
     */
    userId?: string
    /**
     * The TOTP secret for the specified user
     * @type string
     * @memberof ImagesApiimagesTotp
     */
    userSecret?: string
}

export class ObjectImagesApi {
    private api: ObservableImagesApi

    public constructor(configuration: Configuration, requestFactory?: ImagesApiRequestFactory, responseProcessor?: ImagesApiResponseProcessor) {
        this.api = new ObservableImagesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * This endpoint does not do any lookups of any sort. It will just generate a QR code from the parameters supplied to it.
     * Returns a generated QR code
     * @param param the request object
     */
    public imagesTotp(param: ImagesApiImagesTotpRequest, options?: Configuration): Promise<HttpFile> {
        return this.api.imagesTotp(param.tenantName, param.userId, param.userSecret,  options).toPromise();
    }

}

import { ObservableInternalApi } from "./ObservableAPI";
import { InternalApiRequestFactory, InternalApiResponseProcessor} from "../apis/InternalApi";

export interface InternalApiTenantsCardtokenRequest {
}

export class ObjectInternalApi {
    private api: ObservableInternalApi

    public constructor(configuration: Configuration, requestFactory?: InternalApiRequestFactory, responseProcessor?: InternalApiResponseProcessor) {
        this.api = new ObservableInternalApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Returns token that is used by stripe to save card number.
     * @param param the request object
     */
    public tenantsCardtoken(param: InternalApiTenantsCardtokenRequest, options?: Configuration): Promise<string> {
        return this.api.tenantsCardtoken( options).toPromise();
    }

}

import { ObservableTenantsApi } from "./ObservableAPI";
import { TenantsApiRequestFactory, TenantsApiResponseProcessor} from "../apis/TenantsApi";

export interface TenantsApiTenantUpdateRequest {
    /**
     * 
     * @type UpdateTenantRequest
     * @memberof TenantsApitenantUpdate
     */
    updateTenantRequest?: UpdateTenantRequest
}

export interface TenantsApiTenantsActivateRequest {
    /**
     * 
     * @type ActivateTenantRequest
     * @memberof TenantsApitenantsActivate
     */
    activateTenantRequest?: ActivateTenantRequest
}

export interface TenantsApiTenantsCreateRequest {
    /**
     * 
     * @type CreateTenantRequest
     * @memberof TenantsApitenantsCreate
     */
    createTenantRequest?: CreateTenantRequest
}

export interface TenantsApiTenantsCreate0Request {
}

export interface TenantsApiTenantsGetRequest {
}

export class ObjectTenantsApi {
    private api: ObservableTenantsApi

    public constructor(configuration: Configuration, requestFactory?: TenantsApiRequestFactory, responseProcessor?: TenantsApiResponseProcessor) {
        this.api = new ObservableTenantsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * This endpoint is used to update certain information about your tenant. For example if you want to update your tenant's callback URL you will do that here.
     * Updates tenant information
     * @param param the request object
     */
    public tenantUpdate(param: TenantsApiTenantUpdateRequest, options?: Configuration): Promise<Tenant> {
        return this.api.tenantUpdate(param.updateTenantRequest,  options).toPromise();
    }

    /**
     * Activates the tenant, checks that all necessary information to activate a tenant is included
     * @param param the request object
     */
    public tenantsActivate(param: TenantsApiTenantsActivateRequest, options?: Configuration): Promise<Tenant> {
        return this.api.tenantsActivate(param.activateTenantRequest,  options).toPromise();
    }

    /**
     * Creates new tenant
     * @param param the request object
     */
    public tenantsCreate(param: TenantsApiTenantsCreateRequest, options?: Configuration): Promise<Tenant> {
        return this.api.tenantsCreate(param.createTenantRequest,  options).toPromise();
    }

    /**
     * This endpoint will delete your tenant. Will send an email to the admin email address of the tenant confirming that you want to delete your tenant before deletion.
     * Deletes tenant caller is part of, will send verification email before deleting tenant
     * @param param the request object
     */
    public tenantsCreate_1(param: TenantsApiTenantsCreate0Request, options?: Configuration): Promise<Tenant> {
        return this.api.tenantsCreate_1( options).toPromise();
    }

    /**
     * Returns the tenant information the caller is part of
     * @param param the request object
     */
    public tenantsGet(param: TenantsApiTenantsGetRequest, options?: Configuration): Promise<Tenant> {
        return this.api.tenantsGet( options).toPromise();
    }

}

import { ObservableTokensApi } from "./ObservableAPI";
import { TokensApiRequestFactory, TokensApiResponseProcessor} from "../apis/TokensApi";

export interface TokensApiTokensCreateRequest {
    /**
     * 
     * @type CreateTokenRequest
     * @memberof TokensApitokensCreate
     */
    createTokenRequest?: CreateTokenRequest
}

export interface TokensApiTokensDeleteRequest {
    /**
     * Id of the token you want to delete
     * @type string
     * @memberof TokensApitokensDelete
     */
    tokenId: string
}

export interface TokensApiTokensListRequest {
    /**
     * Maximum of results per page
     * @type number
     * @memberof TokensApitokensList
     */
    size?: number
    /**
     * The page you want to see
     * @type number
     * @memberof TokensApitokensList
     */
    page?: number
}

export class ObjectTokensApi {
    private api: ObservableTokensApi

    public constructor(configuration: Configuration, requestFactory?: TokensApiRequestFactory, responseProcessor?: TokensApiResponseProcessor) {
        this.api = new ObservableTokensApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Creates new token
     * @param param the request object
     */
    public tokensCreate(param: TokensApiTokensCreateRequest, options?: Configuration): Promise<Token> {
        return this.api.tokensCreate(param.createTokenRequest,  options).toPromise();
    }

    /**
     * Deletes specifed access token
     * @param param the request object
     */
    public tokensDelete(param: TokensApiTokensDeleteRequest, options?: Configuration): Promise<void> {
        return this.api.tokensDelete(param.tokenId,  options).toPromise();
    }

    /**
     * Returns a list of all active tokens in tenant
     * @param param the request object
     */
    public tokensList(param: TokensApiTokensListRequest, options?: Configuration): Promise<TokenList> {
        return this.api.tokensList(param.size, param.page,  options).toPromise();
    }

}

import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiUsersCreateRequest {
    /**
     * 
     * @type CreateUserRequest
     * @memberof UsersApiusersCreate
     */
    createUserRequest?: CreateUserRequest
}

export interface UsersApiUsersDeleteRequest {
    /**
     * Id of the user you want to delete
     * @type string
     * @memberof UsersApiusersDelete
     */
    userId: string
}

export interface UsersApiUsersGetRequest {
    /**
     * userId of user you want to fetch information about
     * @type string
     * @memberof UsersApiusersGet
     */
    userId: string
}

export interface UsersApiUsersUpdateRequest {
    /**
     * Id of the user you want to update
     * @type string
     * @memberof UsersApiusersUpdate
     */
    userId: string
    /**
     * 
     * @type UpdateUserRequest
     * @memberof UsersApiusersUpdate
     */
    updateUserRequest?: UpdateUserRequest
}

export class ObjectUsersApi {
    private api: ObservableUsersApi

    public constructor(configuration: Configuration, requestFactory?: UsersApiRequestFactory, responseProcessor?: UsersApiResponseProcessor) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Creates a user in tenant, tenant is determined from the token
     * @param param the request object
     */
    public usersCreate(param: UsersApiUsersCreateRequest, options?: Configuration): Promise<User> {
        return this.api.usersCreate(param.createUserRequest,  options).toPromise();
    }

    /**
     * Deletes specified user
     * @param param the request object
     */
    public usersDelete(param: UsersApiUsersDeleteRequest, options?: Configuration): Promise<void> {
        return this.api.usersDelete(param.userId,  options).toPromise();
    }

    /**
     * Returns specified user
     * @param param the request object
     */
    public usersGet(param: UsersApiUsersGetRequest, options?: Configuration): Promise<User> {
        return this.api.usersGet(param.userId,  options).toPromise();
    }

    /**
     * Updates specified user
     * @param param the request object
     */
    public usersUpdate(param: UsersApiUsersUpdateRequest, options?: Configuration): Promise<User> {
        return this.api.usersUpdate(param.userId, param.updateUserRequest,  options).toPromise();
    }

}
