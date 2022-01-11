export interface Join {
    username:string
}

export enum DT {
    Start = 0,
    Continue,
    Finish,
    Delete
}

export interface Position {
    x:number,
    y:number
}

export interface Draw {
    mode:DT,
    time:number,
    id:string,
    color?:number
    pos?:Position
}
export interface DrawStart {
    mode:DT,
    time:number,
    id:string,
    color:number,
    pos:Position
}
export interface DrawContinue {
    mode:DT,
    time:number,
    id:string,
    pos:Position
}
export interface DrawFinish {
    mode:DT,
    time:number,
    id:string,
    pos:Position
}
export interface DrawDelete {
    mode:DT,
    time:number,
    id:string
}

export interface Line {
    id:string,
    owner:string,
    finished:boolean,
    color:number,
    segments:Array<Position>
}

export interface Whiteboard {
    time:number,
    lines:Array<Line>
}

export interface Sync {
    
}

export interface None {

}