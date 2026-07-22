type ApiResult<T> = T extends string ? { value: string } : { value: number };

type StringResult = ApiResult<"hello">;
type NonStringResult = ApiResult<123>;
