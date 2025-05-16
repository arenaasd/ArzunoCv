'use client'
import React, { useState } from 'react';
import { CheckCircle, X, ArrowRight } from 'lucide-react';
import { useUser } from "@clerk/nextjs";
;


const Upgrade = () => {
  const [rotateCard1, setRotateCard1] = useState({ x: 0, y: 0 });
  const [rotateCard2, setRotateCard2] = useState({ x: 0, y: 0 });

  const { user, isLoaded } = useUser();

  const currentPlan = user?.publicMetadata?.plan || 'basic'


  const handleMouseMove = (e, cardNum) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    if (cardNum === 1) {
      setRotateCard1({ x: rotateX, y: rotateY });
    } else {
      setRotateCard2({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = (cardNum) => {
    if (cardNum === 1) {
      setRotateCard1({ x: 0, y: 0 });
    } else {
      setRotateCard2({ x: 0, y: 0 });
    }
  };

  return (
    <div className="min-h-screen  py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold  mb-4">Upgrade Your ArzunoCV Experience</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your professional needs and take your resume to the next level.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Current Free Plan */}
          <div
            className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform cursor-pointer"
            style={{
              transform: `perspective(1000px) rotateX(${rotateCard1.x}deg) rotateY(${rotateCard1.y}deg)`,
              transition: rotateCard1.x === 0 ? 'all 0.5s ease' : 'none'
            }}
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseLeave={() => handleMouseLeave(1)}
          >
            <div className="absolute inset-0  opacity-50"></div>
            <div className="absolute top-0 left-0 right-0 h-2 bg-blue-500"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Current Plan</h2>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Free</span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold ">$0</span>
                <span className=" ml-1">/month</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Access to basic resume templates</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Create and download up to 2 resumes</span>
                </div>
                <div className="flex items-start">
                  <X className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-red-500">No access to premium templates</span>
                </div>
                <div className="flex items-start">
                  <X className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-red-500">No custom sections</span>
                </div>
                <div className="flex items-start">
                  <X className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-red-500">Limited export options</span>
                </div>
              </div>
              <button  className="w-full py-3 rounded-lg font-medium flex items-center cursor-pointer justify-center transition-colors duration-200 shadow-md relative w-full text-center animated-upgrade-button flex items-center gap-2">
              Free Access
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div
            className="relative  rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform cursor-pointer"
            style={{
              transform: `perspective(1000px) rotateX(${rotateCard2.x}deg) rotateY(${rotateCard2.y}deg)`,
              transition: rotateCard2.x === 0 ? 'all 0.5s ease' : 'none'
            }}
            onMouseMove={(e) => handleMouseMove(e, 2)}
            onMouseLeave={() => handleMouseLeave(2)}
          >
            <div className="absolute inset-0  opacity-50"></div>
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rotate-12 transform"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Pro Plan</h2>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">Recommended</span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold ">$4.99</span>
                <span className=" ml-1">/month</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Access to <span className="font-medium">all</span> templates (basic + premium)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Create unlimited resumes</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Custom sections for unique resume needs</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Priority customer support</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Advanced export options (PDF, DOCX, TXT)</span>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-medium flex items-center cursor-pointer justify-center transition-colors duration-200 shadow-md ${currentPlan === 'pro'
                    ? 'relative animated-upgrade-button flex items-center gap-2'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  }`}
                disabled={currentPlan === 'pro'}
                onClick={() => {
                  if (currentPlan !== 'pro') {
                    handleUpgrade('pro');
                  }
                }}
              >
                {currentPlan === 'pro' ? 'Current Plan' : <>Upgrade Now <ArrowRight className="ml-2 h-4 w-4" /></>}
              </button>

            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold  mb-6">Why Upgrade to Pro?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className=" p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h4 className="text-lg font-medium  mb-2">Premium Templates</h4>
              <p className="text-gray-600">Access to professionally designed templates that help you stand out from the crowd.</p>
            </div>

            <div className=" p-6 rounded-xl shadow-md">
              <div className="bg-purple-200 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h4 className="text-lg font-medium  mb-2">Custom Sections</h4>
              <p className="text-gray-600">Create tailored sections that highlight your unique skills and experiences.</p>
            </div>

            <div className=" p-6 rounded-xl shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-medium  mb-2">Advanced Export</h4>
              <p className="text-gray-600">Export your resume in multiple formats for different application requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;