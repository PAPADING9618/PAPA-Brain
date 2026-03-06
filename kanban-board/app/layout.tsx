import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '小小pa 任务看板',
  description: 'Kanban Board for papa酱',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
