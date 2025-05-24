import React from 'react';
import { User, Globe, MapPin, Phone, Mail, GraduationCap, Briefcase, Music, Book, Pen, Plane, Info, Award, MessageSquare, Heart } from 'lucide-react';

// Main App component for the resume template
function ModernResume() {
  return (
    // Overall container for the resume, centering it on the screen
    <div className="h-full font-['Inter']">
      {/* Main resume card container with shadow and rounded corners */}
      <div className="flex flex-col lg:flex-row w-full mx-auto max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">

        {/* Left Sidebar - Dark Blue Section */}
        <div className="w-full lg:w-1/3 bg-[#1A374D] text-white p-6 sm:p-8 flex flex-col items-center relative">
          {/* Profile Picture Placeholder */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white flex items-center justify-center text-gray-400 text-5xl sm:text-6xl mb-4">
            <User size={60} /> {/* User icon for profile picture */}
          </div>

          {/* Name and Tagline */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider">JOHN DOE</h1>
            <p className="text-sm text-gray-300 mt-0.5">Full stack developer</p>
          </div>

          {/* About Me Section */}
          <div className="w-full mb-6 sm:mb-8">
            <h2 className="text-sm font-semibold uppercase border-b border-gray-600 pb-2 mb-3 text-center flex items-center justify-center tracking-wider">
              <Info size={16} className="mr-2 text-[#9bd0ff]" /> ABOUT ME
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 text-center leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum,
              arcu non blandit, eget tincidunt elit. Mauris fermentum, arcu non blandit,
              eget tincidunt elit.
            </p>
          </div>

          {/* Contact Section */}
          <div className="w-full mb-6 sm:mb-8">
            <h2 className="text-sm font-semibold uppercase border-b border-gray-600 pb-2 mb-3 text-center flex items-center justify-center tracking-wider">
              <Phone size={16} className="mr-2 text-[#9bd0ff]" /> CONTACT
            </h2>
            <div className="flex flex-col items-start space-y-2 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center w-full">
                <MapPin size={12} className="mr-1.5 text-[#9bd0ff]" /> your address , street , location , abe , country .
              </div>
              <div className="flex items-center w-full">
                <Phone size={12} className="mr-1.5 text-[#9bd0ff]" /> phone + 00 0123 456 78
              </div>
              <div className="flex items-center w-full">
                <Mail size={12} className="mr-1.5 text-[#9bd0ff]" /> youremail@gmail.com
              </div>
            </div>
          </div>

          {/* Professional Skills Section */}
          <div className="w-full mb-6 sm:mb-8">
            <h2 className="text-sm font-semibold uppercase border-b border-gray-600 pb-2 mb-3 text-center flex items-center justify-center tracking-wider">
              <Award size={16} className="mr-2 text-[#9bd0ff]" /> PROFESSIONAL SKILLS
            </h2>
            <div className="space-y-3">
              {['skills 01', 'skills 02', 'skills 03', 'skills 04', 'skills 05'].map((skill, index) => (
                <div key={skill} className="flex flex-col items-start">
                  <span className="text-xs sm:text-sm mb-1 text-gray-200">{skill}</span>
                  <div className="w-full bg-gray-600 rounded-full h-1.5">
                    <div className={`bg-[#4A7C9B] h-1.5 rounded-full transition-all duration-500 ease-in-out`} style={{ width: `${90 - index * 10}%` }}></div> {/* Example varying widths */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Section */}
          <div className="w-full">
            <h2 className="text-sm font-semibold uppercase border-b border-gray-600 pb-2 mb-3 text-center flex items-center justify-center tracking-wider">
              <MessageSquare size={16} className="mr-2 text-[#9bd0ff]" /> LANGUAGE
            </h2>
            <div className="space-y-3">
              {['ENGLISH', 'SPANISH', 'CHINESE'].map((lang, index) => (
                <div key={lang} className="flex flex-col items-start">
                  <span className="text-xs sm:text-sm mb-1 text-gray-200">{lang}</span>
                  <div className="w-full bg-gray-600 rounded-full h-1.5">
                    <div className={`bg-[#4A7C9B] h-1.5 rounded-full transition-all duration-500 ease-in-out`} style={{ width: `${95 - index * 10}%` }}></div> {/* Example varying widths */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Content - White Section */}
        <div className="w-full lg:w-2/3 p-6 sm:p-8 bg-white overflow-y-auto">
          {/* Formal Education Section */}
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#1A374D] mb-6 sm:mb-8 flex items-center justify-start tracking-wider">
            <GraduationCap size={18} className="mr-2 text-[#1A374D]" /> <span className="align-middle">FORMAL EDUCATION</span>
          </h2>
          <div className="relative border-l-2 border-gray-300 pl-6 sm:pl-8">
            {/* Education Item 1 */}
            <div className="mb-6 relative">
              <div className="absolute -left-8 sm:-left-10 top-0 w-7 h-7 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <GraduationCap size={14} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-xs sm:text-sm mb-0.5">2004-2007</p>
              <h3 className="text-sm sm:text-base font-semibold text-[#1A374D] mb-0.5">DEGREE NAME</h3>
              <p className="text-xs text-gray-600 mb-1">UNIVERSITY NAME</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
            {/* Education Item 2 */}
            <div className="mb-6 relative">
              <div className="absolute -left-8 sm:-left-10 top-0 w-7 h-7 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <GraduationCap size={14} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-xs sm:text-sm mb-0.5">2008-2009</p>
              <h3 className="text-sm sm:text-base font-semibold text-[#1A374D] mb-0.5">DEGREE NAME</h3>
              <p className="text-xs text-gray-600 mb-1">UNIVERSITY NAME</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
            {/* Education Item 3 */}
            <div className="mb-6 relative">
              <div className="absolute -left-8 sm:-left-10 top-0 w-7 h-7 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <GraduationCap size={14} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-xs sm:text-sm mb-0.5">2010-2013</p>
              <h3 className="text-sm sm:text-base font-semibold text-[#1A374D] mb-0.5">DEGREE NAME</h3>
              <p className="text-xs text-gray-600 mb-1">UNIVERSITY NAME</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
          </div>

          {/* Professional Experience Section */}
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#1A374D] mb-6 sm:mb-8 mt-6">
            <Briefcase size={18} className="mr-2 text-[#1A374D]" /> <span className="align-middle">PROFESSIONAL EXPERIENCE</span>
          </h2>
          <div className="relative border-l-2 border-gray-300 pl-6 sm:pl-8">
            {/* Experience Item 1 */}
            <div className="mb-6 relative">
              <div className="absolute -left-8 sm:-left-10 top-0 w-7 h-7 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <Briefcase size={14} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-xs sm:text-sm mb-0.5">2013-2014</p>
              <h3 className="text-sm sm:text-base font-semibold text-[#1A374D] mb-0.5">JOB TITLES</h3>
              <p className="text-xs text-gray-600 mb-1">COMPANY NAME</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
            {/* Experience Item 2 */}
            <div className="mb-6 relative">
              <div className="absolute -left-8 sm:-left-10 top-0 w-7 h-7 rounded-full bg-[#1A374D] flex items-center justify-center border-2 border-white shadow-md shadow-[#1A374D]">
                <Briefcase size={14} className="text-white" />
              </div>
              <p className="font-bold text-gray-700 text-xs sm:text-sm mb-0.5">2015-2016</p>
              <h3 className="text-sm sm:text-base font-semibold text-[#1A374D] mb-0.5">JOB TITLES</h3>
              <p className="text-xs text-gray-600 mb-1">COMPANY NAME</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mauris fermentum, arcu non blandit, eget tincidunt elit. Mauris fermentum,
                arcu non blandit, eget tincidunt elit.
              </p>
            </div>
          </div>

          {/* Hobbies Section */}
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#1A374D] mb-6 sm:mb-8 mt-6 flex items-center justify-start tracking-wider">
            <Heart size={18} className="mr-2 text-[#1A374D]" /> <span className="align-middle">HOBBIES</span>
          </h2>
          <div className="flex flex-wrap justify-start items-center gap-4 sm:gap-6 text-gray-700 mt-2">
            <div className="flex flex-col items-center text-center">
              <Music size={24} className="mb-1.5 text-[#1A374D]" />
              <span className="text-xs font-medium">Music</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Book size={24} className="mb-1.5 text-[#1A374D]" />
              <span className="text-xs font-medium">Reading</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Pen size={24} className="mb-1.5 text-[#1A374D]" />
              <span className="text-xs font-medium">Writing</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Plane size={24} className="mb-1.5 text-[#1A374D]" />
              <span className="text-xs font-medium">Travel</span>
            </div>
            {/* Add more hobbies as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernResume;