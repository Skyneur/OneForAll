import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Clock, Tag, Home, Shield, Zap, Heart, Lightbulb } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { ChapterNavigation } from './ChapterNavigation';
import type { Chapter, Category } from '../types';
import './ChapterContent.css';

interface ChapterContentProps {
  chapter: Chapter | null;
  category: Category | null;
  previousChapter: Chapter | null;
  nextChapter: Chapter | null;
  onChapterSelect: (chapterId: string) => void;
}

export const ChapterContent: React.FC<ChapterContentProps> = ({ 
  chapter, 
  category, 
  previousChapter, 
  nextChapter, 
  onChapterSelect 
}) => {
  if (!chapter) {
    return (
      <div className="chapter-content">
        <Breadcrumb chapter={null} category={null} />
        
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1>Guide de Survie Apocalyptique</h1>
            <p>
              Bienvenue dans votre guide de survie complet. Sélectionnez un chapitre 
              dans le menu de navigation pour commencer votre apprentissage.
            </p>
            <div className="welcome-features">
              <div className="feature">
                <div className="feature-icon">
                  <Home size={24} />
                </div>
                <h3>Abri</h3>
                <p>Construction et aménagement d'abris de fortune</p>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <Shield size={24} />
                </div>
                <h3>Eau</h3>
                <p>Purification et stockage de l'eau potable</p>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <Zap size={24} />
                </div>
                <h3>Feu</h3>
                <p>Techniques d'allumage et maintenance du feu</p>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <Heart size={24} />
                </div>
                <h3>Nourriture</h3>
                <p>Chasse, pêche et cueillette en milieu hostile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chapter-content fade-in">
      <Breadcrumb chapter={chapter} category={category} />
      
      <header className="chapter-header">
        <h1>{chapter.title}</h1>
        <div className="chapter-meta">
          <div className="meta-item">
            <Clock size={16} />
            <span>Mis à jour le {new Date(chapter.lastUpdated).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="meta-item">
            <Tag size={16} />
            <div className="tags">
              {chapter.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="chapter-body">
        <ReactMarkdown
          components={{
            code({ className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !match;
              return !isInline ? (
                <SyntaxHighlighter
                  style={tomorrow as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            h1: ({ children }) => <h2>{children}</h2>,
            h2: ({ children }) => <h3>{children}</h3>,
            h3: ({ children }) => <h4>{children}</h4>,
            blockquote: ({ children }) => (
              <blockquote className="survival-tip">
                <div className="survival-tip-header">
                  <Lightbulb size={16} />
                  <span>CONSEIL DE SURVIE</span>
                </div>
                {children}
              </blockquote>
            ),
          }}
        >
          {chapter.content}
        </ReactMarkdown>
      </div>
      
      <ChapterNavigation
        currentChapter={chapter}
        previousChapter={previousChapter}
        nextChapter={nextChapter}
        onChapterSelect={onChapterSelect}
      />
    </div>
  );
};