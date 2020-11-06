declare module "*.png";

interface FormDataValue {
  uri: string;
  name: string;
  type: string;
}

interface FormData {
  append(name: string, value: FormDataValue, fileName?: string): void;
  set(name: string, value: FormDataValue, fileName?: string): void;
}
