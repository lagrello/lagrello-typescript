import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class ObservableAuthApi {
    private requestFactory: AuthApiRequestFactory;
    private responseProcessor: AuthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AuthApiResponseProcessor();
    }

    /**
     * Gives back user data for the magic link token
     * @param payload The magic link token the user sent
     */
    public usersEmailAuth(payload: string, options?: Configuration): Observable<User> {
        const requestContextPromise = this.requestFactory.usersEmailAuth(payload, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersEmailAuth(rsp)));
            }));
    }
 
    /**
     * This endpoint will be used when you want to send a magic login link to specified user
     * @param userId Id of the user you want to send magic link to
     */
    public usersEmailSend(userId: string, options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.usersEmailSend(userId, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersEmailSend(rsp)));
            }));
    }
 
    /**
     * Verify users TOTP token
     * @param userId Id of the user you want to verify TOTP code for
     * @param payload The totp token the user sent
     */
    public usersTotpAuth(userId: string, payload: string, options?: Configuration): Observable<User> {
        const requestContextPromise = this.requestFactory.usersTotpAuth(userId, payload, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersTotpAuth(rsp)));
            }));
    }
 
    /**
     * When you want your users to be able to use TOTP authentication you need to send enable set to true as payload to this endpoint. To turn off TOTP set enable to false. When enabling you will recieve the secret key and a QR code link. The QR code you need to show your user for them to scan.
     * Enables or disables Time-based One-Time Password authentication method for specified user
     * @param userId Id of the user you want to enable TOTP for
     * @param totpEnableRequest 
     */
    public usersTotpToggle(userId: string, totpEnableRequest?: TotpEnableRequest, options?: Configuration): Observable<TotpEnableResponse | void> {
        const requestContextPromise = this.requestFactory.usersTotpToggle(userId, totpEnableRequest, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersTotpToggle(rsp)));
            }));
    }
 
}

import { ImagesApiRequestFactory, ImagesApiResponseProcessor} from "../apis/ImagesApi";
export class ObservableImagesApi {
    private requestFactory: ImagesApiRequestFactory;
    private responseProcessor: ImagesApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ImagesApiRequestFactory,
        responseProcessor?: ImagesApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ImagesApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ImagesApiResponseProcessor();
    }

    /**
     * This endpoint does not do any lookups of any sort. It will just generate a QR code from the parameters supplied to it.
     * Returns a generated QR code
     * @param tenantName The company name you your users to see in their TOTP application
     * @param userId The userId of the user you want to create the TOTP QR image for
     * @param userSecret The TOTP secret for the specified user
     */
    public imagesTotp(tenantName?: string, userId?: string, userSecret?: string, options?: Configuration): Observable<HttpFile> {
        const requestContextPromise = this.requestFactory.imagesTotp(tenantName, userId, userSecret, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.imagesTotp(rsp)));
            }));
    }
 
}

import { InternalApiRequestFactory, InternalApiResponseProcessor} from "../apis/InternalApi";
export class ObservableInternalApi {
    private requestFactory: InternalApiRequestFactory;
    private responseProcessor: InternalApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: InternalApiRequestFactory,
        responseProcessor?: InternalApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new InternalApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new InternalApiResponseProcessor();
    }

    /**
     * Returns token that is used by stripe to save card number.
     */
    public tenantsCardtoken(options?: Configuration): Observable<string> {
        const requestContextPromise = this.requestFactory.tenantsCardtoken(options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.tenantsCardtoken(rsp)));
            }));
    }
 
}

