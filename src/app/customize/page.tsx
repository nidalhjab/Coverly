'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeviceModel {
  brand: string;
  models: string[];
  image: string;
}

const galleryPhotos = [
  '/images/gallery/photo1.jpg',
  '/images/gallery/photo2.jpg',
  '/images/gallery/photo3.jpg',
  '/images/gallery/photo4.jpg',
  '/images/gallery/photo5.jpg',
];

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

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedPhoto(file);
      setSelectedPhoto('uploaded');
    }
  };

  const handleNext = () => {
    if (currentStep === 'model' && selectedModel) {
      setCurrentStep('photo');
    } else if (currentStep === 'photo' && selectedPhoto) {
      const modelSlug = selectedModel.toLowerCase().replace(/\s+/g, '-');
      const photoPath = selectedPhoto === 'uploaded' && uploadedPhoto 
        ? URL.createObjectURL(uploadedPhoto)
        : selectedPhoto;
      router.push(`/customize/${modelSlug}?photo=${encodeURIComponent(photoPath)}`);
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
            {/* Upload option */}
            <div>
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
            </div>

            {/* Gallery options */}
            <div>
              <h3 className="text-lg font-medium mb-4">Or choose from our gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {galleryPhotos.map((photo, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedPhoto === photo ? 'border-purple-600 ring-2 ring-purple-200' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <img
                        src={photo}
                        alt={`Gallery photo ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </button>
                ))}
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