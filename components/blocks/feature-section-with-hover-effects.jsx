"use client";

import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconFileText,
  IconTerminal2,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Fast Resume Creation",
      description:
        "Create a professional resume in minutes — no experience needed.",
      icon: <IconFileText />,
    },
    {
      title: "Completely Free",
      description:
        "No hidden charges, no credit card. Arzuno Resume Builder is 100% free.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Super Easy to Use",
      description:
        "Our clean, intuitive builder makes resume creation effortless.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Always Available",
      description:
        "Your resumes are safe and accessible anytime with 100% uptime.",
      icon: <IconCloud />,
    },
    {
      title: "24/7 Support",
      description:
        "Our AI-powered support team is here to help — 26 hours a day, 7 days a week.",
      icon: <IconHelp />,
    },
    {
      title: "Customizable Layouts",
      description:
        "Easily adjust fonts, colors, and sections to match your unique style.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "One-Click Export",
      description:
        "Download your resume as a PDF instantly with a single click.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Loved by Users",
      description:
        "Thousands trust Arzuno to build resumes they are proud of.",
      icon: <IconHeart />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: false, amount: 0.3 }}
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#5A4192] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block font-semibold">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-700 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </motion.div>
  );
};
