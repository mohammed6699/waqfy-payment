export interface QuickPayment {
    result: ResultPayment[],
    success: boolean,
    errors: string[]
}
export interface ResultPayment {
    amount: number,
    id: number,
    lastModifiedAt: string,
    lastModifiedBy: string
}   