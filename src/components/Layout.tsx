
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminLayout } from './admin/AdminLayout';
import { ReaderLayout } from './reader/ReaderLayout';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user?.role === 'admin' || user?.role === 'creator') {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <ReaderLayout>{children}</ReaderLayout>;
};
