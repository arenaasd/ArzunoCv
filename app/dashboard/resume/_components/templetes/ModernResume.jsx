import React from 'react';
import { User, Globe, MapPin, Phone, Mail, GraduationCap, Briefcase, Music, Book, Pen, Plane, Info, Award, MessageSquare, Heart } from 'lucide-react';

// Main App component for the resume template
function App() {
  return (
    // Overall container for the resume, centering it on the screen
    <div className="shadow-lg h-full p-6 sm:p-12 font-['Inter'] box-border">
      {/* Main resume card container with shadow and rounded corners */}
      <div className="flex flex-col lg:flex-row w-full mx-auto max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">

        {/* Left Sidebar - Dark Blue Section */}
        <div className="w-full lg:w-1/3 bg-[#1A374D] text-white p-8 sm:p-10 flex flex-col items-center relative">
          {/* Profile Picture Placeholder */}
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white flex items-center justify-center text-gray-400 text-6xl sm:text-7xl mb-6">
            <User size={80} /> {/* User icon for profile picture */}
          </div>

          {/* Name and Tagline */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider">JOHN DOE</h1>
            <p className="text-base text-gray-300 mt-1">lorem ipsum</p>
          </div>

          {/* About Me Section */}
          <div className="w-full mb-8 sm:mb-10">
            <h2 className="text-lg font-semibold uppercase border-b border-gray-600 pb-3 mb-5 text-center flex items-center justify-center tracking-wider">
              <Info size={20} className="mr-2.5 text-[#9bd0ff]" /> ABOUT ME
            </h2>
            <p className="text-sm sm:text-base text-gray-300 text-center leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum,
              arcu non blandit, eget tincidunt elit. Mauris fermentum, arcu non blandit,
              eget tincidunt elit.
            </p>
          </div>

          {/* Contact Section */}
          <div className="w-full mb-8 sm:mb-10">
            <h2 className="text-lg font-semibold uppercase border-b border-gray-600 pb-3 mb-5 text-center flex items-center justify-center tracking-wider">
              <Phone size={20} className="mr-2.5 text-[#9bd0ff]" /> CONTACT
            </h2>
            <div className="flex flex-col items-start space-y-3 text-sm sm:text-base text-gray-300">
              <div className="flex items-center w-full">
                <Globe size={16} className="mr-2.5 text-[#9bd0ff]" /> www.yourwebsite.com
              </div>
              <div className="flex items-center w-full">
                <MapPin size={16} className="mr-2.5 text-[#9bd0ff]" /> your address , street , location , abe , country .
              </div>
              <div className="flex items-center w-full">
                <Phone size={16} className="mr-2.5 text-[#9bd0ff]" /> phone + 00 0123 456 78
              </div>
              <div className="flex items-center w-full">
                <Phone size={16} className="mr-2.5 text-[#9bd0ff]" /> phone + 00 0123 456 78
              </div>
              <div className="flex items-center w-full">
                <Mail size={16} className="mr-2.5 text-[#9bd0ff]" /> youremail@gmail.com
              </div>
              <div className="flex items-center w-full">
                <Mail size={16} className="mr-2.5 text-[#9bd0ff]" /> youremail@gmail.com
              </div>
            </div>
          </div>

          {/* Professional Skills Section */}
          <div className="w-full mb-8 sm:mb-10">
            <h2 className="text-lg font-semibold uppercase border-b border-gray-600 pb-3 mb-5 text-center flex items-center justify-center tracking-wider">
              <Award size={20} className="mr-2.5 text-[#9bd0ff]" /> PROFESSIONAL SKILLS
            </h2>
            <div className="space-y-4">
              {['skills 01', 'skills 02', 'skills 03', 'skills 04', 'skills 05'].map((skill, index) => (
                <div key={skill} className="flex flex-col items-start">
                  <span className="text-sm sm:text-base mb-1.5 text-gray-200">{skill}</span>
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div className={`bg-[#4A7C9B] h-2.5 rounded-full transition-all duration-500 ease-in-out`} style={{ width: `${90 - index * 10}%` }}></div> {/* Example varying widths */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Section */}
          <div className="w-full">
            <h2 className="text-lg font-semibold uppercase border-b border-gray-600 pb-3 mb-5 text-center flex items-center justify-center tracking-wider">
              <MessageSquare size={20} className="mr-2.5 text-[#9bd0ff]" /> LANGUAGE
            </h2>
            <div className="space-y-4">
              {['ENGLISH', 'SPANISH', 'CHINESE', 'FRENCH', 'DUTCH'].map((lang, index) => (
                <div key={lang} className="flex flex-col items-start">
                  <span className="text-sm sm:text-base mb-1.5 text-gray-200">{lang}</span>
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div className={`bg-[#4A7C9B] h-2.5 rounded-full transition-all duration-500 ease-in-out`} style={{ width: `${95 - index * 10}%` }}></div> {/* Example varying widths */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Content - White Section */}
        <div className="w-full lg:w-2/3 p-8 sm:p-10 bg-white">
          {/* Formal Education Section */}
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A374D] mb-8 sm:mb-10 flex items-center justify-start tracking-wider">
            <GraduationCap size={24} className="mr-3 text-[#1A374D]" /> FORMAL EDUCATION
          </h2>
          <div className="relative border-l-2 border-gray-300 pl-8 sm:pl-10">
            {/* Education Item 1 */}
            <div className="mb-10 relative">
              <div className="absolute -left-10 sm:-left-12 top-0 w-9 h-9 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <GraduationCap size={18} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-base sm:text-lg mb-1">2004-2007</p>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A374D] mb-1">DEGREE NAME</h3>
              <p className="text-base text-gray-600 mb-2">UNIVERSITY NAME</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
            {/* Education Item 2 */}
            <div className="mb-10 relative">
              <div className="absolute -left-10 sm:-left-12 top-0 w-9 h-9 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <GraduationCap size={18} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-base sm:text-lg mb-1">2008-2009</p>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A374D] mb-1">DEGREE NAME</h3>
              <p className="text-base text-gray-600 mb-2">UNIVERSITY NAME</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
            {/* Education Item 3 */}
            <div className="mb-10 relative">
              <div className="absolute -left-10 sm:-left-12 top-0 w-9 h-9 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <GraduationCap size={18} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-base sm:text-lg mb-1">2010-2013</p>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A374D] mb-1">DEGREE NAME</h3>
              <p className="text-base text-gray-600 mb-2">UNIVERSITY NAME</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
          </div>

          {/* Professional Experience Section */}
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A374D] mb-8 sm:mb-10 mt-8">
            <Briefcase size={24} className="mr-3 text-[#1A374D]" /> PROFESSIONAL EXPERIENCE
          </h2>
          <div className="relative border-l-2 border-gray-300 pl-8 sm:pl-10">
            {/* Experience Item 1 */}
            <div className="mb-10 relative">
              <div className="absolute -left-10 sm:-left-12 top-0 w-9 h-9 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <Briefcase size={18} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-base sm:text-lg mb-1">2013-2014</p>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A374D] mb-1">JOB TITLES</h3>
              <p className="text-base text-gray-600 mb-2">COMPANY NAME</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
            {/* Experience Item 2 */}
            <div className="mb-10 relative">
              <div className="absolute -left-10 sm:-left-12 top-0 w-9 h-9 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <Briefcase size={18} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-base sm:text-lg mb-1">2015-2016</p>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A374D] mb-1">JOB TITLES</h3>
              <p className="text-base text-gray-600 mb-2">COMPANY NAME</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
          </div>

          {/* Hobbies Section */}
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A374D] mb-8 sm:mb-10 mt-8 flex items-center justify-start tracking-wider">
            <Heart size={24} className="mr-3 text-[#1A374D]" /> HOBBIES
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-gray-700 mt-4">
            <div className="flex flex-col items-center text-center">
              <Music size={32} className="mb-2.5 text-[#1A374D]" />
              <span className="text-base font-medium">Music</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Book size={32} className="mb-2.5 text-[#1A374D]" />
              <span className="text-base font-medium">Reading</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Pen size={32} className="mb-2.5 text-[#1A374D]" />
              <span className="text-base font-medium">Writing</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Plane size={32} className="mb-2.5 text-[#1A374D]" />
              <span className="text-base font-medium">Travel</span>
            </div>
            {/* Add more hobbies as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
