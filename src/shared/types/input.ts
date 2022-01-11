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
    id:string,
    color?:number
    pos?:Position
}
export interface DrawStart {
    mode:DT,
    id:string,
    color:number,
    pos:Position
}
export interface DrawContinue {
    mode:DT,
    id:string,
    pos:Position
}
export interface DrawFinish {
    mode:DT,
    id:string,
    pos:Position
}
export interface DrawDelete {
    mode:DT,
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
    lines:Array<Line>
}

export interface None {

}