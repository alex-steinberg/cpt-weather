export interface Deserializable<T> {
  setFromObject?(json: any): T;
}
