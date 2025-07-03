
import React, { useState } from 'react';
import { Card } from '../data/cards';
import { Slider } from '@/components/ui/slider';

interface RewardsCalculatorProps {
  card: Card;
}

const RewardsCalculator: React.FC<RewardsCalculatorProps> = ({ card }) => {
  const [onlineSpend, setOnlineSpend] = useState([50000]);
  const [travelSpend, setTravelSpend] = useState([25000]);
  const [fuelSpend, setFuelSpend] = useState([15000]);

  const calculateRewards = () => {
    const onlineRewards = (onlineSpend[0] * (card.rewardRates.online || card.rewardRates.default)) / 100;
    const travelRewards = (travelSpend[0] * (card.rewardRates.travel || card.rewardRates.default)) / 100;
    const fuelRewards = (fuelSpend[0] * (card.rewardRates.fuel || card.rewardRates.default)) / 100;
    
    const totalRewards = onlineRewards + travelRewards + fuelRewards;
    const netBenefit = totalRewards - card.annualFee;
    
    return {
      onlineRewards,
      travelRewards,
      fuelRewards,
      totalRewards,
      netBenefit
    };
  };

  const rewards = calculateRewards();

  return (
    <div className="bg-cg-card rounded-lg p-6 shadow-cg-card">
      <h2 className="text-xl font-heading font-semibold mb-6">Rewards Calculator</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cg-muted mb-2">
              Online Spending (₹{onlineSpend[0].toLocaleString()}/year)
            </label>
            <Slider
              value={onlineSpend}
              onValueChange={setOnlineSpend}
              max={200000}
              min={0}
              step={5000}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-cg-muted mb-2">
              Travel Spending (₹{travelSpend[0].toLocaleString()}/year)
            </label>
            <Slider
              value={travelSpend}
              onValueChange={setTravelSpend}
              max={150000}
              min={0}
              step={5000}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-cg-muted mb-2">
              Fuel Spending (₹{fuelSpend[0].toLocaleString()}/year)
            </label>
            <Slider
              value={fuelSpend}
              onValueChange={setFuelSpend}
              max={100000}
              min={0}
              step={2500}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="bg-cg-bg rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-lg mb-4">Annual Benefits</h3>
          
          <div className="flex justify-between">
            <span className="text-cg-muted">Online Rewards</span>
            <span className="font-semibold">₹{Math.round(rewards.onlineRewards).toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-cg-muted">Travel Rewards</span>
            <span className="font-semibold">₹{Math.round(rewards.travelRewards).toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-cg-muted">Fuel Rewards</span>
            <span className="font-semibold">₹{Math.round(rewards.fuelRewards).toLocaleString()}</span>
          </div>
          
          <hr className="my-3" />
          
          <div className="flex justify-between">
            <span className="text-cg-muted">Total Rewards</span>
            <span className="font-semibold">₹{Math.round(rewards.totalRewards).toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-cg-muted">Annual Fee</span>
            <span className="font-semibold text-red-600">-₹{card.annualFee.toLocaleString()}</span>
          </div>
          
          <hr className="my-3" />
          
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Net Benefit</span>
            <span className={`font-bold ${rewards.netBenefit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{Math.round(rewards.netBenefit).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsCalculator;
