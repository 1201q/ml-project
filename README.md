## AI 연예인 닮은꼴 찾기 - 세상에 나쁜 얼굴은 없다
<img width="1429" height="676" alt="소개" src="https://github.com/user-attachments/assets/e4401cce-603d-4b97-9147-92eb3bf1fe66" /><br>

- 3학년 1학기에 진행한 머신러닝종합설계 팀 프로젝트의 프론트엔드 코드입니다.
- ML/Backend GitHub: <https://github.com/LeeHataeg/FaceRecognition>

## 프로젝트 소개

> 사용자 얼굴을 촬영(웹캠)하거나 업로드한 뒤, ML API를 통해 닮은 연예인 예측 결과를 받아 보여줍니다. <br> 이 결과를 다른 친구에게 공유할 수도 있어요.
> 
> [사이트 방문하기 (Chrome 최적화)](https://weareugly.vercel.app)

## 기술 스택
### Frontend
- **Next.js 14 (Pages Router)**
- **React 18 + TypeScript**
- **styled-components** (SSR 설정 포함)
- **framer-motion** (전환/등장 애니메이션)
- **jotai** (전역 상태)

### Vision / Media
- **face-api.js** (클라이언트 얼굴 감지)
- **react-webcam** (카메라 캡처)
- **canvas** (얼굴 크롭 처리)

### Network / Backend 연동
- **axios**
- 외부 ML API (`NEXT_PUBLIC_GCP_API_URL`) 엔드포인트:
  - `/extract` : 업로드 이미지에서 얼굴 추출
  - `/isface` : 크롭 이미지 얼굴 유효성 검증
  - `/predict` : 연예인 닮은꼴 예측

### Data / Infra
- **Firebase Firestore** (공유 결과 저장/조회)
- **next-pwa** (PWA 빌드)

## 디렉터리 구조

```bash
.
├── components/          # UI 및 페이지 단위 주요 컴포넌트
│   ├── landing/         # 랜딩 슬라이더/아바타
│   ├── Camera*.tsx      # 카메라 촬영/설정/감지 관련
│   ├── UploadPage.tsx   # 이미지 업로드 및 얼굴 선택
│   ├── Result*.tsx      # 결과/차트/카드/로딩/공유 모달
├── context/             # jotai atom 상태
├── pages/               # Next.js 라우트
│   ├── stage/           # capture/upload/post/result 흐름
│   └── predict/[id].tsx # 공유 결과 페이지(SSR)
├── public/
│   ├── models/          # face-api 모델 파일
│   ├── star/            # 연예인 이미지 에셋
│   ├── avatar/          # 랜딩 아바타
│   └── manifest.json    # PWA 설정
├── utils/               # firebase, blob 변환, size hooks 등
└── types/               # 공용 타입
```

## 페이지 라우팅

- `/` : 랜딩
- `/stage/capture` : 카메라 촬영
- `/stage/upload` : 업로드 얼굴 선택
- `/stage/post?gender=...` : 예측 요청 로딩
- `/stage/result` : 결과 화면
- `/predict/[id]` : 공유 결과 조회 페이지
- `/list` : 저장된 결과 목록(운영/관리성 확인용)

## 개발 포인트

- 모바일 UX 중심의 고정형 컨테이너 렌더링 (`max-width: 780px`)
- 감지 실패/네트워크 실패 시 분기된 사용자 메시지 제공
- 동적 import와 로딩 화면으로 모델 다운로드 UX 개선
- 결과 공유는 Firestore 문서 ID 기반 링크로 단순화

## 주요 기능

- **카메라 기반 촬영 분석**
  - `react-webcam`으로 촬영
  - `face-api.js` TinyFaceDetector로 1차 얼굴 감지
  - 감지 영역을 캔버스로 크롭한 뒤 서버에 얼굴 검증 요청

- **이미지 업로드 분석**
  - 업로드 이미지에서 다중 얼굴 검출 시, 사용자가 분석할 얼굴을 직접 선택
  - 선택된 얼굴 이미지를 다음 분석 단계로 전달

- **예측 결과 시각화**
  - 선택 성별 기준 상위/하위 유사도 결과
  - 반대 성별 기준 결과도 함께 제공
  - 카드 + 퍼센트 바 형태로 랭킹 표시

- **결과 공유**
  - 이름 입력 후 Firestore에 결과 저장
  - `/predict/[id]` 형태의 공유 URL 생성
  - 클립보드 복사 / Web Share API 공유 지원

- **PWA 지원**
  - `next-pwa` + `manifest.json` + service worker
  - 모바일 앱처럼 홈 화면 추가 가능한 형태

## 페이지 기능
### 카메라에서 얼굴 검출
| 검출 성공(카메라) | 검출 실패(카메라) |
|----------|----------|
<img src="https://github.com/user-attachments/assets/fe2c0f54-9e0b-406f-b3bc-ba23ec5a878b" width="300" height="100%"> | <img src="https://github.com/user-attachments/assets/218a53f2-9a93-4c66-88da-904f764d88d7" width="300" height="100%">

### 업로드한 이미지에서 얼굴 검출
| 검출 성공(업로드) | 검출 실패(업로드) |
|----------|----------|
<img src="https://github.com/user-attachments/assets/153fe2f3-e763-447a-a4d6-aa72f10d0a6d" width="300" height="100%"> | <img src="https://github.com/user-attachments/assets/05e7ec6c-fc9c-492b-9bda-39b056756fac" width="300" height="100%">

### 분석 결과
| 분석 로딩 | 분석 결과 조회 | 분석 결과 공유 |
|----------|----------|----------|
<img src="https://github.com/user-attachments/assets/74d2cd1b-e13b-4f0c-81b6-a471b912e031" width="300" height="100%"> | <img src="https://github.com/user-attachments/assets/d7f2f0cb-075c-4e4a-9c5c-245e9f94327e" width="300" height="100%"> | <img src="https://github.com/user-attachments/assets/390a0e37-3c21-49f2-8e0a-48d22c9f1be2" width="300" height="100%">
