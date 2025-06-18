
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ActivityLog } from '@/types';
import { Search, Filter } from 'lucide-react';

// Mock data
const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    user: { id: '1', email: 'admin@news.com', name: 'Admin User', role: 'admin', createdAt: '2024-01-01', isActive: true },
    action: 'create_post',
    details: 'Created post "Breaking: Major Infrastructure Development"',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    user: { id: '2', email: 'creator@news.com', name: 'Content Creator', role: 'creator', createdAt: '2024-01-01', isActive: true },
    action: 'login',
    details: 'User logged in from IP 192.168.1.100',
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    userId: '1',
    user: { id: '1', email: 'admin@news.com', name: 'Admin User', role: 'admin', createdAt: '2024-01-01', isActive: true },
    action: 'edit_post',
    details: 'Edited post "Local Community Event Success"',
    createdAt: '2024-01-14T16:45:00Z'
  },
  {
    id: '4',
    userId: '2',
    user: { id: '2', email: 'creator@news.com', name: 'Content Creator', role: 'creator', createdAt: '2024-01-01', isActive: true },
    action: 'comment',
    details: 'Commented on post "Breaking: Major Infrastructure Development"',
    createdAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '5',
    userId: '1',
    user: { id: '1', email: 'admin@news.com', name: 'Admin User', role: 'admin', createdAt: '2024-01-01', isActive: true },
    action: 'delete_post',
    details: 'Deleted post "Outdated Information"',
    createdAt: '2024-01-13T11:20:00Z'
  }
];

export const ActivityLogs = () => {
  const [logs] = useState<ActivityLog[]>(mockActivityLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case 'create_post': return 'bg-green-100 text-green-800';
      case 'edit_post': return 'bg-blue-100 text-blue-800';
      case 'delete_post': return 'bg-red-100 text-red-800';
      case 'comment': return 'bg-purple-100 text-purple-800';
      case 'login': return 'bg-gray-100 text-gray-800';
      case 'logout': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'create_post': return 'Created Post';
      case 'edit_post': return 'Edited Post';
      case 'delete_post': return 'Deleted Post';
      case 'comment': return 'Comment';
      case 'login': return 'Login';
      case 'logout': return 'Logout';
      default: return action;
    }
  };

  const actionCounts = logs.reduce((acc, log) => {
    acc[log.action] = (acc[log.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Activity Logs</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Actions</option>
            <option value="create_post">Create Post</option>
            <option value="edit_post">Edit Post</option>
            <option value="delete_post">Delete Post</option>
            <option value="comment">Comment</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-sm text-gray-600">Total Activities</p>
          </CardContent>
        </Card>
        {Object.entries(actionCounts).map(([action, count]) => (
          <Card key={action}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{count}</div>
              <p className="text-sm text-gray-600">{getActionLabel(action)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{log.user.name}</p>
                        <p className="text-sm text-gray-500">{log.user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        log.user.role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }>
                        {log.user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionBadgeColor(log.action)}>
                        {getActionLabel(log.action)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="text-sm">{log.details}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{new Date(log.createdAt).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleTimeString()}</p>
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
