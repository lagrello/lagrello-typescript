/**
 * Lagrello API
 * API specification for Lagrello, a simple to use authentication service
 *
 * OpenAPI spec version: 1.0.0
 * Contact: support@lagrello.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

/**
* request to enable google authenticator method for user
*/
export class TotpEnableRequest {
    'enable': boolean;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "enable",
            "baseName": "enable",
            "type": "boolean",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return TotpEnableRequest.attributeTypeMap;
    }
    
    public constructor() {
    }
}

