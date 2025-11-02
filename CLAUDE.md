# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个 VS Code/Cursor 扩展，为 task-master-ai 项目提供可视化界面。扩展通过 TreeDataProvider 实现任务树视图，支持 MCP 协议通信和 CLI 回退机制。

**核心定位**：纯粹增强 task-master-ai，提供现代化可视化界面，与 CLI 和 MCP 工具协同工作。

## 常用开发命令

### 编译和构建
```bash
npm run compile          # 编译 TypeScript
npm run watch           # 监视模式编译（开发时使用）
npm run build           # 自定义构建脚本
npm run vscode:prepublish  # 发布前完整构建
```

### 测试
```bash
npm test                # 运行所有测试（130个测试）
npm run test:coverage   # 运行测试并生成覆盖率报告
npm test -- --grep "TaskProvider"  # 运行特定测试套件
```

### 代码质量
```bash
npm run lint            # 运行 ESLint 检查
npm run pretest         # 编译 + lint（测试前自动运行）
```

### 打包和安装
```bash
npm run package         # 打包为 .vsix 文件
npm run dev-install     # 开发环境安装到 VS Code/Cursor
npm run dev            # dev-install 的别名
```

### 调试扩展
1. 在 VS Code 中打开项目
2. 按 `F5` 启动扩展开发主机
3. 在新窗口中打开测试项目（需要有 .taskmaster 目录）
4. 扩展将自动激活

## 核心架构

### 扩展激活机制 (src/extension.ts)

- **激活时机**：`onStartupFinished` - 扩展在 VS Code 启动完成后激活
- **激活条件**：检测工作区中是否存在 `.taskmaster` 目录
- **上下文设置**：通过 `vscode.commands.executeCommand('setContext', 'claudeTaskMaster.hasTaskmaster', true)` 控制视图显示

**关键点**：
- 扩展仅在工作区/文件夹上下文中工作（不支持单个文件）
- 所有命令注册在 `activate()` 函数中
- `deactivate()` 函数处理清理工作（停止文件监视器等）

### 任务树视图架构 (src/taskProvider.ts)

实现 `vscode.TreeDataProvider<TaskItem>` 接口：

```typescript
class TaskProvider implements vscode.TreeDataProvider<TaskItem> {
  getTreeItem(element: TaskItem): vscode.TreeItem
  getChildren(element?: TaskItem): Thenable<TaskItem[]>
  refresh(): void  // 触发 onDidChangeTreeData 事件
}
```

**树结构层级**：
1. **Progress Overview**（进度概览）- 显示总体统计
2. **Category**（分类节点）- Todo/In Progress/Completed/Blocked
3. **Task**（任务节点）- 主任务，可展开显示子任务
4. **Subtask**（子任务节点）- 任务的子项

**关键实现细节**：
- 使用 `collapsibleState` 控制节点展开/折叠状态
- 通过 `contextValue` 区分节点类型（task/subtask/category）以控制上下文菜单
- 任务分组和排序逻辑在 `getChildren()` 中实现
- 进度计算考虑子任务状态

### MCP 客户端与 CLI 回退机制 (src/taskMasterClient.ts)

**双层通信架构**：

1. **MCP 协议通信**（优先）：
   - 通过 `@modelcontextprotocol/sdk` 与 task-master-ai MCP 服务器通信
   - 支持实时双向通信
   - 性能更快（< 1秒）

2. **CLI 回退机制**（备用）：
   - MCP 不可用时自动回退到 `npx task-master-ai` CLI 命令
   - 通过 `child_process.spawn` 执行命令
   - 性能较慢（2-5秒）但可靠

**关键函数**：
- `executeMCPCommand()` - 尝试 MCP 通信
- `executeCLICommand()` - CLI 回退执行
- `executeWithFallback()` - 自动选择通信方式

**错误处理**：
- 自动重试逻辑
- 优雅降级到 CLI
- 详细错误日志记录

### 标签管理系统 (v1.2.0+)

**标签格式支持**：
- 完全支持 Task Master v0.17.0+ 标签格式（兼容至 v0.31.0）
- 自动检测和迁移旧格式
- 标签存储在 `.taskmaster/tags/` 目录

**核心组件**：
- `src/tagManager.ts` - 标签 CRUD 操作
- `src/tagUtils.ts` - 标签验证和格式转换
- `src/statusBar.ts` - 状态栏标签指示器

**标签操作**：
- 创建标签：`claudeTaskMaster.createTag`
- 切换标签：`claudeTaskMaster.switchTag`（状态栏点击或命令面板）
- 删除标签：`claudeTaskMaster.deleteTag`
- 列出标签：`claudeTaskMaster.listTags`

**上下文保持**：所有任务操作自动维护当前标签上下文。

### 文件监视和自动刷新 (src/extension.ts)

使用 `chokidar` 库监视任务文件变化：

```typescript
const watcher = chokidar.watch('.taskmaster/tasks/**/*.json', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on('change', () => taskProvider.refresh());
```

**配置项**：
- `claudeTaskMaster.autoRefresh` - 控制是否自动刷新（默认 true）
- 监视 `.taskmaster/tasks/` 目录下所有 JSON 文件
- 文件变化时触发树视图刷新

