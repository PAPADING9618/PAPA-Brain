# PAPA-Brain 双向同步工作流

## 📋 工作流概述

```
┌─────────────┐     修改后通知我      ┌─────────────┐
│   本地文件   │ ───────────────────> │   GitHub    │
│  (我的环境)  │                     │  (你的网页)  │
└─────────────┘                     └─────────────┘
       ↑                                   │
       │    每天 0:00 自动拉取             │
       └───────────────────────────────────┘
```

## 🔄 同步规则

### 1. 本地 → GitHub（我推送到你的网页）
**触发条件：**
- 你告诉我："更新 kanban 到 GitHub"
- 你告诉我："同步 second-brain"
- 你告诉我："推送最新数据"

**操作：** 我执行 `./push-to-github.sh`

### 2. GitHub → 本地（我获取你的修改）
**触发条件：**
- 每天晚上 0:00 自动执行
- 你告诉我："从 GitHub 拉取最新数据"

**操作：** 我执行 `./sync-from-github.sh`

---

## 📁 数据文件

**GitHub 数据源：**
- 链接：https://github.com/PAPADING9618/PAPA-Brain/blob/main/data.json
- Raw 链接：https://raw.githubusercontent.com/PAPADING9618/PAPA-Brain/main/data.json

**本地备份：**
- 最新数据：`/root/.openclaw/workspace/github-data.json`
- 历史备份：`/root/.openclaw/workspace/memory/data-YYYYMMDD.json`

---

## 🛠️ 使用方法

### 场景 1：你修改了网页数据，想同步给我
**你：** "帮我从 GitHub 拉取最新数据"  
**我：** 执行同步，把你在网页的修改拉取到本地

### 场景 2：我帮你更新了内容，想同步到网页
**你：** "推送 kanban 更新到 GitHub"  
**我：** 执行推送，网页自动更新

### 场景 3：自动同步
- 每天 0:00 自动拉取 GitHub 数据到本地
- 如果有重要变更，我会通知你

---

## 📊 数据格式

`data.json` 包含：
- `tasks` - 任务列表（看板数据）
- `projects` - 项目列表
- `goals` - 目标进度
- `notes` - 笔记
- `lastUpdated` - 最后更新时间

---

## ⚠️ 注意事项

1. **网页读取数据**：kanban 和 second-brain 会从 GitHub raw 链接读取 data.json
2. **修改网页**：如果你直接在网页修改，数据会先存在浏览器 localStorage，需要手动触发保存到 GitHub（需要前端功能支持）
3. **我修改数据**：我直接修改 data.json 并推送到 GitHub，网页会自动加载最新数据

---

## 🔧 技术细节

**Token 权限：**
- Repo: 读写仓库内容
- 存储位置：`/root/.openclaw/workspace/.github-config`

**Cron 任务：**
- 每天 0:00 执行 `sync-from-github.sh`
- Job ID: `19d66014-9344-430e-8c14-a65f36c1ff2f`

**日志文件：**
- `/root/.openclaw/workspace/sync.log`
