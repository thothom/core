import { NamingPatterns } from "../../types/naming-pattern";

export interface HandlePrefixSuffixParams {
	value: string;
	defaultCase?: NamingPatterns;
	options?: {
		add?: string;
		remove?: string;
	};
}
