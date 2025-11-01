# Release Notes - v1.3.0

**Release Date**: November 1, 2025

## 🎉 Task Master v0.31.0 Compatibility Release

This release extends the extension's compatibility to support Task Master v0.31.0, ensuring seamless integration with the latest version while maintaining full backward compatibility.

---

## ✨ What's New

### 📦 Extended Version Support

- **Wide Version Range**: Now fully compatible with Task Master v0.17.0 through v0.31.0
- **Relaxed Version Checking**: Enhanced version compatibility algorithm to support up to 20 minor version differences
- **Future-Proof Architecture**: Improved version detection mechanism for better forward compatibility

### 🛠️ Technical Improvements

#### Version Compatibility Algorithm
- Updated minor version difference threshold from 1 to 20
- Maintains strict major version matching for safety
- Improved warning messages for version mismatches

#### Backward Compatibility
- Full support for existing v0.17.0+ projects
- No breaking changes to existing functionality
- Seamless upgrade path for all users

---

## 📊 Supported Versions

### Task Master Compatibility
- **Minimum Version**: v0.17.0
- **Maximum Version**: v0.31.0
- **Recommended**: v0.31.0 (latest)

### VS Code Compatibility
- **Minimum Version**: 1.70.0
- **Tested With**: VS Code 1.94.x and Cursor IDE

---

## 🔧 Installation & Upgrade

### Fresh Installation

```bash
# Install the extension from VS Code Marketplace
# Or install from VSIX file
code --install-extension claude-task-master-extension-1.3.0.vsix
```

### Upgrading from v1.2.x

1. **Automatic Update**: If you have auto-update enabled, the extension will update automatically
2. **Manual Update**: 
   - Download the latest `.vsix` from [releases](https://github.com/DevDreed/claude-task-master-extension/releases)
   - Install via VS Code: Extensions → ... → Install from VSIX

### Compatibility Check

After upgrading, the extension will automatically:
- Detect your installed Task Master version
- Verify compatibility
- Display warnings if version mismatches are detected
- Continue functioning with appropriate fallbacks

---

## 💡 Usage Notes

### Version Detection
The extension now supports a wider range of Task Master versions:

```
✅ Supported: v0.17.0 - v0.31.0
⚠️  Warning:  Minor version differences > 20
❌ Blocked:   Major version mismatches
```

### CLI Fallback Behavior
When version mismatches are detected:
- The extension automatically falls back to CLI commands
- Users can configure this behavior via `claudeTaskMaster.preferCLIOnVersionMismatch`
- All functionality remains available regardless of version differences

---

## 📝 What Hasn't Changed

### All Existing Features Preserved
- Multi-Context Tag Management
- Visual Task Management
- CLI Fallback System
- Productivity Features
- Zero Configuration Setup
- Real-time Updates

### File Format Compatibility
- Supports all existing task.json formats
- Tagged format (v0.17.0+)
- Legacy array format
- Nested tag format

---

## 🔍 Testing Recommendations

### For Users Upgrading

1. **Verify Your Task Master Version**
   ```bash
   task-master --version
   # or
   npx task-master-ai --version
   ```

2. **Test Basic Operations**
   - View tasks in tree view
   - Create a new task
   - Update task status
   - Switch between tags

3. **Check Extension Logs**
   - Open Output panel (View → Output)
   - Select "Claude Task Master" from dropdown
   - Verify no compatibility warnings

### For New Users

1. **Install Task Master v0.31.0**
   ```bash
   npm install -g task-master-ai@0.31.0
   ```

2. **Initialize Your Project**
   ```bash
   cd your-project
   task-master init
   ```

3. **Install the Extension**
   - Search for "Claude Task Master" in VS Code Extensions
   - Click Install

---

## 🐛 Known Issues

### None Reported
This release focuses on compatibility updates with no known regressions.

If you encounter any issues:
1. Check your Task Master version
2. Verify the extension is v1.3.0
3. Review extension logs
4. Report issues at [GitHub Issues](https://github.com/DevDreed/claude-task-master-extension/issues)

---

## 🛠️ Technical Details

### Changes Summary

#### Modified Files
1. **src/taskMasterClient.ts**
   - Line 1673-1674: Relaxed minor version difference threshold to 20
   - Enhanced compatibility check algorithm

2. **README.md**
   - Updated version badge to 1.3.0
   - Updated Task Master compatibility badge to v0.17.0-v0.31.0
   - Enhanced feature descriptions with compatibility notes

3. **package.json**
   - Bumped version to 1.3.0

4. **CHANGELOG.md**
   - Added comprehensive v1.3.0 changelog entry

### Backward Compatibility

| Feature | v1.2.2 | v1.3.0 |
|---------|--------|--------|
| Task Master v0.17.0 | ✅ | ✅ |
| Task Master v0.20.0 | ⚠️ Warning | ✅ |
| Task Master v0.31.0 | ⚠️ Warning | ✅ |
| Tagged Format | ✅ | ✅ |
| Legacy Format | ✅ | ✅ |
| CLI Fallback | ✅ | ✅ |
| MCP Integration | ✅ | ✅ |

---

## 📚 Additional Resources

### Documentation
- **Main README**: [README.md](README.md)
- **Setup Guide**: [SETUP_ENVIRONMENT.md](SETUP_ENVIRONMENT.md)
- **Security Policy**: [SECURITY.md](SECURITY.md)
- **Test Coverage**: [TEST_COVERAGE.md](TEST_COVERAGE.md)

### Links
- **GitHub Repository**: https://github.com/DevDreed/claude-task-master-extension
- **VS Code Marketplace**: https://marketplace.visualstudio.com/items?itemName=DevDreed.claude-task-master-extension
- **Task Master Project**: https://github.com/eyaltoledano/claude-task-master
- **Issue Tracker**: https://github.com/DevDreed/claude-task-master-extension/issues

---

## 🙏 Acknowledgments

Thank you to:
- The task-master-ai community for continued feedback
- Users who requested wider version support
- Contributors who helped test this release

---

## 📅 What's Next

### Future Plans
- Continue monitoring Task Master updates
- Add support for new Task Master features as they're released
- Enhance version detection and compatibility reporting
- Improve user experience with better version guidance

### Feedback Welcome
We welcome your feedback on this release:
- Report issues: [GitHub Issues](https://github.com/DevDreed/claude-task-master-extension/issues)
- Feature requests: [GitHub Discussions](https://github.com/DevDreed/claude-task-master-extension/discussions)
- General feedback: Project discussions or direct contact

---

**Made with ❤️ for the task-master-ai community**

*Version 1.3.0 - Supporting Task Master v0.17.0 through v0.31.0*

