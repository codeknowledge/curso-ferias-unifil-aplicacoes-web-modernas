import { Pipe, PipeTransform } from '@angular/core'; 


@Pipe({
    name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
    
    transform(value: Date): string {        
        return moment(value).fromNow();
    }
}
