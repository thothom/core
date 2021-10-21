import { isFindOperator } from "./is-find-operator";
import { isSaveOperator } from "./is-save-operator";

export const isOperator = (value: any) =>
	isFindOperator(value) || isSaveOperator(value);
