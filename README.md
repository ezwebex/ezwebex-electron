# ezwebex-electron
가천대학교 재학생을 위한 시간표 연동 웹엑스 게이트웨이 서비스 입니다.

## 수동 빌드 방법

### 빌드 환경 설정
Dev Dependencies: `nodeJS 14.x`, `git`  

1. 해당 레포지토리를 클론합니다. 다음 명령어로 가능합니다.
   `git clone https://github.com/ezwebex/ezwebex-electron`

2. yarn 이 시스템에 설치 되어있지 않은 경우 시스템 전역으로 yarn 을 설치합니다.
   * Windows: 
     - winget package manager  
       `winget install yarn`  

     - chocolatey package manager  
       `choco install yarn`
   * Others:
     `npm install -g yarn`

     npm이 설치되지 않은 경우 플랫폼에 따라 다음과 같이 설치합니다.
     - macOS (deps: homebrew)  
       `brew install npm`
     - Debian (node-source apt repository required)   
       `apt install npm`
     - Fedora (or CentOS, RHEL 7+)
       `dnf install nodejs-npm`

3. `yarn` 을 이용해 디펜던시를 설치합니다.

### 개발 환경으로 실행
1. `yarn tsc` 를 이용해 타입스크립트 코드를 자바스크립트로 트랜스파일합니다.
2. `yarn start` 로 개발 모드로 실행합니다.

### 패키징 하는 방법
1. `yarn tsc` 를 이용해 타입스크립트 코드를 자바스크립트로 트랜스파일합니다.
2. `yarn package` 를 이용해 패키지를 만듭니다.

### 설치 프로그램 생성 하는 방법
1. `yarn tsc` 를 이용해 타입스크립트 코드를 자바스크립트로 트랜스파일합니다.
2. `yarn make` 를 이용해 설치 프로그램을 만듭니다.

## 라이선스

추후 라이선스 예정입니다. 아직 코드 퀄리티도 좋지 않아서, 여러번 refactor 후 적용 예정입니다.
