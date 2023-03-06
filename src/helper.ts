export interface Product {
  type: string;
  name: string;
  [key: string]: string | number;
};
export type fieldType = "string" | "number";
export type FieldDefinition = [string, string, fieldType];
