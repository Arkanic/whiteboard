export function htod(h:string):number {
    return parseInt(h, 16);
}

export function dtoh(d:number):string {
    return d.toString(16).padStart(6, "0");
}