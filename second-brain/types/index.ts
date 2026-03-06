export type ContentType = 'memory' | 'conversation' | 'note' | 'task' | 'goal';

export interface MemoryItem {
  id: string;
  title: string;
  content: string;
  type: ContentType;
  date: string;
  tags: string[];
  source?: string;
}

export interface SearchResult {
  item: MemoryItem;
  score: number;
}

export type DateFilter = 'all' | 'today' | 'week' | 'month' | 'year';

export interface FilterState {
  query: string;
  type: ContentType | 'all';
  dateRange: DateFilter;
}
