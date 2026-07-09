# 디스패처 패턴 구현 (Dispatcher Pattern Implementation)

## 개요
이 구현은 **디스패처 패턴**을 통해 다양한 렌더링 포맷을 관리하는 방식을 보여줍니다.

## 변경사항

### 이전 코드 (Before)
```javascript
const statement = (invoice, plays) => {
  return renderPlainText(createStatementData(invoice, plays));
};

const htmlStatement = (invoice, plays) => {
  return renderHtml(createStatementData(invoice, plays));
};
```

두 개의 분리된 함수로 각 포맷을 처리했습니다.

### 개선된 코드 (After)
```javascript
const statement = (invoice, plays, format = "text") => {
  const renderers = {
    text: renderPlainText,
    html: renderHtml,
  };

  const renderer = renderers[format];
  if (!renderer) {
    throw new Error(`Unknown format: ${format}`);
  }

  return renderer(createStatementData(invoice, plays));
};
```

## 디스패처 패턴의 이점

### 1. 단일 진입점 (Single Entry Point)
모든 포맷이 하나의 함수 `statement()`를 통해 관리됩니다.

### 2. 확장성 (Extensibility)
새로운 포맷을 추가하려면 `renderers` 객체에 새로운 렌더러를 추가하기만 하면 됩니다:

```javascript
const renderers = {
  text: renderPlainText,
  html: renderHtml,
  json: renderJson,      // 새 포맷 추가
  xml: renderXml,        // 새 포맷 추가
};
```

### 3. 유지보수성 (Maintainability)
- 렌더러 함수들이 명확하게 분리됨
- 포맷 처리 로직이 중앙 집중식으로 관리됨
- 포맷 검증이 한 곳에서 수행됨

## 사용 예시

```javascript
const statement = require("./chapter1/index.js");
const plays = require("./chapter1/plays.json");
const invoices = require("./chapter1/invoices.json");

// 기본값 (text format)
const textStatement = statement(invoices[0], plays);

// 명시적으로 format 지정
const textStatement = statement(invoices[0], plays, "text");
const htmlStatement = statement(invoices[0], plays, "html");

// 잘못된 format은 에러 발생
statement(invoices[0], plays, "invalid"); // Error: Unknown format: invalid
```

## 테스트 결과

모든 테스트가 성공적으로 통과했습니다:
- ✅ 기본 text format 테스트
- ✅ 명시적 text format 지정 테스트
- ✅ HTML format 테스트
- ✅ 잘못된 format 에러 처리 테스트

```bash
npm test
# tests 4 pass 4 fail 0
```

## 다음 단계

이 패턴을 더욱 발전시키기 위해 다음을 고려할 수 있습니다:

1. **Strategy 패턴으로 발전**: 렌더러를 클래스로 구현
2. **Factory 패턴 추가**: 렌더러 생성 로직 분리
3. **플러그인 아키텍처**: 동적으로 새로운 렌더러 등록
4. **타입스크립트**: 타입 안정성 추가
