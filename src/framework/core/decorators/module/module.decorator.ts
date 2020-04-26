import 'reflect-metadata';// defineMetadata come from this
import { IModuleMetadata } from "./module.interface";
import { METADATA } from './constants';
import { InvalidModuleException } from './exceptions/invalid-module-exception';

const metadataKeys=[
    METADATA.IMPORTS,
    METADATA.PROVIDERS,
    METADATA.EXPORTS
];


const validateKeys = (keys:string[])=>{

    const isKeyValid = key=>metadataKeys.findIndex(k=>k===key)<0

    const validateKey = key=>{
        if(isKeyValid(key)){
            throw new InvalidModuleException(key);
        }
    }

    keys.forEach(validateKey);

};


export function LTModule(obj:IModuleMetadata) :ClassDecorator{
    const propsKeys = Object.keys(obj);
    //validate keys
    validateKeys(propsKeys);

    return (target:object)=>{
        for (const property in obj) {
            if(obj.hasOwnProperty(property))
            {
                Reflect.defineMetadata(property,obj[property],target);
            }   
        }
    }
}