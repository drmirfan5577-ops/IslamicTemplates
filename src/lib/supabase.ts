import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Upload file to storage
export async function uploadToStorage(bucket: string, path: string, file: File | Blob): Promise<string | null> {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) { console.error('Upload error:', error); return null; }
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

// Delete file from storage
export async function deleteFromStorage(bucket: string, path: string): Promise<boolean> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  return !error;
}

// List files in storage
export async function listStorageFiles(bucket: string, folder?: string) {
  const { data, error } = await supabase.storage.from(bucket).list(folder || '', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });
  if (error) return [];
  return data || [];
}
