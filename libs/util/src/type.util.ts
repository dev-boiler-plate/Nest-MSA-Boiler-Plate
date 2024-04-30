export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// 함수 제외
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

// 클래스 선언
export type ClassType<T> = { new (...args: any): T };

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type BrandString<T> = string & { _brand: T };
export type BrandNumber<T> = number & { _brand: T };

export const assertNever = (param: never): never => {
  throw Error('never');
};
