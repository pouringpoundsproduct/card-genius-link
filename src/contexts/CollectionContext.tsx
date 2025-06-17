
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CollectionContextType {
  savedCards: string[];
  addToCollection: (cardId: string) => void;
  removeFromCollection: (cardId: string) => void;
  isInCollection: (cardId: string) => boolean;
  collectionCount: number;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedCards, setSavedCards] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cg-collection');
    if (saved) {
      setSavedCards(JSON.parse(saved));
    }
  }, []);

  const addToCollection = (cardId: string) => {
    const newSavedCards = [...savedCards, cardId];
    setSavedCards(newSavedCards);
    localStorage.setItem('cg-collection', JSON.stringify(newSavedCards));
  };

  const removeFromCollection = (cardId: string) => {
    const newSavedCards = savedCards.filter(id => id !== cardId);
    setSavedCards(newSavedCards);
    localStorage.setItem('cg-collection', JSON.stringify(newSavedCards));
  };

  const isInCollection = (cardId: string) => savedCards.includes(cardId);

  return (
    <CollectionContext.Provider value={{
      savedCards,
      addToCollection,
      removeFromCollection,
      isInCollection,
      collectionCount: savedCards.length
    }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};
