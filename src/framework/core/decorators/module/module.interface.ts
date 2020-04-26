export enum Scope {
    Singleton = 'Singleton',
    Transient = 'Transient'
}

export interface IModuleMetadata {
    imports?: any[];
    exports?: any[];
    providers?: ProviderMetadata[];
}

export interface ProviderMetadata {
    provide: any;
    useValue: object;
    scope: Scope;
}