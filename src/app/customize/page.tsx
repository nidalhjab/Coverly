'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface DeviceModel {
  brand: string;
  models: string[];
  image: string;
}

const deviceModels: DeviceModel[] = [
  {
    brand: 'iPhone',
    models: [
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15 Plus',
      'iPhone 15',
      'iPhone 14 Pro Max',
      'iPhone 14 Pro',
      'iPhone 14 Plus',
      'iPhone 14',
      'iPhone 13 Pro Max',
      'iPhone 13 Pro',
      'iPhone 13',
      'iPhone 13 Mini',
    ],
    image: '/images/iphone-model.png',
  },
  {
    brand: 'Samsung',
    models: [
      'Galaxy S24 Ultra',
      'Galaxy S24+',
      'Galaxy S24',
      'Galaxy S23 Ultra',
      'Galaxy S23+',
      'Galaxy S23',
      'Galaxy Z Fold 5',
      'Galaxy Z Flip 5',
      'Galaxy A54 5G',
    ],
    image: '/images/samsung-model.png',
  },
  {
    brand: 'Xiaomi',
    models: [
      'Xiaomi 14 Pro',
      'Xiaomi 14',
      'Xiaomi 13 Pro',
      'Xiaomi 13',
      'Redmi Note 13 Pro+',
      'Redmi Note 13 Pro',
      'POCO F5 Pro',
      'POCO F5',
    ],
    image: '/images/xiaomi-model.png',
  },
];

type Step = 'model' | 'photo';

