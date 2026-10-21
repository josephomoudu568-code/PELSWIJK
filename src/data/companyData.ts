export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyPoints: string[];
  recommendedFor: string;
  image: string;
  isConfirmed: boolean; // editable verification indicator
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Air Conditioning Installation' | 'Commercial HVAC' | 'Residential Projects' | 'Ventilation' | 'General Contracting';
  location: string;
  description: string;
  image: string;
  highlights: string[];
  isTemplateSample: boolean;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface QuoteLead {
  id: string;
  referenceNumber: string;
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  serviceType: string;
  projectScope: 'Residential' | 'Commercial' | 'Both';
  propertyLocation: string;
  projectDescription: string;
  preferredContactMethod: 'WhatsApp' | 'Phone Call' | 'Email';
  preferredDate?: string;
  photoUrl?: string;
  photoName?: string;
  status: 'New' | 'In Review' | 'Quoted' | 'Scheduled' | 'Completed';
  createdAt: string;
}

export const COMPANY_INFO = {
  name: "PELSWIJK GENERAL CONTRACTORS",
  legalName: "PELSWIJK GENERAL CONTRACTORS",
  industry: "HVAC Contractor / General Contracting",
  address: "48 Sherriff St, Georgetown, Guyana",
  street: "48 Sherriff St",
  city: "Georgetown",
  country: "Guyana",
  phone: "+592 671 2370",
  rawPhone: "+5926712370",
  whatsappNumber: "5926712370",
  plusCode: "RV67+X5 Georgetown, Guyana",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=RV67%2BX5+Georgetown+Guyana",
  mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=48+Sherriff+St+Georgetown+Guyana",
  hoursSummary: "Monday – Friday: 8:00 AM – 5:00 PM",
  hoursNote: "Listing indicates closing at 5:00 PM; weekly schedule subject to confirmation with office.",
  defaultWhatsAppMessage: "Hello PELSWIJK GENERAL CONTRACTORS, I would like to enquire about your HVAC and contracting services. Could you please provide more information?",
  getServiceWhatsAppUrl: (serviceName?: string) => {
    const text = serviceName
      ? `Hello PELSWIJK GENERAL CONTRACTORS, I would like to enquire about your ${serviceName} services. Could you please provide more information?`
      : "Hello PELSWIJK GENERAL CONTRACTORS, I would like to enquire about your HVAC and contracting services. Could you please provide more information?";
    return `https://wa.me/5926712370?text=${encodeURIComponent(text)}`;
  },
  getQuoteWhatsAppUrl: (refNumber: string, serviceName: string, name: string) => {
    const text = `Hello PELSWIJK GENERAL CONTRACTORS, I have submitted a quote request (Ref: ${refNumber}) for ${serviceName}. My name is ${name}. Could you please review my request?`;
    return `https://wa.me/5926712370?text=${encodeURIComponent(text)}`;
  }
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "ac-installation",
    title: "Air Conditioning Installation",
    shortDescription: "Professional installation solutions for homes, offices, and commercial properties.",
    fullDescription: "From single high-efficiency mini-split inverter units to central commercial duct systems, we install air conditioning setups suited to Guyana's tropical climate, prioritizing energy efficiency and reliable cooling performance.",
    keyPoints: [
      "Residential single & multi-zone inverter splits",
      "Commercial split & package AC units",
      "Proper copper refrigerant piping & vacuum testing",
      "Vibration dampening brackets & clean finish"
    ],
    recommendedFor: "New constructions, renovations, and system replacements in Georgetown and surrounding areas.",
    image: "/src/assets/images/service_split_ac_indoor_1792613099893.jpg",
    isConfirmed: true
  },
  {
    id: "hvac-maintenance",
    title: "HVAC Maintenance",
    shortDescription: "Routine maintenance options designed to support reliable system operation and efficiency.",
    fullDescription: "Regular servicing helps prevent unexpected breakdowns, lowers electricity costs, and ensures clean indoor air quality through coil cleaning, filter inspection, drainage checks, and electrical connection audits.",
    keyPoints: [
      "Evaporator & condenser coil chemical cleaning",
      "Refrigerant pressure & temperature checks",
      "Condensate drain flush to avoid water leaks",
      "Electrical contactor & amp draw inspection"
    ],
    recommendedFor: "Homeowners, corporate facilities, retail stores, and commercial offices.",
    image: "/src/assets/images/hero_hvac_technician_1792613099068.jpg",
    isConfirmed: true
  },
  {
    id: "ac-repair",
    title: "Air Conditioning Repair",
    shortDescription: "Troubleshooting and repair services for air conditioning equipment.",
    fullDescription: "Prompt diagnostic and repair assistance for systems that fail to cool, experience gas leaks, make unusual noises, or have electrical fault codes. We pinpoint the root cause before recommending repair solutions.",
    keyPoints: [
      "Precision leak detection & electronic testing",
      "Compressor, capacitor & fan motor diagnosis",
      "Sensor & PCB board troubleshooting",
      "Transparent recommendations based on system age"
    ],
    recommendedFor: "Any residential or business property encountering reduced cooling or system errors.",
    image: "/src/assets/images/hero_hvac_technician_1792613099068.jpg",
    isConfirmed: true
  },
  {
    id: "commercial-hvac",
    title: "Commercial HVAC Solutions",
    shortDescription: "HVAC solutions for offices, shops, commercial buildings, and other business environments.",
    fullDescription: "Heavy-duty climate control designed for continuous commercial demands. We consult on capacity requirements, zoning, airflow distribution, and maintenance programs for business operations.",
    keyPoints: [
      "Multi-split, VRF/VRV & packaged rooftop options",
      "Office park, clinic, restaurant & retail climate setups",
      "Dedicated cooling for server rooms & equipment rooms",
      "Preventive scheduled maintenance agreements"
    ],
    recommendedFor: "Commercial landlords, corporate tenants, medical facilities, and retail chains.",
    image: "/src/assets/images/service_commercial_rooftop_1792613099455.jpg",
    isConfirmed: true
  },
  {
    id: "ventilation-systems",
    title: "Ventilation Systems",
    shortDescription: "Ventilation and air circulation solutions for suitable residential and commercial applications.",
    fullDescription: "Proper air exchange and mechanical ventilation prevent moisture build-up, exhaust stale air, and improve indoor oxygen levels across warehouses, commercial kitchens, gyms, and conference spaces.",
    keyPoints: [
      "Spiral galvanized steel duct installation",
      "Exhaust fans & inline airflow blowers",
      "Fresh air intake systems & balanced distribution",
      "Commercial kitchen exhaust & hood ventilation"
    ],
    recommendedFor: "Industrial workshops, commercial kitchens, enclosed basements, and high-occupancy spaces.",
    image: "/src/assets/images/service_ventilation_duct_1792613100215.jpg",
    isConfirmed: true
  },
  {
    id: "general-contracting",
    title: "General Contracting",
    shortDescription: "A section for additional contracting services the company actually provides.",
    fullDescription: "In addition to specialized HVAC trade work, PELSWIJK GENERAL CONTRACTORS provides general contracting support including facility improvements, equipment foundations, structural mountings, and site preparation.",
    keyPoints: [
      "Equipment plinths & structural roof supports",
      "Wall penetrations, weatherproofing & flashings",
      "Facility upgrades & electrical coordination",
      "Site assessment & general trade coordination"
    ],
    recommendedFor: "Property owners requiring integrated contracting work alongside mechanical cooling installations.",
    image: "/src/assets/images/project_georgetown_commercial_1792613100905.jpg",
    isConfirmed: true
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Commercial Rooftop HVAC Retrofit",
    category: "Commercial HVAC",
    location: "Sherriff Street Corridor, Georgetown",
    description: "Multi-zone air conditioning upgrade for a multi-tenant commercial complex, enhancing cooling stability across multiple storeys.",
    image: "/src/assets/images/service_commercial_rooftop_1792613099455.jpg",
    highlights: ["Chiller & package units", "Vibration isolators", "Rooftop duct coordination"],
    isTemplateSample: true
  },
  {
    id: "proj-2",
    title: "Corporate Office Inverter Split Installation",
    category: "Air Conditioning Installation",
    location: "Central Georgetown",
    description: "Installation of quiet high-efficiency wall-mounted inverter split units in modern executive boardroom and conference facilities.",
    image: "/src/assets/images/service_split_ac_indoor_1792613099893.jpg",
    highlights: ["Concealed piping", "Quiet operation", "Zone-by-zone temperature control"],
    isTemplateSample: true
  },
  {
    id: "proj-3",
    title: "Industrial Spiral Duct Ventilation System",
    category: "Ventilation",
    location: "Greater Georgetown Industrial Area",
    description: "Galvanized steel spiral ducting layout and high-capacity inline exhaust blowers for improved indoor air exchange.",
    image: "/src/assets/images/service_ventilation_duct_1792613100215.jpg",
    highlights: ["Custom duct hangers", "Balanced CFM distribution", "Clean industrial aesthetic"],
    isTemplateSample: true
  },
  {
    id: "proj-4",
    title: "Retail Center Condenser Bank & Climate Control",
    category: "Commercial HVAC",
    location: "Sherriff Street, Georgetown",
    description: "Structured multi-condenser exterior installation servicing ground floor retail shops and upper level administrative offices.",
    image: "/src/assets/images/project_georgetown_commercial_1792613100905.jpg",
    highlights: ["Neat line set trunking", "Service walkway access", "Heavy duty tropical brackets"],
    isTemplateSample: true
  },
  {
    id: "proj-5",
    title: "Residential Villa Inverter Multi-Split Setup",
    category: "Residential Projects",
    location: "Georgetown Residential Sector",
    description: "Complete home cooling installation with independent room thermostats, discreet drainage lines, and surge protection.",
    image: "/src/assets/images/service_split_ac_indoor_1792613099893.jpg",
    highlights: ["Energy-efficient inverters", "Clean aesthetic mounting", "Low noise performance"],
    isTemplateSample: true
  },
  {
    id: "proj-6",
    title: "Mechanical Equipment Foundation & Roof Pen Supports",
    category: "General Contracting",
    location: "Georgetown Commercial District",
    description: "Engineered concrete plinths and vibration-isolated steel framing for heavy HVAC machinery and weather-tight flashing.",
    image: "/src/assets/images/service_commercial_rooftop_1792613099455.jpg",
    highlights: ["Structural roof anchors", "Weatherproof penetration seals", "Integrated general contracting"],
    isTemplateSample: true
  }
];

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    id: "ind-1",
    title: "Residential Properties",
    description: "Comfortable, quiet, and energy-conscious cooling for homes, apartments, and residential compounds.",
    imageAlt: "Residential home air conditioning",
    iconName: "Home"
  },
  {
    id: "ind-2",
    title: "Offices & Commercial Buildings",
    description: "Dependable climate control keeping teams focused, productive, and comfortable throughout the working day.",
    imageAlt: "Commercial office HVAC",
    iconName: "Building2"
  },
  {
    id: "ind-3",
    title: "Retail Spaces",
    description: "Inviting indoor temperatures that keep shoppers comfortable and protect sensitive retail inventory.",
    imageAlt: "Retail store air conditioning",
    iconName: "ShoppingBag"
  },
  {
    id: "ind-4",
    title: "Hospitality Properties",
    description: "Reliable air conditioning for restaurants, guest houses, and entertainment venues requiring steady operation.",
    imageAlt: "Hospitality cooling solutions",
    iconName: "Coffee"
  },
  {
    id: "ind-5",
    title: "Property Managers",
    description: "Professional maintenance, emergency troubleshooting, and tenant turnover inspections across multi-unit portfolios.",
    imageAlt: "Property management HVAC",
    iconName: "Briefcase"
  },
  {
    id: "ind-6",
    title: "Construction & Renovation Projects",
    description: "Collaborative contracting, rough-in mechanical ductwork, line set pre-piping, and final commissioning for builders.",
    imageAlt: "Construction HVAC integration",
    iconName: "HardHat"
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: "Professional Service",
    description: "Dependable, respectful service delivery from initial inquiry through project completion.",
    icon: "ShieldCheck"
  },
  {
    title: "Practical HVAC Solutions",
    description: "Right-sized equipment and configuration recommendations suited to Guyana's tropical climate.",
    icon: "Cpu"
  },
  {
    title: "Residential & Commercial Focus",
    description: "Versatile capabilities tailored for private homeowners as well as corporate businesses.",
    icon: "Layers"
  },
  {
    title: "Clear Communication",
    description: "Honest project scope explanations, clear work timelines, and direct point-of-contact updates.",
    icon: "MessageSquare"
  },
  {
    title: "Project Based Recommendations",
    description: "Honest assessments focused on what your property genuinely needs, without pushy upsells.",
    icon: "FileCheck2"
  },
  {
    title: "Commitment to Quality",
    description: "Pride in neat piping, secure mountings, proper electrical connections, and clean job sites.",
    icon: "Award"
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Tell Us About Your Project",
    description: "Customers explain their HVAC requirements or contracting needs using the quote form or WhatsApp."
  },
  {
    step: "02",
    title: "Discuss Your Requirements",
    description: "The company reviews the request and contacts the customer to clarify property specifics and cooling needs."
  },
  {
    step: "03",
    title: "Arrange an Assessment",
    description: "Where needed, arrange a site visit or technical assessment at your Georgetown property."
  },
  {
    step: "04",
    title: "Receive Your Proposal",
    description: "The customer receives a clear quote or proposal based on the actual verified project scope."
  },
  {
    step: "05",
    title: "Plan the Work",
    description: "Agree on the next steps, schedule, and project requirements for a smooth and timely execution."
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-1",
    category: "Services",
    question: "What HVAC services do you offer?",
    answer: "PELSWIJK GENERAL CONTRACTORS provides air conditioning installation, HVAC maintenance, AC repair, commercial HVAC solutions, ventilation and duct systems, as well as general contracting assistance. Specific project availability can be confirmed directly with our office."
  },
  {
    id: "faq-2",
    category: "Scope",
    question: "Do you handle residential and commercial projects?",
    answer: "Yes. We work on both residential homes requiring single or multi-split AC units and commercial properties including offices, retail stores, and commercial buildings in Georgetown and surrounding areas."
  },
  {
    id: "faq-3",
    category: "Quotes",
    question: "How can I request a quote?",
    answer: "You can submit your project details using the online Request a Quote form on this website, or contact us directly via WhatsApp or phone call at +592 671 2370. We will review your requirements and follow up with you."
  },
  {
    id: "faq-4",
    category: "Estimates",
    question: "What information should I provide for an estimate?",
    answer: "It is helpful to share whether the property is residential or commercial, the approximate room or building size, whether you need new installation or repair of an existing unit, and your property location in Georgetown. Project photos can also be submitted through our form."
  },
  {
    id: "faq-5",
    category: "Site Visits",
    question: "Can I arrange a site visit?",
    answer: "Yes, technical site inspections can be coordinated based on your project requirements and scheduling availability. Please indicate your preferred date on the quote request form or mention it when contacting us."
  },
  {
    id: "faq-6",
    category: "Contact",
    question: "How can I contact your team?",
    answer: "You can call us directly or message via WhatsApp at +592 671 2370. Our physical office is located at 48 Sherriff Street, Georgetown, Guyana (Plus Code: RV67+X5)."
  },
  {
    id: "faq-7",
    category: "Maintenance",
    question: "Do you offer maintenance services?",
    answer: "Yes, routine maintenance options are available to keep air conditioning and ventilation systems operating efficiently. Contact us to discuss periodic servicing for your home or business."
  }
];
