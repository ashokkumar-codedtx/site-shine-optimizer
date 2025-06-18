
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PostEditor } from '@/components/admin/PostEditor';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Post } from '@/types';

// Mock data
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Breaking: Major Infrastructure Development',
    content: 'Lorem ipsum dolor sit amet...',
    excerpt: 'Major infrastructure development announced...',
    district: 'Central District',
    tags: ['infrastructure', 'development'],
    authorId: '1',
    author: { id: '1', email: 'admin@news.com', name: 'Admin User', role: 'admin', createdAt: '2024-01-01', isActive: true },
    mediaUrls: ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400'],
    likesCount: 25,
    commentsCount: 8,
    isPublished: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Local Community Event Success',
    content: 'Community event details...',
    excerpt: 'Local community comes together...',
    district: 'North District',
    tags: ['community', 'events'],
    authorId: '2',
    author: { id: '2', email: 'creator@news.com', name: 'Content Creator', role: 'creator', createdAt: '2024-01-01', isActive: true },
    mediaUrls: [],
    likesCount: 12,
    commentsCount: 5,
    isPublished: true,
    createdAt: '2024-01-14T15:20:00Z',
    updatedAt: '2024-01-14T15:20:00Z'
  }
];

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleCreatePost = (postData: Partial<Post>) => {
    const newPost: Post = {
      id: Date.now().toString(),
      ...postData,
      authorId: '1',
      author: mockPosts[0].author,
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Post;
    setPosts([newPost, ...posts]);
    setIsCreateOpen(false);
  };

  const handleEditPost = (postData: Partial<Post>) => {
    if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...postData, updatedAt: new Date().toISOString() }
          : post
      ));
      setEditingPost(null);
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Posts Management</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <PostEditor onSave={handleCreatePost} onCancel={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    {post.mediaUrls.length > 0 ? (
                      <img 
                        src={post.mediaUrls[0]} 
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</p>
                    </div>
                  </TableCell>
                  <TableCell>{post.author.name}</TableCell>
                  <TableCell>{post.district}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{post.likesCount} likes</p>
                      <p>{post.commentsCount} comments</p>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setEditingPost(post)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Post</DialogTitle>
                          </DialogHeader>
                          {editingPost && (
                            <PostEditor 
                              post={editingPost}
                              onSave={handleEditPost} 
                              onCancel={() => setEditingPost(null)} 
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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
  );
};
