export interface IndustrySampleMessage {
  sender: 'customer' | 'bot';
  text: string;
  time: string;
}

export interface IndustryData {
  slug: string;
  name: string;
  headline: string;
  problemLine: string;
  shortDescription: string;
  benefits: {
    title: string;
    description: string;
  }[];
  sampleChat: IndustrySampleMessage[];
  iconName: string;
  isFullyWritten: boolean;
}

export const INDUSTRIES: IndustryData[] = [
  // 1. Clinics (Fully Written)
  {
    slug: 'clinics',
    name: 'Clinics',
    headline: 'Simply Talk for Clinics',
    problemLine: 'Clinic patients ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Answer questions about consultation hours, doctor specialties, and appointment booking 24/7.',
    isFullyWritten: true,
    iconName: 'Activity',
    benefits: [
      {
        title: 'Instant consultation hours and fees',
        description:
          'Provide clear, accurate details on clinic operating hours, general consultation pricing, and insurance eligibility without tying up your reception staff.',
      },
      {
        title: 'Appointment requests captured round the clock',
        description:
          'Patients needing next-day care can submit their preferred time, name, and contact number at midnight so your reception team can confirm them first thing in the morning.',
      },
      {
        title: 'Pre-visit checklist guidance',
        description:
          'Inform patients about fasting requirements, required identification documents, or what to bring before arriving for health checks and blood tests.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Hi, do you have an opening for Dr. Chen tomorrow afternoon?', time: '09:12' },
      { sender: 'bot', text: 'Hello! Dr. Chen is available tomorrow between 2:00 PM and 5:00 PM. Would you prefer an early or late afternoon slot?', time: '09:12' },
      { sender: 'customer', text: 'Around 3:30 PM would be great. How much is the first consultation?', time: '09:13' },
      { sender: 'bot', text: 'A first general consultation is $65. May I take your full name and mobile number to reserve 3:30 PM for you?', time: '09:13' },
      { sender: 'customer', text: 'Sure, Sarah Jenkins, 555-0192.', time: '09:14' },
      { sender: 'bot', text: 'Thanks Sarah! Our clinic team will send an SMS confirmation shortly.', time: '09:14' },
    ],
  },

  // 2. Property agencies (Fully Written)
  {
    slug: 'property-agencies',
    name: 'Property agencies',
    headline: 'Simply Talk for Property agencies',
    problemLine: 'Property buyers and renters ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Qualify buyer budgets, preferred locations, and schedule property viewings automatically.',
    isFullyWritten: true,
    iconName: 'Building',
    benefits: [
      {
        title: 'Qualify buyer budgets instantly',
        description:
          'Identify whether an enquiry is from a qualified buyer with mortgage pre-approval or a casual browser, helping agents prioritise high-value showings.',
      },
      {
        title: 'Listing details and floor plans on demand',
        description:
          'Share property square footage, lease terms, nearby school districts, and maintenance fees immediately when prospective buyers ask.',
      },
      {
        title: 'Automated viewing bookings',
        description:
          'Collect preferred viewing dates, contact numbers, and specific unit preferences so agents arrive prepared.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Is the 2-bedroom on Oak Street still on the market?', time: '20:41' },
      { sender: 'bot', text: 'Yes, it is! It features 1,150 sq ft, private balcony, and is listed at $485,000. Would you like to schedule an in-person viewing?', time: '20:41' },
      { sender: 'customer', text: 'Yes please, this Saturday morning.', time: '20:42' },
      { sender: 'bot', text: 'We have Saturday slots at 10:00 AM and 11:30 AM. What name and phone number should the agent use to confirm?', time: '20:42' },
      { sender: 'customer', text: 'David Miller, 555-9012. 10 AM works.', time: '20:43' },
      { sender: 'bot', text: 'Great David! The listing agent will WhatsApp you the gate code and confirmation.', time: '20:43' },
    ],
  },

  // 3. Tuition centres (Fully Written)
  {
    slug: 'tuition-centres',
    name: 'Tuition centres',
    headline: 'Simply Talk for Tuition centres',
    problemLine: 'Parents looking for tutors ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Explain class timetables, subject syllabi, and book trial classes without manual messaging.',
    isFullyWritten: true,
    iconName: 'GraduationCap',
    benefits: [
      {
        title: 'Clear class schedules and levels',
        description:
          'Instantly provide parents with specific class times, grade levels, and teacher credentials across primary and secondary subjects.',
      },
      {
        title: 'Trial lesson sign-ups on autopilot',
        description:
          'Ask for the student’s grade level, current learning challenge, and parent contact information to lock in trial bookings.',
      },
      {
        title: 'Tuition fees and intake dates',
        description:
          'Answer common fee structure questions, term dates, and class size caps without back-and-forth messaging.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Do you offer Year 9 Maths tutoring on weekends?', time: '21:15' },
      { sender: 'bot', text: 'Yes, we have Year 9 Advanced Maths on Saturday 10:00 AM and Sunday 2:00 PM. Both classes are capped at 8 students.', time: '21:15' },
      { sender: 'customer', text: 'Can my daughter try one lesson first?', time: '21:16' },
      { sender: 'bot', text: 'We offer a 50% trial session. May I know your name and contact number to arrange the trial material?', time: '21:16' },
      { sender: 'customer', text: 'Lisa Wong, 555-3344.', time: '21:17' },
      { sender: 'bot', text: 'Thank you Lisa! Our academic coordinator will contact you tomorrow morning with details.', time: '21:17' },
    ],
  },

  // 4. Beauty salons (Fully Written)
  {
    slug: 'beauty-salons',
    name: 'Beauty salons',
    headline: 'Simply Talk for Beauty salons',
    problemLine: 'Salon and spa clients ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Help clients pick treatments, check stylist availability, and capture appointment details.',
    isFullyWritten: true,
    iconName: 'Sparkles',
    benefits: [
      {
        title: 'Price menu and treatment details',
        description:
          'Answer queries about hair treatments, colouring techniques, manicure packages, and session durations with precise menu rates.',
      },
      {
        title: 'Preferred stylist scheduling',
        description:
          'Help clients check when their favourite stylist or aesthetician has openings for cut, style, or skin treatments.',
      },
      {
        title: 'Zero missed evening bookings',
        description:
          'Clients deciding on a weekend glow-up on Friday night can leave their service choice and phone number before your competitors reply.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'How much for a balayage and haircut for shoulder-length hair?', time: '22:04' },
      { sender: 'bot', text: 'Our full Balayage package with toner, wash, and cut is $160-$180 depending on density. Would you like to check dates this week?', time: '22:04' },
      { sender: 'customer', text: 'Do you have Friday afternoon with stylist Maya?', time: '22:05' },
      { sender: 'bot', text: 'Maya has a 2:30 PM slot open on Friday. May I have your name and phone number to hold that slot?', time: '22:05' },
      { sender: 'customer', text: 'Chloe, 555-8821.', time: '22:06' },
      { sender: 'bot', text: 'All noted Chloe! We have held 2:30 PM Friday for you. Confirmation sent via WhatsApp.', time: '22:06' },
    ],
  },

  // 5. Interior designers // TODO: owner review
  {
    slug: 'interior-designers',
    name: 'Interior designers',
    headline: 'Simply Talk for Interior designers',
    problemLine: 'Homeowners planning renovations ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Qualify renovation budgets, property types, and schedule design discovery calls.',
    isFullyWritten: false,
    iconName: 'Home',
    benefits: [
      {
        title: 'Qualify floor area and project budget',
        description: 'Collect room counts, target move-in dates, and renovation budget tiers before scheduling creative time.',
      },
      {
        title: 'Portfolio style matching',
        description: 'Provide links and answers for Scandinavian, Modern Luxe, or Minimalist residential inquiries.',
      },
      {
        title: 'Capture discovery consultations',
        description: 'Collect homeowner phone and email for custom 3D design concept discussions.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'We just got our 3-bedroom condo key. Do you do kitchen and living room remodels?', time: '19:30' },
      { sender: 'bot', text: 'Congratulations on your new home! Yes, we specialise in residential transformations. What is your estimated timeline for move-in?', time: '19:30' },
      { sender: 'customer', text: 'In about 3 months, budget around $50,000.', time: '19:31' },
      { sender: 'bot', text: 'That matches our standard timeline well. May I take your name and contact to send our lookbook and book a discovery call?', time: '19:31' },
      { sender: 'customer', text: 'Marcus, 555-7711.', time: '19:32' },
      { sender: 'bot', text: 'Thank you Marcus! Our senior designer will reach out tomorrow.', time: '19:32' },
    ],
  },

  // 6. Restaurants // TODO: owner review
  {
    slug: 'restaurants',
    name: 'Restaurants',
    headline: 'Simply Talk for Restaurants',
    problemLine: 'Diners and event organisers ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Answer menu queries, dietary questions, and capture private dining enquiries.',
    isFullyWritten: false,
    iconName: 'Utensils',
    benefits: [
      {
        title: 'Dietary restrictions and allergen queries',
        description: 'Quickly inform guests regarding gluten-free, halal, vegan, or nut-free options on your menu.',
      },
      {
        title: 'Group reservations and private hire',
        description: 'Gather group headcount, desired dates, and budget for birthdays, corporate dinners, and events.',
      },
      {
        title: 'Direct bookings link',
        description: 'Direct diners to your primary reservation system without leaving customer questions unanswered.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Do you take group bookings for 14 people next Friday evening?', time: '14:20' },
      { sender: 'bot', text: 'We do! For parties over 10, we offer our Chef Sharing Menu in the mezzanine area. Would you like details on pricing and availability?', time: '14:20' },
      { sender: 'customer', text: 'Yes, please let me know cost per person.', time: '14:21' },
      { sender: 'bot', text: 'It is $55/person for 4 courses. What is your name and email so our events manager can send the menu?', time: '14:21' },
      { sender: 'customer', text: 'Jason, jason@company.com.', time: '14:22' },
      { sender: 'bot', text: 'Thanks Jason! The manager will send the event packet this afternoon.', time: '14:22' },
    ],
  },

  // 7. Law firms // TODO: owner review
  {
    slug: 'law-firms',
    name: 'Law firms',
    headline: 'Simply Talk for Law firms',
    problemLine: 'Prospective legal clients ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Conduct confidential initial intake, qualify case urgency, and gather contact details.',
    isFullyWritten: false,
    iconName: 'Scale',
    benefits: [
      {
        title: 'Professional and confidential initial screening',
        description: 'Determine practice area match (property, estate planning, corporate, family) with discreet inquiry questions.',
      },
      {
        title: 'Explain fee structure and retainer basics',
        description: 'State whether consultations are complimentary or billed at fixed rates so expectations are clear.',
      },
      {
        title: 'Lead capture for attorney follow-up',
        description: 'Gather client name, phone number, and brief matter summary for conflict checks and attorney review.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Do you help small businesses with commercial lease reviews?', time: '18:10' },
      { sender: 'bot', text: 'Yes, our commercial practice team handles lease reviews and commercial contract negotiations. Are you signing a new lease or renegotiating?', time: '18:10' },
      { sender: 'customer', text: 'Signing a new 3-year commercial retail lease.', time: '18:11' },
      { sender: 'bot', text: 'Understood. We offer fixed-fee initial reviews. May I collect your name, phone number, and email to schedule a consultation?', time: '18:11' },
      { sender: 'customer', text: 'Karen, 555-4321, karen@boutique.co.', time: '18:12' },
      { sender: 'bot', text: 'Thank you Karen. Our practice manager will contact you first thing in the morning.', time: '18:12' },
    ],
  },

  // 8. Accounting firms // TODO: owner review
  {
    slug: 'accounting-firms',
    name: 'Accounting firms',
    headline: 'Simply Talk for Accounting firms',
    problemLine: 'Business owners seeking tax and bookkeeping help ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Qualify company revenue size, payroll requirements, and capture tax consultation requests.',
    isFullyWritten: false,
    iconName: 'Calculator',
    benefits: [
      {
        title: 'Service scope clarity',
        description: 'Answer whether your firm covers corporate tax filing, monthly bookkeeping, GST/VAT compliance, or audit preparation.',
      },
      {
        title: 'Business size qualification',
        description: 'Ask for company headcount and accounting software (Xero, QuickBooks) to provide realistic quotes.',
      },
      {
        title: 'Effortless onboarding intake',
        description: 'Securely gather contact details from busy founders working after regular office hours.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Do you handle annual tax returns for an LLC with 6 contractors?', time: '20:15' },
      { sender: 'bot', text: 'Yes, we provide end-to-end corporate filing and 1099 compliance. Do you currently use an accounting software like Xero or QuickBooks?', time: '20:15' },
      { sender: 'customer', text: 'We use QuickBooks Online.', time: '20:16' },
      { sender: 'bot', text: 'Perfect, that integrates smoothly with our workflow. May I have your name and email to send our onboarding pricing guide?', time: '20:16' },
      { sender: 'customer', text: 'Alex Reed, alex@techstudio.com.', time: '20:17' },
      { sender: 'bot', text: 'Thanks Alex! Our partner will send over the guide and consultation booking link.', time: '20:17' },
    ],
  },

  // 9. Car dealers // TODO: owner review
  {
    slug: 'car-dealers',
    name: 'Car dealers',
    headline: 'Simply Talk for Car dealers',
    problemLine: 'Car buyers and trade-in owners ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Provide vehicle specs, check inventory, and book test drives 24/7.',
    isFullyWritten: false,
    iconName: 'Car',
    benefits: [
      {
        title: 'Vehicle availability checks',
        description: 'Answer whether a specific model, year, or trim level is on the showroom floor.',
      },
      {
        title: 'Trade-in value estimates',
        description: 'Gather current car make, model, year, and mileage to prepare appraisal figures in advance.',
      },
      {
        title: 'Test drive scheduling',
        description: 'Lock in Saturday and Sunday test drive appointments with driver license and contact verification.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Do you still have the 2023 blue hybrid sedan listed on your site?', time: '21:05' },
      { sender: 'bot', text: 'Yes, that vehicle has 14,000 miles and just cleared our multi-point inspection. Would you like to schedule a test drive this weekend?', time: '21:05' },
      { sender: 'customer', text: 'Can I test drive it tomorrow at 11 AM?', time: '21:06' },
      { sender: 'bot', text: 'We can have the keys ready at 11:00 AM. What is your full name and phone number to confirm the booking?', time: '21:06' },
      { sender: 'customer', text: 'Tom Wright, 555-6677.', time: '21:07' },
      { sender: 'bot', text: 'Confirmed Tom! The keys will be waiting with our sales specialist at 11:00 AM.', time: '21:07' },
    ],
  },

  // 10. Home services // TODO: owner review
  {
    slug: 'home-services',
    name: 'Home services',
    headline: 'Simply Talk for Home services',
    problemLine: 'Homeowners with urgent plumbing, HVAC, or electrical issues ask the same questions all day, and they often ask after closing time.',
    shortDescription: 'Triage emergency jobs, give clear service call estimates, and capture urgent service leads.',
    isFullyWritten: false,
    iconName: 'Wrench',
    benefits: [
      {
        title: 'Emergency triage',
        description: 'Instantly clarify whether a water leak, electrical tripping, or AC failure requires emergency dispatch.',
      },
      {
        title: 'Call-out rate transparency',
        description: 'State standard diagnostic call-out fees and warranty guarantees so homeowners book with confidence.',
      },
      {
        title: 'Address and phone capture',
        description: 'Promptly collect the customer address and contact number so the next available technician can be routed.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Our air conditioner stopped blowing cold air and it is leaking water.', time: '19:45' },
      { sender: 'bot', text: 'We can help with that. Is water dripping inside the room, and do you hear any abnormal motor noise?', time: '19:45' },
      { sender: 'customer', text: 'Dripping down the wall inside the bedroom.', time: '19:46' },
      { sender: 'bot', text: 'We recommend turning the unit off to prevent electrical damage. Our technician has an opening tomorrow at 9 AM. What is your address and phone number?', time: '19:46' },
      { sender: 'customer', text: '42 Elm St, 555-1234.', time: '19:47' },
      { sender: 'bot', text: 'Got it! Our technician will call you before arriving at 9 AM tomorrow.', time: '19:47' },
    ],
  },

  // 11. Hotels and guesthouses // TODO: owner review
  {
    slug: 'hotels-and-guesthouses',
    name: 'Hotels and guesthouses',
    headline: 'Simply Talk for Hotels and guesthouses',
    problemLine: 'Travellers and event guests ask the same questions all day, and they often ask across different time zones.',
    shortDescription: 'Answer room amenities, check-in policies, and direct guests to direct booking.',
    isFullyWritten: false,
    iconName: 'Bed',
    benefits: [
      {
        title: 'Time-zone friendly guest answers',
        description: 'Answer foreign travellers asking about early check-in, airport transfers, and parking at 3 AM.',
      },
      {
        title: 'Direct booking encouragement',
        description: 'Offer direct reservation links and complimentary breakfast perks to avoid heavy OTA commissions.',
      },
      {
        title: 'Group and wedding block requests',
        description: 'Capture wedding party and corporate retreat group room blocks with dates and headcount.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Do you offer late check-in if my flight lands at 11:30 PM?', time: '02:30' },
      { sender: 'bot', text: 'Yes, our reception is staffed 24/7. As long as you provide your booking reference, we will welcome you upon arrival! Are you looking for rooms this weekend?', time: '02:30' },
      { sender: 'customer', text: 'Yes, looking for a King Room from Friday to Sunday.', time: '02:31' },
      { sender: 'bot', text: 'We have King Deluxe rooms available. Book directly with us for complimentary breakfast. What is your email to send the direct link?', time: '02:31' },
      { sender: 'customer', text: 'elena@travel.org.', time: '02:32' },
      { sender: 'bot', text: 'Sent Elena! Check your inbox for the direct link with the breakfast perk included.', time: '02:32' },
    ],
  },

  // 12. Online shops // TODO: owner review
  {
    slug: 'online-shops',
    name: 'Online shops',
    headline: 'Simply Talk for Online shops',
    problemLine: 'Shoppers with sizing, shipping, and order questions ask the same questions all day, and they often leave if unanswered.',
    shortDescription: 'Resolve pre-purchase sizing hesitation, clarify return policies, and prevent cart abandonment.',
    isFullyWritten: false,
    iconName: 'ShoppingBag',
    benefits: [
      {
        title: 'Instant sizing and material advice',
        description: 'Help shoppers choose the correct fit based on measurement charts and product descriptions.',
      },
      {
        title: 'Shipping and return transparency',
        description: 'Clear up delivery timeframes, tracking updates, and 30-day exchange rules instantly.',
      },
      {
        title: 'Convert hesitation to sales',
        description: 'Collect shopper email with an exclusive first-order discount code when hesitation is detected.',
      },
    ],
    sampleChat: [
      { sender: 'customer', text: 'Does this jacket run true to size or should I size up for wearing over sweaters?', time: '21:18' },
      { sender: 'bot', text: 'It has a tailored slim fit. If you plan to layer over thick sweaters, we recommend sizing up one size. Which size do you usually wear?', time: '21:18' },
      { sender: 'customer', text: 'Usually a Medium.', time: '21:19' },
      { sender: 'bot', text: 'A Large will give you the perfect comfortable fit over layers! Would you like a 10% welcome code for your order?', time: '21:19' },
      { sender: 'customer', text: 'Yes please!', time: '21:20' },
      { sender: 'bot', text: 'What email should I send the 10% code to?', time: '21:20' },
    ],
  },
];
