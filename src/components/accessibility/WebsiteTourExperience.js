"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "nab-visnagar-first-visit-experience";

const copy = {
  en: {
    welcomeTitle: "Welcome to NAB Visnagar",
    welcomeMessage: "Choose a language, then take a short tour of the site.",
    english: "English",
    gujarati: "ગુજરાતી",
    startTour: "Start Website Tour",
    skip: "Skip",
    tourTitle: "Website Tour",
    stepLabel: "Step",
    next: "Next",
    previous: "Previous",
    finish: "Finish",
    steps: [
      {
        title: "Navigation",
        description: "Use the top menu to move between Home, About, Programs, Impact, Gallery, Support, and Contact.",
      },
      {
        title: "Language Switch",
        description: "Switch between English and ગુજરાતી from the header to view the site in your preferred language.",
      },
      {
        title: "Accessibility Button",
        description: "Open the floating Accessibility button to change text size, contrast, dark mode, or relaunch this tour.",
      },
      {
        title: "Programs",
        description: "Visit Programs to see the services and support offered by NAB Visnagar.",
      },
      {
        title: "Contact",
        description: "Use Contact to send a message or find the organization details.",
      },
    ],
  },
  gu: {
    welcomeTitle: "NAB Visnagar માં આપનું સ્વાગત છે",
    welcomeMessage: "ભાષા પસંદ કરો અને સાઇટનો ટૂંકો પરિચય લો.",
    english: "English",
    gujarati: "ગુજરાતી",
    startTour: "વેબસાઇટ પ્રવાસ શરૂ કરો",
    skip: "છોડી દો",
    tourTitle: "વેબસાઇટ પ્રવાસ",
    stepLabel: "પગલું",
    next: "આગળ",
    previous: "પાછળ",
    finish: "પૂર્ણ કરો",
    steps: [
      {
        title: "નેવિગેશન",
        description: "મુખપૃષ્ઠ, અમારા વિશે, કાર્યક્રમો, પ્રભાવ, ગેલેરી, સહાય અને સંપર્ક જોવા માટે ઉપરનું મેનુ વાપરો.",
      },
      {
        title: "ભાષા બદલાવ",
        description: "હેડરમાંથી English અને ગુજરાતી વચ્ચે બદલીને તમને અનુકૂળ ભાષામાં સાઇટ જુઓ.",
      },
      {
        title: "સુલભતા બટન",
        description: "તળિયાના Accessibility બટનથી લખાણનો કદ, કોન્ટ્રાસ્ટ, ડાર્ક મોડ અને આ પ્રવાસ ફરી શરૂ કરો.",
      },
      {
        title: "કાર્યક્રમો",
        description: "NAB Visnagar દ્વારા આપવામાં આવતી સેવાઓ અને સહાય જોવા માટે Programs પેજ ખોલો.",
      },
      {
        title: "સંપર્ક",
        description: "સંદેશ મોકલવા અથવા સંસ્થાની માહિતી જોવા Contact પેજ ઉપયોગ કરો.",
      },
    ],
  },
};

function ModalShell({ title, description, children, onClose }) {
  return (
    <div
      className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/20 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="website-tour-title"
      aria-describedby="website-tour-description"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="website-tour-title" className="text-xl font-bold tracking-tight text-slate-900">
            {title}
          </h2>
          <p id="website-tour-description" className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="mt-5">{children}</div>
    </div>
  );
}

export default function WebsiteTourExperience() {
  const { language, setLanguage } = useLanguage();
  const {
    isWebsiteTourOpen,
    openWebsiteTour,
    closeWebsiteTour,
  } = useAccessibility();
  const [isClientReady, setIsClientReady] = useState(false);
  const [hasCompletedFirstVisit, setHasCompletedFirstVisit] = useState(false);
  const [activeView, setActiveView] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const strings = copy[language] || copy.en;
  const steps = strings.steps;
  const isWelcomeVisible = activeView === "welcome" && !isWebsiteTourOpen;
  const isTourVisible = activeView === "tour" || isWebsiteTourOpen;
  const visibleView = isWebsiteTourOpen ? "tour" : activeView;

  useEffect(() => {
    let completed = false;

    try {
      completed = window.localStorage.getItem(STORAGE_KEY) === "completed";
    } catch {
      completed = false;
    }

    setHasCompletedFirstVisit(completed);
    setActiveView(completed ? null : "welcome");
    setIsClientReady(true);
  }, []);

  const handleDismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "completed");
    } catch {
      // Ignore storage errors and keep the dismissal in memory.
    }

    setHasCompletedFirstVisit(true);
    setActiveView(null);
    setCurrentStep(0);
    closeWebsiteTour();
  }, [closeWebsiteTour]);

  useEffect(() => {
    if (!visibleView) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visibleView, handleDismiss]);

  const handleStartTour = () => {
    setCurrentStep(0);
    setActiveView("tour");
    openWebsiteTour();
  };

  const handleNext = () => {
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const tourStep = useMemo(() => steps[currentStep], [currentStep, steps]);

  if (!isClientReady) {
    return null;
  }

  if (!isWelcomeVisible && !isTourVisible && !isWebsiteTourOpen && hasCompletedFirstVisit) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      {isWelcomeVisible ? (
        <ModalShell title={strings.welcomeTitle} description={strings.welcomeMessage} onClose={handleDismiss}>
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  language === "en"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                {strings.english}
              </button>
              <button
                type="button"
                onClick={() => setLanguage("gu")}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  language === "gu"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                {strings.gujarati}
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                onClick={handleStartTour}
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                {strings.startTour}
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
              >
                {strings.skip}
              </button>
            </div>
          </div>
        </ModalShell>
      ) : null}

      {isTourVisible ? (
        <ModalShell
          title={strings.tourTitle}
          description={`${strings.stepLabel} ${currentStep + 1} / ${steps.length}`}
          onClose={handleDismiss}
        >
          <div>
            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {tourStep.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
                {tourStep.description}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-500">
              <span>
                {strings.stepLabel} {currentStep + 1}
              </span>
              <span>{steps.length}</span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {strings.previous}
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  {strings.next}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  {strings.finish}
                </button>
              )}
              <button
                type="button"
                onClick={handleDismiss}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
              >
                {strings.skip}
              </button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </div>
  );
}
