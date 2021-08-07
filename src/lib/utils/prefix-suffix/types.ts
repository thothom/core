import { NamingPatterns } from "../format-naming-pattern/types/naming-patterns";

export interface FormatPrefixSuffixParams {
	value: string;
	defaultCase?: NamingPatterns;
	options?: {
		add?: string;
		remove?: string;
	};
}
