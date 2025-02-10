# 마인크래프트 가상국가 시스템
## 기능
1. 은행
2. 공지
3. 문의
추후 더 추가예정

## 사용법
1. mysql url을 .env에 ```DATABASE_URL="mysql://~~~"``` 형식으로 저장한다.
2. ```npm i```
3. ```npx prisma db pull```
4. github 레포지스토리에 올린다
5. vercel에 회원가입하고 새 프로젝트 생성으로 올린 레포지스토리 선택.
6. build커맨드 수정하기: 기본(next build) => ```npx prisma generate && next build```