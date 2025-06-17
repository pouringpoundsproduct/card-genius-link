
import React from 'react';
import { Card } from '../data/cards';

interface CardTagProps {
  card: Card;
}

const CardTag: React.FC<CardTagProps> = ({ card }) => {
  const generateTags = (card: Card): string[] => {
    const tags: string[] = [];
    
    if (card.isLifetimeFree) {
      tags.push('LTF');
    }
    
    if (card.loungeAccess !== 'None' && card.loungeAccess !== '—') {
      tags.push('Lounge');
    }
    
    if ((card.rewardRates.online || 0) >= 5) {
      tags.push('5% Online');
    }
    
    if (card.rentRewardsAllowed) {
      tags.push('Rent OK');
    }
    
    if (card.annualFee === 0) {
      tags.push('₹0 Fee');
    }
    
    return tags;
  };

  const tags = generateTags(card);

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block px-2 py-1 bg-cg-bg text-cg-violet text-xs font-semibold rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default CardTag;
