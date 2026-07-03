"use client";

import { useLanguage } from "@/context/LanguageContext";
import { historyContent } from "@/data/historyContent";
import { missionVision } from "@/data/missionVision";
import { campusFacilities } from "@/data/campusFacilities";
import ResponsiveImage from "@/components/common/ResponsiveImage";

const pageContent = {
  en: {
    about: {
      eyebrow: "About NAB Visnagar",
      title: "A trusted institution for education and rehabilitation",
      intro: historyContent.en.history.intro,
    },
    story: {
      eyebrow: "Our Story",
      title: historyContent.en.history.heading,
      intro: historyContent.en.history.paragraphs[0],
      details: historyContent.en.history.paragraphs.slice(1),
      journeyItems: historyContent.en.journey.items,
    },
    missionVision: {
      eyebrow: missionVision.en.heading,
      title: missionVision.en.heading,
      intro: "A concise summary of purpose, direction, and values.",
      mission: {
        label: missionVision.en.missionLabel,
        text: missionVision.en.mission,
        icon: "shield",
      },
      vision: {
        label: missionVision.en.visionLabel,
        text: missionVision.en.vision,
        icon: "compass",
      },
      values: missionVision.en.values.map((item, index) => ({
        ...item,
        icon: ["users", "shield", "compass", "book", "spark", "heart"][index],
      })),
    },
    founders: {
      eyebrow: "Meet the Founders",
      title: "The people who shaped NAB Visnagar",
      intro: "A brief note on the founder and the steady support behind the institution.",
      items: [
        {
          name: "Prof. Ramnikbhai Halari",
          role: "Founder of NAB Visnagar",
          image: {
            src: "/images/people/ramnik_halari_saheb.jpg",
            alt: "Prof. Ramnikbhai Halari",
          },
          description:
            "He established NAB Visnagar with a clear vision of education, rehabilitation, self-reliance, and dignity for visually impaired people.",
        },
        {
          name: "Mrs. Hasumatiben Halari",
          role: "Hon. Secretary",
          image: {
            src: "/images/people/hasumati_halari.jpg",
            alt: "Mrs. Hasumatiben Halari",
          },
          description:
            "She provided steady support to the institution and helped strengthen its service to beneficiaries over the years.",
        },
      ],
    },
    president: {
      heading: "President",
      name: "Dr. Mihirbhai Joshi",
      intro:
        "Dr. Mihirbhai Joshi currently serves as the President of NAB Visnagar. He supports the organization's mission of education, rehabilitation, and empowerment of visually impaired individuals through focused institutional leadership.",
    },
    whatWeDo: {
      eyebrow: "What We Do & Why NAB Visnagar",
      title: "What We Do & Why NAB Visnagar",
      intro: "Education, rehabilitation, and practical support remain at the heart of the institution's work.",
      items: [
        {
          title: "Inclusive Education",
          description: "Accessible learning support and academic guidance for students of different ages.",
          icon: "book",
        },
        {
          title: "Braille Library",
          description: "Braille reading resources that support learning and independent study.",
          icon: "book-open",
        },
        {
          title: "Rehabilitation",
          description: "Structured rehabilitation support that helps beneficiaries build steady progress.",
          icon: "heart",
        },
        {
          title: "Residential Support",
          description: "Hostel facilities and a daily environment that support focused learning.",
          icon: "home",
        },
        {
          title: "Orientation & Mobility",
          description: "Practical guidance that strengthens travel skills and confidence.",
          icon: "compass",
        },
        {
          title: "Computer Education",
          description: "Digital literacy and computer training that open everyday opportunities.",
          icon: "computer",
        },
        {
          title: "Music Education",
          description: "Opportunities for expression, confidence, and skill-building through music.",
          icon: "music",
        },
        {
          title: "Vocational Skills",
          description: "Practical training that supports self-reliance and livelihood development.",
          icon: "wrench",
        },
        {
          title: "Self Employment",
          description: "Counselling and guidance that help beneficiaries understand opportunities.",
          icon: "briefcase",
        },
        {
          title: "Community Inclusion",
          description: "Awareness and outreach that keep families and the wider community connected.",
          icon: "users",
        },
      ],
      closing:
        "NAB Visnagar remains committed to dignity, independence, inclusion, and equal opportunities for every beneficiary it serves.",
    },
  },
  gu: {
    about: {
      eyebrow: "NAB વિસનગર વિશે",
      title: "શિક્ષણ અને પુનર્વસન માટેની વિશ્વસનીય સંસ્થા",
      intro: historyContent.gu.history.intro,
    },
    story: {
      eyebrow: "અમારી કહાણી",
      title: historyContent.gu.history.heading,
      intro: historyContent.gu.history.paragraphs[0],
      details: historyContent.gu.history.paragraphs.slice(1),
      journeyItems: historyContent.gu.journey.items,
    },
    missionVision: {
      eyebrow: missionVision.gu.heading,
      title: missionVision.gu.heading,
      intro: "હેતુ, દિશા અને મૂલ્યોનો સંક્ષિપ્ત સાર.",
      mission: {
        label: missionVision.gu.missionLabel,
        text: missionVision.gu.mission,
        icon: "shield",
      },
      vision: {
        label: missionVision.gu.visionLabel,
        text: missionVision.gu.vision,
        icon: "compass",
      },
      values: missionVision.gu.values.map((item, index) => ({
        ...item,
        icon: ["users", "shield", "compass", "book", "spark", "heart"][index],
      })),
    },
    founders: {
      eyebrow: "સ્થાપકોને મળો",
      title: "NAB વિસનગરને આકાર આપનારા લોકો",
      intro: "સ્થાપક અને તેમની સ્થિર સહાય અંગેનો સંક્ષિપ્ત ઉલ્લેખ.",
      items: [
        {
          name: "પ્રો. રમણિકભાઈ હલારી",
          role: "NAB વિસનગરના સ્થાપક",
          image: {
            src: "/images/people/ramnik_halari_saheb.jpg",
            alt: "પ્રો. રમણિકભાઈ હલારી",
          },
          description:
            "તેમણે દૃષ્ટિબાધિત વ્યક્તિઓ માટે શિક્ષણ, પુનર્વસન, આત્મનિર્ભરતા અને ગૌરવ પર આધારિત NAB વિસનગરની સ્થાપના કરી.",
        },
        {
          name: "Mrs. Hasumatiben Halari",
          role: "માન. સચિવ",
          image: {
            src: "/images/people/hasumati_halari.jpg",
            alt: "Mrs. Hasumatiben Halari",
          },
          description:
            "તેમણે સંસ્થાને સતત સહારો આપ્યો અને લાભાર્થીઓ માટે તેના કાર્યને મજબૂત બનાવવામાં મદદ કરી.",
        },
      ],
    },
    president: {
      heading: "પ્રમુખ",
      name: "Dr. Mihirbhai Joshi",
      intro:
        "ડૉ. મિહિરભાઈ જોષી હાલમાં NAB વિસનગરના પ્રમુખ તરીકે સેવા આપે છે. તેઓ દ્રષ્ટિબાધિત વ્યક્તિઓના શિક્ષણ, પુનર્વસન અને સશક્તિકરણના સંસ્થાના ધ્યેયને સક્રિય રીતે સમર્થન આપે છે.",
    },
    whatWeDo: {
      eyebrow: "અમે શું કરીએ છીએ અને NAB વિસનગર કેમ",
      title: "અમે શું કરીએ છીએ અને NAB વિસનગર કેમ",
      intro: "શિક્ષણ, પુનર્વસન અને વ્યવહારુ સહાય સંસ્થાના કાર્યનો આધાર છે.",
      items: [
        {
          title: "સમાવેશી શિક્ષણ",
          description: "સુલભ અભ્યાસ સહાય અને વિવિધ વયના વિદ્યાર્થીઓ માટે માર્ગદર્શન.",
          icon: "book",
        },
        {
          title: "બ્રેઈલ લાઇબ્રેરી",
          description: "બ્રેઈલ વાંચન સંસાધનો જે અભ્યાસ અને સ્વતંત્ર અધ્યયનને સમર્થન આપે છે.",
          icon: "book-open",
        },
        {
          title: "પુનર્વસન",
          description: "ગોઠવેલ પુનર્વસન સહાય જે લાભાર્થીઓને સ્થિર પ્રગતિમાં મદદ કરે છે.",
          icon: "heart",
        },
        {
          title: "રહેઠાણ સહાય",
          description: "હોસ્ટેલ સુવિધાઓ અને દૈનિક પર્યાવરણ જે અભ્યાસને આધાર આપે છે.",
          icon: "home",
        },
        {
          title: "અભિમુખતા અને ગતિશીલતા",
          description: "ગતિશીલતા કૌશલ્ય અને આત્મવિશ્વાસ વધારતી વ્યવહારુ માર્ગદર્શિકા.",
          icon: "compass",
        },
        {
          title: "કમ્પ્યુટર શિક્ષણ",
          description: "ડિજિટલ સાક્ષરતા અને કમ્પ્યુટર તાલીમ જે રોજિંદી તકો ખોલે છે.",
          icon: "computer",
        },
        {
          title: "સંગીત શિક્ષણ",
          description: "અભિવ્યક્તિ, આત્મવિશ્વાસ અને કૌશલ્ય વિકાસ માટેની તકો.",
          icon: "music",
        },
        {
          title: "વ્યાવસાયિક કૌશલ્ય",
          description: "પ્રાયોગિક તાલીમ જે આત્મનિર્ભરતા અને રોજગારી વિકાસને આધાર આપે છે.",
          icon: "wrench",
        },
        {
          title: "આત્મરોજગાર",
          description: "પરામર્શ અને માર્ગદર્શન જે તકો સમજવામાં મદદ કરે છે.",
          icon: "briefcase",
        },
        {
          title: "સમુદાયિક સમાવેશ",
          description: "જાગૃતિ અને પહોંચ જે પરિવાર અને સમુદાયને જોડેલા રાખે છે.",
          icon: "users",
        },
      ],
      closing:
        "NAB વિસનગર ગૌરવ, સ્વતંત્રતા, સમાવેશ અને સમાન તક પ્રત્યે પોતાની પ્રતિબદ્ધતા સાથે સેવા આપતું રહે છે.",
    },
  },
};

