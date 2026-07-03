const ALBUM_TITLE_ALIASES = {
  "Self-Confidence": "Self Confidence Enhancement",
  "COVID Relief": "COVID Relief Distribution",
};

const normalizeAlbumTitle = (title) => {
  const strippedTitle = title.replace(/\s+\d+$/, "").trim();

  return ALBUM_TITLE_ALIASES[strippedTitle] || strippedTitle;
};

const buildGalleryAlbums = (entries) => {
  const albums = [];
  const albumMap = new Map();

  entries.forEach((entry) => {
    const albumTitle = normalizeAlbumTitle(entry.title);
    const existingAlbum = albumMap.get(albumTitle);

    if (existingAlbum) {
      existingAlbum.images.push(entry.imagePath);
      return;
    }

    const album = {
      title: albumTitle,
      description: entry.description,
      category: entry.category,
      images: [entry.imagePath],
      altText: entry.altText,
    };

    albumMap.set(albumTitle, album);
    albums.push(album);
  });

  return albums;
};

export const galleryContent = {
  en: {
    hero: {
      eyebrow: "Gallery",
      title: "Life at NAB Visnagar",
      intro:
        "Every photograph reflects the learning, determination, achievements and daily life of visually impaired beneficiaries, educators and staff at NAB Visnagar.",
    },
    introSection: {
      heading: "A documentary record of campus life",
      text:
        "This gallery documents real institutional activity at NAB Visnagar, including education, rehabilitation, Braille learning, computer education, music, hostel life, sports, awareness programmes, celebrations and community events.",
    },
    galleryUi: {
      categoriesAriaLabel: "Gallery categories",
      allCategoryLabel: "All",
      emptyState: {
        title: "No gallery images found",
        description:
          "Try a different category or return to All to view the available gallery items.",
      },
      lightbox: {
        previewLabel: "Gallery preview",
        closeButtonLabel: "Close",
        closeDialogLabel: "Close image viewer",
        previousButtonLabel: "Previous",
        nextButtonLabel: "Next",
      },
      openViewerLabel: (title) => `Open ${title} in gallery viewer`,
      closePreviewLabel: (title) => `Close preview for ${title}`,
      previousImageLabel: (title) => `View previous image before ${title}`,
      nextImageLabel: (title) => `View next image after ${title}`,
      cta: {
        heading: "Need a gallery update?",
        text: "Use the contact page if you have verified photos or documentation that should be added later.",
        primaryLabel: "Contact NAB",
        secondaryLabel: "Support NAB",
      },
    },
    items: buildGalleryAlbums([
      { title: "Campus Entry", description: "Entrance gate of the NAB Visnagar campus.", category: "Buildings", year: "Recent", imagePath: "/images/buildings/01_entrygate.jpg", altText: "Entrance gate of NAB Visnagar campus" },
      { title: "Main Building", description: "Main building used for daily administration.", category: "Buildings", year: "Recent", imagePath: "/images/buildings/02_mainbuilding.jpg", altText: "Main building at NAB Visnagar" },
      { title: "Research Centre", description: "Research centre supporting learning and coordination.", category: "Buildings", year: "Recent", imagePath: "/images/buildings/03_researchcenter.jpg", altText: "Research centre at NAB Visnagar" },
      { title: "Talim Kendra", description: "Training centre for practical skill development.", category: "Buildings", year: "Recent", imagePath: "/images/buildings/04_talimkendra.jpg", altText: "Talim Kendra training building" },
      { title: "Bhojnalaya", description: "Dining hall supporting hostel life.", category: "Buildings", year: "Recent", imagePath: "/images/buildings/06_bhojnalaya.jpg", altText: "Bhojnalaya at NAB Visnagar" },
      { title: "Girls Hostel", description: "Residential hostel for women beneficiaries.", category: "Buildings", year: "Recent", imagePath: "/images/buildings/07_mahila_chatralay.jpg", altText: "Girls hostel at NAB Visnagar" },
      { title: "Boys Hostel", description: "Residential hostel for men beneficiaries.", category: "Buildings", year: "Recent", imagePath: "/images/buildings/08_bhaiyo_chatralay.jpg", altText: "Boys hostel at NAB Visnagar" },
      { title: "Orientation & Mobility 1", description: "Guided movement training for safe travel.", category: "Activities", year: "Recent", imagePath: "/images/activities/13_oreintation_mobility_1.jpg", altText: "Orientation and mobility training at NAB Visnagar" },
      { title: "Orientation & Mobility 2", description: "Route practice for independent movement.", category: "Activities", year: "Recent", imagePath: "/images/activities/14_oreintation_mobility_2.jpg", altText: "Orientation and mobility practice at NAB Visnagar" },
      { title: "Assistive Equipment 1", description: "Assistive devices prepared for learner use.", category: "Activities", year: "Recent", imagePath: "/images/activities/17_Equipment_1.jpg", altText: "Assistive equipment support at NAB Visnagar" },
      { title: "Assistive Equipment 2", description: "Hands-on practice with assistive equipment.", category: "Activities", year: "Recent", imagePath: "/images/activities/18_Equipment_2.jpg", altText: "Assistive equipment training at NAB Visnagar" },
      { title: "Agarbatti Training 1", description: "Vocational training in agarbatti making.", category: "Activities", year: "Recent", imagePath: "/images/activities/19_Agarbatti_1.jpg", altText: "Agarbatti training at NAB Visnagar" },
      { title: "Agarbatti Training 2", description: "Practical agarbatti production session.", category: "Activities", year: "Recent", imagePath: "/images/activities/20_Agarbatti_2.jpg", altText: "Agarbatti production session at NAB Visnagar" },
      { title: "Self-Confidence 1", description: "Group activity for confidence building.", category: "Activities", year: "Recent", imagePath: "/images/activities/34_SelConfidenceEnhancement_1.jpg", altText: "Self-confidence enhancement activity at NAB Visnagar" },
      { title: "Self-Confidence 2", description: "Interactive support session for participation.", category: "Activities", year: "Recent", imagePath: "/images/activities/35_SelConfidenceEnhancement_2.jpg", altText: "Self-confidence support session at NAB Visnagar" },
      { title: "Self-Confidence 3", description: "Continued confidence building activity.", category: "Activities", year: "Recent", imagePath: "/images/activities/36_SelConfidenceEnhancement_3.jpg", altText: "Self-confidence enhancement activity at NAB Visnagar" },
      { title: "Self-Confidence 4", description: "Confidence and participation support session.", category: "Activities", year: "Recent", imagePath: "/images/activities/37_SelConfidenceEnhancement_4.jpg", altText: "Self-confidence support session at NAB Visnagar" },
      { title: "Self-Confidence 5", description: "Group engagement for confidence development.", category: "Activities", year: "Recent", imagePath: "/images/activities/38_SelConfidenceEnhancement_5.jpg", altText: "Self-confidence development activity at NAB Visnagar" },
      { title: "Self-Confidence 6", description: "Final self-confidence enhancement session.", category: "Activities", year: "Recent", imagePath: "/images/activities/39_SelConfidenceEnhancement_6.jpg", altText: "Self-confidence enhancement session at NAB Visnagar" },
      { title: "Scholarship Support 1", description: "Educational assistance for students.", category: "Activities", year: "Recent", imagePath: "/images/activities/43_ScholarshipSahay_1.jpg", altText: "Scholarship support activity at NAB Visnagar" },
      { title: "Scholarship Support 2", description: "Scholarship support being distributed.", category: "Activities", year: "Recent", imagePath: "/images/activities/44_ScholarshipSahay_2.jpg", altText: "Scholarship distribution at NAB Visnagar" },
      { title: "Scholarship Support 3", description: "Follow-up support for scholarship recipients.", category: "Activities", year: "Recent", imagePath: "/images/activities/45_ScholarshipSahay_3.jpg", altText: "Scholarship follow-up support at NAB Visnagar" },
      { title: "Braille Library 1", description: "Braille reading and study resources.", category: "Facilities", year: "Recent", imagePath: "/images/facilities/23_BraillleLibrary_1.jpg", altText: "Braille library at NAB Visnagar" },
      { title: "Braille Library 2", description: "Accessible study materials and reading space.", category: "Facilities", year: "Recent", imagePath: "/images/facilities/24_BraillleLibrary_2.jpg", altText: "Braille reading space at NAB Visnagar" },
      { title: "Braille Library 3", description: "Braille books and reference material.", category: "Facilities", year: "Recent", imagePath: "/images/facilities/25_BraillleLibrary_3.jpg", altText: "Braille books at NAB Visnagar" },
      { title: "Braille Library 4", description: "Additional Braille reading resources.", category: "Facilities", year: "Recent", imagePath: "/images/facilities/26_BraillleLibrary_4.jpg", altText: "Additional Braille resources at NAB Visnagar" },
      { title: "Braille Library 5", description: "Expanded Braille library collection.", category: "Facilities", year: "Recent", imagePath: "/images/facilities/27_BraillleLibrary_5.jpg", altText: "Expanded Braille library collection at NAB Visnagar" },
      { title: "Speaking Computer 1", description: "Assistive computer education for accessible learning.", category: "Facilities", year: "Recent", imagePath: "/images/facilities/15_speaking_computer_1.jpg", altText: "Speaking computer training at NAB Visnagar" },
      { title: "Speaking Computer 2", description: "Computer training using speech-based access.", category: "Facilities", year: "Recent", imagePath: "/images/facilities/16_speaking_computer_2.jpg", altText: "Speaking computer class at NAB Visnagar" },
      { title: "Sports Day 1", description: "Sports Day participation on campus.", category: "Events", year: "Recent", imagePath: "/images/events/28_SportsDay_1.jpg", altText: "Sports Day at NAB Visnagar" },
      { title: "Sports Day 2", description: "Track and field activity during Sports Day.", category: "Events", year: "Recent", imagePath: "/images/events/29_SportsDay_2.jpg", altText: "Sports Day track event at NAB Visnagar" },
      { title: "Sports Day 3", description: "Recognition and participation during Sports Day.", category: "Events", year: "Recent", imagePath: "/images/events/30_SportsDay_3.jpg", altText: "Sports Day recognition at NAB Visnagar" },
      { title: "Music Competition 1", description: "Student participation in a music competition.", category: "Events", year: "Recent", imagePath: "/images/events/31_MusicCompition_1.jpg", altText: "Music competition at NAB Visnagar" },
      { title: "Music Competition 2", description: "Music performance at the event.", category: "Events", year: "Recent", imagePath: "/images/events/32_MusicCompition_2.jpg", altText: "Music performance at NAB Visnagar" },
      { title: "Music Competition 3", description: "Competition stage and participants.", category: "Events", year: "Recent", imagePath: "/images/events/33_MusicCompition_3.jpg", altText: "Music competition stage at NAB Visnagar" },
      { title: "Award Ceremony 1", description: "Award ceremony documenting institutional recognition.", category: "Events", year: "Recent", imagePath: "/images/events/46_AwardCeremony_2.jpg", altText: "Award ceremony at NAB Visnagar" },
      { title: "Award Ceremony 2", description: "Public recognition event at NAB Visnagar.", category: "Events", year: "Recent", imagePath: "/images/events/47_AwardCeremony_1.jpg", altText: "Recognition event at NAB Visnagar" },
      { title: "COVID Relief 1", description: "Ration kit distribution during the COVID response.", category: "Events", year: "Recent", imagePath: "/images/events/48_RationKit_COVID_1.jpg", altText: "COVID relief distribution at NAB Visnagar" },
      { title: "COVID Relief 2", description: "Relief kits being handed to families.", category: "Events", year: "Recent", imagePath: "/images/events/49_RationKit_COVID_2.jpg", altText: "Relief kits handed to families at NAB Visnagar" },
      { title: "COVID Relief 3", description: "Community support distribution activity.", category: "Events", year: "Recent", imagePath: "/images/events/50_RationKit_COVID_3.jpg", altText: "Community support distribution at NAB Visnagar" },
      { title: "COVID Relief 4", description: "Support materials prepared for distribution.", category: "Events", year: "Recent", imagePath: "/images/events/51_RationKit_COVID_4.jpg", altText: "Support materials for distribution at NAB Visnagar" },
      { title: "COVID Relief 5", description: "Beneficiary assistance during relief work.", category: "Events", year: "Recent", imagePath: "/images/events/52_RationKit_COVID_5.jpg", altText: "Beneficiary assistance during relief work at NAB Visnagar" },
      { title: "COVID Relief 6", description: "Final ration kit distribution.", category: "Events", year: "Recent", imagePath: "/images/events/53_RationKit_COVID_6.jpg", altText: "Final ration kit distribution at NAB Visnagar" },
    ]),
  },
  gu: {
    hero: {
      eyebrow: "ગેલેરી",
      title: "NAB વિસનગરમાં જીવન",
      intro:
        "દરેક ફોટો NAB વિસનગરના દ્રષ્ટિહીન લાભાર્થીઓ, શિક્ષકો અને સ્ટાફના શિક્ષણ, દૃઢતા, સિદ્ધિઓ અને રોજિંદા જીવનને રજૂ કરે છે.",
    },
    introSection: {
      heading: "કેમ્પસ જીવનનો દસ્તાવેજી રેકોર્ડ",
      text:
        "આ ગેલેરી NAB વિસનગરની વાસ્તવિક સંસ્થાગત પ્રવૃત્તિઓનો દસ્તાવેજ છે, જેમાં શિક્ષણ, પુનર્વસન, બ્રેઈલ શીખવણ, કમ્પ્યુટર શિક્ષણ, સંગીત, હોસ્ટેલ જીવન, રમતગમત, જાગૃતિ કાર્યક્રમો, ઉજવણીઓ અને સમુદાય કાર્યક્રમોનો સમાવેશ થાય છે.",
    },
    galleryUi: {
      categoriesAriaLabel: "ગેલેરી શ્રેણીઓ",
      allCategoryLabel: "બધા",
      emptyState: {
        title: "કોઈ ગેલેરી ચિત્ર મળ્યાં નથી",
        description:
          "બીજી શ્રેણી અજમાવો અથવા ઉપલબ્ધ ગેલેરી વસ્તુઓ જોવા માટે All પર પાછા આવો.",
      },
      lightbox: {
        previewLabel: "ગેલેરી પૂર્વદર્શન",
        closeButtonLabel: "બંધ કરો",
        closeDialogLabel: "ચિત્ર દર્શક બંધ કરો",
        previousButtonLabel: "પાછલું",
        nextButtonLabel: "આગળ",
      },
      openViewerLabel: (title) => `ગેલેરી દર્શકમાં ${title} ખોલો`,
      closePreviewLabel: (title) => `${title} નું પૂર્વદર્શન બંધ કરો`,
      previousImageLabel: (title) => `${title} પહેલા નું ચિત્ર જુઓ`,
      nextImageLabel: (title) => `${title} પછી નું ચિત્ર જુઓ`,
      cta: {
        heading: "ગેલેરી સુધારો જોઈએ છે?",
        text: "જો તમારી પાસે ચકાસાયેલ ફોટા અથવા દસ્તાવેજો હોય જે પછી ઉમેરવા જોઈએ, તો સંપર્ક પાનું વાપરો.",
        primaryLabel: "NABનો સંપર્ક કરો",
        secondaryLabel: "NABને સહાય કરો",
      },
    },
    items: [
      { title: "કેમ્પસ પ્રવેશદ્વાર", description: "NAB વિસનગર કેમ્પસનું પ્રવેશદ્વાર.", category: "ભવન", year: "તાજેતરનું", imagePath: "/images/buildings/01_entrygate.jpg", altText: "NAB વિસનગર કેમ્પસનું પ્રવેશદ્વાર" },
      { title: "મુખ્ય ભવન", description: "દૈનિક પ્રશાસન માટેનું મુખ્ય ભવન.", category: "ભવન", year: "તાજેતરનું", imagePath: "/images/buildings/02_mainbuilding.jpg", altText: "NAB વિસનગરનું મુખ્ય ભવન" },
      { title: "રિસર્ચ સેન્ટર", description: "શીખણ અને સંકલન માટેનું રિસર્ચ સેન્ટર.", category: "ભવન", year: "તાજેતરનું", imagePath: "/images/buildings/03_researchcenter.jpg", altText: "NAB વિસનગરનું રિસર્ચ સેન્ટર" },
      { title: "તાલિમ કેન્દ્ર", description: "વ્યવહારુ કૌશલ્ય તાલીમ માટેનું કેન્દ્ર.", category: "ભવન", year: "તાજેતરનું", imagePath: "/images/buildings/04_talimkendra.jpg", altText: "NAB વિસનગરનું તાલિમ કેન્દ્ર" },
      { title: "ભોજનાલય", description: "હોસ્ટેલ જીવનને આધાર આપતું ભોજનાલય.", category: "ભવન", year: "તીયરનું", imagePath: "/images/buildings/06_bhojnalaya.jpg", altText: "NAB વિસનગરનું ભોજનાલય" },
      { title: "મહિલા હોસ્ટેલ", description: "રહેણાંક લાભાર્થીઓ માટેનું મહિલા હોસ્ટેલ.", category: "ભવન", year: "તીયરનું", imagePath: "/images/buildings/07_mahila_chatralay.jpg", altText: "NAB વિસનગરનું મહિલા હોસ્ટેલ" },
      { title: "પુરુષ હોસ્ટેલ", description: "રહેણાંક લાભાર્થીઓ માટેનું પુરુષ હોસ્ટેલ.", category: "ભવન", year: "તીયરનું", imagePath: "/images/buildings/08_bhaiyo_chatralay.jpg", altText: "NAB વિસનગરનું પુરુષ હોસ્ટેલ" },
      { title: "માર્ગદર્શન અને ગતિશીલતા 1", description: "સુરક્ષિત મુસાફરી માટેનું માર્ગદર્શન.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/13_oreintation_mobility_1.jpg", altText: "NAB વિસનગરમાં માર્ગદર્શન અને ગતિશીલતા તાલીમ" },
      { title: "માર્ગદર્શન અને ગતિશીલતા 2", description: "સ્વતંત્ર ગતિ માટેનો માર્ગ અભ્યાસ.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/14_oreintation_mobility_2.jpg", altText: "NAB વિસનગરમાં માર્ગદર્શન અને ગતિશીલતા અભ્યાસ" },
      { title: "સહાયક સાધન 1", description: "ઉપયોગ માટે ગોઠવાયેલા સહાયક સાધનો.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/17_Equipment_1.jpg", altText: "NAB વિસનગરમાં સહાયક સાધન સહાય" },
      { title: "સહાયક સાધન 2", description: "સહાયક સાધનોનો વ્યવહારુ અભ્યાસ.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/18_Equipment_2.jpg", altText: "NAB વિસનગરમાં સહાયક સાધન તાલીમ" },
      { title: "અગરબત્તી તાલીમ 1", description: "અગરબત્તી બનાવવાની વ્યવસાયિક તાલીમ.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/19_Agarbatti_1.jpg", altText: "NAB વિસનગરમાં અગરબત્તી તાલીમ" },
      { title: "અગરબત્તી તાલીમ 2", description: "અગરબત્તી ઉત્પાદનનો વ્યવહારુ સત્ર.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/20_Agarbatti_2.jpg", altText: "NAB વિસનગરમાં અગરબત્તી ઉત્પાદન સત્ર" },
      { title: "આત્મવિશ્વાસ 1", description: "આત્મવિશ્વાસ વધારતી જૂથ પ્રવૃત્તિ.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/34_SelConfidenceEnhancement_1.jpg", altText: "NAB વિસનગરમાં આત્મવિશ્વાસ વધારવાની પ્રવૃત્તિ" },
      { title: "આત્મવિશ્વાસ 2", description: "ભાગીદારી માટેનું ઇન્ટરેક્ટિવ સત્ર.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/35_SelConfidenceEnhancement_2.jpg", altText: "NAB વિસનગરમાં આત્મવિશ્વાસ સત્ર" },
      { title: "સ્કોલરશિપ સહાય 1", description: "વિદ્યાર્થીઓ માટે શૈક્ષણિક સહાય.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/43_ScholarshipSahay_1.jpg", altText: "NAB વિસનગરમાં સ્કોલરશિપ સહાય" },
      { title: "સ્કોલરશિપ સહાય 2", description: "સ્કોલરશિપ વિતરણ.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/44_ScholarshipSahay_2.jpg", altText: "NAB વિસનગરમાં સ્કોલરશિપ વિતરણ" },
      { title: "સ્કોલરશિપ સહાય 3", description: "સ્કોલરશિપ લાભાર્થીઓ માટે અનુસરણ સહાય.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/45_ScholarshipSahay_3.jpg", altText: "NAB વિસનગરમાં સ્કોલરશિપ અનુસરણ" },
      { title: "બ્રેઈલ લાઇબ્રેરી 1", description: "બ્રેઈલ વાંચન અને અભ્યાસ સંસાધનો.", category: "સુવિધા", year: "તીયરનું", imagePath: "/images/facilities/23_BraillleLibrary_1.jpg", altText: "NAB વિસનગરની બ્રેઈલ લાઇબ્રેરી" },
      { title: "બ્રેઈલ લાઇબ્રેરી 2", description: "સુલભ અભ્યાસ સામગ્રી અને વાંચન જગ્યા.", category: "સુવિધા", year: "તીયરનું", imagePath: "/images/facilities/24_BraillleLibrary_2.jpg", altText: "NAB વિસનગરની 브ેઈલ વાંચન જગ્યા" },
      { title: "બ્રેઈલ લાઇબ્રેરી 3", description: "બ્રેઈલ પુસ્તકો અને સંદર્ભ સામગ્રી.", category: "સુવિધા", year: "તીયરનું", imagePath: "/images/facilities/25_BraillleLibrary_3.jpg", altText: "NAB વિસનગરના બ્રેઈલ પુસ્તકો" },
      { title: "સ્પીકિંગ કમ્પ્યુટર 1", description: "સુલભ શીખણ માટેની સહાયક કમ્પ્યુટર તાલીમ.", category: "સુવિધા", year: "તીયરનું", imagePath: "/images/facilities/15_speaking_computer_1.jpg", altText: "NAB વિસનગરમાં સ્પીકિંગ કમ્પ્યુટર તાલીમ" },
      { title: "સ્પીકિંગ કમ્પ્યુટર 2", description: "વાંચન આધારિત ઍક્સેસ સાથેની કમ્પ્યુટર તાલીમ.", category: "સુવિધા", year: "તીયરનું", imagePath: "/images/facilities/16_speaking_computer_2.jpg", altText: "NAB વિસનગરમાં સ્પીકિંગ કમ્પ્યુટર વર્ગ" },
      { title: "સ્પોર્ટ્સ ડે 1", description: "કેમ્પસ પર સ્પોર્ટ્સ ડેમાં ભાગીદારી.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/28_SportsDay_1.jpg", altText: "NAB વિસનગરમાં સ્પોર્ટ્સ ડે" },
      { title: "સ્પોર્ટ્સ ડે 2", description: "સ્પોર્ટ્સ ડે દરમિયાન ટ્રેક અને ફિલ્ડ પ્રવૃત્તિ.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/29_SportsDay_2.jpg", altText: "NAB વિસનગરમાં સ્પોર્ટ્સ ડે ટ્રેક ઇવેન્ટ" },
      { title: "સ્પોર્ટ્સ ડે 3", description: "સ્પોર્ટ્સ ડેમાં માન્યતા અને ભાગીદારી.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/30_SportsDay_3.jpg", altText: "NAB વિસનગરમાં સ્પોર્ટ્સ ડે માન્યતા" },
      { title: "સંગીત સ્પર્ધા 1", description: "સંગીત સ્પર્ધામાં ભાગીદારી.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/31_MusicCompition_1.jpg", altText: "NAB વિસનગરમાં સંગીત સ્પર્ધા" },
      { title: "સંગીત સ્પર્ધા 2", description: "કાર્યક્રમમાં સંગીત પ્રસ્તુતિ.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/32_MusicCompition_2.jpg", altText: "NAB વિસનગરમાં સંગીત પ્રસ્તુતિ" },
      { title: "સંગીત સ્પર્ધા 3", description: "સ્પર્ધાના મંચ પરના ભાગ લેનારાઓ.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/33_MusicCompition_3.jpg", altText: "NAB વિસનગરમાં સંગીત સ્પર્ધાનો મંચ" },
      { title: "એવોર્ડ સમારંભ 1", description: "સંસ્થાકીય માન્યતા દર્શાવતો સમારંભ.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/46_AwardCeremony_2.jpg", altText: "NAB વિસનગરમાં એવોર્ડ સમારંભ" },
      { title: "એવોર્ડ સમારંભ 2", description: "NAB વિસનગરમાં જાહેર માન્યતા કાર્યક્રમ.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/47_AwardCeremony_1.jpg", altText: "NAB વિસનગરમાં માન્યતા કાર્યક્રમ" },
      { title: "કોવિડ રાહત 1", description: "કોવિડ પ્રતિસાદ દરમિયાન રાશન કિટ વિતરણ.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/48_RationKit_COVID_1.jpg", altText: "NAB વિસનગરમાં કોવિડ રાહત વિતરણ" },
      { title: "કોવિડ રાહત 2", description: "પરિવારોને રાહત કિટ્સ સોંપવામાં આવી રહી છે.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/49_RationKit_COVID_2.jpg", altText: "NAB વિસનગરમાં રાહત કિટ્સનું વિતરણ" },
      { title: "કોવિડ રાહત 3", description: "સમુદાય સહાય વિતરણ પ્રવૃત્તિ.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/50_RationKit_COVID_3.jpg", altText: "NAB વિસનગરમાં સમુદાય સહાય" },
      { title: "કોવિડ રાહત 4", description: "વિતરણ માટે તૈયાર કરેલી સહાય સામગ્રી.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/51_RationKit_COVID_4.jpg", altText: "NAB વિસનગરમાં સહાય સામગ્રીનું વિતરણ" },
      { title: "કોવિડ રાહત 5", description: "રાહત કાર્ય દરમિયાન લાભાર્થી સહાય.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/52_RationKit_COVID_5.jpg", altText: "NAB વિસનગરમાં લાભાર્થી સહાય" },
      { title: "કોવિડ રાહત 6", description: "અંતિમ રાશન કિટ વિતરણ.", category: "કાર્યક્રમ", year: "તીયરનું", imagePath: "/images/events/53_RationKit_COVID_6.jpg", altText: "NAB વિસનગરમાં અંતિમ રાશન કિટ વિતરણ" },
    ],
  },
};

