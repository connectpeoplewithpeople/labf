export class ArrayUtil {
  public static isInArray(arr: any[], value: any): boolean {
    let result: boolean = false;

    for (let i = 0;i < arr.length;++i) {
      if (arr[i] == value) {
        result = true;
        break;
      }
    }

    return result;
  }
}
