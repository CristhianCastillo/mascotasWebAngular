import {environment} from '@env/environment';

export class CommonUtils {

  static getRandomColorHex(): string {
    let hex = environment.components.dashboard['random.letters'], color: string = '#';
    for (let i = 1; i <= 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
