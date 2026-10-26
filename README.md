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

## 검색 정보 관리

각 페이지의 head에 대표 주소, 페이지별 제목·설명, 공유 메타 정보와 JSON-LD를 둡니다. 노트의 저자와 작성·수정 날짜는 화면 표시와 구조화 데이터를 함께 갱신하세요. 영문 전환 문구는 홈페이지와 Notes 목록의 title·description에 있는 `data-en`에서 관리합니다. 현재 영문 보기는 같은 URL의 언어 전환 기능이며 별도의 영문 검색 페이지는 아닙니다.

노트를 추가하면 `notes.html` 목록과 `sitemap.xml`에 실제 주소를 추가하세요. 사이트맵에는 미리보기 쿼리나 페이지 내 앵커를 넣지 않고, `lastmod`는 해당 페이지를 실제로 수정한 날만 기록합니다. `robots.txt`는 이 사이트맵을 안내합니다.

배포 후 Google Search Console에서 도메인 소유권을 확인하고 사이트맵을 제출하면 수집·색인 상태를 확인할 수 있습니다. 구조화 데이터는 Google Rich Results Test에서도 검사할 수 있습니다. 이 파일들은 GitHub Pages 배포 후 공개됩니다.
