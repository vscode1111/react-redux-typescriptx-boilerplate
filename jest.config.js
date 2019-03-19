module.exports = {
   "roots": [
      "<rootDir>/src"
   ],
   "transform": {
      "^.+\\.tsx?$": "ts-jest"
   },
   //"testRegex": "(/__tests23__/.*|(\\.|/)(test|spec))\\.tsx?$",
   //"testRegex": "/__tests__/App.test.tsx",
   "testRegex": "/__tests__/.*",
   "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
   ],
}