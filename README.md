# Vision Prompt

Vision Prompt는 AI로 생성된 이미지와 그에 대한 프롬프트를 보여주는 웹 애플리케이션입니다. 사용자들은 다양한 AI 생성 이미지를 탐색하고, 각 이미지에 대한 상세한 프롬프트 정보를 확인할 수 있습니다.


## 기술 스택

- **프론트엔드**
  - React 19
  - TypeScript
  - Vite
  - React Router DOM
  - GSAP
  - Color Thief (이미지 색상 분석)
  - Zustand

## 시작하기

### 필수 조건

- Node.js (최신 LTS 버전 권장)
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone [repository-url]

# 프로젝트 디렉토리로 이동
cd vision-prompt

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

### 빌드

```bash
npm run build
# 또는
yarn build
```

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── store/         # 상태 관리
├── utils/         # 유틸리티 함수
├── data/          # 정적 데이터
└── assets/        # 이미지 및 기타 자산
```