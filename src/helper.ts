export interface Product {
  type: string;
  [key: string]: string | number;
};
export type fieldType = "string" | "number";
export type FieldDefinition = [string, string, fieldType];
