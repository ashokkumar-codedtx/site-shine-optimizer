
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageSquare, Eye, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NewsDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Reader',
      content: 'Great news! This will really help our community.',
      timestamp: '2024-01-15T14:30:00Z',
      likes: 5
    },
    {
      id: 2,
      author: 'Sarah Wilson',
      content: 'Looking forward to seeing the progress on this project.',
      timestamp: '2024-01-15T15:45:00Z',
      likes: 3
    }
  ]);

  // Mock news post data
  const newsPost = {
    id: id,
    title: 'Breaking: Major Infrastructure Development Announced',
    content: `
      <p>The government has announced a massive infrastructure investment across multiple districts, marking one of the largest development initiatives in recent years.</p>
      
      <p>This comprehensive program will focus on improving transportation networks, upgrading utilities, and enhancing digital connectivity across underserved areas. The initiative is expected to create thousands of jobs and significantly boost economic activity in the targeted regions.</p>
      
      <h3>Key Features of the Program:</h3>
      <ul>
        <li>Construction of new highways and bridge systems</li>
        <li>Modernization of public transportation</li>
        <li>Expansion of broadband internet access</li>
        <li>Upgrading of water and sewage systems</li>
        <li>Development of renewable energy infrastructure</li>
      </ul>
      
      <p>Local officials have expressed strong support for the initiative, citing its potential to transform the economic landscape of the region. The project timeline spans three years, with the first phase expected to begin within six months.</p>
      
      <p>Community leaders will be hosting public forums next month to gather input from residents and address any concerns about the development process.</p>
    `,
    district: 'Central',
    tags: ['Politics', 'Infrastructure', 'Development'],
    author: 'John Doe',
    publishedAt: '2024-01-15T10:00:00Z',
    likes: 234,
    comments: comments.length,
    views: 1520,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c4d99b?w=1200&h=600&fit=crop'
  };

  // Related news posts
  const relatedPosts = [
    {
      id: 2,
      title: 'Local Sports Team Wins Championship',
      excerpt: 'After an intense final match, the local team secures their first championship...',
      district: 'North',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Technology Innovation Hub Opens',
      excerpt: 'New technology center aims to foster innovation and entrepreneurship...',
      district: 'South',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLike = () => {
    if (user) {
      setIsLiked(!isLiked);
    }
  };

  const handleComment = () => {
    if (user && commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: user.name,
        content: commentText,
        timestamp: new Date().toISOString(),
        likes: 0
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to News</span>
      </Link>

      {/* Main Article */}
      <article className="space-y-6">
        {/* Hero Image */}
        <div className="relative">
          <img 
            src={newsPost.image} 
            alt={newsPost.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
          <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
            {newsPost.district}
          </Badge>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {newsPost.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {newsPost.title}
          </h1>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(newsPost.publishedAt)}</span>
              </div>
              <span>By {newsPost.author}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{newsPost.views}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: newsPost.content }}
        />

        {/* Engagement Actions */}
        <div className="flex items-center justify-between border-t border-b py-4">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                user ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              } ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
              disabled={!user}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{newsPost.likes + (isLiked ? 1 : 0)}</span>
            </button>
            
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageSquare className="h-5 w-5" />
              <span>{comments.length}</span>
            </div>
          </div>

          {!user && (
            <Link to="/login">
              <Button>Login to Like & Comment</Button>
            </Link>
          )}
        </div>
      </article>

      {/* Comments Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
        
        {/* Add Comment */}
        {user ? (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleComment} disabled={!commentText.trim()}>
                  Post Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gray-50">
            <CardContent className="p-4 text-center">
              <p className="text-gray-600 mb-4">Join the conversation!</p>
              <Link to="/login">
                <Button>Login to Comment</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{comment.author}</h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(comment.timestamp)}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{comment.content}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-500">
                    <Heart className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Related Posts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Related News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPosts.map((post) => (
            <Link key={post.id} to={`/news/${post.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-32 object-cover"
                />
                <CardHeader>
                  <Badge className="w-fit bg-blue-600 text-white mb-2">
                    {post.district}
                  </Badge>
                  <CardTitle className="text-lg line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;
