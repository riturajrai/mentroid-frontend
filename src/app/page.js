
"use client";

import React from "react";

import HeroSection from "./components/Home/HeroSection";
import FeaturesSection from "./components/Home/FeaturesSection";
import LearningUnderstandsYou from "./components/Home/LearningUnderstandsYou";
import StakeholdersSection from "./components/Home/StakeholdersSection";
import WhyMentoroidWorks from "./components/Home/WhyMentoroidWorks";
import CoreFeatures from "./components/Home/CoreFeatures";
import WhoItsFor from "./components/Home/WhoItsFor";
import HowItWorks from "./components/Home/HowItWorks";
import MentoroidMovement from "./components/Home/MentoroidMovement";
import CommunitySlider from "./components/Home/CommunitySlider";
import JoinAIRevolution from "./components/Home/JoinAIRevolution";
import ContactSection from "./components/Home/ContactSection";

export default function Home() {

  return (
    <div className="bg-zinc-50 dark:bg-black font-sans relative">
      <HeroSection />
      <FeaturesSection />
      <LearningUnderstandsYou />
      <StakeholdersSection />
      <WhyMentoroidWorks />
      <CoreFeatures />
      <WhoItsFor />
      <HowItWorks />
      <MentoroidMovement />
      <CommunitySlider />
      <JoinAIRevolution />
      <ContactSection />
    </div>
  );
}