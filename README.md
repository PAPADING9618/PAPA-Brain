# papa酱的个人工作台

## 🚀 GitHub Pages 部署指南

### 第一步：创建 GitHub 仓库
1. 访问 https://github.com/new
2. 仓库名称填写：`papa-brain`（或你喜欢的名字）
3. 选择 **Public**（公开）
4. 勾选 **Add a README file**
5. 点击 **Create repository**

### 第二步：上传文件
1. 进入新创建的仓库
2. 点击 **Add file** → **Upload files**
3. 上传以下文件：
   - `index.html`（密码验证页）
   - `home.html`（工作台首页）
   - `kanban.html`（看板）
   - `second-brain.html`（第二大脑）
4. 点击 **Commit changes**

### 第三步：启用 GitHub Pages
1. 进入仓库的 **Settings** 标签
2. 左侧菜单点击 **Pages**
3. **Source** 选择 **Deploy from a branch**
4. **Branch** 选择 **main** 和 **/ (root)**
5. 点击 **Save**

### 第四步：访问你的网站
- 等待 2-5 分钟
- 访问链接：`https://你的用户名.github.io/papa-brain/`
- **默认密码：`papa2026`**

---

## 🔒 密码修改

打开 `index.html`，找到这一行修改密码：
```javascript
const CORRECT_PASSWORD = 'papa2026';
```

改完后重新上传即可。

---

## 📁 文件说明

| 文件 | 功能 |
|------|------|
| `index.html` | 密码验证页面 |
| `home.html` | 工作台首页 |
| `kanban.html` | 任务看板（拖拽管理） |
| `second-brain.html` | 第二大脑（目标/项目/知识库） |

---

## 🔄 后续更新

修改文件后重新上传即可，GitHub Pages 会自动更新。

或者使用 Git 命令（如果你熟悉）：
```bash
git clone https://github.com/你的用户名/papa-brain.git
cd papa-brain
# 修改文件...
git add .
git commit -m "更新内容"
git push
```
