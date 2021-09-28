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
import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Gives back user data for the magic link token
     * @param payload The magic link token the user sent
     */
    public usersEmailAuth(payload: string, options?: Configuration): Promise<User> {
        const result = this.api.usersEmailAuth(payload, options);
        return result.toPromise();
    }

    /**
     * This endpoint will be used when you want to send a magic login link to specified user
     * @param userId Id of the user you want to send magic link to
     */
    public usersEmailSend(userId: string, options?: Configuration): Promise<void> {
        const result = this.api.usersEmailSend(userId, options);
        return result.toPromise();
    }

    /**
     * Verify users TOTP token
     * @param userId Id of the user you want to verify TOTP code for
     * @param payload The totp token the user sent
     */
    public usersTotpAuth(userId: string, payload: string, options?: Configuration): Promise<User> {
        const result = this.api.usersTotpAuth(userId, payload, options);
        return result.toPromise();
    }

    /**
     * When you want your users to be able to use TOTP authentication you need to send enable set to true as payload to this endpoint. To turn off TOTP set enable to false. When enabling you will recieve the secret key and a QR code link. The QR code you need to show your user for them to scan.
     * Enables or disables Time-based One-Time Password authentication method for specified user
     * @param userId Id of the user you want to enable TOTP for
     * @param totpEnableRequest 
     */
    public usersTotpToggle(userId: string, totpEnableRequest?: TotpEnableRequest, options?: Configuration): Promise<TotpEnableResponse | void> {
        const result = this.api.usersTotpToggle(userId, totpEnableRequest, options);
        return result.toPromise();
    }


}



import { ObservableImagesApi } from './ObservableAPI';

import { ImagesApiRequestFactory, ImagesApiResponseProcessor} from "../apis/ImagesApi";
export class PromiseImagesApi {
    private api: ObservableImagesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ImagesApiRequestFactory,
        responseProcessor?: ImagesApiResponseProcessor
    ) {
        this.api = new ObservableImagesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * This endpoint does not do any lookups of any sort. It will just generate a QR code from the parameters supplied to it.
     * Returns a generated QR code
     * @param tenantName The company name you your users to see in their TOTP application
     * @param userId The userId of the user you want to create the TOTP QR image for
     * @param userSecret The TOTP secret for the specified user
     */
    public imagesTotp(tenantName?: string, userId?: string, userSecret?: string, options?: Configuration): Promise<HttpFile> {
        const result = this.api.imagesTotp(tenantName, userId, userSecret, options);
        return result.toPromise();
    }


}



import { ObservableInternalApi } from './ObservableAPI';

import { InternalApiRequestFactory, InternalApiResponseProcessor} from "../apis/InternalApi";
export class PromiseInternalApi {
    private api: ObservableInternalApi

    public constructor(
        configuration: Configuration,
        requestFactory?: InternalApiRequestFactory,
        responseProcessor?: InternalApiResponseProcessor
    ) {
        this.api = new ObservableInternalApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Returns token that is used by stripe to save card number.
     */
    public tenantsCardtoken(options?: Configuration): Promise<string> {
        const result = this.api.tenantsCardtoken(options);
        return result.toPromise();
    }


}



import { ObservableTenantsApi } from './ObservableAPI';

import { TenantsApiRequestFactory, TenantsApiResponseProcessor} from "../apis/TenantsApi";
export class PromiseTenantsApi {
    private api: ObservableTenantsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TenantsApiRequestFactory,
        responseProcessor?: TenantsApiResponseProcessor
    ) {
        this.api = new ObservableTenantsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * This endpoint is used to update certain information about your tenant. For example if you want to update your tenant's callback URL you will do that here.
     * Updates tenant information
     * @param updateTenantRequest 
     */
    public tenantUpdate(updateTenantRequest?: UpdateTenantRequest, options?: Configuration): Promise<Tenant> {
        const result = this.api.tenantUpdate(updateTenantRequest, options);
        return result.toPromise();
    }

    /**
     * Activates the tenant, checks that all necessary information to activate a tenant is included
     * @param activateTenantRequest 
     */
    public tenantsActivate(activateTenantRequest?: ActivateTenantRequest, options?: Configuration): Promise<Tenant> {
        const result = this.api.tenantsActivate(activateTenantRequest, options);
        return result.toPromise();
    }

    /**
     * Creates new tenant
     * @param createTenantRequest 
     */
    public tenantsCreate(createTenantRequest?: CreateTenantRequest, options?: Configuration): Promise<Tenant> {
        const result = this.api.tenantsCreate(createTenantRequest, options);
        return result.toPromise();
    }

    /**
     * This endpoint will delete your tenant. Will send an email to the admin email address of the tenant confirming that you want to delete your tenant before deletion.
     * Deletes tenant caller is part of, will send verification email before deleting tenant
     */
    public tenantsCreate_1(options?: Configuration): Promise<Tenant> {
        const result = this.api.tenantsCreate_1(options);
        return result.toPromise();
    }

    /**
     * Returns the tenant information the caller is part of
     */
    public tenantsGet(options?: Configuration): Promise<Tenant> {
        const result = this.api.tenantsGet(options);
        return result.toPromise();
    }


}



import { ObservableTokensApi } from './ObservableAPI';

import { TokensApiRequestFactory, TokensApiResponseProcessor} from "../apis/TokensApi";
export class PromiseTokensApi {
    private api: ObservableTokensApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TokensApiRequestFactory,
        responseProcessor?: TokensApiResponseProcessor
    ) {
        this.api = new ObservableTokensApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Creates new token
     * @param createTokenRequest 
     */
    public tokensCreate(createTokenRequest?: CreateTokenRequest, options?: Configuration): Promise<Token> {
        const result = this.api.tokensCreate(createTokenRequest, options);
        return result.toPromise();
    }

    /**
     * Deletes specifed access token
     * @param tokenId Id of the token you want to delete
     */
    public tokensDelete(tokenId: string, options?: Configuration): Promise<void> {
        const result = this.api.tokensDelete(tokenId, options);
        return result.toPromise();
    }

    /**
     * Returns a list of all active tokens in tenant
     * @param size Maximum of results per page
     * @param page The page you want to see
     */
    public tokensList(size?: number, page?: number, options?: Configuration): Promise<TokenList> {
        const result = this.api.tokensList(size, page, options);
        return result.toPromise();
    }


}



import { ObservableUsersApi } from './ObservableAPI';

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class PromiseUsersApi {
    private api: ObservableUsersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Creates a user in tenant, tenant is determined from the token
     * @param createUserRequest 
     */
    public usersCreate(createUserRequest?: CreateUserRequest, options?: Configuration): Promise<User> {
        const result = this.api.usersCreate(createUserRequest, options);
        return result.toPromise();
    }

    /**
     * Deletes specified user
     * @param userId Id of the user you want to delete
     */
    public usersDelete(userId: string, options?: Configuration): Promise<void> {
        const result = this.api.usersDelete(userId, options);
        return result.toPromise();
    }

    /**
     * Returns specified user
     * @param userId userId of user you want to fetch information about
     */
    public usersGet(userId: string, options?: Configuration): Promise<User> {
        const result = this.api.usersGet(userId, options);
        return result.toPromise();
    }

    /**
     * Updates specified user
     * @param userId Id of the user you want to update
     * @param updateUserRequest 
     */
    public usersUpdate(userId: string, updateUserRequest?: UpdateUserRequest, options?: Configuration): Promise<User> {
        const result = this.api.usersUpdate(userId, updateUserRequest, options);
        return result.toPromise();
    }


}



