/** @type {import('stylelint').Config} */
module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
    rules: {
        // 동일한 블록 안에서 중복된 속성 선언을 허용하지 않음
        'declaration-block-no-duplicate-properties': true,
        // 16진수 색상 값은 항상 긴 형식으로 사용 (ex: #ffffff)
        'color-hex-length': 'long',
        // 색상 함수 표기법 (modern: rgb(0 0 0 / 0.5), legacy: rgba(0, 0, 0, 0.5))
        'color-function-notation': 'modern',
        // 알파 값 숫자로만 표기 (ex: opacity: 0.5)
        'alpha-value-notation': 'number',
        // 길이가 0일 때 단위 사용 금지
        'length-zero-no-unit': true,
        // class 이름 케밥 케이스 문자열만 허용
        'selector-class-pattern': '^[a-z-]+$',
        // 애니메이션 keyframe 이름 케밥 케이스 문자열만 허용
        'keyframes-name-pattern': '^[a-z-]+$',
        // 선택자 내의 우선순위가 높은 규칙이 우선순위가 낮은 규칙 아래에 오는 경우 허용 (정확히 우선순위 파악 못하여 off)
        'no-descending-specificity': null,
        // 속성 선언 순서 정의
        'order/properties-order': [
            [
                'display',
                'position',
                'float',
                'clear',
                'visibility',
                'overflow',
                'z-index',
                'width',
                'max-width',
                'min-width',
                'height',
                'max-height',
                'min-height',
                'margin',
                'margin-top',
                'margin-right',
                'margin-bottom',
                'margin-left',
                'padding',
                'padding-top',
                'padding-right',
                'padding-bottom',
                'padding-left',
            ],
        ],
    },
    ignoreFiles: ['.next/*'],
};
