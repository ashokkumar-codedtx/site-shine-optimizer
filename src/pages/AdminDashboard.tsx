
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, MessageSquare, Heart, TrendingUp, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Posts',
      value: '1,234',
      change: '+12%',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Active Users',
      value: '5,678',
      change: '+8%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Comments',
      value: '2,345',
      change: '+15%',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      title: 'Total Likes',
      value: '12,456',
      change: '+23%',
      icon: Heart,
      color: 'text-red-600'
    }
  ];

  const topPosts = [
    {
      title: 'Breaking: Major Policy Changes Announced',
      district: 'Central',
      views: 15420,
      likes: 234,
      comments: 45
    },
    {
      title: 'Sports Update: Championship Finals',
      district: 'North',
      views: 12350,
      likes: 189,
      comments: 67
    },
    {
      title: 'Technology Breakthrough in Healthcare',
      district: 'South',
      views: 9870,
      likes: 156,
      comments: 23
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>
            Posts with highest engagement in the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-600">District: {post.district}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {post.comments}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest actions performed by users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium">John Doe</span> created a new post
                <span className="text-gray-500 ml-2">2 hours ago</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium">Jane Smith</span> commented on a post
                <span className="text-gray-500 ml-2">4 hours ago</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-red-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium">Mike Johnson</span> liked a post
                <span className="text-gray-500 ml-2">6 hours ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
