import {
    Injectable,
} from '@angular/core';

@Injectable()
export class YnabErrorService {
    constructor(
    ) { }

    public processError(error: any): void {
        console.log(error);
        // TODO this will need to do something much more useful like go to YNAB's error page or something
    }
}
