import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Upload, Music, Disc3, User } from "lucide-react";
import { useRef, useState } from "react";
import { customToast } from "../ToastThings/SelfMadeToast";

interface NewSong {
  title: string;
  artist: string;
  album: string;
  duration: string;
}

const AddSongDialog = () => {
  const { fetchSongs, fetchAlbums, fetchStats } = useMusicStore();
  const { albums } = useMusicStore();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState<NewSong>({
    title: "",
    artist: "",
    album: "",
    duration: "0",
  });

  const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!files.audio || !files.image) {
        return customToast("Please upload both audio and image files", "error");
      }

      if (!newSong.title || !newSong.artist || !newSong.duration) {
        return customToast("Please fill all the fields", "error");
      }

      const formData = new FormData();

      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration);
      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }

      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: "0",
      });

      setFiles({
        audio: null,
        image: null,
      });
      fetchStats();
      fetchSongs();
      fetchAlbums();
      customToast("Song added successfully");
    } catch (error: any) {
      customToast("Failed to add song: " + error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className='mt-4 sm:mt-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105'>
          <Plus className='size-5' />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className='bg-gradient-to-br from-zinc-900 to-zinc-800 border-emerald-700 max-h-[80vh] overflow-auto shadow-2xl rounded-xl'>
        <DialogHeader className='border-b border-emerald-700 pb-4'>
          <DialogTitle className='text-2xl font-bold text-emerald-400 flex items-center gap-3'>
            <Music className='size-7 text-emerald-500' />
            Add New Song
          </DialogTitle>
          <DialogDescription className='text-zinc-400'>Elevate your music library with a new track</DialogDescription>
        </DialogHeader>

        <div className='space-y-6 py-6'>
          <input type='file' accept='audio/*' ref={audioInputRef} hidden onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))} />
          <input type='file' ref={imageInputRef} className='hidden' accept='image/*' onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))} />

          {/* Image upload area */}
          <div className='flex items-center justify-center p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-emerald-500 transition-all group' onClick={() => imageInputRef.current?.click()}>
            <div className='text-center'>
              {files.image ? (
                <div className='space-y-3'>
                  <div className='text-sm text-emerald-500'>Image Selected</div>
                  <div className='text-xs text-zinc-300 bg-zinc-800 p-2 rounded-md'>{files.image.name.slice(0, 30)}</div>
                </div>
              ) : (
                <>
                  <div className='p-4 bg-zinc-800 rounded-full inline-block mb-4 group-hover:bg-emerald-600 transition-all'>
                    <Upload className='h-8 w-8 text-zinc-400 group-hover:text-white' />
                  </div>
                  <div className='text-sm text-zinc-400 mb-3'>Upload Artwork</div>
                  <Button variant='outline' size='sm' className='text-xs bg-zinc-800 hover:bg-emerald-600 hover:text-white transition-all'>
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Audio upload */}
          <div className='space-y-2'>
            <label className='text-sm font-medium flex items-center gap-2'>
              <Disc3 className='size-4 text-emerald-500' />
              Audio File
            </label>
            <div className='flex items-center gap-2'>
              <Button variant='outline' onClick={() => audioInputRef.current?.click()} className='w-full bg-zinc-800 hover:bg-emerald-600 hover:text-white transition-all'>
                {files.audio ? files.audio.name.slice(0, 30) : "Choose Audio File"}
              </Button>
            </div>
          </div>

          {/* Other fields */}
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Music className='size-4 text-emerald-500' />
                Title
              </label>
              <Input value={newSong.title} onChange={(e) => setNewSong({ ...newSong, title: e.target.value })} className='bg-zinc-800 border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all' placeholder='Enter song title' />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <User className='size-4 text-emerald-500' />
                Artist
              </label>
              <Input value={newSong.artist} onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })} className='bg-zinc-800 border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all' placeholder='Enter artist name' />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Disc3 className='size-4 text-emerald-500' />
                Duration (seconds)
              </label>
              <Input type='number' min='0' value={newSong.duration} onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "" })} className='bg-zinc-800 border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all' placeholder='Song duration' />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Disc3 className='size-4 text-emerald-500' />
                Album (Optional)
              </label>
              <Select value={newSong.album} onValueChange={(value: any) => setNewSong({ ...newSong, album: value })}>
                <SelectTrigger className='w-full bg-zinc-800 border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all'>
                  <SelectValue placeholder='Select album' />
                </SelectTrigger>
                <SelectContent className='bg-zinc-800 border-zinc-700'>
                  <SelectItem value='none'>No Album (Single)</SelectItem>
                  {albums.map((album) => (
                    <SelectItem key={album._id} value={album._id}>
                      {album.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className='border-t border-emerald-700 pt-4'>
          <Button variant='outline' onClick={() => setSongDialogOpen(false)} disabled={isLoading} className='mr-2 hover:bg-zinc-700 transition-all'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} className='bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105'>
            {isLoading ? "Uploading..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
