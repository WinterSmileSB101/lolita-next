import { InvalidModuleExceptionMessage } from "./constants";

export class InvalidModuleException extends Error {
    constructor(property: string) {
        super(InvalidModuleExceptionMessage(property));
    }
}