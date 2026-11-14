import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'cardNumber',
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) {
    return '';
  }
  const digits = value.toString().replace(/\D/g, '').slice(0, 16);
  return digits.match(/.{1,4}/g)?.join('-') || '';
  }
}