import { TenantsApiRequestFactory, TenantsApiResponseProcessor} from "../apis/TenantsApi";
export class ObservableTenantsApi {
    private requestFactory: TenantsApiRequestFactory;
    private responseProcessor: TenantsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TenantsApiRequestFactory,
        responseProcessor?: TenantsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TenantsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TenantsApiResponseProcessor();
    }

    /**
     * This endpoint is used to update certain information about your tenant. For example if you want to update your tenant's callback URL you will do that here.
     * Updates tenant information
     * @param updateTenantRequest 
     */
    public tenantUpdate(updateTenantRequest?: UpdateTenantRequest, options?: Configuration): Observable<Tenant> {
        const requestContextPromise = this.requestFactory.tenantUpdate(updateTenantRequest, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.tenantUpdate(rsp)));
            }));
    }
 
    /**
     * Activates the tenant, checks that all necessary information to activate a tenant is included
     * @param activateTenantRequest 
     */
    public tenantsActivate(activateTenantRequest?: ActivateTenantRequest, options?: Configuration): Observable<Tenant> {
        const requestContextPromise = this.requestFactory.tenantsActivate(activateTenantRequest, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.tenantsActivate(rsp)));
            }));
    }
 
    /**
     * Creates new tenant
     * @param createTenantRequest 
     */
    public tenantsCreate(createTenantRequest?: CreateTenantRequest, options?: Configuration): Observable<Tenant> {
        const requestContextPromise = this.requestFactory.tenantsCreate(createTenantRequest, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.tenantsCreate(rsp)));
            }));
    }
 
    /**
     * This endpoint will delete your tenant. Will send an email to the admin email address of the tenant confirming that you want to delete your tenant before deletion.
     * Deletes tenant caller is part of, will send verification email before deleting tenant
     */
    public tenantsCreate_1(options?: Configuration): Observable<Tenant> {
        const requestContextPromise = this.requestFactory.tenantsCreate_1(options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.tenantsCreate_1(rsp)));
            }));
    }
 
    /**
     * Returns the tenant information the caller is part of
     */
    public tenantsGet(options?: Configuration): Observable<Tenant> {
        const requestContextPromise = this.requestFactory.tenantsGet(options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.tenantsGet(rsp)));
            }));
    }
 
}

import { TokensApiRequestFactory, TokensApiResponseProcessor} from "../apis/TokensApi";
export class ObservableTokensApi {
    private requestFactory: TokensApiRequestFactory;
    private responseProcessor: TokensApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TokensApiRequestFactory,
        responseProcessor?: TokensApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TokensApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TokensApiResponseProcessor();
    }

    /**
     * Creates new token
     * @param createTokenRequest 
     */
    public tokensCreate(createTokenRequest?: CreateTokenRequest, options?: Configuration): Observable<Token> {
        const requestContextPromise = this.requestFactory.tokensCreate(createTokenRequest, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.tokensCreate(rsp)));
            }));
    }
 
    /**
     * Deletes specifed access token
     * @param tokenId Id of the token you want to delete
     */
    public tokensDelete(tokenId: string, options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.tokensDelete(tokenId, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.tokensDelete(rsp)));
            }));
    }
 
    /**
     * Returns a list of all active tokens in tenant
     * @param size Maximum of results per page
     * @param page The page you want to see
     */
    public tokensList(size?: number, page?: number, options?: Configuration): Observable<TokenList> {
        const requestContextPromise = this.requestFactory.tokensList(size, page, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.tokensList(rsp)));
            }));
    }
 
}

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class ObservableUsersApi {
    private requestFactory: UsersApiRequestFactory;
    private responseProcessor: UsersApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new UsersApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new UsersApiResponseProcessor();
    }

    /**
     * Creates a user in tenant, tenant is determined from the token
     * @param createUserRequest 
     */
    public usersCreate(createUserRequest?: CreateUserRequest, options?: Configuration): Observable<User> {
        const requestContextPromise = this.requestFactory.usersCreate(createUserRequest, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersCreate(rsp)));
            }));
    }
 
    /**
     * Deletes specified user
     * @param userId Id of the user you want to delete
     */
    public usersDelete(userId: string, options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.usersDelete(userId, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersDelete(rsp)));
            }));
    }
 
    /**
     * Returns specified user
     * @param userId userId of user you want to fetch information about
     */
    public usersGet(userId: string, options?: Configuration): Observable<User> {
        const requestContextPromise = this.requestFactory.usersGet(userId, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersGet(rsp)));
            }));
    }
 
    /**
     * Updates specified user
     * @param userId Id of the user you want to update
     * @param updateUserRequest 
     */
    public usersUpdate(userId: string, updateUserRequest?: UpdateUserRequest, options?: Configuration): Observable<User> {
        const requestContextPromise = this.requestFactory.usersUpdate(userId, updateUserRequest, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.usersUpdate(rsp)));
            }));
    }
 
}
