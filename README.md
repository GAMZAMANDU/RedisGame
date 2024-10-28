## 학습내용

### 1. CJS(commonJS), ESM(ES Modules)
  CJS`(commonJS)` : 
  - Node.js 환경에서 주로 사용되는 모듈 시스템
  - 모듈을 동기적으로 로드
  - `require`를 사용하여 모듈을 가져오고, `module.exports`를 통해 모듈을 내보냄

  ESM`(ES Modules)` :
  - 브라우저와 Node.js에서 모두 사용가능 (최신 JavaScript 표준)
  - 모듈을 비동기적으로 로드
  - `import`와 `export` 키워드를 사용
  📌 package.json에 `"type": "module"` 넣으면 사용 가능
  
  > Node.js 생태계는 ESM으로 있음
 다만.. https://velog.io/@runprogrmm/CommonJs%EC%99%80-ECMAScript-ModulesESM

### 2. Redis의 네임스페이스 패턴
  namespace : 키에 특정 접두어(네임스페이스)를 추가하여 관련 데이터를 그룹화하는 방법
  Redis식 namespace : `user:1001:속성` 이런 느낌~~

### 3. Redis 감 익히기
  1. Redis가 메모리 기반 데이터 저장소이다보니 Redis-server를 끄면 데이터가 사라짐 -> 휘발성
  2. Redis가 제공하는 자료형들의 복합사용을 연습해봐야할 것 같음
