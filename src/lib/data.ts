// Bright Paths Data - CBC Kenya Pathways, Subjects, and Careers

export type Pathway = 'STEM' | 'Social Sciences' | 'Arts & Sports';

export interface Subject {
  code: string;
  name: string;
  pathway: Pathway;
  cluster: string;
}

export interface Career {
  title: string;
  pathway: Pathway;
  description: string;
  growthRate: 'High' | 'Medium' | 'Low';
  salaryRange: string;
  skills: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    pathway: Pathway | null;
  }[];
}

// CBC Subject Clusters and Codes
export const subjects: Subject[] = [
  // STEM Pathway
  { code: 'ST1001', name: 'Mathematics', pathway: 'STEM', cluster: 'Core Sciences' },
  { code: 'ST1002', name: 'Physics', pathway: 'STEM', cluster: 'Core Sciences' },
  { code: 'ST1003', name: 'Chemistry', pathway: 'STEM', cluster: 'Core Sciences' },
  { code: 'ST1004', name: 'Biology', pathway: 'STEM', cluster: 'Core Sciences' },
  { code: 'ST1005', name: 'Computer Science', pathway: 'STEM', cluster: 'Technology' },
  { code: 'ST1006', name: 'Engineering Graphics', pathway: 'STEM', cluster: 'Technology' },
  { code: 'ST1007', name: 'Robotics', pathway: 'STEM', cluster: 'Technology' },
  { code: 'ST1008', name: 'Agriculture', pathway: 'STEM', cluster: 'Applied Sciences' },
  
  // Social Sciences Pathway
  { code: 'SS2001', name: 'History', pathway: 'Social Sciences', cluster: 'Humanities' },
  { code: 'SS2002', name: 'Geography', pathway: 'Social Sciences', cluster: 'Humanities' },
  { code: 'SS2003', name: 'Business Studies', pathway: 'Social Sciences', cluster: 'Commerce' },
  { code: 'SS2004', name: 'Economics', pathway: 'Social Sciences', cluster: 'Commerce' },
  { code: 'SS2005', name: 'Government & Citizenship', pathway: 'Social Sciences', cluster: 'Humanities' },
  { code: 'SS2006', name: 'Religious Studies', pathway: 'Social Sciences', cluster: 'Humanities' },
  { code: 'SS2007', name: 'Languages (Kiswahili)', pathway: 'Social Sciences', cluster: 'Languages' },
  { code: 'SS2008', name: 'Foreign Languages', pathway: 'Social Sciences', cluster: 'Languages' },
  
  // Arts & Sports Pathway
  { code: 'AS3001', name: 'Music', pathway: 'Arts & Sports', cluster: 'Performing Arts' },
  { code: 'AS3002', name: 'Drama/Theatre', pathway: 'Arts & Sports', cluster: 'Performing Arts' },
  { code: 'AS3003', name: 'Visual Arts', pathway: 'Arts & Sports', cluster: 'Visual Arts' },
  { code: 'AS3004', name: 'Film & Media', pathway: 'Arts & Sports', cluster: 'Visual Arts' },
  { code: 'AS3005', name: 'Physical Education', pathway: 'Arts & Sports', cluster: 'Sports Science' },
  { code: 'AS3006', name: 'Sports Management', pathway: 'Arts & Sports', cluster: 'Sports Science' },
  { code: 'AS3007', name: 'Fashion & Design', pathway: 'Arts & Sports', cluster: 'Design' },
  { code: 'AS3008', name: 'Culinary Arts', pathway: 'Arts & Sports', cluster: 'Applied Arts' },
];

