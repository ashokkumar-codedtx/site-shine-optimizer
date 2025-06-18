
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Post } from '@/types';
import { Upload, X } from 'lucide-react';

interface PostEditorProps {
  post?: Post;
  onSave: (postData: Partial<Post>) => void;
  onCancel: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [district, setDistrict] = useState(post?.district || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [mediaUrls, setMediaUrls] = useState<string[]>(post?.mediaUrls || []);
  const [isPublished, setIsPublished] = useState(post?.isPublished || false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock image upload - in real app, upload to server
      const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400`;
      setMediaUrls([...mediaUrls, mockUrl]);
    }
  };

  const removeImage = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData: Partial<Post> = {
      title,
      excerpt,
      content,
      district,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      mediaUrls,
      isPublished
    };

    onSave(postData);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          <div>
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Enter district"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">Description/Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief description of the post"
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div>
          <Label>Thumbnail/Media</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Label
                htmlFor="image-upload"
                className="flex items-center px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Label>
            </div>
            
            {mediaUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {mediaUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="content">Content (Markdown)</Label>
          <Card>
            <CardContent className="p-0">
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content in Markdown..."
                rows={12}
                className="border-none resize-none"
                required
              />
            </CardContent>
          </Card>
          <p className="text-sm text-gray-500 mt-1">
            Supports Markdown formatting: **bold**, *italic*, # Headers, etc.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="published"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="published">Publish immediately</Label>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};
