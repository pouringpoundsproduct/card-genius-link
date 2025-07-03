
import React from 'react';
import { useCollection } from '../contexts/CollectionContext';
import { useCardData } from '../contexts/CardDataContext';
import { X, Copy, Trash2, GitCompare } from 'lucide-react';

interface CollectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CollectionDrawer: React.FC<CollectionDrawerProps> = ({ isOpen, onClose }) => {
  const { savedCards, removeFromCollection } = useCollection();
  const { getCardById } = useCardData();

  const collectionCards = savedCards.map(id => getCardById(id)).filter(Boolean);

  const handleCopyAllLinks = () => {
    const links = collectionCards.map(card => `Affiliate link for ${card?.name}`).join('\n');
    alert(`All affiliate links copied!\n\n${links}`);
  };

  const handleCopyLink = (cardName: string) => {
    alert(`Affiliate link for ${cardName} copied!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Mobile: Bottom drawer */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 bg-cg-card rounded-t-lg animate-slide-up">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-lg">
              Collection ({collectionCards.length})
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-4">
          {collectionCards.length === 0 ? (
            <p className="text-center text-cg-muted py-8">No cards saved yet</p>
          ) : (
            <div className="space-y-3">
              {collectionCards.map((card) => (
                <div key={card?.id} className="flex items-center gap-3 p-3 bg-cg-bg rounded-lg">
                  <div className="w-10 h-6 bg-gradient-to-br from-cg-violet to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{card?.name.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{card?.name}</div>
                    <div className="text-xs text-cg-muted">₹{card?.affiliatePayout} payout</div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleCopyLink(card?.name || '')}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromCollection(card?.id || '')}
                      className="p-1 hover:bg-gray-100 rounded text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {collectionCards.length > 0 && (
          <div className="p-4 border-t">
            <button
              onClick={handleCopyAllLinks}
              className="w-full bg-gradient-orange text-white py-3 rounded-lg font-semibold"
            >
              Copy All Links
            </button>
          </div>
        )}
      </div>

      {/* Desktop: Side panel */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-96 bg-cg-card shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-xl">
              Collection ({collectionCards.length})
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {collectionCards.length === 0 ? (
            <p className="text-center text-cg-muted py-8">No cards saved yet</p>
          ) : (
            <div className="space-y-4">
              {collectionCards.map((card) => (
                <div key={card?.id} className="p-4 bg-cg-bg rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-8 bg-gradient-to-br from-cg-violet to-purple-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{card?.name.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{card?.name}</div>
                      <div className="text-sm text-cg-muted">{card?.tagline}</div>
                      <div className="text-sm text-cg-muted mt-1">Payout: ₹{card?.affiliatePayout}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyLink(card?.name || '')}
                      className="flex-1 flex items-center justify-center gap-2 bg-cg-violet text-white py-2 px-3 rounded text-sm font-semibold"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </button>
                    <button
                      onClick={() => removeFromCollection(card?.id || '')}
                      className="p-2 hover:bg-gray-100 rounded text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {collectionCards.length > 0 && (
          <div className="p-6 border-t">
            <button
              onClick={handleCopyAllLinks}
              className="w-full bg-gradient-orange text-white py-3 rounded-lg font-semibold mb-3"
            >
              Copy All Links
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDrawer;
