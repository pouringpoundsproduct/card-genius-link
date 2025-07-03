
import React, { useState } from 'react';
import { useCollection } from '../contexts/CollectionContext';
import { useCardData } from '../contexts/CardDataContext';
import { Heart, Copy, Trash2, GitCompare } from 'lucide-react';
import CardItem from '../components/CardItem';

const Collection: React.FC = () => {
  const { savedCards, removeFromCollection } = useCollection();
  const { getCardById } = useCardData();
  const [compareMode, setCompareMode] = useState(false);

  const collectionCards = savedCards.map(id => getCardById(id)).filter(Boolean);

  const handleCopyAllLinks = () => {
    const links = collectionCards.map(card => `Affiliate link for ${card?.name}`).join('\n');
    alert(`All affiliate links copied!\n\n${links}`);
  };

  const handleCopyLink = (cardName: string) => {
    alert(`Affiliate link for ${cardName} copied!`);
  };

  if (collectionCards.length === 0) {
    return (
      <div className="min-h-screen bg-cg-bg pt-16 pb-20 md:pb-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-heading font-bold text-cg-dark mb-8">My Collection</h1>
          
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">No cards saved yet</h3>
            <p className="text-cg-muted mb-4">Start building your collection by saving cards you like</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cg-bg pt-16 pb-20 md:pb-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading font-bold text-cg-dark">
            My Collection ({collectionCards.length})
          </h1>
          
          <div className="flex gap-3">
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                compareMode 
                  ? 'bg-cg-violet text-white' 
                  : 'bg-cg-card text-cg-dark hover:bg-gray-100'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              Compare
            </button>
            
            <button
              onClick={handleCopyAllLinks}
              className="flex items-center gap-2 bg-gradient-orange text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              <Copy className="w-4 h-4" />
              Copy All Links
            </button>
          </div>
        </div>

        {compareMode ? (
          <div className="bg-cg-card rounded-lg p-6 shadow-cg-card overflow-x-auto">
            <h2 className="text-xl font-heading font-semibold mb-4">Compare Cards</h2>
            <div className="min-w-max">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Card</th>
                    <th className="text-left p-3">Annual Fee</th>
                    <th className="text-left p-3">Online Rate</th>
                    <th className="text-left p-3">Lounge Access</th>
                    <th className="text-left p-3">Rent Rewards</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collectionCards.map((card) => (
                    <tr key={card?.id} className="border-b">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-gradient-to-br from-cg-violet to-purple-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{card?.name.split(' ')[0]}</span>
                          </div>
                          <div>
                            <div className="font-semibold">{card?.name}</div>
                            <div className="text-sm text-cg-muted">{card?.tagline}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">₹{card?.annualFee.toLocaleString()}</td>
                      <td className="p-3">{card?.rewardRates.online || card?.rewardRates.default}%</td>
                      <td className="p-3">{card?.loungeAccess}</td>
                      <td className="p-3">{card?.rentRewardsAllowed ? 'Yes' : 'No'}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {collectionCards.map((card) => (
              <div key={card?.id} className="relative">
                <CardItem card={card!} />
                <button
                  onClick={() => removeFromCollection(card?.id || '')}
                  className="absolute top-2 right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
