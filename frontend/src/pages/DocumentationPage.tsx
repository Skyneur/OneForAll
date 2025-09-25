import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChapterContent } from '../components/ChapterContent';
import { sampleContent } from '../data/sampleContent';
import type { Chapter, Category } from '../types';
import './DocumentationPage.css';

export const DocumentationPage: React.FC = () => {
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Créer une liste plate de tous les chapitres ordonnés
  const allChapters = useMemo(() => {
    const chapters: Chapter[] = [];
    sampleContent.categories.forEach(category => {
      category.chapters
        .sort((a, b) => a.order - b.order)
        .forEach(chapter => chapters.push(chapter));
    });
    return chapters;
  }, []);

  const activeChapter = useMemo((): Chapter | null => {
    if (!activeChapterId) return null
    return allChapters.find(ch => ch.id === activeChapterId) || null;
  }, [activeChapterId, allChapters]);

  const activeCategory = useMemo((): Category | null => {
    if (!activeChapter) return null;
    return sampleContent.categories.find(cat => 
      cat.chapters.some(ch => ch.id === activeChapter.id)
    ) || null;
  }, [activeChapter]);

  const { previousChapter, nextChapter } = useMemo(() => {
    if (!activeChapter) return { previousChapter: null, nextChapter: null };
    
    const currentIndex = allChapters.findIndex(ch => ch.id === activeChapter.id);
    
    return {
      previousChapter: currentIndex > 0 ? allChapters[currentIndex - 1] : null,
      nextChapter: currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null,
    };
  }, [activeChapter, allChapters]);

  const handleChapterSelect = (chapterId: string) => {
    setActiveChapterId(chapterId)
    setSidebarOpen(false) // Fermer la sidebar sur mobile après sélection
  }

  return (
    <div className="documentation-page">
      <div className="documentation-container">
        <Sidebar
          categories={sampleContent.categories}
          activeChapter={activeChapterId}
          onChapterSelect={handleChapterSelect}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="documentation-main">
          <ChapterContent 
            chapter={activeChapter}
            category={activeCategory}
            previousChapter={previousChapter}
            nextChapter={nextChapter}
            onChapterSelect={handleChapterSelect}
          />
        </main>
      </div>
    </div>
  );
};