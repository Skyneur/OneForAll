import React, { useState } from 'react';
import { Menu, X, Book, Shield, Zap, Heart, Home, Wrench, ChevronRight } from 'lucide-react';
import type { Category } from '../types';
import './Sidebar.css';

interface SidebarProps {
  categories: Category[];
  activeChapter: string | null;
  onChapterSelect: (chapterId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  shelter: Home,
  water: Shield,
  fire: Zap,
  food: Heart,
  medical: Heart,
  tools: Wrench,
  navigation: Book,
};

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeChapter,
  onChapterSelect,
  isOpen,
  onToggle,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <>
      {/* Toggle Button */}
      <button className="sidebar-toggle animate-fade-in" onClick={onToggle}>
        <div className={`toggle-icon ${isOpen ? 'toggle-icon--open' : ''}`}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header animate-slide-down">
          <div className="sidebar__logo">
            <div className="logo-icon animate-bounce-subtle">
              <Shield size={32} />
            </div>
            <h2>Guide de Survie</h2>
          </div>
        </div>

        <nav className="sidebar__nav">
          {categories.map((category, index) => {
            const IconComponent = categoryIcons[category.id] || Book;
            const isExpanded = expandedCategories.has(category.id);
            
            return (
              <div 
                key={category.id} 
                className="nav-category animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button 
                  className={`nav-category__toggle ${isExpanded ? 'nav-category__toggle--expanded' : ''}`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="nav-category__content">
                    <IconComponent size={20} />
                    <span>{category.name}</span>
                    <span className="chapter-count">({category.chapters.length})</span>
                  </div>
                  <div className={`chevron ${isExpanded ? 'chevron--expanded' : ''}`}>
                    <ChevronRight size={16} />
                  </div>
                </button>
                
                <div className={`nav-category__chapters ${isExpanded ? 'nav-category__chapters--expanded' : ''}`}>
                  <ul>
                    {category.chapters
                      .sort((a, b) => a.order - b.order)
                      .map((chapter, chapterIndex) => (
                        <li 
                          key={chapter.id}
                          className="animate-slide-in"
                          style={{ animationDelay: `${(index * 0.1) + (chapterIndex * 0.05)}s` }}
                        >
                          <button
                            className={`nav-chapter ${
                              activeChapter === chapter.id ? 'nav-chapter--active' : ''
                            }`}
                            onClick={() => onChapterSelect(chapter.id)}
                          >
                            <span className="nav-chapter__title">{chapter.title}</span>
                            {activeChapter === chapter.id && (
                              <div className="nav-chapter__indicator animate-scale-in" />
                            )}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="sidebar__footer animate-fade-in">
          <p className="text-muted">
            Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay animate-fade-in" onClick={onToggle} />}
    </>
  );
};