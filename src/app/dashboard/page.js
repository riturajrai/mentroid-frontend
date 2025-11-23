// app/dashboard/page.jsx  (ya jahan bhi dashboard hai)
"use client"
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
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState("dashboard");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const param = searchParams.get("active");
    if (param) setActive(param);
    const subject = searchParams.get("subject");
    if (subject) setSelectedSubject(subject);
  }, [searchParams]);

  const handleSetActive = (value) => {
    setActive(value);
    window.history.pushState({}, "", value === "dashboard" ? "/dashboard" : `/dashboard?active=${value}`);
  };

  const renderScreen = () => {
    switch (active) {
      case "dashboard": return <DashboardScreen />;
      case "ask": return <AskAnything />;
      case "onboarding": return <OnboardScreen />;
      case "brain": return <BrainbattleScreen setActive={handleSetActive} />;
      case "quiz": return <QuizScreen setActive={handleSetActive} />;
      case "explore": return <ExploreSubject />;
      case "subjectChat": return <SubjectChatScreen subject={selectedSubject} setActive={handleSetActive} />;
      case "podcast": return <PodcastScreen setActive={handleSetActive} />;
      case "podcastDetail": return <PodcastDetailScreen setActive={handleSetActive} />;
      case "summarize": return <SummarizerScreen setActive={handleSetActive} />;
      case "summarizeView": return <SummarizeScreen setActive={handleSetActive} />;
      case "codingtech": return <CodingTechnology />;
      case "writingcomm": return <WritingCommunication onSubmit={() => setActive("writingResult")} />;
      case "writingResult": return <WritingResult />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <div className="flex h-screen bg-white text-black overflow-hidden">
      <Sidebar active={active} setActive={handleSetActive} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar active={active} />
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {renderScreen()}
        </div>
      </div>

      {showPopup && <PopUp onClose={() => setShowPopup(false)} />}
    </div>
  );
}
