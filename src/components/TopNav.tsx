
import React from 'react';
import { useCollection } from '../contexts/CollectionContext';
import { Heart } from 'lucide-react';

interface TopNavProps {
  onCollectionClick?: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ onCollectionClick }) => {
  const { collectionCount } = useCollection();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-gradient-violet text-white flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-cg-violet font-bold text-sm">CG</span>
        </div>
        <span className="ml-2 font-heading font-semibold">CardGenius</span>
      </div>
      
      <button
        onClick={onCollectionClick}
        className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Open collection"
      >
        <Heart className="w-5 h-5" />
        {collectionCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-cg-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {collectionCount}
          </span>
        )}
      </button>
    </nav>
  );
};

export default TopNav;
