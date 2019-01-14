interface APIConfig {
    networkCode: string;
    appName: string;
    apiVersion: string;
    serviceAccount: string;
    keyfilePath?: string;
    keyData?: string;
}
export default class {
    DFP: any;
    DFPUser: any;
    constructor(config: APIConfig);
    callServiceMethodWithPayload(Service: any, Method: any, payload: any): Promise<any>;
}
export {};
