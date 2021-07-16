module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  roots: [
      "./dist"
  ],
  testEnvironment: "node",
  transform: {
      '^.+\\.tsx?$': 'ts-jest'
  },
};