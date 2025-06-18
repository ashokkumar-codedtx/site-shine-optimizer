
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Eye, Clock } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  // Mock news posts
  const posts = [
    {
      id: 1,
      title: 'Breaking: Major Infrastructure Development Announced',
      excerpt: 'Government announces massive infrastructure investment across multiple districts...',
      district: 'Central',
      tags: ['Politics', 'Infrastructure'],
      author: 'John Doe',
      publishedAt: '2024-01-15T10:00:00Z',
      likes: 234,
      comments: 45,
      views: 1520,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c4d99b?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Local Sports Team Wins Championship',
      excerpt: 'After an intense final match, the local team secures their first championship...',
      district: 'North',
      tags: ['Sports', 'Local'],
      author: 'Jane Smith',
      publishedAt: '2024-01-14T15:30:00Z',
      likes: 189,
      comments: 67,
      views: 980,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Technology Innovation Hub Opens',
      excerpt: 'New technology center aims to foster innovation and entrepreneurship...',
      district: 'South',
      tags: ['Technology', 'Business'],
      author: 'Mike Johnson',
      publishedAt: '2024-01-13T09:15:00Z',
      likes: 156,
      comments: 23,
      views: 745,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (user?.role === 'admin' || user?.role === 'creator') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to News CMS
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage your news content and engage with your audience
          </p>
          <Button onClick={() => window.location.href = '/admin'}>
            Go to Admin Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Stay Informed with Latest News
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get the latest updates from your local districts and beyond
        </p>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">All</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Politics</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Sports</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Technology</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Health</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Business</Badge>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} to={`/news/${post.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                  {post.district}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <span>By {post.author}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className={`h-4 w-4 ${user ? 'cursor-pointer hover:text-red-500' : ''}`} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>

      {/* Call to Action for Anonymous Users */}
      {!user && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Join Our Community
            </h3>
            <p className="text-blue-700 mb-4">
              Sign up to like posts, leave comments, and get personalized news updates
            </p>
            <div className="space-x-4">
              <Button onClick={() => window.location.href = '/login'}>
                Sign In
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/register'}>
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
