class Logger {
    color:string;
    name:string;

    constructor(name:string, color:string) {
        this.name = name;
        this.color = color;
    }

    log(message:string) {
        console.log(`[%c${this.name}%c]: ${message}`, `color: ${this.color}; font-weight: bold`, "");
    }

    error(message:string) {
        console.log(`[%c${this.name}%c]: ${message}`, `color: ${this.color}; font-weight: bold`, "color: red; font-weight: bold;");
    }
}

export default Logger;