/**
 * Contact Management Component for Admin Dashboard
 * 
 * Provides admin functionality for:
 * - Viewing all contact form messages
 * - Marking messages as read
 * - Replying to messages via email
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function ContactManagement() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingMessage, setViewingMessage] = useState(null);
  const [replyFormData, setReplyFormData] = useState({
    subject: '',
    message: ''
  });
  const [sendingReply, setSendingReply] = useState(false);
  
  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);
  
  // Fetch all contact messages
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/contact');
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.messages);
      } else {
        toast.error('Failed to load messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Error loading messages');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter messages based on search term
  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle toggling a message's read status
  const handleToggleReadStatus = async (messageId, currentReadStatus) => {
    try {
      const newReadStatus = !currentReadStatus;
      
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          read: newReadStatus
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update local state
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, read: newReadStatus } : msg
        ));
        
        toast.success(newReadStatus ? 'Message marked as read' : 'Message marked as unread');
      } else {
        toast.error('Failed to update message');
      }
    } catch (error) {
      console.error('Error updating message:', error);
      toast.error('Error updating message');
    }
  };
  
  // Handle reply form input changes
  const handleReplyInputChange = (e) => {
    const { name, value } = e.target;
    setReplyFormData({
      ...replyFormData,
      [name]: value
    });
  };
  
  // Handle sending a reply
  const handleSendReply = async (e, messageId) => {
    e.preventDefault();
    
    if (!replyFormData.subject.trim() || !replyFormData.message.trim()) {
      toast.error('Subject and message are required');
      return;
    }
    
    try {
      setSendingReply(true);
      
      const response = await fetch('/api/contact/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          replySubject: replyFormData.subject,
          replyMessage: replyFormData.message
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update local state
        setMessages(messages.map(msg => 
          msg._id === messageId ? { ...msg, replied: true } : msg
        ));
        
        // Reset form and viewing state
        setReplyFormData({
          subject: '',
          message: ''
        });
        setViewingMessage(null);
        
        toast.success('Reply sent successfully');
      } else {
        toast.error('Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Error sending reply');
    } finally {
      setSendingReply(false);
    }
  };
  
  // Set initial reply subject when viewing a message
  useEffect(() => {
    if (viewingMessage) {
      const message = messages.find(m => m._id === viewingMessage);
      if (message) {
        setReplyFormData({
          subject: `Re: ${message.subject}`,
          message: ''
        });
      }
    }
  }, [viewingMessage, messages]);
  
  if (isLoading) {
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-700 rounded w-full mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  // If viewing a specific message
  if (viewingMessage) {
    const message = messages.find(m => m._id === viewingMessage);
    
    if (!message) {
      return <div className="text-white">Message not found</div>;
    }
    
    return (
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Message Details</h2>
            <button 
              onClick={() => setViewingMessage(null)}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Back to Messages
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="bg-[#1A1A1E] rounded-lg p-5 border border-gray-800 mb-4">
                <h3 className="text-xl font-bold text-white mb-2">From</h3>
                <div className="grid grid-cols-3 gap-2 text-gray-300">
                  <span className="text-gray-400">Name:</span>
                  <span className="col-span-2">{message.name}</span>
                  
                  <span className="text-gray-400">Email:</span>
                  <span className="col-span-2 text-[#FF2247]">{message.email}</span>
                  
                  <span className="text-gray-400">Date:</span>
                  <span className="col-span-2">{formatDate(message.createdAt)}</span>
                </div>
              </div>
              
              <div className="bg-[#1A1A1E] rounded-lg p-5 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-2">Message</h3>
                <div className="mb-2">
                  <span className="text-gray-400">Subject:</span>
                  <span className="ml-2 text-white">{message.subject}</span>
                </div>
                <div className="bg-[#0E0E12] p-4 rounded text-gray-300 whitespace-pre-wrap">
                  {message.message}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-[#1A1A1E] rounded-lg p-5 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Reply</h3>
                
                {message.replied ? (
                  <div className="bg-green-900/20 border border-green-800 text-green-300 rounded-md p-4 mb-4">
                    Message has been replied to.
                  </div>
                ) : null}
                
                <form onSubmit={(e) => handleSendReply(e, message._id)}>
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={replyFormData.subject}
                      onChange={handleReplyInputChange}
                      className="bg-[#26262C] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={replyFormData.message}
                      onChange={handleReplyInputChange}
                      rows="10"
                      className="bg-[#26262C] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="Type your reply here..."
                      required
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={sendingReply}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`btn-primary w-full py-3 text-md flex items-center justify-center ${
                      sendingReply ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {sendingReply ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Reply'
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Main messages list view
  return (
    <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
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
        
        {filteredMessages.length === 0 ? (
          <div className="bg-[#1A1A1E] rounded-lg p-6 text-center">
            <p className="text-gray-300">No messages found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div 
                key={message._id} 
                className={`bg-[#1A1A1E] rounded-lg p-5 border ${
                  message.read ? 'border-gray-800' : 'border-[#FF2247]'
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{message.subject}</h3>
                      {!message.read && (
                        <span className="bg-[#FF2247] text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                      {message.replied && (
                        <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-full">
                          Replied
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <span className="mr-3">From: {message.name}</span>
                      <span>({message.email})</span>
                    </div>
                    <p className="text-gray-300 mt-2 line-clamp-1">{message.message}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:items-start">
                    <button
                      onClick={() => handleToggleReadStatus(message._id, message.read)}
                      className="btn-secondary py-1 px-3 text-sm"
                    >
                      {message.read ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                    <button
                      onClick={() => setViewingMessage(message._id)}
                      className="btn-primary py-1 px-3 text-sm"
                    >
                      View & Reply
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  Received: {formatDate(message.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
