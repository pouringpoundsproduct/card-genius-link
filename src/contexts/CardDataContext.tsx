
import React, { createContext, useContext } from 'react';
import { Card, cards } from '../data/cards';

interface CardDataContextType {
  cards: Card[];
  getCardById: (id: string) => Card | undefined;
}

const CardDataContext = createContext<CardDataContextType | undefined>(undefined);

export const CardDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getCardById = (id: string) => cards.find(card => card.id === id);

  return (
    <CardDataContext.Provider value={{ cards, getCardById }}>
      {children}
    </CardDataContext.Provider>
  );
};

export const useCardData = () => {
  const context = useContext(CardDataContext);
  if (!context) {
    throw new Error('useCardData must be used within a CardDataProvider');
  }
  return context;
};
