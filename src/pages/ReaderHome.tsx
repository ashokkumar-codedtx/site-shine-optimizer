
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Eye, TrendingUp, PlayCircle } from 'lucide-react';

const ReaderHome = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for latest news
  const latestNews = [
    {
      id: 1,
      title: 'Breaking: Major Infrastructure Development Announced',
      excerpt: 'Government announces massive infrastructure investment across multiple districts...',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c4d99b?w=800&h=400&fit=crop',
      category: 'Politics',
      district: 'Central',
      publishedAt: '2024-01-15T10:00:00Z',
      views: 1520,
      isBreaking: true
    },
    {
      id: 2,
      title: 'Local Sports Team Wins Championship',
      excerpt: 'After an intense final match, the local team secures their first championship...',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=300&fit=crop',
      category: 'Sports',
      district: 'North',
      publishedAt: '2024-01-14T15:30:00Z',
      views: 980
    },
    {
      id: 3,
      title: 'Technology Innovation Hub Opens',
      excerpt: 'New technology center aims to foster innovation and entrepreneurship...',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop',
      category: 'Technology',
      district: 'South',
      publishedAt: '2024-01-13T09:15:00Z',
      views: 745
    }
  ];

  // Current Affairs
  const currentAffairs = [
    {
      id: 4,
      title: 'Economic Policy Changes Impact Local Businesses',
      excerpt: 'New regulations affecting small and medium enterprises...',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop',
      publishedAt: '2024-01-12T14:20:00Z'
    },
    {
      id: 5,
      title: 'Healthcare System Reforms Announced',
      excerpt: 'Major changes to public healthcare infrastructure...',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
      publishedAt: '2024-01-11T11:45:00Z'
    },
    {
      id: 6,
      title: 'Environmental Conservation Initiatives',
      excerpt: 'New green energy projects across multiple regions...',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop',
      publishedAt: '2024-01-10T16:30:00Z'
    }
  ];

  // Advertisement banners
  const adBanners = [
    {
      id: 1,
      title: 'New Movie Release',
      image: 'https://images.unsplash.com/photo-1489599510663-3e1e0b0fd96e?w=800&h=200&fit=crop',
      link: '#'
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=200&fit=crop',
      link: '#'
    }
  ];

  const categories = ['all', 'Politics', 'Sports', 'Technology', 'Health', 'Business'];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredNews = selectedCategory === 'all' 
    ? latestNews 
    : latestNews.filter(news => news.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Breaking News Banner */}
      {latestNews.some(news => news.isBreaking) && (
        <div className="bg-red-600 text-white p-3">
          <div className="flex items-center space-x-2">
            <Badge className="bg-red-800 text-white animate-pulse">BREAKING</Badge>
            <span className="font-semibold">
              {latestNews.find(news => news.isBreaking)?.title}
            </span>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center border-b pb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Main News Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Story */}
        <div className="lg:col-span-2">
          {filteredNews.length > 0 && (
            <Link to={`/news/${filteredNews[0].id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={filteredNews[0].image} 
                    alt={filteredNews[0].title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <Badge className="bg-blue-600 text-white">
                      {filteredNews[0].district}
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      {filteredNews[0].category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-3 hover:text-blue-600 transition-colors">
                    {filteredNews[0].title}
                  </h1>
                  <p className="text-gray-600 mb-4 text-lg">
                    {filteredNews[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(filteredNews[0].publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{filteredNews[0].views}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>

        {/* Side Stories */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold border-b pb-2">Latest Updates</h2>
          {filteredNews.slice(1).map((news) => (
            <Link key={news.id} to={`/news/${news.id}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1 hover:text-blue-600">
                        {news.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {news.category}
                        </Badge>
                        <span>{formatDate(news.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Advertisement Banner */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center text-gray-500">Sponsored</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adBanners.map((ad) => (
            <a key={ad.id} href={ad.link} className="block">
              <div className="relative overflow-hidden rounded-lg hover:opacity-90 transition-opacity">
                <img 
                  src={ad.image} 
                  alt={ad.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <PlayCircle className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">{ad.title}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Current Affairs Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <TrendingUp className="h-6 w-6" />
            <span>Current Affairs</span>
          </h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAffairs.map((article) => (
            <Link key={article.id} to={`/news/${article.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReaderHome;
