import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Loader2, Wand2, Upload, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import { fetchMetadata } from '../lib/utils';

interface AddLinkProps {
  onAdd: () => void;
  isAdmin: boolean;
}

export const AddLink = ({ onAdd, isAdmin }: AddLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'manual' | 'auto'>('manual');
  
  // Form States
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Project');
  const [imageUrl, setImageUrl] = useState('');
  
  // Loading States
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdmin) return null;

  const handleAutoFetch = async () => {
    if (!url) {
      toast.error('Please enter a URL first');
      return;
    }
    setIsFetching(true);
    const data = await fetchMetadata(url);
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setImageUrl(data.image);
      toast.success('Metadata fetched successfully');
    } else {
      toast.error('Could not fetch metadata automatically');
    }
    setIsFetching(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message.includes('bucket not found')) {
           throw new Error('Please create a public storage bucket named "images" in Supabase dashboard.');
        }
        throw uploadError;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) {
        toast.error('URL and Title are required');
        return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from('links').insert({
        url,
        title,
        description,
        image_url: imageUrl,
        category
      });

      if (error) throw error;
      
      // Reset form
      setUrl('');
      setTitle('');
      setDescription('');
      setImageUrl('');
      setIsOpen(false);
      onAdd();
      toast.success('Project added to gallery');
    } catch (error) {
      console.error('Error adding link:', error);
      toast.error('Failed to add project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-gray-900 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:bg-black transition-colors border-4 border-white/20 backdrop-blur-sm"
        title="Add New Project"
      >
        <Plus size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-white/60 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Update Gallery</h2>
                  <p className="text-gray-500 text-sm mt-1">Add a new piece to your collection.</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="flex p-1.5 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
                <button 
                    onClick={() => setMode('manual')}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${mode === 'manual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Manual Entry
                </button>
                <button 
                    onClick={() => setMode('auto')}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${mode === 'auto' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <Wand2 size={14} /> Auto-Fetch
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Destination URL</label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 transition-all placeholder:text-gray-300 font-medium"
                        required
                        />
                    </div>
                    {mode === 'auto' && (
                        <button
                        type="button"
                        onClick={handleAutoFetch}
                        disabled={isFetching || !url}
                        className="px-6 py-2 bg-gray-900 text-white rounded-2xl hover:bg-black transition-colors disabled:opacity-50 font-medium"
                        >
                        {isFetching ? <Loader2 className="animate-spin" size={18} /> : 'Fetch'}
                        </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title Input */}
                    <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Project Name"
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 transition-all placeholder:text-gray-300 font-medium"
                        required
                    />
                    </div>

                    {/* Category Input */}
                    <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Category</label>
                    <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 transition-all appearance-none font-medium text-gray-700"
                        >
                            <option value="Project">Project</option>
                            <option value="Resume">Resume</option>
                            <option value="Architecture">Architecture</option>
                            <option value="Blog">Blog</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the essence of this work..."
                    rows={3}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 transition-all placeholder:text-gray-300 resize-none font-medium"
                  />
                </div>

                {/* Image Upload/URL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Cover Visual</label>
                  
                  <div className="p-4 rounded-3xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors bg-gray-50/50">
                    <div className="flex flex-col gap-4">
                        {imageUrl ? (
                            <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm group">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                <button 
                                    type="button"
                                    onClick={() => setImageUrl('')}
                                    className="absolute top-2 right-2 p-2 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-400">
                                    <Upload size={20} />
                                </div>
                                <p className="text-sm font-medium text-gray-600">Upload an image</p>
                                <p className="text-xs text-gray-400 mt-1">or paste a URL below</p>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://image-url.com..."
                                className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-100 focus:outline-none focus:border-gray-300 transition-all placeholder:text-gray-300 text-sm"
                            />
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden" 
                                accept="image/*"
                                onChange={handleFileUpload}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                {isUploading ? <Loader2 className="animate-spin" size={16} /> : 'Browse'}
                            </button>
                        </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg tracking-wide hover:bg-black transition-all shadow-xl hover:shadow-2xl disabled:opacity-70 flex items-center justify-center gap-2 mt-6"
                >
                  {isLoading ? 'Processing...' : 'Add to Collection'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
