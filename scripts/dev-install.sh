#!/bin/bash

# Claude Task Master Extension - Auto Dev Install Script
# This script compiles, packages, and installs the extension automatically

EXTENSION_NAME="claude-task-master-extension"

# Get the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Starting automatic extension rebuild and install..."
echo "📁 Project root: $PROJECT_ROOT"
echo ""

# Change to project root directory
cd "$PROJECT_ROOT" || exit 1

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")
VSIX_FILE="$EXTENSION_NAME-$VERSION.vsix"
LATEST_FILE="$EXTENSION_NAME-latest.vsix"

echo "📌 Current version: $VERSION"
echo ""

# Step 1: Compile TypeScript
echo "📦 Step 1: Compiling TypeScript..."
if npm run compile; then
    echo "✅ TypeScript compiled successfully"
    echo ""
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Step 2: Package the extension
echo "📦 Step 2: Packaging extension..."
if npx vsce package; then
    echo "✅ Extension packaged successfully"
    echo ""
else
    echo "❌ Packaging failed"
    exit 1
fi

# Step 3: Clean up old versions and create latest copy
echo "🧹 Step 3: Cleaning up old versions..."

# Copy current version to latest
if [[ -f "$VSIX_FILE" ]]; then
    cp "$VSIX_FILE" "$LATEST_FILE"
    echo "✅ Created $LATEST_FILE"
    
    # Delete all vsix files except the current version and latest
    find . -maxdepth 1 -name "$EXTENSION_NAME-*.vsix" -type f ! -name "$VSIX_FILE" ! -name "$LATEST_FILE" -delete
    echo "✅ Removed old versions"
    echo ""
else
    echo "❌ Could not find $VSIX_FILE"
    exit 1
fi

# Step 4: Install the extension
echo "🔧 Step 4: Installing extension..."

# Try to find VS Code or Cursor command
CODE_COMMAND=""

# Try common commands first
for cmd in cursor code code-insiders; do
    if command -v "$cmd" &> /dev/null; then
        CODE_COMMAND="$cmd"
        break
    fi
done

# Check common macOS installation paths
if [[ -z "$CODE_COMMAND" && "$OSTYPE" == "darwin"* ]]; then
    if [[ -f "/Applications/Cursor.app/Contents/Resources/app/bin/cursor" ]]; then
        CODE_COMMAND="/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
    elif [[ -f "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ]]; then
        CODE_COMMAND="/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
    fi
fi

if [[ -z "$CODE_COMMAND" ]]; then
    echo "⚠️  VS Code/Cursor CLI not found. Manual installation required:"
    echo "   1. Open VS Code/Cursor"
    echo "   2. Cmd+Shift+P (Mac) or Ctrl+Shift+P (Linux) → 'Extensions: Install from VSIX'"
    echo "   3. Select: $VSIX_FILE"
    echo "   4. Reload window: Cmd+Shift+P / Ctrl+Shift+P → 'Developer: Reload Window'"
    exit 0
fi

echo "   Using: $CODE_COMMAND"

# Install the extension
if "$CODE_COMMAND" --install-extension "$VSIX_FILE" --force; then
    echo "✅ Extension installed successfully!"
    echo ""
    echo "🎉 All done! Next steps:"
    echo "   1. Reload VS Code/Cursor window (Cmd+Shift+P / Ctrl+Shift+P → 'Developer: Reload Window')"
    echo "   2. Check the Task Master panel for updated functionality"
    
    # Optional: Try to reload VS Code automatically
    echo ""
    echo "🔄 Attempting to reload VS Code/Cursor..."
    
    if "$CODE_COMMAND" --command workbench.action.reloadWindow 2>/dev/null; then
        echo "✅ VS Code/Cursor reloaded successfully!"
    else
        echo "⚠️  Auto-reload failed. Please manually reload:"
        echo "   Cmd+Shift+P / Ctrl+Shift+P → 'Developer: Reload Window'"
    fi
else
    echo "❌ Installation failed"
    echo ""
    echo "📝 Manual installation steps:"
    echo "   1. Open VS Code/Cursor"
    echo "   2. Cmd+Shift+P (Mac) or Ctrl+Shift+P (Linux) → 'Extensions: Install from VSIX'"
    echo "   3. Select: $VSIX_FILE"
    exit 1
fi 