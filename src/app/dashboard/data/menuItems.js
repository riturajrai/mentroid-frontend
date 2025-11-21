// ../dashboard/data/menuItems.js
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
} from "lucide-react";

export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <BarChart2Icon className="w-5 h-5" /> },
  { id: 'onboarding', label: 'Onboarding', icon: <UsersIcon className="w-5 h-5" /> },
  { id: 'ask', label: 'Ask anything', icon: <MessageSquareIcon className="w-5 h-5" /> },
  { id: 'explore', label: 'Explore Subjects', icon: <BookOpenIcon className="w-5 h-5" /> },
  { id: 'codingtech', label: 'Coding & Technology', icon: <ZapIcon className="w-5 h-5" /> },
  { id: 'writingcomm', label: 'Writing & Communication', icon: <FileTextIcon className="w-5 h-5" /> },
  { id: 'summarize', label: 'Summarizer Note', icon: <FileTextIcon className="w-5 h-5" /> },
  { id: 'flashcards', label: 'Flashcards', icon: <CreditCardIcon className="w-5 h-5" /> },
  { id: 'brain', label: 'Brain Battle', icon: <BrainIcon className="w-5 h-5" /> },
  { id: 'adaptive', label: 'Adaptive Learning', icon: <TargetIcon className="w-5 h-5" /> },
  { id: 'today', label: "Today's Learning", icon: <CalendarIcon className="w-5 h-5" /> },
  { id: 'podcast', label: 'Podcast', icon: <MicIcon className="w-5 h-5" /> },
  { id: 'points', label: 'Points', icon: <StarIcon className="w-5 h-5" /> },
];
