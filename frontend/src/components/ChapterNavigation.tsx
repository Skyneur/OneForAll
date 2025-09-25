import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Chapter } from '../types';
import './ChapterNavigation.css';

interface ChapterNavigationProps {
  currentChapter: Chapter | null;
  previousChapter: Chapter | null;
  nextChapter: Chapter | null;
  onChapterSelect: (chapterId: string) => void;
}

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  currentChapter,
  previousChapter,
  nextChapter,
  onChapterSelect,
}) => {
  if (!currentChapter) {
    return null;
  }

  return (
    <nav className="chapter-navigation">
      <div className="chapter-nav-container">
        {previousChapter ? (
          <button
            className="chapter-nav-button chapter-nav-button--prev"
            onClick={() => onChapterSelect(previousChapter.id)}
          >
            <ChevronLeft size={20} />
            <div className="chapter-nav-content">
              <span className="chapter-nav-label">Précédent</span>
              <span className="chapter-nav-title">{previousChapter.title}</span>
            </div>
          </button>
        ) : (
          <div className="chapter-nav-spacer" />
        )}

        {nextChapter ? (
          <button
            className="chapter-nav-button chapter-nav-button--next"
            onClick={() => onChapterSelect(nextChapter.id)}
          >
            <div className="chapter-nav-content">
              <span className="chapter-nav-label">Suivant</span>
              <span className="chapter-nav-title">{nextChapter.title}</span>
            </div>
            <ChevronRight size={20} />
          </button>
        ) : (
          <div className="chapter-nav-spacer" />
        )}
      </div>
    </nav>
  );
};