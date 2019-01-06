export class EnumUtils {

  static convertKeys(enumType: object) {
    const members = Object.keys(enumType);
    return members.filter((x) => Number.isNaN(parseInt(x, 10))).map((key) => {
      return { key, value: enumType[key] }
    })
  }
}
