/** @type {import('stylelint').Config} */
module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
    rules: {
        // 동일한 블록 안에서 중복된 속성 선언을 허용하지 않음
        'declaration-block-no-duplicate-properties': true,
        // 알 수 없는 @ 규칙 사용을 금지 (아래 SCSS에서 일부 규칙을 예외로 허용하기 위해 null로 설정)
        'at-rule-no-unknown': null,
        // SCSS에서 알려지지 않은 @ 규칙 사용을 금지하고, tailwind 관련 규칙은 예외로 설정
        'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind'] }],
        // 16진수 색상 값은 항상 긴 형식으로 사용 (ex: #ffffff)
        'color-hex-length': 'long',
        // 색상 함수 표기법 (modern: rgb(0 0 0 / 0.5), legacy: rgba(0, 0, 0, 0.5))
        'color-function-notation': 'modern',
        // 알파 값 표기법 (modern: 0.5, legacy: 50%)
        'alpha-value-notation': 'modern',
        // 길이가 0일 때 단위 사용 금지 (modern: 0, legacy: '0px')
        'length-zero-no-unit': 'modern',
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