export default function CustomizePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('model');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  // Setup video stream when camera is active
  useEffect(() => {
    if (isCameraActive && cameraStream) {
      const video = document.getElementById('camera-video') as HTMLVideoElement;
      if (video) {
        video.srcObject = cameraStream;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Error playing video:', error);
          });
        }
      }
    }
  }, [isCameraActive, cameraStream]);

  // Cleanup effect for blob URLs and camera stream
  useEffect(() => {
    return () => {
      // Cleanup camera stream on unmount
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      // Cleanup blob URLs on unmount
      if (capturedPhoto && capturedPhoto.startsWith('blob:')) {
        URL.revokeObjectURL(capturedPhoto);
      }
    };
  }, [cameraStream, capturedPhoto]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedPhoto(file);
      setSelectedPhoto('uploaded');
      // Reset camera states when uploading
      setIsCameraActive(false);
      if (capturedPhoto && capturedPhoto.startsWith('blob:')) {
        URL.revokeObjectURL(capturedPhoto);
      }
      setCapturedPhoto(null);
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      // Reset upload states when starting camera
      setUploadedPhoto(null);
      setSelectedPhoto('');
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const restartCamera = async () => {
    try {
      // Clean up previous captured photo
      if (capturedPhoto && capturedPhoto.startsWith('blob:')) {
        URL.revokeObjectURL(capturedPhoto);
      }
      setCapturedPhoto(null);
      
      // Start new camera session
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setCameraStream(stream);
      setIsCameraActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!cameraStream) return;

    const video = document.getElementById('camera-video') as HTMLVideoElement;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    
    // Convert to blob instead of data URL to avoid URL length issues
    canvas.toBlob((blob) => {
      if (blob) {
        const blobUrl = URL.createObjectURL(blob);
        setCapturedPhoto(blobUrl);
        setSelectedPhoto('camera');
      }
    }, 'image/jpeg', 0.8);
    
    stopCamera();
  };

  const handleNext = () => {
    if (currentStep === 'model' && selectedModel) {
      setCurrentStep('photo');
    } else if (currentStep === 'photo' && selectedPhoto) {
      const modelSlug = selectedModel.toLowerCase().replace(/\s+/g, '-');
      
      // Store image data in sessionStorage to persist across refreshes
      if (selectedPhoto === 'uploaded' && uploadedPhoto) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          sessionStorage.setItem('customCase_imageData', dataUrl);
          sessionStorage.setItem('customCase_imageType', 'uploaded');
          router.push(`/customize/${modelSlug}?photo=custom`);
        };
        reader.readAsDataURL(uploadedPhoto);
      } else if (selectedPhoto === 'camera' && capturedPhoto) {
        // Convert blob URL to data URL for persistence
        fetch(capturedPhoto)
          .then(res => res.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const dataUrl = e.target?.result as string;
              sessionStorage.setItem('customCase_imageData', dataUrl);
              sessionStorage.setItem('customCase_imageType', 'camera');
              router.push(`/customize/${modelSlug}?photo=custom`);
            };
            reader.readAsDataURL(blob);
          });
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'photo') {
      setCurrentStep('model');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Custom Case</h1>
        
        {/* Step indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-8 h-8 ${currentStep === 'model' ? 'bg-purple-600' : 'bg-green-500'} text-white rounded-full flex items-center justify-center`}>
                1
              </div>
              <div className={`ml-2 ${currentStep === 'model' ? 'text-purple-600' : 'text-green-500'} font-semibold`}>Choose Device</div>
            </div>
            <div className="h-1 w-16 bg-gray-300 mx-4"></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 ${currentStep === 'photo' ? 'bg-purple-600' : currentStep === 'model' ? 'bg-gray-300' : 'bg-green-500'} text-white rounded-full flex items-center justify-center`}>
                2
              </div>
              <div className={`ml-2 ${currentStep === 'photo' ? 'text-purple-600' : currentStep === 'model' ? 'text-gray-500' : 'text-green-500'} font-semibold`}>Choose Photo</div>
            </div>
          </div>
        </div>

        {/* Device selection step */}
        {currentStep === 'model' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deviceModels.map((device) => (
                <div
                  key={device.brand}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    selectedBrand === device.brand
                      ? 'border-purple-600 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => {
                    setSelectedBrand(device.brand);
                    setSelectedModel('');
                  }}
                >
                  <div className="text-center">
                    <div className="h-48 relative mb-4">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{device.brand}</h3>
                  </div>
                </div>
              ))}
            </div>

            {selectedBrand && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Select Your Model</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {deviceModels
                    .find((device) => device.brand === selectedBrand)
                    ?.models.map((model) => (
                      <button
                        key={model}
                        className={`p-4 border rounded-lg text-center transition-all ${
                          selectedModel === model
                            ? 'border-purple-600 bg-purple-50 text-purple-600'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => setSelectedModel(model)}
                      >
                        {model}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-8">
              <button
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  selectedModel 
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleNext}
                disabled={!selectedModel}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Photo selection step */}
        {currentStep === 'photo' && (
          <div className="space-y-8">
            {/* Two boxes: Upload and Camera */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Photo Box */}
              <div className={`border-2 rounded-lg p-6 transition-all ${
                selectedPhoto === 'uploaded' 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-300 hover:border-purple-400'
              }`}>
                <h3 className="text-lg font-semibold mb-4 text-center">Upload Photo</h3>
                
                                 {uploadedPhoto ? (
                   <div className="text-center">
                     <Image 
                       src={URL.createObjectURL(uploadedPhoto)} 
                       alt="Uploaded" 
                       width={128}
                       height={128}
                       className="object-cover mx-auto rounded-lg mb-4"
                       unoptimized
                     />
                     <p className="text-sm text-gray-600 mb-4">Photo uploaded successfully!</p>
                    <label className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                      Change Photo
                    </label>
                  </div>
                ) : (
                  <label className="block text-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">Click to upload a photo</p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                  </label>
                )}
              </div>

              {/* Camera Photo Box */}
              <div className={`border-2 rounded-lg p-6 transition-all ${
                selectedPhoto === 'camera' 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-300 hover:border-purple-400'
              }`}>
                <h3 className="text-lg font-semibold mb-4 text-center">Take Photo</h3>
                
                                 {capturedPhoto ? (
                   <div className="text-center">
                     <Image 
                       src={capturedPhoto} 
                       alt="Captured" 
                       width={128}
                       height={128}
                       className="object-cover mx-auto rounded-lg mb-4"
                       unoptimized
                     />
                     <p className="text-sm text-gray-600 mb-4">Photo captured successfully!</p>
                    <button
                      onClick={restartCamera}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Take New Photo
                    </button>
                  </div>
                ) : isCameraActive ? (
                  <div className="text-center">
                    <video
                      id="camera-video"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      playsInline
                      muted
                      autoPlay
                    />
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={capturePhoto}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Capture
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600 mb-4">Use your camera to take a photo</p>
                    <button
                      onClick={startCamera}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Open Camera
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                className="px-8 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  selectedPhoto 
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleNext}
                disabled={!selectedPhoto}
              >
                Continue to Design
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 