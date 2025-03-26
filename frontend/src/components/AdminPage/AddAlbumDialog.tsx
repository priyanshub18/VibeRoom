import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { customToast } from "../ToastThings/SelfMadeToast";
import { useMusicStore } from "@/stores/useMusicStore";

const AddAlbumDialog = () => {
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fetchAlbums, fetchStats, fetchSongs } = useMusicStore();
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!imageFile) {
        return customToast("Please upload an image file", "error");
      }

      const formData = new FormData();
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile);

      await axiosInstance.post("/admin/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewAlbum({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
      });
      setImageFile(null);
      fetchStats();
      fetchSongs();
      fetchAlbums();
      setAlbumDialogOpen(false);

      customToast("Album created successfully");
    } catch (error: any) {
      customToast("Failed to create album: " + error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
      <DialogTrigger asChild>
        <Button className='bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105'>
          <Plus className='mr-2 h-4 w-4' />
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-gradient-to-br from-zinc-900 to-zinc-800 border-emerald-700 shadow-2xl rounded-xl'>
        <DialogHeader className='border-b border-emerald-700 pb-4'>
          <DialogTitle className='text-2xl font-bold text-emerald-400 flex items-center gap-3'>Add New Album</DialogTitle>
          <DialogDescription className='text-zinc-400'>Add a new album to your collection</DialogDescription>
        </DialogHeader>
        <div className='space-y-6 py-6'>
          <input type='file' ref={fileInputRef} onChange={handleImageSelect} accept='image/*' className='hidden' />
          <div className='flex items-center justify-center p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-emerald-500 transition-all group' onClick={() => fileInputRef.current?.click()}>
            <div className='text-center'>
              <div className='p-4 bg-zinc-800 rounded-full inline-block mb-4 group-hover:bg-emerald-600 transition-all'>
                <Upload className='h-8 w-8 text-zinc-400 group-hover:text-white' />
              </div>
              <div className='text-sm text-zinc-400 mb-3'>{imageFile ? <div className='text-emerald-500'>{imageFile.name}</div> : "Upload album artwork"}</div>
              <Button variant='outline' size='sm' className='text-xs bg-zinc-800 hover:bg-emerald-600 hover:text-white transition-all'>
                Choose File
              </Button>
            </div>
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Album Title</label>
            <Input value={newAlbum.title} onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })} className='bg-zinc-800 border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all' placeholder='Enter album title' />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Artist</label>
            <Input value={newAlbum.artist} onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })} className='bg-zinc-800 border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all' placeholder='Enter artist name' />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Release Year</label>
            <Input type='number' value={newAlbum.releaseYear} onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })} className='bg-zinc-800 border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all' placeholder='Enter release year' min={1900} max={new Date().getFullYear()} />
          </div>
        </div>
        <DialogFooter className='border-t border-emerald-700 pt-4'>
          <Button variant='outline' onClick={() => setAlbumDialogOpen(false)} disabled={isLoading} className='mr-2 hover:bg-zinc-700 transition-all'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className='bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105' disabled={isLoading || !imageFile || !newAlbum.title || !newAlbum.artist}>
            {isLoading ? "Creating..." : "Add Album"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddAlbumDialog;
