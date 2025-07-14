import { Button } from '@/components/ui/button';
import React from 'react';

const Contact = () => {
  return (
    <section className="bg-gray-900 text-gray-100 body-font relative min-h-screen">
      <div className="container px-4 sm:px-5 py-12 sm:py-24 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Map Section */}
          <div className="w-full lg:w-2/3 bg-gray-800 rounded-lg overflow-hidden relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0" 
              title="map"  
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126933.01669363417!2d106.56763186008943!3d-6.1766812114889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f8e853d2e38d%3A0x301576d14feb9c0!2sTangerang%2C%20Kota%20Tangerang%2C%20Banten!5e0!3m2!1sid!2sid!4v1752495524280!5m2!1sid!2sid"
              style={{ filter: 'grayscale(0.8) contrast(1.1) opacity(0.85)' }}
              loading="lazy"
            ></iframe>
            
            {/* Contact Info Overlay */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md">
              <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-md p-3 sm:rounded-lg sm:p-6 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-100 tracking-wide text-[10px] sm:text-xs uppercase mb-1 sm:mb-2">
                      ALAMAT
                    </h3>
                    <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed">
                      KOTA TANGERANG, BANTEN, INDONESIA
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 tracking-wide text-[10px] sm:text-xs uppercase mb-1 sm:mb-2">
                      EMAIL
                    </h3>
                    <a 
                      href="mailto:caidenrev@gmail.com"
                      className="text-blue-400 hover:text-blue-300 text-[13px] sm:text-sm leading-relaxed transition-colors duration-200"
                    >
                      caidenrev@gmail.com
                    </a>
                    <h3 className="font-semibold text-gray-100 tracking-wide text-[10px] sm:text-xs uppercase mt-2 sm:mt-3 mb-1 sm:mb-2">
                      PHONE
                    </h3>
                    <a 
                      href="tel:+628886340076"
                      className="text-gray-300 hover:text-gray-100 text-[13px] sm:text-sm leading-relaxed transition-colors duration-200"
                    >
                      +62 888-6340-076
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form Section */}
          <div className="w-full lg:w-1/3 bg-gray-800 rounded-lg p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-gray-100 text-2xl font-pixel sm:text-xl font-bold mb-2">
                Kontak Kami
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Berikan Pesan Kepada kami Apabila kamu mempunyai saran atau ingin berkontribusi
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className='font-pixel'>Kirim</span>
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                🔒 Privasi mu Sangat Terjaga Karena sudah di enkripsi end to end.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;