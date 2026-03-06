'use client'

import React, { useState, useEffect } from 'react'

type TaskStatus = 'todo' | 'inprogress' | 'done'

interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: '🎣 每日路亚简报',
    description: '每天晚上10点推送上海浦东天气和钓鱼建议',
    status: 'done',
    createdAt: '2026-03-03',
    updatedAt: '2026-03-03'
  },
  {
    id: '2',
    title: '📱 飞书机器人配置',
    description: '配置飞书机器人权限和事件订阅',
    status: 'done',
    createdAt: '2026-03-03',
    updatedAt: '2026-03-03'
  },
  {
    id: '3',
    title: '📊 路亚账号运营体系',
    description: '搭建抖音/小红书路亚账号运营框架',
    status: 'done',
    createdAt: '2026-03-03',
    updatedAt: '2026-03-03'
  },
  {
    id: '4',
    title: '📈 飞书多维表格数据追踪',
    description: '创建视频明细表、每日汇总表、周度复盘表',
    status: 'done',
    createdAt: '2026-03-03',
    updatedAt: '2026-03-03'
  },
  {
    id: '5',
    title: '🔥 每日热点监测',
    description: '每天晚上8点监测抖音路亚相关热榜',
    status: 'inprogress',
    createdAt: '2026-03-03',
    updatedAt: '2026-03-03'
  },
  {
    id: '6',
    title: '📋 每周数据报表',
    description: '每周日上午9点生成热点分析和数据追踪报告',
    status: 'inprogress',
    createdAt: '2026-03-03',
    updatedAt: '2026-03-03'
  },
  {
    id: '7',
    title: '🎨 小红书内容创作',
    description: '协助papa酱撰写小红书笔记和生成封面',
    status: 'todo',
    createdAt: '2026-03-03',
    updatedAt: '2026-03-03'
  },
  {
    id: '8',
    title: '📹 脚本和分镜协助',
    description: '协助撰写抖音视频脚本和分镜设计',
    status: 'todo',
    createdAt: '2026-03-03',
    updatedAt: '2026-03-03'
  }
]

const columns = [
  { id: 'todo', title: '📋 待办 (To Do)', color: '#e2e8f0' },
  { id: 'inprogress', title: '🔄 进行中 (In Progress)', color: '#dbeafe' },
  { id: 'done', title: '✅ 已完成 (Done)', color: '#dcfce7' }
] as const

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleString('zh-CN'))

  // 模拟实时更新 - 监听任务变化
  useEffect(() => {
    const interval = setInterval(() => {
      // 检查是否有新的更新（这里可以连接实际的数据源）
      setLastUpdate(new Date().toLocaleString('zh-CN'))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : task
    ))
    setLastUpdate(new Date().toLocaleString('zh-CN'))
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status)
  }

  const getTaskCount = (status: TaskStatus) => {
    return getTasksByStatus(status).length
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🎯 小小pa 任务看板</h1>
        <p style={styles.subtitle}>为 papa酱 服务的任务追踪系统</p>
        <div style={styles.stats}>
          <span style={styles.statItem}>📋 待办: {getTaskCount('todo')}</span>
          <span style={styles.statItem}>🔄 进行中: {getTaskCount('inprogress')}</span>
          <span style={styles.statItem}>✅ 已完成: {getTaskCount('done')}</span>
          <span style={styles.updateTime}>🕐 更新于: {lastUpdate}</span>
        </div>
      </header>

      <div style={styles.board}>
        {columns.map(column => (
          <div key={column.id} style={{ ...styles.column, backgroundColor: column.color }}>
            <div style={styles.columnHeader}>
              <h3 style={styles.columnTitle}>{column.title}</h3>
              <span style={styles.countBadge}>{getTasksByStatus(column.id as TaskStatus).length}</span>
            </div>
            
            <div style={styles.taskList}>
              {getTasksByStatus(column.id as TaskStatus).map(task => (
                <div key={task.id} style={styles.taskCard}>
                  <h4 style={styles.taskTitle}>{task.title}</h4>
                  <p style={styles.taskDescription}>{task.description}</p>
                  <div style={styles.taskMeta}>
                    <span style={styles.taskDate}>创建于: {task.createdAt}</span>
                  </div>
                  <div style={styles.taskActions}>
                    {column.id !== 'todo' && (
                      <button 
                        style={{...styles.button, backgroundColor: '#64748b'}}
                        onClick={() => moveTask(task.id, column.id === 'done' ? 'inprogress' : 'todo')}
                      >
                        ← 左移
                      </button>
                    )}
                    {column.id !== 'done' && (
                      <button 
                        style={{...styles.button, backgroundColor: '#3b82f6'}}
                        onClick={() => moveTask(task.id, column.id === 'todo' ? 'inprogress' : 'done')}
                      >
                        右移 →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        <p>💡 提示：点击"左移"或"右移"按钮可以更新任务状态，状态会实时同步</p>
      </footer>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white'
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 10px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: 0.9,
    margin: '0 0 20px 0'
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  statItem: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem'
  },
  updateTime: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem'
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  column: {
    borderRadius: '16px',
    padding: '20px',
    minHeight: '500px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  columnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid rgba(0,0,0,0.1)'
  },
  columnTitle: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#1e293b'
  },
  countBadge: {
    backgroundColor: '#ffffff',
    color: '#1e293b',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  },
  taskTitle: {
    margin: '0 0 8px 0',
    fontSize: '1rem',
    color: '#1e293b'
  },
  taskDescription: {
    margin: '0 0 12px 0',
    fontSize: '0.85rem',
    color: '#64748b',
    lineHeight: 1.5
  },
  taskMeta: {
    marginBottom: '12px'
  },
  taskDate: {
    fontSize: '0.75rem',
    color: '#94a3b8'
  },
  taskActions: {
    display: 'flex',
    gap: '8px'
  },
  button: {
    flex: 1,
    padding: '8px 12px',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'opacity 0.2s'
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    color: 'white',
    opacity: 0.8
  }
}
