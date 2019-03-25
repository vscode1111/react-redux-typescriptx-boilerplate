module.exports = {
   "roots": [
      "<rootDir>/src"
   ],
   "transform": {
      "^.+\\.tsx?$": "ts-jest"
   },
   //"testRegex": "(/__tests23__/.*|(\\.|/)(test|spec))\\.tsx?$",
   //"testRegex": "/__tests__/index.test.ts",
   "testRegex": "/__tests__/.*",
   "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
   ],
   "moduleNameMapper": {
      "app/(.*)": "<rootDir>/src/app/$1",
      "\\.(css|less)$": "identity-obj-proxy"
   }
}