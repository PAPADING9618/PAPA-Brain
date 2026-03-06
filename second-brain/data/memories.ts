import { MemoryItem } from '../types';

export const memoryData: MemoryItem[] = [
  // 记忆
  {
    id: 'm1',
    title: '第一天认识 papa酱',
    content: '2026-03-03，papa酱给我起了名字「小小pa」，还告诉我他叫「papa酱」。正在帮他配置飞书机器人。',
    type: 'memory',
    date: '2026-03-03',
    tags: ['第一天', '命名', '飞书'],
    source: 'MEMORY.md'
  },
  {
    id: 'm2',
    title: 'papa酱的长期目标',
    content: '主业发展：掌握COO技能、研究AI提效、患者管理商业化。副业发展：抖音1万粉丝、小红书5000粉丝。兴趣发展：路亚钓技、野钓探索、参加比赛。',
    type: 'memory',
    date: '2026-03-03',
    tags: ['目标', '路亚', '抖音', '小红书'],
    source: 'GOALS.md'
  },
  {
    id: 'm3',
    title: '风格偏好设定',
    content: 'papa酱希望我的风格更活泼，使用颜文字表达情绪，偶尔用emoji让回复更美观。',
    type: 'memory',
    date: '2026-03-03',
    tags: ['风格', '颜文字', 'emoji'],
    source: 'SOUL.md'
  },
  // 对话记录
  {
    id: 'c1',
    title: '配置飞书机器人',
    content: '讨论了如何配置飞书机器人，包括App ID、App Secret设置，以及权限申请流程。',
    type: 'conversation',
    date: '2026-03-03',
    tags: ['飞书', '配置', '机器人'],
    source: '对话记录'
  },
  {
    id: 'c2',
    title: '安装技能包',
    content: '安装了14个技能包，包括新媒体运营、飞书办公套件、工具增强等类别。',
    type: 'conversation',
    date: '2026-03-03',
    tags: ['技能', '安装', 'clawhub'],
    source: '对话记录'
  },
  {
    id: 'c3',
    title: '搭建路亚账号运营体系',
    content: '为papa酱的路亚抖音/小红书账号搭建了完整的运营体系，包括内容支柱、数据追踪、定时任务等。',
    type: 'conversation',
    date: '2026-03-03',
    tags: ['路亚', '运营', '抖音', '小红书'],
    source: '对话记录'
  },
  // 笔记
  {
    id: 'n1',
    title: '路亚账号运营框架',
    content: '6大内容支柱：路亚教学、实战记录、装备测评、探索发现、数据分享、避坑指南。',
    type: 'note',
    date: '2026-03-03',
    tags: ['路亚', '运营', '框架'],
    source: 'lure-fishing-operation.md'
  },
  {
    id: 'n2',
    title: '飞书多维表格设计',
    content: '设计了视频明细表、每日汇总表、周度复盘表三个关联表格用于数据追踪。',
    type: 'note',
    date: '2026-03-03',
    tags: ['飞书', '多维表格', '数据'],
    source: 'lure-bitable-design.md'
  },
  // 任务
  {
    id: 't1',
    title: '每日路亚简报',
    content: '每天晚上10点推送上海浦东天气和钓鱼建议',
    type: 'task',
    date: '2026-03-03',
    tags: ['定时任务', '路亚', '天气'],
    source: 'cron'
  },
  {
    id: 't2',
    title: '每日热点监测',
    content: '每天晚上8点监测抖音路亚相关热榜',
    type: 'task',
    date: '2026-03-03',
    tags: ['定时任务', '热点', '抖音'],
    source: 'cron'
  },
  {
    id: 't3',
    title: '每周数据报表',
    content: '每周日上午9点生成热点分析和数据追踪报告',
    type: 'task',
    date: '2026-03-03',
    tags: ['定时任务', '周报', '数据'],
    source: 'cron'
  },
  {
    id: 't4',
    title: '小红书内容创作',
    content: '协助papa酱撰写小红书笔记和生成封面',
    type: 'task',
    date: '2026-03-03',
    tags: ['任务', '小红书', '内容创作'],
    source: 'kanban'
  },
  {
    id: 't5',
    title: '脚本和分镜协助',
    content: '协助撰写抖音视频脚本和分镜设计',
    type: 'task',
    date: '2026-03-03',
    tags: ['任务', '抖音', '脚本'],
    source: 'kanban'
  },
  // 目标
  {
    id: 'g1',
    title: '抖音达到1万粉丝',
    content: '路亚主题抖音账号目标：1万粉丝',
    type: 'goal',
    date: '2026-03-03',
    tags: ['目标', '抖音', '粉丝'],
    source: 'GOALS.md'
  },
  {
    id: 'g2',
    title: '小红书达到5000粉丝',
    content: '路亚主题小红书账号目标：5000粉丝',
    type: 'goal',
    date: '2026-03-03',
    tags: ['目标', '小红书', '粉丝'],
    source: 'GOALS.md'
  }
];
