import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare, FileText, Users, Shield, Activity, Search, Upload, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/Alert";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";

const mockTransactions = [
  {
    id: 'TX001',
    type: 'Document Access',
    sender: 'Dr. Smith',
    recipient: 'Patient Records',
    amount: '0.005 ETH',
    timestamp: '2024-01-25 10:30 AM',
    status: 'Completed'
  },
  {
    id: 'TX002',
    type: 'Medical Record Update',
    sender: 'Hospital System',
    recipient: 'Blockchain Registry',
    amount: '0.002 ETH',
    timestamp: '2024-01-25 11:45 AM',
    status: 'Completed'
  },
  {
    id: 'TX003',
    type: 'Consent Management',
    sender: 'Patient #12345',
    recipient: 'Research Institute',
    amount: '0.01 ETH',
    timestamp: '2024-01-25 02:15 PM',
    status: 'Pending'
  }
];

const Dashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'request', message: 'Dr. Smith requested access to Patient #12345 records', time: '5m ago' },
    { id: 2, type: 'update', message: 'New test results uploaded for Patient #67890', time: '15m ago' },
    { id: 3, type: 'security', message: 'Security audit completed for Q4 2024', time: '1h ago' }
  ]);
  const [messages, setMessages] = useState([
    { sender: 'Dr. Smith', content: 'Patient lab results reviewed', timestamp: '10:30 AM' },
    { sender: 'Dr. Johnson', content: 'Updated treatment plan attached', timestamp: '11:45 AM' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('0x1234...5678');
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    { title: 'Active Patients', value: '1,234', icon: Users, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { title: 'Pending Requests', value: '23', icon: MessageSquare, color: 'bg-gradient-to-r from-yellow-500 to-yellow-600' },
    { title: 'Documents Shared', value: '456', icon: FileText, color: 'bg-gradient-to-r from-green-500 to-green-600' },
    { title: 'Security Score', value: '98%', icon: Shield, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
  ];

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(true);
      setUserAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
      setNotifications(prev => [{
        id: Date.now(),
        type: 'security',
        message: 'Wallet connected successfully',
        time: 'Just now'
      }, ...prev]);
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setNotifications(prev => [{
        id: Date.now(),
        type: 'update',
        message: `File "${file.name}" (${(file.size / 1024).toFixed(1)} KB) uploaded and encrypted successfully`,
        time: 'Just now'
      }, ...prev]);

      event.target.value = '';
    } catch (error) {
      console.error('Upload failed:', error);
      setNotifications(prev => [{
        id: Date.now(),
        type: 'security',
        message: `Failed to upload file: ${error.message}`,
        time: 'Just now'
      }, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleNewMessage = () => {
    const newMessage = {
      sender: 'System',
      content: 'New document ready for review',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg backdrop-blur-lg backdrop-filter">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-blue-500" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Healthcare Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                    </span>
                  </div>
                ) : (
                  <Button
                    onClick={handleConnect}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300"
                  >
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => document.getElementById('fileUpload').click()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300"
                disabled={!isConnected || isLoading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              <input
                id="fileUpload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search records, documents, or messages..."
              className="pl-12 h-12 bg-white dark:bg-gray-800 border-none ring-1 ring-gray-200 dark:ring-gray-700 shadow-lg rounded-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`absolute inset-0 opacity-10 ${stat.color}`} />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Feed */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Recent Activity
                </CardTitle>
                <Activity className="h-5 w-5 text-gray-500" />
              </div>
              <CardDescription>Latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Alert
                    key={notification.id}
                    className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
                  >
                    <AlertTitle className="text-sm font-semibold">
                      {notification.type === 'request' ? 'Access Request' :
                       notification.type === 'update' ? 'Update' : 'Security Alert'}
                    </AlertTitle>
                    <AlertDescription className="text-sm">
                      <p>{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Messages
                </CardTitle>
                <MessageSquare className="h-5 w-5 text-gray-500" />
              </div>
              <CardDescription>Recent communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <p className="text-sm font-medium">{message.sender}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{message.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300"
                size="sm"
                onClick={handleNewMessage}
              >
                Send Message
              </Button>
            </CardFooter>
          </Card>

          {/* Transactions */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Blockchain Transactions
                </CardTitle>
                <Activity className="h-5 w-5 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{transaction.type}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {transaction.sender} → {transaction.recipient}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">{transaction.amount}</p>
                        <p className="text-xs text-gray-500">
                          {transaction.status === 'Completed' ? 
                            <span className="text-green-500">✓ Completed</span> : 
                            <span className="text-yellow-500">⏳ Pending</span>
                          }
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-right">{transaction.timestamp}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
