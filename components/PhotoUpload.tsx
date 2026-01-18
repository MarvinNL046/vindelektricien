'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface PhotoUploadProps {
  facilitySlug: string;
  onUploadSuccess?: () => void;
}

export default function PhotoUpload({ facilitySlug, onUploadSuccess }: PhotoUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploaderName, setUploaderName] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, PNG, WebP and HEIC files are allowed');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large (max 10MB)');
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploaderName.trim()) {
      setError('Please select a photo and enter your name');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('slug', facilitySlug);
      formData.append('uploaderName', uploaderName.trim());
      formData.append('caption', caption.trim());

      const response = await fetch('/api/photos', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSelectedFile(null);
        setPreview(null);
        setUploaderName('');
        setCaption('');
        setSuccess(false);
        onUploadSuccess?.();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="gap-2"
      >
        <Camera className="w-4 h-4" />
        Add Photo
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Add Photo</h3>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-teal-600" />
              </div>
              <h4 className="text-lg font-semibold text-teal-700">
                Photo uploaded successfully!
              </h4>
              <p className="text-muted-foreground mt-2">
                Thank you for your contribution.
              </p>
            </div>
          ) : (
            <>
              {/* File selection */}
              {!preview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-medium">
                    Click to select a photo
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WebP or HEIC (max 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Will be automatically converted to WebP
                  </p>
                </div>
              )}

              {/* Name input */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Your name *
                </label>
                <Input
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  placeholder="E.g. John Smith"
                  maxLength={100}
                />
              </div>

              {/* Caption input */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description (optional)
                </label>
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="E.g. Front entrance of the facility"
                  maxLength={200}
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || !uploaderName.trim() || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By uploading a photo you agree to our terms.
                Maximum 3 photos per day per facility.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
