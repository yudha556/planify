"use client";

import { motion, type Variants } from "framer-motion";
import { Card } from "@workspace/ui/components/card";
import { Check, FileText, GitMerge, ListTodo } from "lucide-react";

const MotionCard = motion(Card);

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Feature() {
  return (
    <section className="px-14 py-32 flex flex-col w-full gap-16 bg-gradient-to-b from-white to-blue-50/40">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col gap-4 max-w-2xl"
      >
        <h1 className="text-4xl font-bold">
          Professional Output Every Time
        </h1>
        <p className="text-lg text-gray-500">
          From quick brief to detailed technical specifications.
        </p>
      </motion.div>

      {/* CARDS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        <FloatingCard>
          <FloatingIcon>
            <FileText className="text-blue-600" />
          </FloatingIcon>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">Project Briefs</h2>
            <p className="text-sm text-gray-500">
              Define core problems, goals, scope, and stakeholders in a concise format.
            </p>
          </div>

          <Card className="bg-gray-100 p-4 flex flex-col gap-3">
            <h3 className="font-semibold text-lg">Brief Structure</h3>
            {["Project Overview", "Target Audience", "Key Metrics"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="text-green-500 size-4" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </Card>
        </FloatingCard>

        <FloatingCard>
          <FloatingIcon>
            <ListTodo className="text-blue-600" />
          </FloatingIcon>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">Feature Prioritization</h2>
            <p className="text-sm text-gray-500">
              Structured MoSCoW view focused on impact, not opinions.
            </p>
          </div>

          <Card className="bg-gray-100 p-4 flex flex-col gap-3">
            {[
              { name: "User Authentication", tag: "MUST" },
              { name: "Onboarding Checklist", tag: "SHOULD" },
              { name: "Dark Mode", tag: "COULD" },
            ].map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="font-semibold text-blue-600">{item.tag}</span>
              </div>
            ))}
          </Card>
        </FloatingCard>

        <FloatingCard>
          <FloatingIcon>
            <GitMerge className="text-blue-600" />
          </FloatingIcon>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">User Flows</h2>
            <p className="text-sm text-gray-500">
              High-level user journeys ready for design and engineering.
            </p>
          </div>

          <Card className="bg-gray-100 p-4 flex gap-3 items-center min-h-[100px]">
            {["Landing", "Dashboard", "Create PRD"].map((step) => (
              <motion.div
                key={step}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow rounded-md px-3 py-2 text-sm text-gray-600"
              >
                {step}
              </motion.div>
            ))}
          </Card>
        </FloatingCard>
      </motion.div>
    </section>
  );
}

function FloatingCard({ children }: { children: React.ReactNode }) {
  return (
    <MotionCard
      variants={cardVariants}
      animate={{ y: [0, -8, 0] }} 
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.04 }}
      className="p-6 flex flex-col gap-8 border bg-white/80 backdrop-blur-sm"
    >
      {children}
    </MotionCard>
  );
}

function FloatingIcon({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100"
    >
      {children}
    </motion.div>
  );
}