import { NamingPatterns } from "../../types/naming-patterns";

export interface HandlePrefixSuffixParams {
	value: string;
	defaultCase?: NamingPatterns;
	options?: {
		add?: string;
		remove?: string;
	};
}
