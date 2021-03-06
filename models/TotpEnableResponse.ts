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

import { URI } from './URI';
import { HttpFile } from '../http/http';

/**
* payload with the secret key and url to QR code image
*/
export class TotpEnableResponse {
    'secretKey': string;
    'qrImage': URI;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "secretKey",
            "baseName": "secretKey",
            "type": "string",
            "format": "password"
        },
        {
            "name": "qrImage",
            "baseName": "qrImage",
            "type": "URI",
            "format": "uri"
        }    ];

    static getAttributeTypeMap() {
        return TotpEnableResponse.attributeTypeMap;
    }
    
    public constructor() {
    }
}

