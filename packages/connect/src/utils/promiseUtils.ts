export async function resolveAfter(msec: number, value: any): Promise<any> {
    return await new Promise((resolve) => {
        setTimeout(resolve, msec, value);
    });
}
