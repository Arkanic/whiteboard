import {createGenerator} from "ts-json-schema-generator";
import {Validator} from "jsonschema";

const tsjInputConfig = {
    path: "src/shared/types/draw.ts",
    tsconfig: "tsconfig.json",
    type: "*"
}

const generator = createGenerator(tsjInputConfig);
const validator = new Validator();


export function validateInput(json:any, policy:string):boolean {
    let schema = generator.createSchema(policy);
    let validatorResult = validator.validate(json, schema.definitions![policy] as any);

    return validatorResult.valid;
}