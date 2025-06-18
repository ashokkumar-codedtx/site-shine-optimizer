
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Comment, Post } from '@/types';
import { Check, X, Eye } from 'lucide-react';

// Mock data
const mockComments: (Comment & { post: Post })[] = [
  {
    id: '1',
    postId: '1',
    userId: '3',
    user: { id: '3', email: 'reader@news.com', name: 'Regular Reader', role: 'reader', createdAt: '2024-01-01', isActive: true },
    content: 'Great article! Very informative and well-written.',
    isApproved: true,
    createdAt: '2024-01-15T12:30:00Z',
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
      likesCount: 0,
      commentsCount: 0,
      isPublished: true,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    }
  },
  {
    id: '2',
    postId: '1',
    userId: '2',
    user: { id: '2', email: 'creator@news.com', name: 'Content Creator', role: 'creator', createdAt: '2024-01-01', isActive: true },
    content: 'Thanks for sharing this update. Looking forward to seeing the progress.',
    isApproved: false,
    createdAt: '2024-01-15T14:20:00Z',
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
      likesCount: 0,
      commentsCount: 0,
      isPublished: true,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    }
  }
];

export const CommentsList = () => {
  const [comments, setComments] = useState(mockComments);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const approveComment = (commentId: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, isApproved: true } : comment
    ));
  };

  const deleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const filteredComments = selectedPost 
    ? comments.filter(comment => comment.postId === selectedPost)
    : comments;

  const uniquePosts = Array.from(new Set(comments.map(c => c.postId)))
    .map(postId => comments.find(c => c.postId === postId)?.post)
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Post Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant={selectedPost === null ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setSelectedPost(null)}
            >
              All Comments ({comments.length})
            </Button>
            {uniquePosts.map((post) => (
              <Button
                key={post?.id}
                variant={selectedPost === post?.id ? "default" : "outline"}
                className="w-full justify-start text-left"
                onClick={() => setSelectedPost(post?.id || null)}
              >
                <div className="truncate">
                  <div className="font-medium truncate">{post?.title}</div>
                  <div className="text-xs text-gray-500">
                    {comments.filter(c => c.postId === post?.id).length} comments
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Comments List */}
      <div className="lg:col-span-3">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Comments Management</h1>
            <div className="flex space-x-4">
              <div className="text-sm">
                <span className="font-medium">{filteredComments.length}</span> comments
                {selectedPost && (
                  <span className="text-gray-500"> on selected post</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{comments.length}</div>
                <p className="text-sm text-gray-600">Total Comments</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {comments.filter(c => c.isApproved).length}
                </div>
                <p className="text-sm text-gray-600">Approved</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {comments.filter(c => !c.isApproved).length}
                </div>
                <p className="text-sm text-gray-600">Pending</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedPost ? 'Comments on Selected Post' : 'All Comments'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{comment.user.name}</p>
                          <p className="text-sm text-gray-500">{comment.user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium truncate">{comment.post.title}</p>
                          <p className="text-sm text-gray-500">{comment.post.district}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          comment.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }>
                          {comment.isApproved ? 'Approved' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!comment.isApproved && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => approveComment(comment.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteComment(comment.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
