export const contactCategories = [
  {
    value: "General Inquiry",
    labels: {
      en: "General Inquiry",
      gu: "સામાન્ય પૂછપરછ",
    },
  },
  {
    value: "Admission / Student Inquiry",
    labels: {
      en: "Admission / Student Inquiry",
      gu: "પ્રવેશ / વિદ્યાર્થી પૂછપરછ",
    },
  },
  {
    value: "Residential Hostel Inquiry",
    labels: {
      en: "Residential Hostel Inquiry",
      gu: "રહેઠાણ હોસ્ટેલ પૂછપરછ",
    },
  },
  {
    value: "Rehabilitation & Training Inquiry",
    labels: {
      en: "Rehabilitation & Training Inquiry",
      gu: "પુનર્વસન અને તાલીમ પૂછપરછ",
    },
  },
  {
    value: "Volunteer Inquiry",
    labels: {
      en: "Volunteer Inquiry",
      gu: "સ્વયંસેવક પૂછપરછ",
    },
  },
  {
    value: "Donation / Funding Support",
    labels: {
      en: "Donation / Funding Support",
      gu: "દાન / ફંડિંગ સહાય",
    },
  },
  {
    value: "CSR / Organization Partnership",
    labels: {
      en: "CSR / Organization Partnership",
      gu: "CSR / સંસ્થા ભાગીદારી",
    },
  },
  {
    value: "Scholarship Inquiry",
    labels: {
      en: "Scholarship Inquiry",
      gu: "સ્કોલરશિપ પૂછપરછ",
    },
  },
  {
    value: "Media & Press Inquiry",
    labels: {
      en: "Media & Press Inquiry",
      gu: "મીડિયા અને પ્રેસ પૂછપરછ",
    },
  },
  {
    value: "Other",
    labels: {
      en: "Other",
      gu: "અન્ય",
    },
  },
];

export const contactCategoryValues = contactCategories.map((category) => category.value);

export function getContactCategoryOptions(language = "en") {
  return contactCategories.map((category) => ({
    value: category.value,
    label: category.labels[language] || category.labels.en,
  }));
}