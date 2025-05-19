'use client'
export default function SkeletonCard() {
  return (
    <div className="h-[320px] w-[210px] rounded-2xl animate-pulse bg-gradient-to-br from-[#2C497F]/30 to-[#222222]/30 border-t-4 border-t-[#2C497F]">
      <div className="flex justify-end p-2">
        <div className="w-6 h-6 bg-gray-500/30 rounded-full" />
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="w-[95px] h-[95px] bg-gray-500/20 rounded-md" />
      </div>
      <div className="h-[35px] w-full bg-gradient-to-r from-[#3A5CA0]/30 via-[#444444]/30 to-[#4B4C7A]/30 rounded-b-2xl" />
    </div>
  );
}
