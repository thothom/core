/* eslint-disable capitalized-comments */

module.exports = {
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: "src",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	collectCoverageFrom: ["**/*.ts"],
	setupFiles: ["./tests/setup.ts"],
	coverageDirectory: "../coverage",
	testEnvironment: "node",
	moduleDirectories: ["node_modules", "src"],
	resetMocks: true,
	/*
	 * coverageThreshold: {
	 * 	global: {
	 * 		branches: 100,
	 * 		functions: 100,
	 * 		lines: 100,
	 * 		statements: 100,
	 * 	},
	 * },
	 */
};
