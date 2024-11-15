# 🤖 Nota AI

-   AI 채팅창을 구현하는 과제 프로젝트 입니다.
-   작업 기간: 2024.11.07 ~ 2023.11.14

<br>

## 🛠 Libraries

-   Next
-   Tailwind, SCSS
-   React Query
-   Zustand
-   Storybook

<br>

## 📂 Directory

```
📂 src
├── 📂 apis // 전페이지 공통 api (현재 X)
├── 📂 components // 전페이지 공통으로 사용하는 컴포넌트 (with. stories)
│   ├── shadcn // shadcn 아토믹 컴포넌트
├── 📂 app
│   ├── 📂 [chat_id] // 대화창 페이지
│   │   ├── 📂 _apis // 해당 페이지 api
│   │   ├── 📂 _components // 해당 페이지 컴포넌트
│   │   ├── 📂 _models // 해당 페이지 data model
│   ├── 📂 new // 채팅창 생성 로딩 페이지
│   ├── error.tsx // 전역 error 페이지
│   └── page.tsx // 채팅창 생성 페이지
├── 📂 hooks
├── 📂 layout // 전체 공통 UI
│   ├── 📂 _apis // 레이아웃 api
│   ├── 📂 _components // 레이아웃 컴포넌트
│   ├── 📂 _models // 레이아웃 data model
│   ├── 📂 _services // 레이아웃 비즈니스 로직
├── 📂 modules
├── 📂 providers
├── 📂 services
├── 📂 stores
├── 📂 styles
├── 📂 types
└── 📂 utils
```

<br>

## 🕹 실행 방법

1. 터미널에 `yarn install`을 입력하여 node modules를 설치한다.

```
yarn install
```

2. env.local을 생성한다.

```
(mock url이므로 현재 git에 있습니다.
따로 생성하지 않으셔도 됩니다.)
```

3. 터미널에 `yarn dev`를 입력한다.

```
yarn dev
```

4. [http://localhost:3000](http://localhost:3000) 에 접속한다.

5. storybook 명령어: `yarn storybook`

<br>

## 🚀 개선 사항

### Fetching

-   server fetch: 채팅 모델 (revalidate: 60초)
-   cline fetch: 채팅 목록, 대화 목록 - 개인화된 내용이므로 client에서 fetch
    -   node와 browser msw worker 분리하여 생성 (/providers/MswProvider.tsx)
-   SSG: /new 페이지 - redirect 로직으로 인해 client 페이지로 선언하였지만 html 리소소는 정적이므로 router segment를 통해 정적 렌더링하도록 수정

### Loading

suspense를 이용하여 서버에서 처음 HTML을 받을 시 각 컴포넌트에 로딩이 적용된 UI를 받는다. (FCP 감소)
(ChatModelSelect, ChatList, DialogueList - Skeleton)


<img src="https://github.com/user-attachments/assets/32cb0c47-8bd1-4605-ae74-b6315e274f67" width="480" />
<br><br>
<img src="https://github.com/user-attachments/assets/b6f72db4-ce12-44df-8635-0985043c362c" width="480" />



### Error

-   ErrorBoundary를 통해 error를 catch하여 retry 버튼을 제공하고, toast를 띄워 사용자에게 안내한다.<br>
    (ChatModelSelect, ChatList, DialogueList - ErrorComponent)

<img src="https://github.com/user-attachments/assets/a776d2a4-e291-4794-a424-60bcb8950350" width="480" />


### 예외 처리

-   사용자가 존재하지 않는 chat id의 url로 진입 시
    -   handler에서 chats에 해당 데이터가 없을 시 throw Error 하도록 수정 (/lib/mock/browser/handlers.ts)
-   사용자가 존재하지 않는 데이터 모델의 url로 진입 시
