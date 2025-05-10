"use client";

import * as React from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

// FAQ items
const faqItems = [
  {
    question: "Is ArzunoCV really free?",
    answer:
      "Yes, ArzunoCV is completely free to use! You can create, edit, and download your resume without any hidden fees.",
  },
  {
    question: "What makes your resumes ATS-friendly?",
    answer:
      "Our templates are designed with clean layouts, standard fonts, and optimized formatting to ensure compatibility with Applicant Tracking Systems (ATS) used by employers.",
  },
  {
    question: "Do I need an account to use ArzunoCV?",
    answer:
      "yes account is required to get started, creating one allows you to save and manage multiple resumes for future use.",
  },
  {
    question: "Can I edit my resume after downloading?",
    answer:
      "Yes, you can return to ArzunoCV anytime to edit and download an updated version of your resume at no cost.",
  },
];

// FaqSection component
const FaqSection = React.forwardRef(({ className, ...props }, ref) => {
  // Controls for header
  const headerControls = useAnimation();
  const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  React.useEffect(() => {
    if (headerInView) {
      headerControls.start({ opacity: 1, y: 0 });
    } else {
      headerControls.start({ opacity: 0, y: 20 });
    }
  }, [headerInView, headerControls]);

  // Controls for FAQ items
  const faqControls = useAnimation();
  const [faqRef, faqInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  React.useEffect(() => {
    if (faqInView) {
      faqControls.start({ opacity: 1, y: 0 });
    } else {
      faqControls.start({ opacity: 0, y: 20 });
    }
  }, [faqInView, faqControls]);

  // Controls for contact section
  const contactControls = useAnimation();
  const [contactRef, contactInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  React.useEffect(() => {
    if (contactInView) {
      contactControls.start({ opacity: 1, y: 0 });
    } else {
      contactControls.start({ opacity: 0, y: 20 });
    }
  }, [contactInView, contactControls]);

  return (
    <section
      ref={ref}
      className={cn("py-16 w-full ", className)}
      {...props}
    >
      <div className="container w-full max-w-4xl px-4 mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          animate={headerControls}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-[#5A4192] via-[#da984e] to-[#eea34e] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about ArzunoCV.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          ref={faqRef}
          animate={faqControls}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto space-y-2"
        >
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          ref={contactRef}
          animate={contactControls}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto mt-12 p-6 rounded-lg text-center"
        >
          <div className="inline-flex items-center justify-center p-1.5 rounded-full mb-4">
            <Mail className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">
            Still have questions?
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Our team is here to help. Reach out to us anytime.
          </p>
          <Button
            size="sm"
            onClick={() => {
              window.location.href = "mailto:arunoteam@gmail.com";
            }}
            className="bg-gradient-to-b from-[#eea34e] to-[#5A4192] text-white"
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
});
FaqSection.displayName = "FaqSection";

// FAQ Item component
const FaqItem = React.forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { question, answer, index } = props;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={cn(
        "group rounded-lg",
        "transition-all duration-200 ease-in-out",
        "border border-[#5A4192]/50",
        isOpen
          ? "bg-gradient-to-br from-[#5A4192]/10 via-[#eea34e]/10 to-[#5A4192]/10"
          : "hover:bg-[#eea34e]/10"
      )}
    >
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 h-auto justify-between hover:bg-transparent"
      >
        <h3
          className={cn(
            "text-base font-medium transition-colors duration-200 text-left",
            "text-foreground/70",
            isOpen && "text-foreground"
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            "p-0.5 rounded-full flex-shrink-0",
            "transition-colors duration-200",
            isOpen ? "text-[#5A4192]" : "text-muted-foreground"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </Button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
          >
            <div className="px-6 pb-4 pt-2">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
FaqItem.displayName = "FaqItem";

export { FaqSection };
