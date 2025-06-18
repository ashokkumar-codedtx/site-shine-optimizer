
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export const SportsWidget = () => {
  const sportsUpdates = [
    { match: 'Team A vs Team B', score: '2-1', status: 'Live', time: '78′' },
    { match: 'Team C vs Team D', score: '0-0', status: 'HT', time: '45′' },
    { match: 'Team E vs Team F', score: '3-2', status: 'FT', time: '90′' }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Sports Live</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sportsUpdates.map((update, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-3">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium">{update.match}</h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  update.status === 'Live' ? 'bg-red-100 text-red-700' :
                  update.status === 'HT' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {update.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{update.score}</span>
                <span className="text-gray-500">{update.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
