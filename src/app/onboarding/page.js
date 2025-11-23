"use client";

import { useState } from "react";
import { Check, Zap, Crown, Sparkles } from "lucide-react";

export default function OnboardScreen() {
  const [isYearly, setIsYearly] = useState(true); // Default yearly (better UX + more savings)

  const getPricing = (monthly) => {
    if (monthly === 0) return { price: "Free", period: "Forever" };
    const price = isYearly ? Math.round(monthly * 12 * 0.75) : monthly;
    return { price, period: isYearly ? "/year" : "/month" };
  };

  const plans = [
    {
      name: "Starter",
      icon: Sparkles,
      price: getPricing(0),
      desc: "Perfect to get started with AI mentorship",
      features: [
        "10 AI chat sessions/month",
        "Basic mentor templates",
        "Community access",
        "Email support",
      ],
      cta: "Get Started Free",
      highlighted: false,
    },
    {
      name: "Pro",
      icon: Zap,
      price: getPricing(29),
      desc: "For serious learners who want to grow fast",
      features: [
        "Unlimited AI sessions",
        "Advanced mentor personalities",
        "Goal tracking & analytics",
        "Priority email + chat support",
        "Export chat history",
        "Custom prompts library",
      ],
      cta: "Start 14-Day Free Trial",
      highlighted: true,
      popular: true,
    },
    {
      name: "Elite",
      icon: Crown,
      price: getPricing(79),
      desc: "Maximum growth with 1-on-1 AI coaching",
      features: [
        "Everything in Pro",
        "Personal AI coach AI (daily check-ins)",
        "Voice calls with AI mentor",
        "Career path planning",
        "Resume & interview prep",
        "Weekly progress reports",
        "Lifetime access guarantee",
      ],
      cta: "Join Elite",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Choose Your <span className="text-primary">Growth Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Unlock the full power of your personal AI mentor. Cancel anytime.
          </p>

          {/* Yearly/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg font-medium ${!isYearly ? "text-gray-900" : "text-gray-500"}`}>
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-9 bg-primary rounded-full shadow-lg transition-all"
            >
              <div
                className={`absolute top-1 w-7 h-7 bg-white rounded-full shadow-md transition-transform flex items-center justify-center ${
                  isYearly ? "translate-x-8" : "translate-x-1"
                }`}
              >
                {isYearly ? (
                  <span className="text-xs font-bold text-primary">25% OFF</span>
                ) : (
                  <div className="w-4 h-4 bg-primary rounded-full" />
                )}
              </div>
            </button>

            <span className={`text-lg font-medium ${isYearly ? "text-gray-900" : "text-gray-500"}`}>
              Yearly <span className="text-primary font-bold text-sm">(Save 25%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const { price, period } = plan.price;

            return (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 ${
                  plan.highlighted ? "border-primary ring-4 ring-primary/10 scale-105" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-8 min-h-[3rem]">{plan.desc}</p>

                  {/* Price */}
                  <div className="mb-8">
                    {typeof price === "string" ? (
                      <div className="text-5xl font-extrabold text-gray-900">{price}</div>
                    ) : (
                      <>
                        <span className="text-5xl font-extrabold text-gray-900">${price}</span>
                        <span className="text-xl text-gray-500">{period}</span>
                      </>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-10 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => alert(`Selected ${plan.name} Plan!`)}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
                      plan.highlighted
                        ? "bg-primary hover:bg-primary-dark text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <p className="text-gray-500">
            Trusted by 10,000+ learners • 4.9/5 stars • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}