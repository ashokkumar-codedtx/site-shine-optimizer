
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Shield, User, UserPlus, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ACLControl = () => {
  const { toast } = useToast();
  
  const [permissions, setPermissions] = useState({
    admin: {
      posts: { create: true, read: true, update: true, delete: true },
      users: { create: true, read: true, update: true, delete: true },
      comments: { create: true, read: true, update: true, delete: true },
      settings: { create: true, read: true, update: true, delete: true }
    },
    creator: {
      posts: { create: true, read: true, update: true, delete: false },
      users: { create: false, read: true, update: false, delete: false },
      comments: { create: true, read: true, update: true, delete: false },
      settings: { create: false, read: true, update: false, delete: false }
    },
    reader: {
      posts: { create: false, read: true, update: false, delete: false },
      users: { create: false, read: false, update: false, delete: false },
      comments: { create: true, read: true, update: false, delete: false },
      settings: { create: false, read: false, update: false, delete: false }
    }
  });

  const modules = [
    { key: 'posts', name: 'Posts', icon: <Settings className="h-4 w-4" /> },
    { key: 'users', name: 'Users', icon: <User className="h-4 w-4" /> },
    { key: 'comments', name: 'Comments', icon: <Settings className="h-4 w-4" /> },
    { key: 'settings', name: 'Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  const actions = ['create', 'read', 'update', 'delete'];

  const handlePermissionChange = (role: string, module: string, action: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: {
          ...prev[role][module],
          [action]: value
        }
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: "Permissions updated",
      description: "Access control permissions have been saved successfully.",
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'creator': return 'bg-blue-100 text-blue-800';
      case 'reader': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Access Control</h1>
            <p className="text-gray-600">Manage role-based permissions</p>
          </div>
        </div>
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>Save Permissions</span>
        </Button>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(permissions).map((role) => (
          <Card key={role}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="capitalize">{role}</span>
                <Badge className={getRoleBadgeColor(role)}>
                  {role}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {modules.map((module) => {
                  const modulePerms = permissions[role][module.key];
                  const activePerms = Object.entries(modulePerms).filter(([, value]) => value).length;
                  return (
                    <div key={module.key} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        {module.icon}
                        <span>{module.name}</span>
                      </div>
                      <span className="text-gray-500">{activePerms}/4</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Module</th>
                  {Object.keys(permissions).map((role) => (
                    <th key={role} className="text-center p-3">
                      <Badge className={getRoleBadgeColor(role)}>
                        {role}
                      </Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <React.Fragment key={module.key}>
                    <tr className="border-b bg-gray-50">
                      <td colSpan={4} className="p-3 font-semibold flex items-center space-x-2">
                        {module.icon}
                        <span>{module.name}</span>
                      </td>
                    </tr>
                    {actions.map((action) => (
                      <tr key={`${module.key}-${action}`} className="border-b">
                        <td className="p-3 pl-8 capitalize text-sm text-gray-600">
                          {action}
                        </td>
                        {Object.keys(permissions).map((role) => (
                          <td key={role} className="p-3 text-center">
                            <Switch
                              checked={permissions[role][module.key][action]}
                              onCheckedChange={(value) => 
                                handlePermissionChange(role, module.key, action, value)
                              }
                              disabled={role === 'admin'} // Admin always has all permissions
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Permission Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Admin Role</h4>
              <p className="text-gray-600">
                Full access to all modules and features. Cannot be modified for security reasons.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Creator Role</h4>
              <p className="text-gray-600">
                Can create and manage their own content. Limited user management access.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Reader Role</h4>
              <p className="text-gray-600">
                Read-only access to content. Can comment on posts if enabled.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ACLControl;
