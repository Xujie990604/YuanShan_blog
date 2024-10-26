module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  semi: false, // 句末使用分号
  tabWidth: "2", // 缩进长度
  singleQuote: true, // 使用单引号
  printWidth: 100, // 单行长度
  trailingComma: 'es5', // 多行时在 ES5 中有效的尾随逗号（对象、数组等）。TypeScript 的类型参数中没有尾随逗号
  endOfLine: 'lf', // 结束行形式 <lf|crlf|cr|auto>
  useTabs: false, // 使用空格代替tab缩进
  quoteProps: 'as-needed', // 仅在必需时为对象的 key 添加引号
  bracketSpacing: true, // 在对象前后添加空格-eg: { foo: bar }
  bracketSameLine: true, // 多行 HTML 将 > 元素放在最后一行的末尾，而不是单独放在下一行
  arrowParens: 'avoid', // 单参数箭头函数参数周围不使用圆括号 eg: x => x
  requirePragma: false, // 无需顶部注释即可格式化
  insertPragma: false, // 在已被 preitter 格式化的文件顶部加上标注
  singleAttributePerLine: true, // 在 Vue HTML JSX 中每行强制单个属性
  vueIndentScriptAndStyle: true, // Vue 文件中的 <script> 和 <style> 是否缩进
}
