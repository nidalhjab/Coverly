import Image from "next/image";
import Link from "next/link";

const heroImage = '/images/hero2.png';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-500 to-red-200 text-white overflow-hidden">
        <div className="container mx-auto px-6 py-24 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-blue-300 blur-3xl"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeIn">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slideUp">
                Transform Your
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Phone Case Into Art
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-slideUp animation-delay-200">
                Custom printed phone cases that reflect your unique style. 
                Turn your favorite photos into stunning phone protection.
              </p>
              <div className="animate-slideUp animation-delay-300">
                <Link 
                  href="/customize"
                  className="bg-white text-purple-600 px-10 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center group"
                >
                  Start Designing
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-fadeIn animation-delay-500">
              <div className="relative h-[500px] w-full transform hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-3xl opacity-30 -z-10"></div>
                <Image
                  src={heroImage}
                  alt="Custom Phone Case"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Choose Coverly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">High Quality Printing</h3>
              <p className="text-gray-600">Premium quality prints that last long and maintain vibrant colors.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quick Turnaround</h3>
              <p className="text-gray-600">Get your custom case delivered within 3-5 business days.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Protection Guaranteed</h3>
              <p className="text-gray-600">Durable cases that protect your phone from drops and scratches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Model',
                description: 'Select your phone model from our wide range of options'
              },
              {
                step: '2',
                title: 'Upload Design',
                description: 'Upload your favorite photo or choose from our gallery'
              },
              {
                step: '3',
                title: 'Preview',
                description: 'See how your case will look before ordering'
              },
              {
                step: '4',
                title: 'Receive',
                description: 'Get your custom case delivered to your doorstep'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Create Your Custom Phone Case?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Express yourself with a unique phone case that&apos;s as individual as you are.
            Start designing yours today!
          </p>
          <Link 
            href="/customize"
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 inline-block"
          >
            Start Designing Now
          </Link>
        </div>
      </section>
    </main>
  );
}
