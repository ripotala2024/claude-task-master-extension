# 代码库结构

## 目录结构概览

```
claude-task-master-extension/
├── .git/                           # Git 版本控制
├── .serena/                        # Serena 配置
├── .specstory/                     # SpecStory 配置
├── images/                         # 扩展图标和图像
├── node_modules/                   # npm 依赖
├── out/                            # 编译输出目录
├── scripts/                        # 构建和开发脚本
│   ├── build.js                    # 构建脚本
│   └── dev-install.js              # 开发环境安装脚本
├── src/                            # 源代码目录 (主要开发区域)
│   ├── extension.ts                # 扩展主入口点
│   ├── taskProvider.ts             # 任务树视图数据提供者
│   ├── taskMasterClient.ts         # Task Master 客户端
│   ├── mcpClient.ts                # MCP 协议客户端
│   ├── statusBar.ts                # 状态栏管理
│   ├── tagManager.ts               # 标签管理器
│   ├── tagUtils.ts                 # 标签工具函数
│   ├── logger.ts                   # 日志工具
│   ├── types.ts                    # TypeScript 类型定义
│   └── test/                       # 测试目录
│       ├── suite/                  # 测试套件
│       │   ├── extension.test.ts   # 扩展测试
│       │   ├── taskProvider.test.ts # 任务提供者测试
│       │   ├── taskMasterClient.test.ts # 客户端测试
│       │   ├── logger.test.ts      # 日志测试
│       │   ├── treeStructure.test.ts # 树结构测试
│       │   └── index.ts            # 测试索引
│       ├── statusBar.test.ts       # 状态栏测试
│       ├── tagManager.test.ts      # 标签管理器测试
│       ├── mcpIntegration.test.ts  # MCP 集成测试
│       └── runTest.ts              # 测试运行器
├── .cursorindexingignore           # Cursor 索引忽略配置
├── .eslintrc.json                  # ESLint 配置
├── .gitignore                      # Git 忽略文件配置
├── .vscodeignore                   # VSIX 打包忽略配置
├── CHANGELOG.md                    # 更改日志
├── LICENSE                         # MIT 许可证
├── LOCALIZATION.md                 # 本地化文档
├── MARKETPLACE_PUBLISHING.md       # 市场发布文档
├── package.json                    # npm 包配置
├── package-lock.json               # npm 依赖锁定
├── README.md                       # 项目说明文档
├── RELEASE_NOTES_v1.2.0.md        # v1.2.0 发布说明
├── RELEASE_NOTES_v1.3.0.md        # v1.3.0 发布说明
├── SECURITY.md                     # 安全指南
├── SETUP_ENVIRONMENT.md            # 环境设置指南
├── TEST_COVERAGE.md                # 测试覆盖率报告
├── tsconfig.json                   # TypeScript 配置
└── *.vsix                          # 打包的扩展文件
```

## 核心源代码文件

### 主入口 (src/extension.ts)
- **职责**: 扩展激活、停用和命令注册
- **主要函数**:
  - `activate()`: 扩展激活时调用
  - `deactivate()`: 扩展停用时调用
  - 各种命令处理函数（添加任务、编辑任务、删除任务等）
  - WebView 生成函数
  - 标签管理处理函数

### 任务提供者 (src/taskProvider.ts)
- **职责**: 实现 VS Code TreeDataProvider
- **功能**:
  - 提供树视图数据
  - 处理任务层级结构
  - 管理任务分组和排序
  - 进度概览计算
  - 标签感知显示

### Task Master 客户端 (src/taskMasterClient.ts)
- **职责**: 与 task-master-ai 交互
- **功能**:
  - MCP 协议通信
  - CLI 回退机制
  - 任务 CRUD 操作
  - 错误处理和重试逻辑

### MCP 客户端 (src/mcpClient.ts)
- **职责**: MCP 协议通信
- **功能**:
  - 连接 MCP 服务器
  - 发送和接收 MCP 消息
  - 协议级别的错误处理

### 状态栏 (src/statusBar.ts)
- **职责**: 管理状态栏项
- **功能**:
  - 显示当前标签
  - 标签切换点击处理
  - 状态栏更新

### 标签管理器 (src/tagManager.ts)
- **职责**: 标签操作管理
- **功能**:
  - 创建标签
  - 切换标签
  - 删除标签
  - 列出标签

### 标签工具 (src/tagUtils.ts)
- **职责**: 标签相关工具函数
- **功能**:
  - 标签验证
  - 标签格式转换
  - 标签匹配逻辑

### 日志工具 (src/logger.ts)
- **职责**: 统一日志记录
- **功能**:
  - 控制台日志
  - VS Code 输出通道日志
  - 文件日志（可选）
  - 日志级别控制

### 类型定义 (src/types.ts)
- **职责**: 全局类型定义
- **内容**:
  - Task 接口
  - 配置接口
  - MCP 消息类型
  - 其他共享类型

## 测试结构

### 测试套件 (src/test/suite/)
- **extension.test.ts**: 扩展主功能测试
- **taskProvider.test.ts**: 树视图提供者测试
- **taskMasterClient.test.ts**: 客户端逻辑测试
- **logger.test.ts**: 日志功能测试
- **treeStructure.test.ts**: 树结构测试

### 单元测试
- **statusBar.test.ts**: 状态栏测试
- **tagManager.test.ts**: 标签管理器测试
- **mcpIntegration.test.ts**: MCP 集成测试

### 测试统计
- **总测试数**: 130
- **通过率**: 100%
- **覆盖范围**: 包括所有主要功能和标签格式

## 配置文件

### package.json
- npm 包配置
- 扩展元数据
- 命令定义
- 菜单配置
- 贡献点声明
- 依赖管理

### tsconfig.json
- TypeScript 编译器配置
- 严格模式设置
- 目标和模块设置
- 输出目录配置

### .eslintrc.json
- ESLint 规则配置
- TypeScript ESLint 插件设置
- 代码风格规则

## 文档文件

### 用户文档
- **README.md**: 项目主文档
- **SETUP_ENVIRONMENT.md**: 环境设置指南
- **SECURITY.md**: 安全最佳实践
- **LOCALIZATION.md**: 本地化说明

### 开发文档
- **CHANGELOG.md**: 版本更改历史
- **TEST_COVERAGE.md**: 测试覆盖率详情
- **RELEASE_NOTES_*.md**: 各版本发布说明
- **MARKETPLACE_PUBLISHING.md**: 市场发布指南

## 构建输出

### out/ 目录
- 编译后的 JavaScript 文件
- Source maps
- 与 src/ 目录结构一致

### .vsix 文件
- 打包的扩展文件
- 可安装到 VS Code/Cursor
- 命名格式: `claude-task-master-extension-x.x.x.vsix`

## 依赖管理

### node_modules/
- npm 安装的依赖包
- 包括生产和开发依赖
- 由 package-lock.json 锁定版本

## 开发流程

1. **修改源代码**: 在 `src/` 目录中编辑 .ts 文件
2. **编译**: 运行 `npm run compile` 或 `npm run watch`
3. **测试**: 运行 `npm test`
4. **调试**: 按 F5 启动扩展开发主机
5. **打包**: 运行 `npm run package` 生成 .vsix
6. **安装**: 使用 `npm run dev-install` 安装到 IDE
