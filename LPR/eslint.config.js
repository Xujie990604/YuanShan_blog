import eslintPluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import globals from 'globals';
import tsEslint from 'typescript-eslint'
import eslintJS from '@eslint/js'

export default [
  {
    name: 'app/files-to-lint',  // 需要检查的文件
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore', // 忽略检查的文件
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // NOTE: 规则的优先级：后面的规则会覆盖前面的规则。所以把`推荐规则`写`最前面`，然后再自定义规则
  /** JS 推荐配置 */
  eslintJS.configs.recommended,
  /** Vue 推荐配置 */
  ...eslintPluginVue.configs['flat/essential'],
  /** TS 推荐配置 */
  ...vueTsEslintConfig(),
  ...tsEslint.configs.recommended,

  /**
   * javaScript 规则
   */
  {
    rules: {
      'no-console': 'warn',
    }
  },

  /**
   * vue 规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        /** typescript项目需要用到这个 */
        parser: tsEslint.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 在这里追加 vue 规则
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
    },
  },

  /**
   * typescript 规则
   */
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
    },
  },

  /**
   * 配置全局变量
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser
        // 可以追加自定义全局变量
      }
    }
  },

  // NOTE: 只使用 Eslint 最代码质量的检查，代码风格相关内容交给 Prettier 去做
  skipFormatting, // 确保在 ESLint 检查时跳过那些与代码格式化相关的规则
]