### WebView 生成 (src/extension.ts)

任务详情通过 WebView 显示：

```typescript
function getTaskDetailsWebviewContent(task: Task): string {
  // 生成 HTML 内容
  // 包含任务标题、描述、状态、优先级、依赖等
  // 使用 VS Code 主题样式
}
```

**关键点**：
- 使用 `vscode.window.createWebviewPanel` 创建面板
- HTML 内容动态生成，包含任务所有详细信息
- 支持 VS Code 主题样式（深色/浅色模式）

## 类型系统 (src/types.ts)

**核心类型定义**：
- `Task` - 任务对象接口
- `TaskStatus` - 任务状态枚举（todo/in-progress/completed/blocked）
- `Priority` - 优先级枚举（low/medium/high/critical）
- `MCPMessage` - MCP 协议消息类型

## 测试架构

**测试框架**：Mocha + Sinon
**测试覆盖**：130 个测试，100% 通过率

**测试套件结构**：
- `src/test/suite/extension.test.ts` - 扩展主功能测试
- `src/test/suite/taskProvider.test.ts` - 树视图提供者测试
- `src/test/suite/taskMasterClient.test.ts` - 客户端逻辑测试
- `src/test/suite/logger.test.ts` - 日志功能测试
- `src/test/suite/treeStructure.test.ts` - 树结构测试
- `src/test/statusBar.test.ts` - 状态栏测试
- `src/test/tagManager.test.ts` - 标签管理器测试
- `src/test/mcpIntegration.test.ts` - MCP 集成测试

**Mock 策略**：
- 使用 Sinon 创建 stub/mock/spy
- Mock VS Code API（vscode.window, vscode.workspace 等）
- Mock 文件系统操作
- Mock MCP 客户端和 CLI 执行

## 配置系统

**VS Code 设置**（package.json contributes.configuration）：
- `claudeTaskMaster.autoRefresh` - 自动刷新开关
- `claudeTaskMaster.taskmasterPath` - taskmaster 目录路径
- `claudeTaskMaster.developmentMode` - 开发模式（详细日志）
- `claudeTaskMaster.enableLogging` - 启用日志
- `claudeTaskMaster.enableFileLogging` - 文件日志
- `claudeTaskMaster.disableMCP` - 禁用 MCP（仅使用 CLI）
- `claudeTaskMaster.preferCLIOnVersionMismatch` - 版本不匹配时优先 CLI
- `claudeTaskMaster.versionCheckInterval` - 版本检查间隔

**读取配置**：
```typescript
const config = vscode.workspace.getConfiguration('claudeTaskMaster');
const autoRefresh = config.get<boolean>('autoRefresh', true);
```

## 日志系统 (src/logger.ts)

**日志级别**：
- `error` - 错误信息
- `warn` - 警告信息
- `info` - 一般信息
- `debug` - 调试信息

**日志输出**：
- 控制台日志（开发时）
- VS Code 输出通道（"Claude Task Master"）
- 文件日志（可选，logs/extension.log）

**使用方式**：
```typescript
import { logger } from './logger';
logger.info('Task refreshed');
logger.error('Failed to load tasks', error);
```

## 命令系统

**命令注册**（package.json contributes.commands）：
- 所有命令以 `claudeTaskMaster.` 为前缀
- 命令处理函数在 `src/extension.ts` 中实现
- 通过 `vscode.commands.registerCommand` 注册

**主要命令分类**：
1. **视图操作**：refresh, search, filterByStatus, expandAll
2. **任务操作**：addTask, addSubtask, editTask, deleteTask
3. **状态管理**：markCompleted, markInProgress, markTodo, markBlocked
4. **标签管理**：switchTag, createTag, deleteTag, listTags
5. **高级功能**：expandTask, nextTask, setDependencies

## 开发注意事项

### 修改代码时
1. **保持向后兼容**：扩展需要支持 Task Master v0.17.0 到 v0.31.0
2. **测试标签格式**：确保新旧标签格式都能正常工作
3. **错误处理**：所有操作都应有优雅的错误处理和用户提示
4. **性能考虑**：大型任务列表（100+ 任务）时的性能优化

### 添加新功能时
1. **更新 package.json**：添加命令定义、菜单项、配置项
2. **实现命令处理**：在 `src/extension.ts` 中添加处理函数
3. **更新 TaskProvider**：如需修改树视图显示逻辑
4. **编写测试**：为新功能添加测试用例
5. **更新文档**：修改 README.md 和相关文档

### 调试技巧
1. **启用开发模式**：设置 `claudeTaskMaster.developmentMode: true`
2. **查看输出通道**：VS Code → 输出 → "Claude Task Master"
3. **使用断点**：在 Extension Development Host 中调试
4. **测试 CLI 回退**：设置 `claudeTaskMaster.disableMCP: true` 测试 CLI 模式

## 发布流程

1. 更新版本号：`npm version patch/minor/major`
2. 更新 CHANGELOG.md
3. 运行测试：`npm test`
4. 打包扩展：`npm run package`
5. 测试 .vsix 文件安装
6. 发布到市场：`vsce publish`（需要 token）
7. 推送标签：`git push --tags`

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
