'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';


interface ImageAdjustments {
  contrast: number;
  brightness: number;
  fillMode: 'fit' | 'fill';
}

export default function CaseCustomizationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [imageAdjustments, setImageAdjustments] = useState<ImageAdjustments>({
    contrast: 100,
    brightness: 100,
    fillMode: 'fit'
  });
  const [actualImageSrc, setActualImageSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedPhoto = searchParams.get('photo');
  const phoneModel = params.phonemodelcase as string;

  // Load image from sessionStorage on component mount
  useEffect(() => {
    if (selectedPhoto === 'custom') {
      const imageData = sessionStorage.getItem('customCase_imageData');
      if (imageData) {
        setActualImageSrc(imageData);
      } else {
        // No image data found, redirect back to customize page
        router.push('/customize');
      }
    } else if (selectedPhoto) {
      // Fallback to URL parameter (for backwards compatibility)
      setActualImageSrc(selectedPhoto);
    } else {
      // No photo parameter, redirect back to customize page
      router.push('/customize');
    }
  }, [selectedPhoto, router]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSubmit = () => {
    // Clear stored image data since the design is complete
    sessionStorage.removeItem('customCase_imageData');
    sessionStorage.removeItem('customCase_imageType');
    
    alert('Your custom case design has been submitted!');
    router.push('/');
  };

  const resetImage = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
    setImageAdjustments({
      contrast: 100,
      brightness: 100,
      fillMode: 'fit'
    });
  };

  const handleAdjustmentChange = (type: keyof ImageAdjustments, value: number | 'fit' | 'fill') => {
    setImageAdjustments(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Customize Your {phoneModel} Case</h1>

        <div className="flex flex-row gap-8 justify-center items-start">
          {/* Phone case preview */}
          <div 
            ref={containerRef}
            className="relative w-[300px] h-[600px] border-2 border-gray-300 rounded-3xl overflow-hidden"
            style={{ 
              backgroundColor: '#f5f5f5',
            }}
          >
            {actualImageSrc && (
              <Image
                ref={imageRef}
                src={actualImageSrc}
                alt="Selected design"
                fill
                className="absolute cursor-move"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: 'center',
                  userSelect: 'none',
                  filter: `contrast(${imageAdjustments.contrast}%) brightness(${imageAdjustments.brightness}%)`,
                  objectFit: imageAdjustments.fillMode === 'fill' ? 'cover' : 'contain',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                draggable={false}
                unoptimized
              />
            )}
          </div>

          {/* Controls Panel */}
          <div className="w-80 bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Image Controls</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-500 text-right">{scale.toFixed(1)}x</div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Rotation
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-500 text-right">{rotation}°</div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">X: {position.x}px</label>
                    <input
                      type="range"
                      min="-150"
                      max="150"
                      value={position.x}
                      onChange={(e) => setPosition({ ...position, x: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Y: {position.y}px</label>
                    <input
                      type="range"
                      min="-300"
                      max="300"
                      value={position.y}
                      onChange={(e) => setPosition({ ...position, y: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contrast: {imageAdjustments.contrast}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={imageAdjustments.contrast}
                  onChange={(e) => handleAdjustmentChange('contrast', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Brightness: {imageAdjustments.brightness}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={imageAdjustments.brightness}
                  onChange={(e) => handleAdjustmentChange('brightness', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Fill Mode:</span>
                <button
                  onClick={() => handleAdjustmentChange('fillMode', imageAdjustments.fillMode === 'fit' ? 'fill' : 'fit')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    imageAdjustments.fillMode === 'fill'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {imageAdjustments.fillMode === 'fill' ? 'Fill' : 'Fit'}
                </button>
              </div>

              <button
                onClick={resetImage}
                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Reset Image
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Submit Design
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 