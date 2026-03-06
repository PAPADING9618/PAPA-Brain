'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { memoryData } from '../data/memories';
import { MemoryItem, ContentType, DateFilter, FilterState } from '../types';
import { format, isToday, isThisWeek, isThisMonth, isThisYear, parseISO } from 'date-fns';
import Fuse from 'fuse.js';

const typeLabels: Record<ContentType | 'all', string> = {
  all: '全部',
  memory: '记忆',
  conversation: '对话',
  note: '笔记',
  task: '任务',
  goal: '目标'
};

const typeColors: Record<ContentType, string> = {
  memory: '#3b82f6',
  conversation: '#8b5cf6',
  note: '#10b981',
  task: '#f59e0b',
  goal: '#ef4444'
};

const dateFilters: { value: DateFilter; label: string }[] = [
  { value: 'all', label: '全部时间' },
  { value: 'today', label: '今天' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
  { value: 'year', label: '今年' }
];

export default function SecondBrain() {
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    type: 'all',
    dateRange: 'all'
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);

  // Fuse.js 搜索配置
  const fuse = useMemo(() => {
    return new Fuse(memoryData, {
      keys: ['title', 'content', 'tags'],
      threshold: 0.3,
      includeScore: true
    });
  }, []);

  // Cmd+K 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSelectedItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 过滤数据
  const filteredData = useMemo(() => {
    let result = memoryData;

    // 搜索过滤
    if (filters.query) {
      const searchResults = fuse.search(filters.query);
      result = searchResults.map(r => r.item);
    }

    // 类型过滤
    if (filters.type !== 'all') {
      result = result.filter(item => item.type === filters.type);
    }

    // 日期过滤
    if (filters.dateRange !== 'all') {
      result = result.filter(item => {
        const date = parseISO(item.date);
        switch (filters.dateRange) {
          case 'today':
            return isToday(date);
          case 'week':
            return isThisWeek(date);
          case 'month':
            return isThisMonth(date);
          case 'year':
            return isThisYear(date);
          default:
            return true;
        }
      });
    }

    return result;
  }, [filters, fuse]);

  // 按日期分组
  const groupedData = useMemo(() => {
    const groups: Record<string, MemoryItem[]> = {};
    filteredData.forEach(item => {
      if (!groups[item.date]) {
        groups[item.date] = [];
      }
      groups[item.date].push(item);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filteredData]);

  const handleSearch = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, query }));
    setIsSearchOpen(false);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Second Brain</h1>
          <span style={styles.subtitle}>{filteredData.length} 条记忆</span>
        </div>
        <button 
          style={styles.searchButton}
          onClick={() => setIsSearchOpen(true)}
        >
          <span>搜索...</span>
          <span style={styles.keyboardShortcut}>⌘K</span>
        </button>
      </header>

      {/* Filters */}
      <div style={styles.filterBar}>
        <div style={styles.filterGroup}>
          {(['all', 'memory', 'conversation', 'note', 'task', 'goal'] as const).map(type => (
            <button
              key={type}
              style={{
                ...styles.filterButton,
                ...(filters.type === type ? styles.filterButtonActive : {})
              }}
              onClick={() => setFilters(prev => ({ ...prev, type }))}
            >
              {type !== 'all' && (
                <span 
                  style={{
                    ...styles.typeDot,
                    backgroundColor: typeColors[type as ContentType]
                  }} 
                />
              )}
              {typeLabels[type]}
            </button>
          ))}
        </div>

        <div style={styles.filterGroup}>
          {dateFilters.map(({ value, label }) => (
            <button
              key={value}
              style={{
                ...styles.filterButton,
                ...(filters.dateRange === value ? styles.filterButtonActive : {})
              }}
              onClick={() => setFilters(prev => ({ ...prev, dateRange: value }))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {groupedData.length === 0 ? (
          <div style={styles.empty}>
            <p>没有找到匹配的记忆</p>
          </div>
        ) : (
          groupedData.map(([date, items]) => (
            <div key={date} style={styles.dateGroup}>
              <div style={styles.dateHeader}>
                <span style={styles.dateLabel}>{format(parseISO(date), 'yyyy年MM月dd日')}</span>
                <span style={styles.dateCount}>{items.length} 条</span>
              </div>
              
              <div style={styles.itemList}>
                {items.map(item => (
                  <div
                    key={item.id}
                    style={styles.item}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div style={styles.itemHeader}>
                      <span 
                        style={{
                          ...styles.itemType,
                          backgroundColor: typeColors[item.type] + '20',
                          color: typeColors[item.type]
                        }}
                      >
                        {typeLabels[item.type]}
                      </span>
                      <span style={styles.itemSource}>{item.source}</span>
                    </div>
                    <h3 style={styles.itemTitle}>{item.title}</h3>
                    <p style={styles.itemContent}>{item.content}</p>
                    
                    <div style={styles.itemFooter}>
                      <div style={styles.tags}>
                        {item.tags.map(tag => (
                          <span key={tag} style={styles.tag}>#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal 
          onClose={() => setIsSearchOpen(false)}
          onSearch={handleSearch}
          fuse={fuse}
        />
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal 
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          typeLabels={typeLabels}
          typeColors={typeColors}
        />
      )}
    </div>
  );
}

// Search Modal Component
function SearchModal({ 
  onClose, 
  onSearch,
  fuse 
}: { 
  onClose: () => void;
  onSearch: (query: string) => void;
  fuse: Fuse<MemoryItem>;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ item: MemoryItem; score?: number }[]>([]);

  useEffect(() => {
    if (query) {
      const searchResults = fuse.search(query);
      setResults(searchResults.slice(0, 10));
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.searchModal} onClick={e => e.stopPropagation()}>
        <div style={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="搜索记忆、对话、笔记..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={styles.searchInput}
            autoFocus
          />
          <button style={styles.searchClose} onClick={onClose}>ESC</button>
        </div>
        
        {results.length > 0 && (
          <div style={styles.searchResults}>
            {results.map(({ item, score }) => (
              <div
                key={item.id}
                style={styles.searchResult}
                onClick={() => {
                  onSearch(query);
                  onClose();
                }}
              >
                <div style={styles.searchResultTitle}>{item.title}</div>
                <div style={styles.searchResultMeta}>
                  <span>{typeLabels[item.type]}</span>
                  <span>{item.date}</span>
                  <span>匹配度: {Math.round((1 - (score || 0)) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Detail Modal Component
function DetailModal({ 
  item, 
  onClose,
  typeLabels,
  typeColors
}: { 
  item: MemoryItem;
  onClose: () => void;
  typeLabels: Record<string, string>;
  typeColors: Record<string, string>;
}) {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.detailModal} onClick={e => e.stopPropagation()}>
        <button style={styles.detailClose} onClick={onClose}>×</button>
        
        <div style={styles.detailHeader}>
          <span 
            style={{
              ...styles.detailType,
              backgroundColor: typeColors[item.type] + '20',
              color: typeColors[item.type]
            }}
          >
            {typeLabels[item.type]}
          </span>
          <span style={styles.detailSource}>来源: {item.source}</span>
        </div>
        
        <h2 style={styles.detailTitle}>{item.title}</h2>
        <div style={styles.detailDate}>{format(parseISO(item.date), 'yyyy年MM月dd日')}</div>
        
        <div style={styles.detailContent}>{item.content}</div>
        
        <div style={styles.detailTags}>
          {item.tags.map(tag => (
            <span key={tag} style={styles.detailTag}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid var(--border)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 600,
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-tertiary)'
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    transition: 'all 0.2s'
  },
  keyboardShortcut: {
    padding: '4px 8px',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace'
  },
  filterBar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    border: '1px solid var(--border)'
  },
  filterGroup: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    color: 'var(--text-secondary)',
    transition: 'all 0.2s'
  },
  filterButtonActive: {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    borderColor: 'var(--text-primary)'
  },
  typeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--text-tertiary)'
  },
  dateGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  dateHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 4px'
  },
  dateLabel: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary)'
  },
  dateCount: {
    fontSize: '12px',
    color: 'var(--text-tertiary)'
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  item: {
    padding: '20px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px'
  },
  itemType: {
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  itemSource: {
    fontSize: '12px',
    color: 'var(--text-tertiary)'
  },
  itemTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--text-primary)'
  },
  itemContent: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  itemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tag: {
    fontSize: '12px',
    color: 'var(--text-tertiary)'
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '15vh',
    zIndex: 1000
  },
  searchModal: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 20px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
    overflow: 'hidden'
  },
  searchInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    borderBottom: '1px solid var(--border)'
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: 'transparent',
    color: 'var(--text-primary)'
  },
  searchClose: {
    padding: '6px 10px',
    backgroundColor: 'var(--bg-primary)',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    color: 'var(--text-tertiary)',
    cursor: 'pointer'
  },
  searchResults: {
    maxHeight: '400px',
    overflow: 'auto'
  },
  searchResult: {
    padding: '16px 20px',
    borderBottom: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  searchResultTitle: {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '6px',
    color: 'var(--text-primary)'
  },
  searchResultMeta: {
    display: 'flex',
    gap: '12px',
    fontSize: '12px',
    color: 'var(--text-tertiary)'
  },
  detailModal: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    margin: '0 20px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
    padding: '32px',
    maxHeight: '80vh',
    overflow: 'auto'
  },
  detailClose: {
    position: 'absolute',
    top: '16px',
    right: '20px',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-primary)',
    border: 'none',
    borderRadius: '50%',
    fontSize: '20px',
    color: 'var(--text-secondary)',
    cursor: 'pointer'
  },
  detailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  detailType: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500
  },
  detailSource: {
    fontSize: '13px',
    color: 'var(--text-tertiary)'
  },
  detailTitle: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '8px',
    lineHeight: 1.3
  },
  detailDate: {
    fontSize: '13px',
    color: 'var(--text-tertiary)',
    marginBottom: '24px'
  },
  detailContent: {
    fontSize: '15px',
    lineHeight: 1.8,
    color: 'var(--text-secondary)',
    marginBottom: '24px',
    whiteSpace: 'pre-wrap'
  },
  detailTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  detailTag: {
    padding: '6px 12px',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: '6px',
    fontSize: '13px',
    color: 'var(--text-secondary)'
  }
};
