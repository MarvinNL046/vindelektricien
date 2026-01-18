'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Camera, User, Trash2, Loader2 } from 'lucide-react';
import PhotoUpload from './PhotoUpload';

interface Photo {
  id: number;
  facility_slug: string;
  uploader_name: string;
  file_url: string;
  caption: string | null;
  created_at: string;
  canDelete?: boolean;
}

interface PhotoGalleryProps {
  facilitySlug: string;
  facilityName: string;
}

export default function PhotoGallery({ facilitySlug, facilityName }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch(`/api/photos?slug=${facilitySlug}`);
        const data = await response.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [facilitySlug, refreshKey]);

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDelete = async (photoId: number) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    setDeletingId(photoId);
    setDeleteError(null);

    try {
      const response = await fetch(`/api/photos?id=${photoId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Delete failed');
      }

      // Close lightbox if the deleted photo was open
      if (selectedIndex !== null && photos[selectedIndex]?.id === photoId) {
        setSelectedIndex(null);
      }

      // Refresh photos
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setDeletingId(null);
    }
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos.length]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Camera className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Visitor Photos</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Visitor Photos</h2>
            {photos.length > 0 && (
              <span className="text-sm text-muted-foreground">({photos.length})</span>
            )}
          </div>
          <PhotoUpload
            facilitySlug={facilitySlug}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Camera className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No photos yet</p>
            <p className="text-sm mt-1">
              Have you visited? Share your photos of {facilityName}!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {photos.slice(0, 6).map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="aspect-square relative rounded-lg overflow-hidden group"
              >
                <Image
                  src={photo.file_url}
                  alt={photo.caption || `Photo of ${facilityName}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {index === 5 && photos.length > 6 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      +{photos.length - 6}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && photos[selectedIndex] && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          {selectedIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}
          {selectedIndex < photos.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] w-full h-full relative flex items-center justify-center p-4">
            <Image
              src={photos[selectedIndex].file_url}
              alt={photos[selectedIndex].caption || `Photo of ${facilityName}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Caption and info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <div className="max-w-5xl mx-auto">
              {photos[selectedIndex].caption && (
                <p className="text-lg mb-2">{photos[selectedIndex].caption}</p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <User className="w-4 h-4" />
                  <span>{photos[selectedIndex].uploader_name}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(photos[selectedIndex].created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Delete button - only shown for own photos */}
                {photos[selectedIndex].canDelete && (
                  <button
                    onClick={() => handleDelete(photos[selectedIndex].id)}
                    disabled={deletingId === photos[selectedIndex].id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
                  >
                    {deletingId === photos[selectedIndex].id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Delete
                  </button>
                )}
              </div>

              {/* Error message */}
              {deleteError && (
                <div className="mt-2 text-red-400 text-sm">
                  {deleteError}
                </div>
              )}

              {/* Counter */}
              <div className="mt-3 text-white/50 text-sm">
                {selectedIndex + 1} / {photos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
