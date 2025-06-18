
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'creator' | 'reader';
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  district: string;
  tags: string[];
  authorId: string;
  author: User;
  mediaUrls: string[];
  likesCount: number;
  commentsCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  user: User;
  action: 'create_post' | 'edit_post' | 'delete_post' | 'comment' | 'login' | 'logout';
  details: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean;
}
