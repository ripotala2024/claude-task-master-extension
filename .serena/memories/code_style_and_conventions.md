# 代码风格和约定

## TypeScript 配置

### 编译器选项
- **严格类型检查**: 启用所有严格模式标志
  - `strict: true`
  - `noImplicitAny: true`
  - `strictNullChecks: true`
  - `strictFunctionTypes: true`
  - `strictBindCallApply: true`
  - `strictPropertyInitialization: true`
  - `noImplicitReturns: true`
  - `noFallthroughCasesInSwitch: true`
  - `noUncheckedIndexedAccess: true`

- **额外代码质量检查**:
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `exactOptionalPropertyTypes: true`
  - `noImplicitOverride: true`
  - `noPropertyAccessFromIndexSignature: true`

- **增强错误报告**:
  - `noErrorTruncation: true`
  - `preserveWatchOutput: true`
  - `pretty: true`

## ESLint 规则

### 命名约定
- **变量**: camelCase 或 PascalCase
- **规则级别**: warn

### 代码风格
- **分号**: 必须使用（@typescript-eslint/semi: warn）
- **大括号**: 必须使用（curly: warn）
- **相等性**: 使用 === 和 !== （eqeqeq: warn）
- **异常**: 不抛出字面量（no-throw-literal: warn）

## 命名规范

### 文件命名
- **源文件**: camelCase.ts (如: `taskProvider.ts`, `mcpClient.ts`)
- **测试文件**: camelCase.test.ts (如: `taskProvider.test.ts`)
- **类型定义**: types.ts
- **工具函数**: xxxUtils.ts (如: `tagUtils.ts`)

### 代码命名
- **类名**: PascalCase (如: `TaskProvider`, `TaskMasterClient`)
- **函数名**: camelCase (如: `addNewTask`, `showTaskDetails`)
- **变量名**: camelCase
- **常量**: UPPER_SNAKE_CASE 或 camelCase
- **接口**: PascalCase (如: `Task`, `TaskMasterConfig`)

## 代码组织

### 目录结构
```
src/
├── extension.ts        # 扩展主入口
├── taskProvider.ts     # 任务树视图提供者
├── taskMasterClient.ts # Task Master 客户端
├── mcpClient.ts        # MCP 协议客户端
├── statusBar.ts        # 状态栏管理
├── tagManager.ts       # 标签管理
├── tagUtils.ts         # 标签工具函数
├── logger.ts           # 日志工具
├── types.ts            # 类型定义
└── test/               # 测试文件
    ├── suite/          # 测试套件
    └── *.test.ts       # 单元测试
```

### 文件组织原则
- 每个文件有单一、清晰的职责
- 相关功能组织在一起
- 公共接口和类型在 types.ts 中定义
- 工具函数独立在 xxxUtils.ts 文件中

## 注释规范

### 文档注释
- 使用 JSDoc 风格的注释
- 为所有公共 API 提供文档注释
- 解释复杂逻辑的原因而非仅说明做了什么

### 代码注释
- 用中文编写注释（项目已完全中文化）
- 为不明显的代码添加注释
- 复杂逻辑添加 `// Reason:` 说明原因

## 错误处理

### 异常处理
- 使用 try-catch 块
- 提供清晰的错误信息
- 记录必要的错误日志
- 优雅处理边界情况

### 日志记录
- 使用统一的 logger 工具
- 日志级别：error, warn, info, debug
- 开发模式下启用详细日志

## 国际化

### 用户界面
- **所有用户界面文本使用中文**
- package.json 中的命令和配置已中文化
- WebView HTML 页面已完全翻译
- 树视图标签和分类已翻译
- 状态和优先级选项已翻译

### 技术术语
- 保持技术术语一致性
- 支持中英文双语匹配逻辑
