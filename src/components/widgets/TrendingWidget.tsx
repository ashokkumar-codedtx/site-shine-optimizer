
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TrendingWidget = () => {
  const trendingNews = [
    { id: 1, title: 'Infrastructure Development Update', views: 2340 },
    { id: 2, title: 'Sports Championship Finals', views: 1890 },
    { id: 3, title: 'Technology Innovation Summit', views: 1456 },
    { id: 4, title: 'Healthcare Reform Progress', views: 1234 },
    { id: 5, title: 'Environmental Policy Changes', views: 987 }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <TrendingUp className="h-5 w-5 text-red-500" />
          <span>Trending Now</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trendingNews.map((news, index) => (
            <Link key={news.id} to={`/news/${news.id}`}>
              <div className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded transition-colors">
                <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-2 hover:text-blue-600">
                    {news.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{news.views.toLocaleString()} views</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
