"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from ".././context/AuthContext";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar/TopBar";
import DashboardScreen from "../components/DashboardScreen";
import OnboardScreen from "./(onboarding)/OnboardingScreen";
import BrainbattleScreen from "./(brainbattle)/BrainbattleScreen";
import QuizScreen from "./(brainbattle)/QuizScreen";
import ExploreSubject from "./(exploreSubject)/ExploreSubject";
import SubjectChatScreen from "./(exploreSubject)/SubjectChatScreen";
import PodcastScreen from "./(podcast)/PodcastScreen";
import PodcastDetailScreen from "./(podcast)/PodcastDetailScreen";
import SummarizerScreen from "./(summarizer)/SummarizerScreen";
import SummarizeScreen from "./(summarizer)/SummarizeScreen";
import CodingTechnology from "./(codingTechnology)/CodingTechnology";
import WritingCommunication from "./writingandcommunication/WritingCommunication";
import WritingResult from "./writingandcommunication/result/page";
import AskAnything from "./(askAnything)/AskAnything";
import PopUp from "../components/PopUp/PopUp";

function DashboardContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = React.useState("dashboard");
  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(true);

  useEffect(() => {
    const param = searchParams.get("active");
    if (param) setActive(param);
    const subject = searchParams.get("subject");
    if (subject) setSelectedSubject(subject);
  }, [searchParams]);

  const handleSetActive = (value) => {
    setActive(value);
    router.push(value === "dashboard" ? "/dashboard" : `/dashboard?active=${value}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-2xl font-medium text-gray-700">Loading your dashboard...</div>
      </div>
    );
  }

  if (!user) return null; // AuthProvider will redirect

  const renderScreen = () => {
    switch (active) {
      case "dashboard": return <DashboardScreen user={user} />;
      case "ask": return <AskAnything user={user} />;
      case "onboarding": return <OnboardScreen user={user} />;
      case "brain": return <BrainbattleScreen setActive={handleSetActive} />;
      case "quiz": return <QuizScreen setActive={handleSetActive} />;
      case "explore": return <ExploreSubject user={user} />;
      case "subjectChat": return <SubjectChatScreen subject={selectedSubject} user={user} setActive={handleSetActive} />;
      case "podcast": return <PodcastScreen setActive={handleSetActive} user={user} />;
      case "podcastDetail": return <PodcastDetailScreen setActive={handleSetActive} user={user} />;
      case "summarize": return <SummarizerScreen setActive={handleSetActive} />;
      case "summarizeView": return <SummarizeScreen setActive={handleSetActive} />;
      case "codingtech": return <CodingTechnology user={user} />;
      case "writingcomm": return <WritingCommunication onSubmit={(f, t) => { setActive("writingResult"); }} />;
      case "writingResult": return <WritingResult user={user} />;
      default: return <DashboardScreen user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-white text-black overflow-hidden">
      <Sidebar active={active} setActive={handleSetActive} user={user} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} active={active} />
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {renderScreen()}
        </div>
      </div>

      {showPopup && <PopUp onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}