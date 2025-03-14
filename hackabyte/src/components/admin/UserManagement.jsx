/**
 * User Management Component for Admin Dashboard
 * 
 * Provides admin functionality for:
 * - Viewing all users
 * - Searching/filtering users
 * - Viewing user details
 * - Editing user roles or information
 * - Deactivating/deleting user accounts
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function UserManagement() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  
  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Fetch all users
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error('Failed to load users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error loading users');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle user search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle edit user submission
  const handleEditUser = async (userId, updates) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...updates
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setUsers(users.map(user => 
          user._id === userId ? { ...user, ...updates } : user
        ));
        
        toast.success('User updated successfully');
        setEditingUser(null);
      } else {
        throw new Error(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error.message || 'Error updating user');
    }
  };
  
  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users?userId=${userId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove user from local state
        setUsers(users.filter(user => user._id !== userId));
        
        toast.success('User deleted successfully');
        setShowConfirmDelete(null);
      } else {
        throw new Error(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Error deleting user');
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-700 rounded w-full mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-[#FF2247] focus:border-[#FF2247] w-64"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {filteredUsers.length === 0 ? (
          <div className="bg-[#1A1A1E] rounded-lg p-6 text-center">
            <p className="text-gray-300">No users found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-[#1A1A1E]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    School
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#16161A] divide-y divide-gray-800">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-[#1A1A1E]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{user.age}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{user.school}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUser === user._id ? (
                        <select
                          defaultValue={user.role}
                          onChange={(e) => handleEditUser(user._id, { role: e.target.value })}
                          className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-1 text-sm focus:ring-[#FF2247] focus:border-[#FF2247]"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-purple-900 text-purple-200' : 'bg-blue-900 text-blue-200'
                        }`}>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex space-x-3">
                        {editingUser === user._id ? (
                          <button
                            onClick={() => setEditingUser(null)}
                            className="text-gray-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingUser(user._id)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Edit
                          </button>
                        )}
                        
                        {showConfirmDelete === user._id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-500 hover:text-red-400 font-medium"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setShowConfirmDelete(null)}
                              className="text-gray-400 hover:text-white"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowConfirmDelete(user._id)}
                            className="text-red-500 hover:text-red-400"
                            disabled={user._id === session?.user?.id}
                            title={user._id === session?.user?.id ? "Can't delete your own account" : ""}
                          >
                            Delete
                          </button>
                        )}
                        
                        <button
                          onClick={() => window.open(`/dashboard?userId=${user._id}`, '_blank')}
                          className="text-green-400 hover:text-green-300"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
