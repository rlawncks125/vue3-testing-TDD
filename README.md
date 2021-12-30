# vue-testing-vue-utils

설치

```
vue add unit-jest
```

# vue-testing-library 라이브러리 적용

설치

```
npm install --save-dev @testing-library/vue // x 에러발생

npm install --save-dev @testing-library/vue@next

```

# vue-utils vs testing-library

```
testing-library 데이터 접근
- 내부 데이터 접근 x
- text , role ,placeholderText , title, Testid(data-testid),...

vue-utils 데이터 접근
- 내부 데이터 접근 o
- find( seletor( #id , .class , ref, ... ) )
```

# cypress testing-libaray 라이브러리 적용

설치

```

npm install --save-dev cypress @testing-library/cypress

```

코드추가

```

import "@testing-library/cypress/add-commands";

```

```

```
