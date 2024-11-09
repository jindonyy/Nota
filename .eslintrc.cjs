/** @type {import('eslint').Linter.Config} */
const path = require('path');

module.exports = {
    root: true,
    extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals', 'prettier', 'plugin:storybook/recommended'],
    plugins: ['no-relative-import-paths', 'unused-imports', '@typescript-eslint'],
    parserOptions: {
        project: path.join(__dirname, '/tsconfig.json'),
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        next: './',
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx'],
        },
        'import/resolver': {
            typescript: './tsconfig.json',
        },
    },
    rules: {
        // 사용하지 않는 변수가 있을 시 경고
        'no-unused-vars': 'off',
        // import 순서
        'import/order': [
            'warn',
            {
                alphabetize: { order: 'asc' },
                'newlines-between': 'always',
                warnOnUnassignedImports: false,
            },
        ],
        // 사용하지 않는 import 존재 시 경고
        'unused-imports/no-unused-imports': 'warn',
        // console.log 존재 시 경고 (warn, error 등은 허용)
        'no-console': ['warn', { allow: ['warn', 'count', 'error', 'info'] }],
        // 상대 경로 시 에러 (동일 폴더일 경우는 허용)
        'no-relative-import-paths/no-relative-import-paths': ['error', { allowSameFolder: true }],
        // 템플릿 스트링 권고
        'prefer-template': 'warn',
        // 익명 default export 금지
        'import/no-anonymous-default-export': 'off',

        /** TypeScript */
        // 반환되지 않은 프로미스 사용할 때 에러
        '@typescript-eslint/no-floating-promises': 'error',
        // 특정 경우에 TypeScript ts- 주석을 금지 (ignoreVoid 옵션 허용)
        '@typescript-eslint/ban-ts-comment': ['off', { ignoreVoid: true }],
        // 함수가 비어있을 때 경고
        '@typescript-eslint/no-empty-function': 'warn',
        // any로 타입 추론이 되거나 사용 시 경고
        '@typescript-eslint/no-explicit-any': 'warn',
        // type은 import 시 import type 안붙여주면 경고
        '@typescript-eslint/consistent-type-imports': 'warn',
        // var 사용할 경우 경고
        '@typescript-eslint/no-unused-vars': 'warn',
        // 비어있는 인터페이스 정의 금지
        '@typescript-eslint/no-empty-interface': 'off',

        /** React */
        // <div></div>처럼 빈 태그가 있을 시 경고
        'react/self-closing-comp': 'warn',
        // 컴포넌트가 함수선언식이 아닐 시 경고
        'react/function-component-definition': [
            'warn',
            {
                namedComponents: 'function-declaration',
                unnamedComponents: 'function-expression',
            },
        ],
        // key 값으로 index 사용 시 에러
        'react/no-array-index-key': 'error',
        // JSX에서 props는 중괄호를 사용하지 않도록 하고, children과 propElementValues는 항상 중괄호를 사용
        'react/jsx-curly-brace-presence': [
            'error',
            {
                props: 'never',
                children: 'always',
                propElementValues: 'always',
            },
        ],
        // React Hooks의 종속성 배열이 올바르게 설정되지 않은 경우 경고
        'react-hooks/exhaustive-deps': 'warn',
        // React 컴포넌트에 displayName 설정이 없을 경우 경고 비활성화
        'react/display-name': 'off',

        /** Next.js */
        // app 디렉토리 사용
        '@next/next/no-html-link-for-pages': ['error', 'src/app'],
    },
};
