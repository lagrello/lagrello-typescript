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

export class Paging {
    'previous': URI;
    'next': URI;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "previous",
            "baseName": "previous",
            "type": "URI",
            "format": "uri"
        },
        {
            "name": "next",
            "baseName": "next",
            "type": "URI",
            "format": "uri"
        }    ];

    static getAttributeTypeMap() {
        return Paging.attributeTypeMap;
    }
    
    public constructor() {
    }
}

