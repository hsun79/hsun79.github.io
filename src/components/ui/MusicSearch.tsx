import { useState, useEffect, useRef } from 'react';
import { searchSpotify } from '@/utils/spotify';
import { Search, Music } from 'lucide-react';

type Track = {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
};

type MusicSearchProps = {
  onSelect: (track: Track) => void;
  placeholder?: string;
  value?: string;
};

const MusicSearch = ({ onSelect, placeholder = "请输入歌曲名称", value = "" }: MusicSearchProps) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchSpotify(query);
        if (data.tracks && data.tracks.items) {
          setResults(data.tracks.items);
          setShowResults(true);
        }
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (track: Track) => {
    setSelectedTrack(track);
    setQuery(`${track.name} - ${track.artists[0].name}`);
    setShowResults(false);
    onSelect(track);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full p-2 pr-10 border rounded-md"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((track) => (
            <div
              key={track.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(track)}
            >
              {track.album.images.length > 0 && (
                <img 
                  src={track.album.images[track.album.images.length - 1].url} 
                  alt={track.album.name} 
                  className="w-10 h-10 mr-3 rounded"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{track.name}</div>
                <div className="text-sm text-gray-500 truncate">
                  {track.artists.map(artist => artist.name).join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showResults && query && results.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg p-3 text-center text-gray-500">
          没有找到相关歌曲
        </div>
      )}
    </div>
  );
};

export default MusicSearch; 