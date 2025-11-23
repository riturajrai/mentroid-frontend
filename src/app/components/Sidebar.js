"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import {
  BarChart2Icon,
  UsersIcon,
  MessageSquareIcon,
  BookOpenIcon,
  ZapIcon,
  FileTextIcon,
  CreditCardIcon,
  BrainIcon,
  TargetIcon,
  CalendarIcon,
  MicIcon,
  StarIcon,
  Menu,
  X,
} from "lucide-react";

// MENU ITEMS
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <BarChart2Icon className="w-5 h-5" /> },
  { id: "onboarding", label: "Onboarding", icon: <UsersIcon className="w-5 h-5" /> },
  { id: "ask", label: "Ask anything", icon: <MessageSquareIcon className="w-5 h-5" /> },
  { id: "explore", label: "Explore Subjects", icon: <BookOpenIcon className="w-5 h-5" /> },
  { id: "codingtech", label: "Coding & Technology", icon: <ZapIcon className="w-5 h-5" /> },
  { id: "writingcomm", label: "Writing & Communication", icon: <FileTextIcon className="w-5 h-5" /> },
  { id: "summarize", label: "Summarizer Note", icon: <FileTextIcon className="w-5 h-5" /> },
  { id: "flashcards", label: "Flashcards", icon: <CreditCardIcon className="w-5 h-5" /> },
  { id: "brain", label: "Brain Battle", icon: <BrainIcon className="w-5 h-5" /> },
  { id: "adaptive", label: "Adaptive Learning", icon: <TargetIcon className="w-5 h-5" /> },
  { id: "today", label: "Today's Learning", icon: <CalendarIcon className="w-5 h-5" /> },
  { id: "podcast", label: "Podcast", icon: <MicIcon className="w-5 h-5" /> },
  { id: "points", label: "Points", icon: <StarIcon className="w-5 h-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
  className={`
    fixed top-0 left-0 h-screen w-64 bg-white border-r p-5 
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"} 
    sm:translate-x-0
    sm:z-50 lg:z-auto
  `}
>
  <h2 className="text-xl font-semibold text-primary mb-6">Menu</h2>

  <nav className="flex flex-col gap-2 text-[12px] lg:text-[14px] lg:mt-20">
    {menuItems.map((item) => {
      const isActive = pathname.includes(item.id);

      return (
        <Link
          key={item.id}
          href={`/${item.id}`}
          className={`flex items-center gap-3 p-3 rounded-xl transition font-medium ${
            isActive
              ? "bg-primary text-white shadow-md"
              : "text-gray-700 hover:bg-primary-light/15 hover:text-primary"
          }`}
          onClick={() => setOpen(false)} // Close menu on mobile after click
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      );
    })}
  </nav>
</aside>


      {/* Overlay for mobile */}
      {open && (
        <div
          className="sm:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
