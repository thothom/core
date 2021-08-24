import { NamingStrategy } from "../format-naming-strategy/types/naming-strategy";

export interface FormatPrefixSuffixParams {
	value: string;
	defaultCase?: NamingStrategy;
	options?: {
		add?: string;
		remove?: string;
	};
}
