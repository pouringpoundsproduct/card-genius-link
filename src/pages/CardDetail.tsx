
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useCardData } from '../contexts/CardDataContext';
import { useCollection } from '../contexts/CollectionContext';
import CardTag from '../components/CardTag';
import RewardsCalculator from '../components/RewardsCalculator';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCardById } = useCardData();
  const { isInCollection, addToCollection, removeFromCollection } = useCollection();

  const card = id ? getCardById(id) : undefined;

  if (!card) {
    return (
      <div className="min-h-screen bg-cg-bg pt-16 pb-20 md:pb-4">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Card not found</h1>
            <button
              onClick={() => navigate('/cards')}
              className="bg-cg-violet text-white px-6 py-2 rounded-lg"
            >
              Back to Cards
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inCollection = isInCollection(card.id);

  const handleCollectionToggle = () => {
    if (inCollection) {
      removeFromCollection(card.id);
    } else {
      addToCollection(card.id);
    }
  };

  const handleCopyLink = () => {
    // For demo purposes, just show an alert
    alert(`Affiliate link for ${card.name} copied!`);
  };

  return (
    <div className="min-h-screen bg-cg-bg pt-16 pb-20 md:pb-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/cards')}
            className="flex items-center gap-2 text-cg-violet hover:text-cg-violet/80"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <button
            onClick={handleCollectionToggle}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Heart 
              className={`w-6 h-6 ${inCollection ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-cg-card rounded-lg p-6 mb-8 shadow-cg-card">
          <div className="flex gap-6 items-start">
            <div className="w-24 h-16 bg-gradient-to-br from-cg-violet to-purple-600 rounded-lg flex-shrink-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{card.name.split(' ')[0]}</span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-heading font-bold text-cg-dark mb-2">{card.name}</h1>
              <p className="text-lg text-cg-muted mb-4">{card.tagline}</p>
              <CardTag card={card} />
            </div>
          </div>
          
          <button
            onClick={handleCopyLink}
            className="w-full mt-6 bg-gradient-orange text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Copy Affiliate Link - Earn ₹{card.affiliatePayout}
          </button>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-cg-card rounded-lg p-6 shadow-cg-card">
            <h2 className="text-xl font-heading font-semibold mb-4">Key Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-cg-muted">Annual Fee</span>
                <span className="font-semibold">₹{card.annualFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cg-muted">Lifetime Free</span>
                <span className="font-semibold">{card.isLifetimeFree ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cg-muted">Lounge Access</span>
                <span className="font-semibold">{card.loungeAccess}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cg-muted">Rent Rewards</span>
                <span className="font-semibold">{card.rentRewardsAllowed ? 'Allowed' : 'Not Allowed'}</span>
              </div>
            </div>
          </div>

          <div className="bg-cg-card rounded-lg p-6 shadow-cg-card">
            <h2 className="text-xl font-heading font-semibold mb-4">Reward Rates</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-cg-muted">Default</span>
                <span className="font-semibold">{card.rewardRates.default}%</span>
              </div>
              {card.rewardRates.online && (
                <div className="flex justify-between">
                  <span className="text-cg-muted">Online</span>
                  <span className="font-semibold">{card.rewardRates.online}%</span>
                </div>
              )}
              {card.rewardRates.travel && (
                <div className="flex justify-between">
                  <span className="text-cg-muted">Travel</span>
                  <span className="font-semibold">{card.rewardRates.travel}%</span>
                </div>
              )}
              {card.rewardRates.fuel && (
                <div className="flex justify-between">
                  <span className="text-cg-muted">Fuel</span>
                  <span className="font-semibold">{card.rewardRates.fuel}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Welcome Bonus */}
        {card.welcomeBonus !== '—' && (
          <div className="bg-cg-card rounded-lg p-6 mb-8 shadow-cg-card">
            <h2 className="text-xl font-heading font-semibold mb-3">Welcome Bonus</h2>
            <p className="text-cg-muted">{card.welcomeBonus}</p>
          </div>
        )}

        {/* Rewards Calculator */}
        <RewardsCalculator card={card} />
      </div>
    </div>
  );
};

export default CardDetail;
