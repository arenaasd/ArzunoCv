'use client'
import { useEffect, useContext } from "react";
import Image from 'next/image';

export default function JeremyTorresResume() {
  return (
    <div className="shadow-lg h-full p-4 md:p-8 lg:p-14 font-arial">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-5 text-white" style={{ backgroundColor: '#2b2b2b' }}>
        <div className="w-full flex items-center mb-5">
          <Image
            src="https://via.placeholder.com/100"
            alt="Dummy Profile Picture"
            width={100}
            height={100}
            className="rounded-full mr-5"
          />
          <div className="flex-grow">
            <h1 className="m-0 text-2xl text-green-500">DIGITAL MARKETING</h1>
            <h1 className="m-0 text-2xl text-green-500">JEREMY TORRES</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-green-500 text-black py-1 px-3 rounded-full text-sm">0123456789</span>
              <span className="bg-green-500 text-black py-1 px-3 rounded-full text-sm">jeremy@abc.com</span>
              <span className="bg-green-500 text-black py-1 px-3 rounded-full text-sm">London, England</span>
            </div>
            <p className="mt-2 text-sm">
              SUMMARY: A progressive & persistent person who wants to bring your company a permanent source of customers. Besides, with good communication skills and large network, I strongly believe that I can achieve every goal of sales.
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className="text-green-500 text-lg border-b-2 border-green-500 mb-3">WORK EXPERIENCE</div>
          <div className="mb-5">
            <h3 className="m-0 text-base">TOPCV COMPANY • Sale Assistant</h3>
            <p className="m-1 text-sm text-green-500">03/2018 - 08/2022 | London</p>
            <ul className="m-1 pl-5 text-sm">
              <li>Support writing product advertising articles via facebook channel, forums, …</li>
              <li>Introduce, advice products, answer questions of customers by phone and email</li>
            </ul>
          </div>
          <div className="mb-5">
            <h3 className="m-0 text-base">TOPCV COMPANY • Sale Assistant</h3>
            <p className="m-1 text-sm text-green-500">03/2018 - 08/2022 | London</p>
            <ul className="m-1 pl-5 text-sm">
              <li>Contact then understanding customer needs & wants</li>
              <li>Drafting contracts and quotations</li>
              <li>Cooperate with superiors to negotiate contracts about terms & conditions</li>
              <li>Work with other staff on the warehouse problems</li>
            </ul>
          </div>
          <div className="mb-5">
            <h3 className="m-0 text-base">TOPCV COMPANY • Sale Assistant</h3>
            <p className="m-1 text-sm text-green-500">03/2018 - 08/2022 | London</p>
            <ul className="m-1 pl-5 text-sm">
              <li>Selling directly at the store to foreigners and Vietnamese</li>
              <li>Promote products through media publications: banner, poster, flyer …</li>
              <li>Report the daily sales volume</li>
            </ul>
          </div>
          <div className="mb-5">
            <h3 className="m-0 text-base">TOPCV COMPANY • Sale Assistant</h3>
            <p className="m-1 text-sm text-green-500">03/2018 - 08/2022 | London</p>
            <ul className="m-1 pl-5 text-sm">
              <li>Support writing product advertising articles via facebook channel, forums, …</li>
              <li>Introduce, advice products, answer questions of customers by phone and email</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className="text-green-500 text-lg border-b-2 border-green-500 mb-3">EDUCATION</div>
          <div className="mb-5">
            <h3 className="m-0 text-base">TOPCV UNIVERSITY</h3>
            <p className="m-1 text-sm text-green-500">03/2018 - 08/2022</p>
            <p className="m-1 text-sm text-gray-400">Major: Business Administration</p>
            <p className="m-1 text-sm text-gray-400">Good - GPA 8.0</p>
          </div>

          <div className="text-green-500 text-lg border-b-2 border-green-500 mb-3">SKILLS</div>
          <div className="mb-5">
            <p className="m-1 text-sm">Advanced skill: Planning, Presentation</p>
            <p className="m-1 text-sm">Tools: Microsoft Office, Photoshop</p>
          </div>

          <div className="text-green-500 text-lg border-b-2 border-green-500 mb-3">HOBBIES AND HABITS</div>
          <div className="mb-5">
            <p className="m-1 text-sm">Habit: Morning reading</p>
            <p className="m-1 text-sm">Hobbies: Badminton, Traveling</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .font-arial {
          font-family: Arial, sans-serif;
        }
        body {
          background-color: #2b2b2b;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}