'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Video } from "lucide-react";
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";
import { FaqSection } from "@/components/blocks/faq";
import { motion } from 'framer-motion'

function Home() {
  return (
    <>
      <div className="p-10 mt-44 text-center">
        <h1 className="bg-gradient-to-b text-6xl  from-[#5A4192] to-[#da984e] bg-clip-text text-transparent">
          ArzunoCV
        </h1>
        <p className=" mt-16 text-2xl">Build a professional ATS-friendly resume or CV quickly and effortlessly — no design skills required.</p>
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="flex flex-col items-center gap-4  mt-10">
          <Link href="/dashboard" className="w-full max-w-xs">
            <Button className="animated-upgrade-button w-full text-2xl py-6 flex items-center justify-center gap-3 bg-gradient-to-b from-[#eea34e] to-[#5A4192]">
              Get Started
              <ArrowRight style={{ width: "24px", height: "24px" }} />
            </Button>
          </Link>

          <Button className="w-full max-w-xs text-2xl py-6 flex items-center justify-center gap-3"><Video style={{ width: "24px", height: "24px" }} />Demo</Button>
        </motion.div>
      </div>
      <div className="mt-32">
        <div className="w-full">
          <FeaturesSectionWithHoverEffects />
        </div>
      </div>
      <div className="mt-16 p-10">
        <FaqSection />
      </div>
    </>
  );
}

export default Home