// 2026 Kenya Job Market Careers
export const careers: Career[] = [
  // STEM Careers
  {
    title: 'Software Developer',
    pathway: 'STEM',
    description: 'Build applications and systems that power Kenya\'s digital economy',
    growthRate: 'High',
    salaryRange: 'KES 80,000 - 350,000/month',
    skills: ['Programming', 'Problem Solving', 'Mathematics'],
  },
  {
    title: 'Data Analyst',
    pathway: 'STEM',
    description: 'Transform data into insights for business decisions',
    growthRate: 'High',
    salaryRange: 'KES 70,000 - 200,000/month',
    skills: ['Statistics', 'Python/R', 'Data Visualization'],
  },
  {
    title: 'Renewable Energy Engineer',
    pathway: 'STEM',
    description: 'Design solar, wind, and geothermal power solutions for East Africa',
    growthRate: 'High',
    salaryRange: 'KES 100,000 - 300,000/month',
    skills: ['Engineering', 'Physics', 'Project Management'],
  },
  {
    title: 'Agricultural Technologist',
    pathway: 'STEM',
    description: 'Apply technology to improve farming and food security',
    growthRate: 'Medium',
    salaryRange: 'KES 50,000 - 150,000/month',
    skills: ['Agriculture', 'Technology', 'Biology'],
  },
  {
    title: 'Biomedical Engineer',
    pathway: 'STEM',
    description: 'Develop medical devices and healthcare technology',
    growthRate: 'High',
    salaryRange: 'KES 90,000 - 250,000/month',
    skills: ['Biology', 'Engineering', 'Chemistry'],
  },
  {
    title: 'Cybersecurity Specialist',
    pathway: 'STEM',
    description: 'Protect organizations from cyber threats and data breaches',
    growthRate: 'High',
    salaryRange: 'KES 100,000 - 400,000/month',
    skills: ['Network Security', 'Programming', 'Risk Analysis'],
  },
  {
    title: 'Civil Engineer',
    pathway: 'STEM',
    description: 'Design and oversee construction of infrastructure projects',
    growthRate: 'Medium',
    salaryRange: 'KES 80,000 - 280,000/month',
    skills: ['Mathematics', 'Physics', 'Project Management'],
  },
  {
    title: 'Medical Doctor',
    pathway: 'STEM',
    description: 'Diagnose and treat patients in hospitals and clinics',
    growthRate: 'High',
    salaryRange: 'KES 150,000 - 500,000/month',
    skills: ['Biology', 'Chemistry', 'Patient Care'],
  },
  {
    title: 'Pharmacist',
    pathway: 'STEM',
    description: 'Dispense medications and advise on pharmaceutical care',
    growthRate: 'Medium',
    salaryRange: 'KES 80,000 - 200,000/month',
    skills: ['Chemistry', 'Biology', 'Communication'],
  },
  {
    title: 'Cloud Solutions Architect',
    pathway: 'STEM',
    description: 'Design cloud computing infrastructure for businesses',
    growthRate: 'High',
    salaryRange: 'KES 120,000 - 450,000/month',
    skills: ['Cloud Platforms', 'Networking', 'System Design'],
  },
  
  // Social Sciences Careers
  {
    title: 'Digital Marketing Manager',
    pathway: 'Social Sciences',
    description: 'Lead online marketing strategies for Kenyan businesses',
    growthRate: 'High',
    salaryRange: 'KES 60,000 - 180,000/month',
    skills: ['Marketing', 'Analytics', 'Communication'],
  },
  {
    title: 'Financial Analyst',
    pathway: 'Social Sciences',
    description: 'Analyze investments and guide financial decisions',
    growthRate: 'Medium',
    salaryRange: 'KES 80,000 - 220,000/month',
    skills: ['Economics', 'Mathematics', 'Research'],
  },
  {
    title: 'Human Resources Manager',
    pathway: 'Social Sciences',
    description: 'Build and manage talented teams in organizations',
    growthRate: 'Medium',
    salaryRange: 'KES 70,000 - 200,000/month',
    skills: ['Communication', 'Psychology', 'Leadership'],
  },
  {
    title: 'Policy Analyst',
    pathway: 'Social Sciences',
    description: 'Shape government policies for national development',
    growthRate: 'Medium',
    salaryRange: 'KES 60,000 - 150,000/month',
    skills: ['Research', 'Writing', 'Critical Thinking'],
  },
  {
    title: 'Lawyer/Advocate',
    pathway: 'Social Sciences',
    description: 'Represent clients in legal matters and court proceedings',
    growthRate: 'Medium',
    salaryRange: 'KES 80,000 - 400,000/month',
    skills: ['Legal Knowledge', 'Argumentation', 'Research'],
  },
  {
    title: 'Journalist/News Anchor',
    pathway: 'Social Sciences',
    description: 'Report news and inform the public on current events',
    growthRate: 'Medium',
    salaryRange: 'KES 50,000 - 250,000/month',
    skills: ['Writing', 'Communication', 'Research'],
  },
  {
    title: 'Entrepreneur/Business Owner',
    pathway: 'Social Sciences',
    description: 'Start and grow businesses that create jobs and value',
    growthRate: 'High',
    salaryRange: 'KES 50,000 - 1,000,000+/month',
    skills: ['Business Planning', 'Leadership', 'Innovation'],
  },
  {
    title: 'Psychologist/Counselor',
    pathway: 'Social Sciences',
    description: 'Help individuals overcome mental health challenges',
    growthRate: 'High',
    salaryRange: 'KES 60,000 - 180,000/month',
    skills: ['Psychology', 'Empathy', 'Communication'],
  },
  {
    title: 'International Relations Officer',
    pathway: 'Social Sciences',
    description: 'Work with foreign governments and international organizations',
    growthRate: 'Medium',
    salaryRange: 'KES 100,000 - 350,000/month',
    skills: ['Diplomacy', 'Languages', 'Cultural Awareness'],
  },
  {
    title: 'Real Estate Manager',
    pathway: 'Social Sciences',
    description: 'Manage property investments and real estate transactions',
    growthRate: 'High',
    salaryRange: 'KES 70,000 - 300,000/month',
    skills: ['Negotiation', 'Finance', 'Market Analysis'],
  },
  
  // Arts & Sports Careers
  {
    title: 'Content Creator/Influencer',
    pathway: 'Arts & Sports',
    description: 'Create engaging content for social media and digital platforms',
    growthRate: 'High',
    salaryRange: 'KES 30,000 - 500,000/month',
    skills: ['Creativity', 'Video Production', 'Marketing'],
  },
  {
    title: 'Professional Athlete',
    pathway: 'Arts & Sports',
    description: 'Compete at national and international sports levels',
    growthRate: 'Medium',
    salaryRange: 'KES 50,000 - 2,000,000/month',
    skills: ['Physical Fitness', 'Discipline', 'Teamwork'],
  },
  {
    title: 'Fashion Designer',
    pathway: 'Arts & Sports',
    description: 'Design clothing and accessories for Kenyan and global markets',
    growthRate: 'Medium',
    salaryRange: 'KES 40,000 - 150,000/month',
    skills: ['Design', 'Creativity', 'Business'],
  },
  {
    title: 'Film/Video Producer',
    pathway: 'Arts & Sports',
    description: 'Produce films and video content for Kenya\'s growing media industry',
    growthRate: 'High',
    salaryRange: 'KES 50,000 - 300,000/month',
    skills: ['Storytelling', 'Technical Skills', 'Leadership'],
  },
  {
    title: 'Professional Musician',
    pathway: 'Arts & Sports',
    description: 'Perform, compose, and produce music for audiences',
    growthRate: 'High',
    salaryRange: 'KES 30,000 - 1,000,000/month',
    skills: ['Musical Talent', 'Performance', 'Creativity'],
  },
  {
    title: 'Sports Coach/Trainer',
    pathway: 'Arts & Sports',
    description: 'Train athletes and teams to achieve peak performance',
    growthRate: 'Medium',
    salaryRange: 'KES 40,000 - 200,000/month',
    skills: ['Sports Knowledge', 'Leadership', 'Communication'],
  },
  {
    title: 'Graphic Designer',
    pathway: 'Arts & Sports',
    description: 'Create visual designs for brands, websites, and media',
    growthRate: 'High',
    salaryRange: 'KES 40,000 - 180,000/month',
    skills: ['Design Software', 'Creativity', 'Visual Communication'],
  },
  {
    title: 'Actor/Actress',
    pathway: 'Arts & Sports',
    description: 'Perform in films, TV shows, and theatre productions',
    growthRate: 'Medium',
    salaryRange: 'KES 30,000 - 500,000/month',
    skills: ['Acting', 'Expression', 'Voice Control'],
  },
  {
    title: 'Event Planner',
    pathway: 'Arts & Sports',
    description: 'Organize and coordinate weddings, concerts, and corporate events',
    growthRate: 'High',
    salaryRange: 'KES 50,000 - 250,000/month',
    skills: ['Organization', 'Creativity', 'Negotiation'],
  },
  {
    title: 'Interior Designer',
    pathway: 'Arts & Sports',
    description: 'Design beautiful and functional living and working spaces',
    growthRate: 'Medium',
    salaryRange: 'KES 50,000 - 200,000/month',
    skills: ['Design', 'Spatial Awareness', 'Client Relations'],
  },
  {
    title: 'Photographer',
    pathway: 'Arts & Sports',
    description: 'Capture moments and tell stories through professional photography',
    growthRate: 'Medium',
    salaryRange: 'KES 30,000 - 150,000/month',
    skills: ['Photography', 'Editing', 'Creativity'],
  },
  {
    title: 'Chef/Culinary Artist',
    pathway: 'Arts & Sports',
    description: 'Create exceptional dishes in restaurants and hotels',
    growthRate: 'High',
    salaryRange: 'KES 40,000 - 200,000/month',
    skills: ['Cooking', 'Creativity', 'Time Management'],
  },
];

