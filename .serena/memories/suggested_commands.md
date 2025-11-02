# 建议的开发命令

## 日常开发命令

### 编译和构建
```bash
# 编译 TypeScript (生产环境)
npm run compile

# 监视模式编译 (开发环境)
npm run watch

# 完整构建（用于发布前）
npm run vscode:prepublish

# 自定义构建脚本
npm run build
```

### 代码质量

```bash
# 运行 ESLint 检查
npm run lint

# 预测试（编译 + lint）
npm run pretest
```

### 测试

```bash
# 运行所有测试
npm test

# 运行带覆盖率的测试
npm run test:coverage

# 特定测试套件
npm test -- --grep "TaskProvider"
```

### 打包和安装

```bash
# 打包扩展为 .vsix 文件
npm run package

# 开发环境安装到 VS Code/Cursor
npm run dev-install
# 或
npm run dev
```

## VS Code 扩展开发

### 调试扩展
1. 在 VS Code 中打开项目
2. 按 `F5` 启动扩展开发主机
3. 在新窗口中打开测试项目
4. 扩展将自动激活

### 安装已打包扩展
```bash
# VS Code
code --install-extension claude-task-master-extension-x.x.x.vsix

# Cursor
cursor --install-extension claude-task-master-extension-x.x.x.vsix
```

## Git 操作

```bash
# 查看状态
git status

# 查看差异
git diff

# 提交更改
git add .
git commit -m "feat: 描述你的更改"

# 推送到远程
git push origin main

# 查看提交历史
git log --oneline -10
```

## Task Master AI 命令

### 初始化项目
```bash
# 通过 CLI 初始化
npx task-master-ai init

# 或通过 Claude AI (如果设置了 MCP)
# 在聊天中输入: "Initialize task-master-ai in my project"
```

### CLI 回退命令 (当 MCP 不可用时)
```bash
# 添加任务
npx task-master-ai add-task

# 添加子任务
npx task-master-ai add-subtask

# 设置状态
npx task-master-ai set-status

# 更新任务
npx task-master-ai update-task

# 展开任务
npx task-master-ai expand
```

## macOS 系统命令 (Darwin)

### 文件操作
```bash
# 列出文件
ls -la

# 查找文件
find . -name "*.ts"

# 搜索内容
grep -r "pattern" src/

# 查看文件
cat package.json

# 创建目录
mkdir -p path/to/dir

# 复制文件
cp source destination

# 移动/重命名
mv source destination

# 删除文件
rm file
rm -rf directory
```

### 进程和系统
```bash
# 查看进程
ps aux | grep node

# 终止进程
kill -9 <PID>

# 查看系统信息
uname -a

# 查看磁盘使用
df -h

# 查看目录大小
du -sh *
```

### Node.js 和 npm
```bash
# 检查 Node 版本
node --version

# 检查 npm 版本
npm --version

# 安装依赖
npm install

# 清理缓存
npm cache clean --force

# 更新依赖
npm update

# 检查过期依赖
npm outdated
```

## VS Code/Cursor CLI 命令

### VS Code
```bash
# 检查版本
code --version

# 安装扩展
code --install-extension <extension-id>

# 列出已安装扩展
code --list-extensions

# 打开项目
code /path/to/project
```

### Cursor
```bash
# 检查版本
cursor --version

# 安装扩展
cursor --install-extension <extension-id>

# 列出已安装扩展
cursor --list-extensions

# 打开项目
cursor /path/to/project
```

## 发布命令 (维护者使用)

```bash
# 1. 更新版本号
npm version patch  # 或 minor, major

# 2. 打包扩展
npm run package

# 3. 发布到市场 (需要 VSCE token)
vsce publish

# 4. 推送标签
git push --tags
```
