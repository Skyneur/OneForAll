import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import type { Chapter, Category } from '../types';
import './Breadcrumb.css';

interface BreadcrumbProps {
  chapter: Chapter | null;
  category: Category | null;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ chapter, category }) => {
  if (!chapter || !category) {
    return (
      <nav className="breadcrumb">
        <div className="breadcrumb-item">
          <Home size={16} />
          <span>Documentation</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="breadcrumb">
      <div className="breadcrumb-item">
        <Home size={16} />
        <span>Documentation</span>
      </div>
      
      <ChevronRight size={16} className="breadcrumb-separator" />
      
      <div className="breadcrumb-item">
        <span>{category.name}</span>
      </div>
      
      <ChevronRight size={16} className="breadcrumb-separator" />
      
      <div className="breadcrumb-item breadcrumb-item--current">
        <span>{chapter.title}</span>
      </div>
    </nav>
  );
};