function SectionHeading({ eyebrow, title, intro, align = "center" }) {
  const alignmentClassName = align === "left" ? "text-left" : "text-center";
  return (
    <div className={`mx-auto max-w-4xl ${alignmentClassName}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {intro ? <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">{intro}</p> : null}
    </div>
  );
}

function TextCard({ title, description }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-7">
      <h3 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
    </article>
  );
}

function OutlineIcon({ name, className = "h-5 w-5" }) {
  const sharedProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    className,
  };

  switch (name) {
    case "shield":
      return (
        <svg {...sharedProps}>
          <path d="M12 3 19 6v6c0 4.5-3 7.9-7 9-4-1.1-7-4.5-7-9V6l7-3Z" />
          <path d="m9.5 12 1.8 1.8L14.8 10" />
        </svg>
      );
    case "compass":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m14.8 9.2-1.1 4.1-4.1 1.1 1.1-4.1 4.1-1.1Z" />
        </svg>
      );
    case "book":
      return (
        <svg {...sharedProps}>
          <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5V5.5Z" />
          <path d="M7.5 3v17" />
        </svg>
      );
    case "book-open":
      return (
        <svg {...sharedProps}>
          <path d="M12 6.5v13" />
          <path d="M12 6.5C10 5 7.5 4.5 5 5v13c2.5-.5 5 .1 7 1.5" />
          <path d="M12 6.5C14 5 16.5 4.5 19 5v13c-2.5-.5-5 .1-7 1.5" />
        </svg>
      );
    case "heart":
      return (
        <svg {...sharedProps}>
          <path d="M20 8.5c0-2.2-1.8-4-4-4-1.6 0-3 .9-4 2.2C11 5.4 9.6 4.5 8 4.5c-2.2 0-4 1.8-4 4 0 5.1 8 10 8 10s8-4.9 8-10Z" />
        </svg>
      );
    case "home":
      return (
        <svg {...sharedProps}>
          <path d="m4 11 8-7 8 7" />
          <path d="M6 10.5V20h12v-9.5" />
        </svg>
      );
    case "computer":
      return (
        <svg {...sharedProps}>
          <rect x="4.5" y="5" width="15" height="10" rx="1.8" />
          <path d="M9 19h6" />
          <path d="M10.5 15v4" />
        </svg>
      );
    case "music":
      return (
        <svg {...sharedProps}>
          <path d="M14 5v9.2" />
          <path d="M14 5c1.5 1 3.5 1.4 5 1.5v7.7" />
          <circle cx="10" cy="16.5" r="2.5" />
          <path d="M10 14V5.8l4-.8" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...sharedProps}>
          <path d="M14.5 7.5a3.5 3.5 0 0 0-4.7 4.7L5 17v2h2l4.8-4.8a3.5 3.5 0 0 0 4.7-4.7l-2 2-2.7-.2-.3-2.7 2-2Z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...sharedProps}>
          <rect x="4.5" y="7" width="15" height="11" rx="2" />
          <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
          <path d="M4.5 12h15" />
        </svg>
      );
    case "users":
      return (
        <svg {...sharedProps}>
          <path d="M9 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" />
          <path d="M15.5 11.5a2.5 2.5 0 1 0-2.5-2.5 2.5 2.5 0 0 0 2.5 2.5Z" />
          <path d="M4.5 20a4.5 4.5 0 0 1 9 0" />
          <path d="M13.2 20a4 4 0 0 1 6.3-2.6" />
        </svg>
      );
    case "spark":
      return (
        <svg {...sharedProps}>
          <path d="M12 4.5 13.8 9l4.5 1.8-4.5 1.7-1.8 4.5-1.7-4.5-4.5-1.7L10.3 9 12 4.5Z" />
        </svg>
      );
    default:
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      );
  }
}

function ValueBlock({ title, description, icon }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600">
        <OutlineIcon name={icon} className="h-4 w-4" />
      </span>
      <div>
        <h3 className="text-sm font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function CompactItem({ title, description, icon }) {
  return (
    <article className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600">
        <OutlineIcon name={icon} className="h-4.5 w-4.5" />
      </span>
      <div>
        <h3 className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </article>
  );
}

export default function AboutPage() {
  const { language } = useLanguage();
  const content = pageContent[language];

  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            {content.about.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {content.about.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {content.about.intro}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={content.story.eyebrow} title={content.story.title} intro={content.story.intro} />
          <div className="mx-auto mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:col-span-1">
              {content.story.details.map((paragraph) => (
                <p key={paragraph} className="mt-0 text-base leading-7 text-slate-600 first:mt-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-1 lg:grid-cols-1">
              {content.story.journeyItems.map((item) => (
                <TextCard key={item.title} title={item.title} description={item.description} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={content.missionVision.eyebrow} title={content.missionVision.title} intro={content.missionVision.intro} />
          <div className="mx-auto mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {content.missionVision.mission.label}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600">{content.missionVision.mission.text}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {content.missionVision.vision.label}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600">{content.missionVision.vision.text}</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {missionVision[language].valuesLabel}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.missionVision.values.map((item) => (
                <ValueBlock key={item.title} title={item.title} description={item.description} icon={item.icon} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={content.founders.eyebrow}
            title={content.founders.title}
            intro={content.founders.intro}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {content.founders.items.map((profile, index) => (
              <article
                key={profile.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
              >
                <ResponsiveImage
                  src={profile.image.src}
                  alt={profile.image.alt}
                  variant="programCard"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="rounded-none"
                  sizes="(max-width: 768px) 100vw, 36rem"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {profile.role}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{profile.name}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{profile.description}</p>
                </div>
              </article>
            ))}
          </div>

          <article className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{content.president.heading}</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{content.president.name}</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">{content.president.intro}</p>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={content.whatWeDo.eyebrow} title={content.whatWeDo.title} intro={content.whatWeDo.intro} />
          <div className="mx-auto mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.whatWeDo.items.map((item) => (
              <CompactItem key={item.title} title={item.title} description={item.description} icon={item.icon} />
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-base leading-7 text-slate-600">
            {content.whatWeDo.closing}
          </p>
        </div>
      </section>
    </>
  );
}
