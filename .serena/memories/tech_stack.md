# 技术栈

## 核心技术

### 编程语言
- **TypeScript 4.7.4**: 主要开发语言
- **Target**: ES2020
- **Module System**: CommonJS

### 运行时环境
- **Node.js**: 16.x
- **VS Code Extension API**: 1.70.0+

## 依赖库

### 生产依赖
- **@modelcontextprotocol/sdk**: ^1.12.3 - MCP (Model Context Protocol) SDK
- **chokidar**: ^3.5.3 - 文件系统监视器

### 开发依赖
- **@typescript-eslint/eslint-plugin**: ^5.31.0 - TypeScript ESLint 插件
- **@typescript-eslint/parser**: ^5.31.0 - TypeScript 解析器
- **@vscode/test-electron**: ^2.1.5 - VS Code 测试框架
- **eslint**: ^8.20.0 - 代码检查工具
- **mocha**: ^10.0.0 - 测试框架
- **nyc**: ^17.1.0 - 代码覆盖率工具
- **sinon**: ^20.0.0 - 测试 mock 库

## 构建工具
- **TypeScript Compiler**: 编译 TypeScript 到 JavaScript
- **ESLint**: 代码质量和风格检查
- **VSCE**: VS Code 扩展打包工具

## 测试框架
- **Mocha**: 单元测试框架
- **Nyc**: 测试覆盖率报告
- **Sinon**: 测试 stub/mock/spy 功能
- **测试数量**: 130 个测试，100% 通过率

## VS Code 扩展 API
- **TreeDataProvider**: 树视图数据提供者
- **Commands**: 命令注册和处理
- **StatusBarItem**: 状态栏集成
- **Webview**: HTML 视图渲染
- **FileSystemWatcher**: 文件系统监视

## 外部集成
- **task-master-ai**: 核心任务管理系统
- **MCP Protocol**: Model Context Protocol 通信
- **CLI Fallback**: 命令行工具回退机制
