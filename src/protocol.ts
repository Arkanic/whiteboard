import path from "path";
import * as tjs from "typescript-json-schema";
import {Validator} from "jsonschema";

const settings:tjs.PartialArgs = {
    required: true
}
const compilerOptions:tjs.CompilerOptions = {
    strictNullChecks: true
}

const program = tjs.getProgramFromFiles([path.resolve("./src/shared/types/input.ts")], compilerOptions);
const generator = tjs.buildGenerator(program, settings) as tjs.JsonSchemaGenerator;

const validator = new Validator();

export function validateInput(json:any, policy:string):boolean {
    let schema = generator.getSchemaForSymbol(policy);

    let validatorResult = validator.validate(json, schema as any);

    return validatorResult.valid;
}