# 실행 환경 세팅하기

아래 프로그램들의 설치가 필요합니다.

- NodeJS
- npm

우분투를 기준으로, 아래의 명령어를 입력하여 실행환경을 준비할 수 있습니다.

```
sudo apt-get install -y nodejs npm;
```

https://www.epost.go.kr/search/zipcode/areacdAddressDown.jsp

위 주소에서 `지역별 주소 DB`라는 이름의 데이터를 다운로드 받습니다.
압축을 해제한 후, 폴더 안에 존재하는 모든 `.txt`파일을 이 프로젝트의
`data`폴더에 옮겨 아래와 같은 폴더 구조를 만듭니다.

```
korea-zipcode-db-to-sqlite
    ㄴdata
        ㄴ 서울특별시.txt
        ㄴ 대전광역시.txt
        ㄴ ...
    ㄴsrc
        ㄴ ...
    ㄴ ...
```

아래의 명령어를 입력하여 프로그램을 실행합니다.

```
npm i; npm start;
```

실행이 끝나면 `result.sqlite` 파일에 데이터가 변환되어 저장됩니다.