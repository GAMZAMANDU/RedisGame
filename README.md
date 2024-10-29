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
  - 📌 package.json에 `"type": "module"` 넣으면 사용 가능
  
  > Node.js 생태계는 ESM으로 있음
 다만.. https://velog.io/@runprogrmm/CommonJs%EC%99%80-ECMAScript-ModulesESM

### 2. Redis의 네임스페이스 패턴
  namespace : 키에 특정 접두어(네임스페이스)를 추가하여 관련 데이터를 그룹화하는 방법
  Redis식 namespace : `user:1001:속성` 이런 느낌~~

### 3. Redis 감 익히기
  1. Redis가 메모리 기반 데이터 저장소이다보니 Redis-server를 끄면 데이터가 사라짐 -> 휘발성
  2. Redis가 제공하는 자료형들의 복합사용을 연습해봐야할 것 같음

### 4. Redis Server 종료하기
  터미널에서 Redis Server를 종료할 때 `redis-cli SHUTDOWN`를 입력하면 데이터를 디스크에 저장한 후 서버 종료
  `Ctrl + C`(강제종료)를 하면 데이터가 휘발~~

### 5. Ctrl + C를 해도 휘발이 안됨
  이유는 Redis가 영속성 옵션이 켜져있거나 안전하게 서버를 종료했기 때문임
  
  RDB : Redis는 주기적`(특정 횟수 이상의 변경 or 특정 시간 경과)`으로 메모리의 데이터를 스냅샷하여 디스크를 저장
  - 바이너리 형식으로 저장
  - 서버 재시작 시 해당 파일을 통해 데이터 복원
  마지막 스냇샷 이후의 데이터가 손실될 위험이 있음

  AOF : Append Only File
  - 모든 쓰기 명령을 로그 형태로 기록
  - 서버가 재시작 시 해당 로그를 사용하여 마지막 상태를 복원
  - 로그는 주기적`(용량 > 임계값)`으로 재작성되어 최적화됨
    AOF 파일에 기록된 명령 중, 상태를 복원할 수 있는 최소한의 명령만 저장함
