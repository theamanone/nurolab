'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdApi, MdCopyAll, MdDelete, MdEdit, MdCheck, MdClose } from 'react-icons/md';
import { FaRobot, FaDatabase, FaLock } from 'react-icons/fa';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateApiKey, getUserApiKeys, deleteApiKey, updateApiKeyName } from '@/app/apis/actions';

interface ApiKey {
  id: string;
  key: string;
  name: string;
  userId: string;
  createdAt: string;
  lastUsed: string;
  isActive: boolean;
}

interface ApiEndpoint {
  title: string;
  path: string;
  method: string;
  description: string;
  rateLimit: string;
  category: 'ml' | 'data';
  status: 'free' | 'pro';
  requiresAuth: boolean;
}

const apiEndpoints: ApiEndpoint[] = [
  {
    title: 'Text Classification',
    path: '/api/ml/classify',
    method: 'POST',
    description: 'Classify text into predefined categories using our ML models',
    rateLimit: '100 requests/day',
    category: 'ml',
    status: 'free',
    requiresAuth: false
  },
  {
    title: 'Synthetic Data',
    path: '/api/data/synthetic',
    method: 'GET',
    description: 'Generate synthetic data for testing and development',
    rateLimit: '100 requests/day',
    category: 'data',
    status: 'free',
    requiresAuth: false
  }
];

export default function DocsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'ml' | 'data'>('ml');

  const handleGenerateKeyClick = () => {
    if (!session) {
      toast.error('Please sign in to generate an API key');
      router.push('/login');
      return;
    }
    setIsDialogOpen(true);
  };

  const handleGenerateKey = async () => {
    try {
      const key = await generateApiKey(newKeyName || 'My API Key');
      if (key) {
        setApiKeys([key, ...apiKeys]);
        setNewKeyName('');
        setIsDialogOpen(false);
        toast.success('API key generated successfully');
      }
    } catch (error) {
      console.error('Failed to generate API key:', error);
      toast.error('Failed to generate API key');
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      await deleteApiKey(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      toast.success('API key deleted successfully');
    } catch (error) {
      console.error('Failed to delete API key:', error);
      toast.error('Failed to delete API key');
    }
  };

  const handleUpdateKeyName = async (id: string, name: string) => {
    try {
      const updatedKey = await updateApiKeyName(id, name);
      if (updatedKey) {
        setApiKeys(apiKeys.map(key => key.id === id ? updatedKey : key));
        setEditingKey(null);
        toast.success('API key name updated successfully');
      }
    } catch (error) {
      console.error('Failed to update API key name:', error);
      toast.error('Failed to update API key name');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPp');
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Nurolab API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Integrate machine learning capabilities into your applications with our
            comprehensive API suite.
          </p>

          <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <MdApi className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">API Keys</h2>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="flex items-center space-x-2"
                    onClick={handleGenerateKeyClick}
                  >
                    <span>Generate New Key</span>
                  </Button>
                </DialogTrigger>
                {session && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Generate New API Key</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Key Name</label>
                        <Input
                          placeholder="My API Key"
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleGenerateKey} className="w-full">
                        Generate Key
                      </Button>
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </div>

            {session ? (
              <AnimatePresence>
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <motion.div
                      key={key.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-muted p-6 rounded-lg shadow-sm"
                    >
                      {/* Key card content remains the same */}
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Sign in to manage your API keys and access additional features.
                </p>
                <Button onClick={() => router.push('/login')}>
                  Sign In
                </Button>
              </div>
            )}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <Button
                variant={selectedCategory === 'ml' ? 'default' : 'ghost'}
                onClick={() => setSelectedCategory('ml')}
                className="flex items-center space-x-2"
              >
                <FaRobot className="w-4 h-4" />
                <span>Machine Learning APIs</span>
              </Button>
              <Button
                variant={selectedCategory === 'data' ? 'default' : 'ghost'}
                onClick={() => setSelectedCategory('data')}
                className="flex items-center space-x-2"
              >
                <FaDatabase className="w-4 h-4" />
                <span>Training Data APIs</span>
              </Button>
            </div>

            <div className="grid gap-6">
              {apiEndpoints
                .filter(endpoint => endpoint.category === selectedCategory)
                .map((endpoint) => (
                  <motion.div
                    key={endpoint.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-lg p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{endpoint.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          endpoint.status === 'free' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {endpoint.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {endpoint.description}
                    </p>

                    <div className="bg-muted p-4 rounded-md font-mono text-sm mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-500">{endpoint.method}</span>
                        <span>{endpoint.path}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <FaLock className="w-4 h-4" />
                        <span>{endpoint.requiresAuth ? 'Requires API Key' : 'No API Key Required'}</span>
                      </div>
                      <div>
                        Rate Limit: {endpoint.rateLimit}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
