
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const GoldStockWidget = () => {
  const marketData = [
    { name: 'Gold', price: '₹6,234', change: '+1.2%', isUp: true },
    { name: 'Silver', price: '₹823', change: '-0.8%', isUp: false },
    { name: 'NIFTY 50', price: '21,453', change: '+0.5%', isUp: true },
    { name: 'SENSEX', price: '70,892', change: '-0.3%', isUp: false },
    { name: 'USD/INR', price: '₹83.12', change: '+0.1%', isUp: true }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span>Market Watch</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketData.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.price}</p>
              </div>
              <div className={`flex items-center space-x-1 ${
                item.isUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.isUp ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{item.change}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t text-xs text-gray-500 text-center">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};
