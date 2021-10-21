import { SaveOperatorType } from "./save-operators-type";

interface ConstructorParams<T> {
	type: SaveOperatorType;
	values: Array<T>;
}

/**
 * Save Operator used in Save Operations.
 */
export class SaveOperator {
	/**
	 * Operator type.
	 */
	public readonly type: SaveOperatorType;

	/**
	 * Parameter values.
	 */
	public readonly values: Array<any>;

	public constructor({ type, values }: ConstructorParams<any>) {
		this.type = type;
		this.values = values;
	}
}
