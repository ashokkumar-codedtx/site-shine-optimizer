
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Like, Post } from '@/types';
import { Heart } from 'lucide-react';

// Mock data
const mockLikes: (Like & { post: Post })[] = [
  {
    id: '1',
    postId: '1',
    userId: '3',
    createdAt: '2024-01-15T13:30:00Z',
    post: {
      id: '1',
      title: 'Breaking: Major Infrastructure Development',
      content: '',
      excerpt: '',
      district: 'Central District',
      tags: [],
      authorId: '1',
      author: { id: '1', email: 'admin@news.com', name: 'Admin User', role: 'admin', createdAt: '2024-01-01', isActive: true },
      mediaUrls: [],
      likesCount: 25,
      commentsCount: 8,
      isPublished: true,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    }
  },
  {
    id: '2',
    postId: '2',
    userId: '2',
    createdAt: '2024-01-14T16:20:00Z',
    post: {
      id: '2',
      title: 'Local Community Event Success',
      content: '',
      excerpt: '',
      district: 'North District',
      tags: [],
      authorId: '2',
      author: { id: '2', email: 'creator@news.com', name: 'Content Creator', role: 'creator', createdAt: '2024-01-01', isActive: true },
      mediaUrls: [],
      likesCount: 12,
      commentsCount: 5,
      isPublished: true,
      createdAt: '2024-01-14T15:20:00Z',
      updatedAt: '2024-01-14T15:20:00Z'
    }
  }
];

export const LikesList = () => {
  const [likes] = useState(mockLikes);

  // Group likes by post
  const likesByPost = likes.reduce((acc, like) => {
    if (!acc[like.postId]) {
      acc[like.postId] = {
        post: like.post,
        likes: []
      };
    }
    acc[like.postId].likes.push(like);
    return acc;
  }, {} as Record<string, { post: Post; likes: Like[] }>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Likes Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{likes.length}</div>
            <p className="text-sm text-gray-600">Total Likes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{Object.keys(likesByPost).length}</div>
            <p className="text-sm text-gray-600">Posts with Likes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {Math.round(likes.length / Object.keys(likesByPost).length * 10) / 10}
            </div>
            <p className="text-sm text-gray-600">Avg Likes per Post</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Likes Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post Title</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Likes Count</TableHead>
                <TableHead>Latest Like</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(likesByPost).map(({ post, likes }) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</p>
                    </div>
                  </TableCell>
                  <TableCell>{post.district}</TableCell>
                  <TableCell>{post.author.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500 fill-current" />
                      <span className="font-medium">{likes.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(Math.max(...likes.map(l => new Date(l.createdAt).getTime()))).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Likes Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {likes
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((like) => (
                  <TableRow key={like.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{like.post.title}</p>
                        <p className="text-sm text-gray-500">{like.post.district}</p>
                      </div>
                    </TableCell>
                    <TableCell>User #{like.userId}</TableCell>
                    <TableCell>{new Date(like.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
