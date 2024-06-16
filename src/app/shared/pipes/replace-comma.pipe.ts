import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'replaceComma'
})

export class ReplaceComma implements PipeTransform{

  public transform(value:any): string {
    if (!!value){
      value = value.toString();
      return value.replace(/,/g,'.');
    }
    else {
      return '';
    }
  }
}
