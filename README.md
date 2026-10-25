# emberjihyo

AI engineer & creator Ember의 한국어·영어 퍼스널 홈페이지.

## 파일 구성

- `index.html`: 콘텐츠와 한국어·영어 문구 (`data-ko`, `data-en`)
- `styles.css`: 디자인, 반응형 레이아웃, Inter·Pretendard 서체
- `script.js`: 언어 전환 및 선택 저장
- `.nojekyll`: GitHub Pages 정적 파일 배포

## 로컬에서 보기

설치나 빌드가 필요 없습니다. `index.html`을 브라우저로 열거나 아래 명령으로 미리 볼 수 있습니다.

```sh
python3 -m http.server 8000
```

브라우저에서 http://localhost:8000 을 엽니다.

## 배포

GitHub 저장소의 Settings → Pages에서 `Deploy from a branch`, `main`, `/(root)`를 선택합니다. 이후 main 브랜치에 push하면 홈페이지도 자동 갱신됩니다.

폰트는 Google Fonts와 Pretendard CDN에서 불러옵니다. Free guide는 포함하지 않습니다.