galleryContent.gu.items = buildGalleryAlbums([
  ...galleryContent.gu.items,
  { title: "આત્મવિશ્વાસ 3", description: "આત્મવિશ્વાસ વધારવાની ચાલુ પ્રવૃત્તિ.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/36_SelConfidenceEnhancement_3.jpg", altText: "NAB વિસનગરમાં આત્મવિશ્વાસ વધારવાની પ્રવૃત્તિ" },
  { title: "આત્મવિશ્વાસ 4", description: "ભાગીદારી અને આત્મવિશ્વાસ માટેનું સત્ર.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/37_SelConfidenceEnhancement_4.jpg", altText: "NAB વિસનગરમાં આત્મવિશ્વાસ સત્ર" },
  { title: "આત્મવિશ્વાસ 5", description: "આત્મવિશ્વાસ વિકાસ માટેની જૂથ સહભાગિતા.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/38_SelConfidenceEnhancement_5.jpg", altText: "NAB વિસનગરમાં આત્મવિશ્વાસ વિકાસ" },
  { title: "આત્મવિશ્વાસ 6", description: "અંતિમ આત્મવિશ્વાસ વધારવાનું સત્ર.", category: "પ્રવૃત્તિ", year: "તીયરનું", imagePath: "/images/activities/39_SelConfidenceEnhancement_6.jpg", altText: "NAB વિસનગરમાં આત્મવિશ્વાસ સત્ર" },
  { title: "બ્રેઈલ લાઇબ્રેરી 4", description: "વધારાના બ્રેઈલ વાંચન સંસાધનો.", category: "સુવિધા", year: "તીયરનું", imagePath: "/images/facilities/26_BraillleLibrary_4.jpg", altText: "NAB વિસનગરના વધારાના બ્રેઈલ સંસાધનો" },
  { title: "બ્રેઈલ લાઇબ્રેરી 5", description: "વિસ્તૃત બ્રેઈલ લાઇબ્રેરી સંગ્રહ.", category: "સુવિધા", year: "તીયરનું", imagePath: "/images/facilities/27_BraillleLibrary_5.jpg", altText: "NAB વિસનગરનો વિસ્તૃત બ્રેઈલ સંગ્રહ" },
]);