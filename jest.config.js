module.exports = {
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: "src",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	collectCoverageFrom: [
		"lib/**/*.ts",
		"!lib/**/types/**/*.ts",
		// Impossible to test
		"!lib/utils/date/*.ts",
		"!lib/utils/cli/create-dot-thoth-dir/index.ts",
		"!lib/utils/cli/load-options/index.ts",
		"!lib/utils/cli/load-entities/index.ts",
		"!lib/utils/cli/glob.ts",
	],
	setupFiles: ["./tests/setup.ts"],
	coverageDirectory: "../coverage",
	testEnvironment: "node",
	moduleDirectories: ["node_modules", "src"],
	resetMocks: true,
	coverageThreshold: {
		global: {
			statements: 100,
			branches: 100,
			functions: 100,
			lines: 100,
		},
	},
};
