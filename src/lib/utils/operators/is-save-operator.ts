import { SaveOperator } from "../../repository/operators/save/base";

export const isSaveOperator = (value: any) => value instanceof SaveOperator;
