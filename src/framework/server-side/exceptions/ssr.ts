export class SSRException {
    error: Error;

    constructor(e: Error) {
        this.error = e;
    }
}