// Full question pool for randomization - indirect scenario-based questions
export const allQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'You find an old, mysterious box in your grandparent\'s attic. You would first:',
    options: [
      { text: 'Examine its mechanism and figure out how to open it', pathway: 'STEM' },
      { text: 'Research its history and what it might have been used for', pathway: 'Social Sciences' },
      { text: 'Appreciate its craftsmanship and imagine its story', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 2,
    question: 'During a power outage at night, you would most likely:',
    options: [
      { text: 'Check the fuse box and troubleshoot the issue', pathway: 'STEM' },
      { text: 'Call neighbors to see if they\'re affected and coordinate', pathway: 'Social Sciences' },
      { text: 'Light candles and enjoy the change of atmosphere', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 3,
    question: 'A friend asks for advice on choosing a new phone. You focus on:',
    options: [
      { text: 'Comparing specifications, battery life, and processing power', pathway: 'STEM' },
      { text: 'Discussing value for money and what their friends use', pathway: 'Social Sciences' },
      { text: 'Looking at the design, camera quality for photos, and colors', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 4,
    question: 'You notice a bird building a nest outside your window. You think about:',
    options: [
      { text: 'The engineering precision and physics of the nest structure', pathway: 'STEM' },
      { text: 'How bird behavior reflects survival and community instincts', pathway: 'Social Sciences' },
      { text: 'The beauty of nature and wanting to sketch or photograph it', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 5,
    question: 'Your family is planning to renovate the kitchen. You get excited about:',
    options: [
      { text: 'The plumbing, electrical work, and how appliances will be installed', pathway: 'STEM' },
      { text: 'The budget, getting quotes, and coordinating with contractors', pathway: 'Social Sciences' },
      { text: 'Choosing colors, tiles, and making the space look beautiful', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 6,
    question: 'You\'re stuck in traffic. To pass time, you:',
    options: [
      { text: 'Wonder about traffic flow patterns and how signals could be optimized', pathway: 'STEM' },
      { text: 'Listen to a podcast about current events or business', pathway: 'Social Sciences' },
      { text: 'Enjoy your music playlist or daydream about creative ideas', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 7,
    question: 'At a family gathering, you naturally end up:',
    options: [
      { text: 'Fixing someone\'s phone or explaining how something works', pathway: 'STEM' },
      { text: 'Catching up on family news and mediating discussions', pathway: 'Social Sciences' },
      { text: 'Entertaining the kids or taking photos of everyone', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 8,
    question: 'You discover a shortcut to school/work. You appreciate it because:',
    options: [
      { text: 'You calculated it saves exactly 7 minutes each way', pathway: 'STEM' },
      { text: 'You can share it with others and help them save time too', pathway: 'Social Sciences' },
      { text: 'The route passes by a nice park with beautiful scenery', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 9,
    question: 'When cooking a meal, you tend to:',
    options: [
      { text: 'Follow the recipe precisely, measuring everything exactly', pathway: 'STEM' },
      { text: 'Think about who will eat it and what they prefer', pathway: 'Social Sciences' },
      { text: 'Experiment with flavors and focus on presentation', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 10,
    question: 'A younger cousin asks why the sky is blue. You:',
    options: [
      { text: 'Explain light scattering and wavelengths in simple terms', pathway: 'STEM' },
      { text: 'Ask them what color they think it should be and explore ideas', pathway: 'Social Sciences' },
      { text: 'Point out how many shades of blue there are at different times', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 11,
    question: 'You\'re helping organize a birthday party. You volunteer to handle:',
    options: [
      { text: 'Setting up the sound system and lighting', pathway: 'STEM' },
      { text: 'Managing the guest list and sending invitations', pathway: 'Social Sciences' },
      { text: 'Decorating the venue and choosing the playlist', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 12,
    question: 'While waiting at a bus stop, you observe:',
    options: [
      { text: 'How the bus schedule could be more efficient', pathway: 'STEM' },
      { text: 'The different types of people and wonder about their stories', pathway: 'Social Sciences' },
      { text: 'Interesting street art or take photos of the surroundings', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 13,
    question: 'Your phone battery is draining fast. Your first reaction is to:',
    options: [
      { text: 'Check which apps are using power and optimize settings', pathway: 'STEM' },
      { text: 'Ask friends if they\'ve had similar issues and what they did', pathway: 'Social Sciences' },
      { text: 'Not worry much - you can survive without it for a while', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 14,
    question: 'When packing for a trip, you prioritize:',
    options: [
      { text: 'A checklist and making sure all essentials are covered', pathway: 'STEM' },
      { text: 'Gifts for people you\'ll visit and travel documents', pathway: 'Social Sciences' },
      { text: 'Outfits that look good and your camera or sketchbook', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 15,
    question: 'A classmate copies your work. You feel most bothered by:',
    options: [
      { text: 'The fact that they didn\'t try to understand the solution themselves', pathway: 'STEM' },
      { text: 'The unfairness of the situation and what it means for trust', pathway: 'Social Sciences' },
      { text: 'That they didn\'t put in their own creative effort', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 16,
    question: 'You receive money as a gift. Your first thought is:',
    options: [
      { text: 'Save it or invest it in something useful like a course or gadget', pathway: 'STEM' },
      { text: 'Think about who gave it and how to thank them properly', pathway: 'Social Sciences' },
      { text: 'Buy something fun - clothes, art supplies, or event tickets', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 17,
    question: 'During a long matatu/bus journey, you:',
    options: [
      { text: 'Read articles or watch educational videos', pathway: 'STEM' },
      { text: 'Chat with fellow passengers or observe conversations', pathway: 'Social Sciences' },
      { text: 'Listen to music, doodle, or take photos of the scenery', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 18,
    question: 'Your neighbor\'s dog won\'t stop barking. You think:',
    options: [
      { text: 'There must be a logical trigger - maybe a sound or animal nearby', pathway: 'STEM' },
      { text: 'I should talk to the neighbor about it politely', pathway: 'Social Sciences' },
      { text: 'Poor dog might be stressed - I wonder if playing music would help', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 19,
    question: 'When trying a new restaurant, you pay attention to:',
    options: [
      { text: 'Whether the food is well-prepared and the portions are fair', pathway: 'STEM' },
      { text: 'The service, atmosphere, and whether you\'d recommend it', pathway: 'Social Sciences' },
      { text: 'The presentation of dishes and the décor of the place', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 20,
    question: 'You overhear someone sharing wrong information. You:',
    options: [
      { text: 'Feel compelled to correct them with accurate facts', pathway: 'STEM' },
      { text: 'Consider whether it\'s your place to say something and how', pathway: 'Social Sciences' },
      { text: 'Let it go unless it\'s really important - not your problem', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 21,
    question: 'Your favorite part of a movie is usually:',
    options: [
      { text: 'The plot logic, realistic technology, or clever twists', pathway: 'STEM' },
      { text: 'The character relationships and emotional depth', pathway: 'Social Sciences' },
      { text: 'The cinematography, soundtrack, and visual style', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 22,
    question: 'When you see a rainbow, you think:',
    options: [
      { text: 'About light refraction and the physics creating the colors', pathway: 'STEM' },
      { text: 'It\'s a nice moment to share - you\'d tell someone about it', pathway: 'Social Sciences' },
      { text: 'It\'s beautiful and you want to take a picture or paint it', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 23,
    question: 'A friend is upset about failing an exam. You:',
    options: [
      { text: 'Offer to help them study more effectively next time', pathway: 'STEM' },
      { text: 'Listen to them vent and offer emotional support', pathway: 'Social Sciences' },
      { text: 'Suggest doing something fun to take their mind off it', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 24,
    question: 'At a market, you\'re drawn to:',
    options: [
      { text: 'Gadgets, electronics, or useful household tools', pathway: 'STEM' },
      { text: 'Negotiating good deals and chatting with vendors', pathway: 'Social Sciences' },
      { text: 'Handmade crafts, colorful fabrics, and unique items', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 25,
    question: 'When assembling furniture from a box, you:',
    options: [
      { text: 'Read the manual carefully and follow steps precisely', pathway: 'STEM' },
      { text: 'Call a friend to help and make it a social activity', pathway: 'Social Sciences' },
      { text: 'Figure it out by looking at the picture - manuals are boring', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 26,
    question: 'You notice a leak in the roof during rain. You first:',
    options: [
      { text: 'Investigate where the water is coming from and assess damage', pathway: 'STEM' },
      { text: 'Alert family members and discuss who to call for repairs', pathway: 'Social Sciences' },
      { text: 'Grab a bucket and towels to manage the immediate situation', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 27,
    question: 'When choosing what to wear, you consider:',
    options: [
      { text: 'What\'s practical for the weather and activities planned', pathway: 'STEM' },
      { text: 'What impression you want to make on people you\'ll meet', pathway: 'Social Sciences' },
      { text: 'What looks good together and expresses your style', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 28,
    question: 'Your internet suddenly stops working. You:',
    options: [
      { text: 'Check the router, run diagnostics, and troubleshoot', pathway: 'STEM' },
      { text: 'Call the service provider and calmly explain the issue', pathway: 'Social Sciences' },
      { text: 'Use the time to do something offline like reading or exercise', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 29,
    question: 'When planning your day, you prefer:',
    options: [
      { text: 'A detailed schedule with times for each activity', pathway: 'STEM' },
      { text: 'Knowing who you\'ll see and what conversations to have', pathway: 'Social Sciences' },
      { text: 'Keeping it flexible for spontaneous moments', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 30,
    question: 'You find a wallet on the street. You:',
    options: [
      { text: 'Look for ID to figure out how to return it efficiently', pathway: 'STEM' },
      { text: 'Think about how worried the owner must be and try to find them', pathway: 'Social Sciences' },
      { text: 'Hand it to nearby security or a shop - someone will sort it out', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 31,
    question: 'When someone shares good news, you:',
    options: [
      { text: 'Ask detailed questions about how it happened', pathway: 'STEM' },
      { text: 'Congratulate them warmly and celebrate with them', pathway: 'Social Sciences' },
      { text: 'Suggest a way to mark the occasion - dinner, photos, etc.', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 32,
    question: 'You\'re bored at home with nothing to do. You:',
    options: [
      { text: 'Watch documentaries or tinker with something around the house', pathway: 'STEM' },
      { text: 'Call a friend or scroll through social media to see what\'s happening', pathway: 'Social Sciences' },
      { text: 'Put on music, draw, exercise, or start a creative project', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 33,
    question: 'When you can\'t sleep at night, you typically:',
    options: [
      { text: 'Read articles or think about problems you want to solve', pathway: 'STEM' },
      { text: 'Reflect on conversations or plan what to say to someone', pathway: 'Social Sciences' },
      { text: 'Listen to calming music or imagine creative scenarios', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 34,
    question: 'A teacher/boss asks for a volunteer. You step up if it involves:',
    options: [
      { text: 'Setting up equipment or solving a technical problem', pathway: 'STEM' },
      { text: 'Representing the group or speaking on behalf of others', pathway: 'Social Sciences' },
      { text: 'Performing, demonstrating, or showcasing something creative', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 35,
    question: 'At the end of a long day, you feel most satisfied if you:',
    options: [
      { text: 'Accomplished something tangible - fixed, built, or learned something', pathway: 'STEM' },
      { text: 'Had meaningful conversations and helped someone', pathway: 'Social Sciences' },
      { text: 'Did something you enjoyed - exercise, music, or creativity', pathway: 'Arts & Sports' },
    ],
  },
];

// Function to get randomized questions for each session
export function getRandomQuizQuestions(count: number = 15): QuizQuestion[] {
  const shuffled = [...allQuizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q, index) => ({ ...q, id: index + 1 }));
}

// Legacy export for compatibility
export const quizQuestions = allQuizQuestions.slice(0, 10);

// Job market trends 2026 weights
export const jobMarketWeights: Record<Pathway, number> = {
  'STEM': 1.25, // High demand for tech
  'Social Sciences': 1.1, // Steady demand
  'Arts & Sports': 1.15, // Growing creative economy
};
