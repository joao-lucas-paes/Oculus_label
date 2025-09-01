module.exports = {
    testEnvironment: "node",
    verbose: true,
    preset: 'ts-jest',
    testPathIgnorePatterns: ["/sample_data/"],
    moduleNameMapper: {
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@arc/(.*)$': '<rootDir>/src/arc/$1',
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@ui/(.*)$': '<rootDir>/src/ui/$1',
        '^@const/(.*)$': '<rootDir>/src/const/$1'
    }
};