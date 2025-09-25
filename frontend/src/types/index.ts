export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
  category: string;
  tags: string[];
  lastUpdated: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface SurvivalGuide {
  title: string;
  description: string;
  version: string;
  categories: Category[];
  lastUpdated: Date;
}

export interface NavigationItem {
  id: string;
  title: string;
  category?: string;
  order: number;
}