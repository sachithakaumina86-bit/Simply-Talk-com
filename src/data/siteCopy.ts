/**
 * Simply Talk - Master Site Copy Data
 * All copy is strictly typed and editable here without touching components.
 */

export interface HowItWorksStep {
  step: number;
  title: string;
  text: string;
}

export interface BenefitCard {
  title: string;
  text: string;
  iconName: string;
}

export interface ComparisonRow {
  feature: string;
  contactForm: string;
  manualChat: string;
  simplyTalk: string;
}

export interface PlanItem {
  id: string;
  name: string;
  tagline: string;
  credits: string;
  users: string;
  priceMonthly: string;
  isPopular?: boolean;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const SITE_COPY = {
  hero: {
    headline: 'Every visitor deserves an answer.',
    highlightedLine: 'Every conversation can become a customer.',
    subtext:
      'Simply Talk is an AI chatbot that replies to customer questions on your website and WhatsApp, finds the people ready to buy, and collects their details for you. It works day and night, so your team does not have to.',
    ctaPrimary: 'Start Free',
    ctaSecondary: 'Try WhatsApp Demo',
    reassurance: 'Free plan available · No credit card needed · Live in about 5 minutes',
  },
  problemStrip: {
    headline: 'Most visitors leave without saying a word.',
    subline: 'Simply Talk starts the conversation for you.',
  },
  howItWorks: {
    heading: 'Up and running in 3 steps',
    subheading: 'No developer. No training course. No waiting.',
    steps: [
      {
        step: 1,
        title: 'Teach it your business',
        text: 'Upload brochures and price lists, or paste your website address. Simply Talk reads them and learns your services, prices and FAQs.',
      },
      {
        step: 2,
        title: 'Add it in one minute',
        text: 'Paste one line of code into your site, or connect your WhatsApp Business number. Nothing else to install.',
      },
      {
        step: 3,
        title: 'Collect ready-to-buy leads',
        text: 'Simply Talk answers questions, spots buying interest and asks for name, phone and email. Leads arrive in your dashboard and inbox.',
      },
    ] as HowItWorksStep[],
  },
  liveDemo: {
    heading: 'Do not just read about it. Talk to it.',
    text: 'The chat bubble in the bottom-right corner of this page is Simply Talk itself. Ask about pricing, features or setup, and watch it answer, understand what you need and ask for your details, exactly as it would for your own customers.',
    buttonText: 'Open the chat',
  },
  moreThanChatbot: {
    heading: 'More than a chatbot. A team member that never sleeps.',
    subheading: 'More conversations. More qualified leads.',
    cards: [
      {
        title: 'Instant replies, always',
        text: 'Answers customers in seconds, including nights, weekends and public holidays.',
        iconName: 'Zap',
      },
      {
        title: 'Leads on autopilot',
        text: 'Notices buying interest and collects name, phone and email without any effort from your team.',
        iconName: 'UserCheck',
      },
      {
        title: 'Talks only to serious buyers',
        text: 'Asks the right questions first, so your staff spend time on people who are ready to buy.',
        iconName: 'Target',
      },
      {
        title: 'Knows your business',
        text: 'Learns from your PDFs, brochures and website, then answers like your best salesperson.',
        iconName: 'BookOpen',
      },
      {
        title: 'Sounds like your brand',
        text: 'Choose your colours, tone of voice and welcome message for a consistent customer experience.',
        iconName: 'Palette',
      },
      {
        title: 'Turns chats into insight',
        text: 'See what customers ask and where they hesitate, then use it to improve your sales.',
        iconName: 'BarChart3',
      },
    ] as BenefitCard[],
  },
  comparison: {
    heading: 'How Simply Talk compares',
    rows: [
      {
        feature: 'Starts the conversation',
        contactForm: 'No, waits for visitor',
        manualChat: 'No, waits for staff',
        simplyTalk: 'Yes, automatically',
      },
      {
        feature: 'Availability',
        contactForm: 'Office hours',
        manualChat: 'Office hours',
        simplyTalk: '24/7',
      },
      {
        feature: 'Response time',
        contactForm: 'Hours to days',
        manualChat: 'Minutes, if staffed',
        simplyTalk: 'Instant',
      },
      {
        feature: 'Qualifies the lead',
        contactForm: 'No',
        manualChat: 'Manual and inconsistent',
        simplyTalk: 'Automatic',
      },
      {
        feature: 'Staff time needed',
        contactForm: 'Low',
        manualChat: 'High',
        simplyTalk: 'Minimal',
      },
    ] as ComparisonRow[],
  },
  industriesSection: {
    heading: 'Built for businesses that live on enquiries',
    subheading:
      'Whether you want sales leads or fewer repeat questions, Simply Talk adapts to your business.',
    closingLine:
      'Do not see your industry? Simply Talk learns from your content, so it works for any business with a website.',
  },
  whatIsIncluded: {
    heading: 'Everything you need, nothing you do not',
    items: [
      {
        title: 'One assistant, two channels',
        text: 'Serve customers on your website and WhatsApp from the same assistant.',
        icon: 'MessageSquare',
      },
      {
        title: 'Speaks their language',
        text: 'Replies in the language your customer uses, so nobody is left out.',
        icon: 'Globe',
      },
      {
        title: 'Learns from your content',
        text: 'Upload PDFs and catalogues, or paste your website address. No manual training.',
        icon: 'FileText',
      },
      {
        title: 'Live in minutes',
        text: 'One line of code. No developer needed.',
        icon: 'Clock',
      },
      {
        title: 'Full chat history and analytics',
        text: 'Every conversation is saved and searchable, so you can spot trends and missed opportunities.',
        icon: 'TrendingUp',
      },
    ],
  },
  pricingPreview: {
    heading: 'Simple pricing. Start free, upgrade when you grow.',
    creditExplainer:
      'One credit is used each time Simply Talk successfully handles a customer conversation. Credits reset at the start of every billing cycle.',
  },
  finalCta: {
    heading: 'Your website already gets visitors.',
    subheading: 'Let Simply Talk turn them into customers.',
    lines: [
      'Answer questions instantly.',
      'Capture qualified leads automatically.',
      'Grow while you sleep.',
    ],
    button: 'Start Free Today',
    smallPrint: 'Free plan available · No credit card needed · Live in about 5 minutes',
  },
  about: {
    headline: 'We help small businesses never miss a customer.',
    story:
      'Small teams cannot answer every message at every hour, yet one missed enquiry can be a lost sale. Simply Talk was built to give every business an assistant that is always available, always polite and always ready to capture the lead.',
    mission: 'Make instant, intelligent customer conversations affordable for every business.',
    values: [
      {
        title: 'Simple to set up',
        description: 'No technical hurdles, no complex flowcharts. If you can copy and paste, you can launch Simply Talk.',
      },
      {
        title: 'Honest about what AI can do',
        description: 'Never make up facts or mislead customers. When the bot is unsure, it hands over gracefully to your team.',
      },
      {
        title: 'Built around your customers',
        description: 'Polite, helpful, and focused on finding buyers who genuinely want your products and services.',
      },
    ],
  },
  featuresPage: {
    headline: 'Everything Simply Talk can do for your business',
    subtext: 'Built from the ground up for small teams who need to answer quickly, sound professional, and capture high-intent leads.',
    list: [
      {
        id: 'website-chatbot',
        title: 'Website chatbot',
        shortDescription: 'A chat window that matches your brand and greets visitors by name of your business.',
        details: 'Customise colours, avatar, launcher position, and welcome copy. Greets visitors proactively with non-intrusive timing.',
      },
      {
        id: 'whatsapp-assistant',
        title: 'WhatsApp assistant',
        shortDescription: 'Connect your WhatsApp Business number and answer chats automatically.',
        details: 'Integrates via standard WhatsApp Business Cloud API. Your team gets shared visibility and automatic customer notifications.',
      },
      {
        id: 'knowledge-training',
        title: 'Knowledge training',
        shortDescription: 'Upload PDFs, price lists and brochures, or crawl your website.',
        details: 'Simply Talk extracts key facts, pricing rules, and business hours. Never hallucinated answers; grounded strictly in your files.',
      },
      {
        id: 'lead-qualification',
        title: 'Lead qualification',
        shortDescription: 'Asks custom questions, scores interest and flags hot leads.',
        details: 'Distinguishes between casual window-shoppers and ready-to-book clients so your sales team contacts the most profitable leads first.',
      },
      {
        id: 'lead-capture',
        title: 'Lead capture',
        shortDescription: 'Collects name, phone and email, then sends them to your dashboard and inbox.',
        details: 'Never lets an interested prospect bounce without leaving contact details. Instant notifications via email and webhooks.',
      },
      {
        id: 'multilingual-replies',
        title: 'Multilingual replies',
        shortDescription: "Responds in the visitor's language.",
        details: 'Detects over 50 languages in real time. Responds fluently and naturally, ensuring no foreign client feels excluded.',
      },
      {
        id: 'brand-customisation',
        title: 'Brand customisation',
        shortDescription: 'Colours, logo, tone of voice, welcome message and avatar.',
        details: 'Adapt the bot personality: formal, playful, or direct. Your website visitors feel they are talking directly with your best front-desk staff.',
      },
      {
        id: 'conversation-analytics',
        title: 'Conversation analytics',
        shortDescription: 'Searchable chat logs, top questions and missed-opportunity reports.',
        details: 'Understand what services visitors ask about most, identify gaps in your online pricing, and see peak traffic hours.',
      },
      {
        id: 'human-handover',
        title: 'Human handover',
        shortDescription: 'Pass a chat to your team when a customer asks for a person.',
        details: 'When visitors request a live agent or request a complex quote, Simply Talk triggers an immediate email or WhatsApp alert to your staff.',
      },
      {
        id: 'team-access',
        title: 'Team access',
        shortDescription: 'Multiple users with their own logins on higher plans.',
        details: 'Grant access to sales reps, front desk staff, and managers without sharing passwords.',
      },
    ],
  },
  partnerProgram: {
    headline: 'Offer Simply Talk to your clients. Earn on every account.',
    text: 'Web agencies, marketers and consultants can resell Simply Talk or refer clients and earn recurring commission.',
    benefits: [
      {
        title: 'Recurring commission',
        description: 'Earn reliable recurring revenue on every client subscription as long as they stay active.',
      },
      {
        title: 'Partner dashboard',
        description: 'Easily deploy, brand, and monitor multiple client bots from a unified administrative portal.',
      },
      {
        title: 'Priority support',
        description: 'Direct Slack/email access to our core engineering team for rapid onboarding and custom onboarding.',
      },
    ],
  },
  faqs: [
    {
      question: 'What is a conversation credit?',
      answer:
        'One credit is used each time Simply Talk successfully handles a customer conversation. Credits reset at the start of every billing cycle.',
    },
    {
      question: 'What happens if I run out of credits?',
      answer:
        'Your bot will notify you before credits run out. You can upgrade plans or add top-up credits at any time to ensure continuous 24/7 lead capture [POLICY TO CONFIRM].',
    },
    {
      question: 'Can I change plans?',
      answer:
        'Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings without penalties.',
    },
    {
      question: 'Do I need a credit card to start?',
      answer:
        'No. You can start on the Free plan immediately with no credit card required. Only upgrade when your lead volume increases.',
    },
    {
      question: 'Which languages are supported?',
      answer:
        'Simply Talk automatically detects and replies in the visitor\'s language, supporting over 50 global languages out of the box.',
    },
    {
      question: 'Can I use my own WhatsApp number?',
      answer:
        'Yes. You can connect your existing WhatsApp Business number or set up a dedicated number through the WhatsApp Business Cloud API.',
    },
  ] as FaqItem[],
};
