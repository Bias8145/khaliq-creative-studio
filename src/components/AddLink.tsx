import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Loader2, Wand2, Upload, Link as LinkIcon, Image as ImageIcon, FileText, Save, Video, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, type Link } from '../lib/supabase';
import { fetchMetadata } from '../lib/utils';

interface AddLinkProps {
  onAdd: () => void;
  isAdmin: boolean;
  linkToEdit?: Link | null;
  onCloseEdit?: () => void;
}

export const AddLink = ({ onAdd, isAdmin, linkToEdit, onCloseEdit }: AddLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'manual' | 'auto'>('manual');
  
  // Form States
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Project');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  // Loading States
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (linkToEdit) {
      setIsOpen(true);
      setTitle(linkToEdit.title || '');
      setUrl(linkToEdit.url || '');
      setDescription(linkToEdit.description || '');
      setCategory(linkToEdit.category || 'Project');
      try {
        if (linkToEdit.image_url) {
          const parsed = JSON.parse(linkToEdit.image_url);
          if (Array.isArray(parsed)) setImageUrls(parsed);
          else setImageUrls([linkToEdit.image_url]);
        } else {
          setImageUrls([]);
        }
      } catch {
        setImageUrls(linkToEdit.image_url ? [linkToEdit.image_url] : []);
      }
    }
  }, [linkToEdit]);

  useEffect(() => {
    if (!isOpen && linkToEdit && onCloseEdit) {
      onCloseEdit();
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setUrl('');
    setTitle('');
    setDescription('');
    setCategory('Project');
    setImageUrls([]);
  };

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
      if (data.image) {
        setImageUrls(prev => [...prev, data.image]);
      }
      toast.success('Metadata fetched successfully');
    } else {
      toast.error('Could not fetch metadata automatically');
    }
    setIsFetching(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        newUrls.push(data.publicUrl);
      }

      setImageUrls(prev => [...prev, ...newUrls]);
      toast.success(`${newUrls.length} file(s) uploaded successfully`);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(error.message || 'Failed to upload file. Check storage permissions.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageUrls(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const isPdf = (url: string) => url.toLowerCase().includes('.pdf');
  const isVideo = (url: string) => url.toLowerCase().match(/\.(mp4|webm|ogg)$/i);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
        toast.error('Title is required');
        return;
    }

    setIsLoading(true);
    try {
      const imageStorageValue = imageUrls.length > 0 ? JSON.stringify(imageUrls) : null;
      
      const payload = {
        url: url || null,
        title,
        description,
        image_url: imageStorageValue,
        category
      };

      if (linkToEdit) {
        const { error } = await supabase
          .from('links')
          .update(payload)
          .eq('id', linkToEdit.id);
        if (error) throw error;
        toast.success('Project updated successfully');
      } else {
        const { error } = await supabase
          .from('links')
          .insert(payload);
        if (error) throw error;
        toast.success('Project added to gallery');
      }
      
      resetForm();
      setIsOpen(false);
      onAdd();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!linkToEdit && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-gray-900 text-white rounded-full shadow-2xl flex items-center justify-center z-[9990] hover:bg-black transition-colors border-4 border-white/20 backdrop-blur-sm"
          title="Add New Project"
        >
          <Plus size={28} />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 pb-4 border-b border-gray-50">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {linkToEdit ? 'Edit Project' : 'Update Gallery'}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {linkToEdit ? 'Modify existing details.' : 'Add a new piece to your collection.'}
                  </p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {!linkToEdit && (
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
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Title <span className="text-red-400">*</span></label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Project Name"
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 transition-all placeholder:text-gray-300 font-medium"
                        required
                    />
                    </div>

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
                    </div>
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Destination URL <span className="text-gray-300 font-normal normal-case">(Optional)</span></label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 transition-all placeholder:text-gray-300 font-medium"
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

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Gallery Files (Images, PDF, Video)</label>
                  
                  <div className="p-4 rounded-3xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors bg-gray-50/50">
                    <div className="flex flex-col gap-4">
                        {imageUrls.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {imageUrls.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group bg-white border border-gray-100 flex items-center justify-center">
                                        {isPdf(img) ? (
                                            <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                                                <FileText size={32} />
                                                <span className="text-[10px] font-bold uppercase">PDF Doc</span>
                                            </div>
                                        ) : isVideo(img) ? (
                                            <div className="w-full h-full bg-black flex items-center justify-center">
                                                <video src={img} className="w-full h-full object-cover opacity-80" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Video size={24} className="text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <img 
                                              src={img} 
                                              alt={`Preview ${idx}`} 
                                              className="w-full h-full object-cover" 
                                              onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement?.classList.add('bg-red-50');
                                                // Show fallback icon
                                                const icon = document.createElement('div');
                                                icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-300"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
                                                e.currentTarget.parentElement?.appendChild(icon);
                                              }}
                                            />
                                        )}
                                        
                                        <button 
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 p-1.5 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                                        >
                                            <X size={14} />
                                        </button>
                                        {idx === 0 && (
                                            <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-[10px] rounded-md font-bold z-10">Cover</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-col items-center justify-center py-4 text-center">
                            {imageUrls.length === 0 && (
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-400">
                                    <ImageIcon size={20} />
                                </div>
                            )}
                            
                            <div className="flex gap-2 w-full">
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    className="hidden" 
                                    accept="image/jpeg,image/png,image/jpg,application/pdf,video/mp4,video/webm"
                                    multiple 
                                    onChange={handleFileUpload}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
                                >
                                    {isUploading ? <Loader2 className="animate-spin" size={16} /> : (
                                        <>
                                            <Upload size={16} />
                                            {imageUrls.length > 0 ? 'Add More Files' : 'Select Photos, PDF, or Video'}
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, PDF, MP4, WebM.</p>
                        </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg tracking-wide hover:bg-black transition-all shadow-xl hover:shadow-2xl disabled:opacity-70 flex items-center justify-center gap-2 mt-6"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : (
                    <>
                        {linkToEdit ? <Save size={20} /> : <Plus size={20} />}
                        {linkToEdit ? 'Save Changes' : 'Add to Collection'}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
