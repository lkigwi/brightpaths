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
    pathway: Pathway;
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

// Full question pool for randomization
export const allQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'On a free Saturday, you would most enjoy:',
    options: [
      { text: 'Building a robot or coding a game', pathway: 'STEM' },
      { text: 'Reading about current events and discussing ideas', pathway: 'Social Sciences' },
      { text: 'Creating art, playing music, or practicing a sport', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 2,
    question: 'When working on a group project, you prefer to:',
    options: [
      { text: 'Handle the technical aspects and calculations', pathway: 'STEM' },
      { text: 'Research information and organize the presentation', pathway: 'Social Sciences' },
      { text: 'Design visuals and make it creative', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 3,
    question: 'Which TV show would you watch first?',
    options: [
      { text: 'A documentary about space exploration or technology', pathway: 'STEM' },
      { text: 'A news analysis or historical drama', pathway: 'Social Sciences' },
      { text: 'A talent show, sports event, or music competition', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 4,
    question: 'If you found a broken radio, you would:',
    options: [
      { text: 'Open it up and try to fix it yourself', pathway: 'STEM' },
      { text: 'Research how radios work and find a repair shop', pathway: 'Social Sciences' },
      { text: 'Use the parts to create an art piece', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 5,
    question: 'Your favorite subject in school is usually related to:',
    options: [
      { text: 'Mathematics, Science, or Computer Studies', pathway: 'STEM' },
      { text: 'History, Geography, or Business Studies', pathway: 'Social Sciences' },
      { text: 'Music, Art, or Physical Education', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 6,
    question: 'You admire people who are known for:',
    options: [
      { text: 'Scientific discoveries or technological innovations', pathway: 'STEM' },
      { text: 'Political leadership or business success', pathway: 'Social Sciences' },
      { text: 'Athletic achievements or artistic talent', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 7,
    question: 'When solving a problem, you typically:',
    options: [
      { text: 'Use logic, data, and step-by-step analysis', pathway: 'STEM' },
      { text: 'Consider different perspectives and discuss with others', pathway: 'Social Sciences' },
      { text: 'Trust your intuition and think creatively', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 8,
    question: 'In 10 years, you see yourself:',
    options: [
      { text: 'Working in a lab, tech company, or engineering firm', pathway: 'STEM' },
      { text: 'Managing a business, working in government, or law', pathway: 'Social Sciences' },
      { text: 'Performing, creating, or coaching professionally', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 9,
    question: 'A gift you would love to receive:',
    options: [
      { text: 'A science kit, laptop, or engineering set', pathway: 'STEM' },
      { text: 'Books, a journal, or business game', pathway: 'Social Sciences' },
      { text: 'Art supplies, musical instrument, or sports gear', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 10,
    question: 'You believe Kenya\'s future depends most on:',
    options: [
      { text: 'Technological innovation and scientific advancement', pathway: 'STEM' },
      { text: 'Strong governance, economy, and education', pathway: 'Social Sciences' },
      { text: 'Cultural expression, sports excellence, and creativity', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 11,
    question: 'Which activity sounds most exciting to you?',
    options: [
      { text: 'Conducting a science experiment', pathway: 'STEM' },
      { text: 'Organizing a community fundraiser', pathway: 'Social Sciences' },
      { text: 'Directing a short film or play', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 12,
    question: 'If you could start any club at school, it would be:',
    options: [
      { text: 'Robotics or coding club', pathway: 'STEM' },
      { text: 'Debate or Model UN club', pathway: 'Social Sciences' },
      { text: 'Dance, music, or sports club', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 13,
    question: 'Your friends often come to you for help with:',
    options: [
      { text: 'Math homework or fixing gadgets', pathway: 'STEM' },
      { text: 'Advice on personal issues or current events', pathway: 'Social Sciences' },
      { text: 'Creative projects or physical activities', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 14,
    question: 'When you visit a bookshop, you head to:',
    options: [
      { text: 'Science, technology, or engineering section', pathway: 'STEM' },
      { text: 'History, biography, or business section', pathway: 'Social Sciences' },
      { text: 'Art, photography, or sports section', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 15,
    question: 'You would rather win an award for:',
    options: [
      { text: 'A scientific discovery or invention', pathway: 'STEM' },
      { text: 'Leadership or community service', pathway: 'Social Sciences' },
      { text: 'Artistic talent or athletic achievement', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 16,
    question: 'On a field trip, you would choose to visit:',
    options: [
      { text: 'A science museum or tech company', pathway: 'STEM' },
      { text: 'Parliament, a law firm, or the UN office', pathway: 'Social Sciences' },
      { text: 'An art gallery, stadium, or film studio', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 17,
    question: 'If you could have any superpower, it would be:',
    options: [
      { text: 'Super intelligence or technopathy', pathway: 'STEM' },
      { text: 'Mind reading or perfect persuasion', pathway: 'Social Sciences' },
      { text: 'Super speed, strength, or artistic mastery', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 18,
    question: 'You feel most accomplished when you:',
    options: [
      { text: 'Solve a complex puzzle or build something', pathway: 'STEM' },
      { text: 'Help resolve a conflict or explain something clearly', pathway: 'Social Sciences' },
      { text: 'Create something beautiful or win a game', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 19,
    question: 'Your dream vacation would involve:',
    options: [
      { text: 'Visiting NASA, Silicon Valley, or CERN', pathway: 'STEM' },
      { text: 'Exploring historical sites or attending a global summit', pathway: 'Social Sciences' },
      { text: 'Attending a major sports event or arts festival', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 20,
    question: 'The subject of a podcast you\'d create would be about:',
    options: [
      { text: 'New technologies, space, or scientific discoveries', pathway: 'STEM' },
      { text: 'Politics, economics, or social issues', pathway: 'Social Sciences' },
      { text: 'Music reviews, sports analysis, or creative inspiration', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 21,
    question: 'When you hear about a new smartphone, you are most curious about:',
    options: [
      { text: 'The processor speed, camera technology, and specs', pathway: 'STEM' },
      { text: 'The price, brand reputation, and market impact', pathway: 'Social Sciences' },
      { text: 'The design, colors, and how it looks', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 22,
    question: 'If you could shadow someone for a day, it would be:',
    options: [
      { text: 'A surgeon, engineer, or software developer', pathway: 'STEM' },
      { text: 'A CEO, diplomat, or journalist', pathway: 'Social Sciences' },
      { text: 'A famous athlete, artist, or musician', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 23,
    question: 'Your ideal weekend project would be:',
    options: [
      { text: 'Building an app or experimenting with electronics', pathway: 'STEM' },
      { text: 'Writing an article or planning a business idea', pathway: 'Social Sciences' },
      { text: 'Painting, making music, or training for a sport', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 24,
    question: 'When watching the news, you pay most attention to:',
    options: [
      { text: 'Scientific breakthroughs and technology updates', pathway: 'STEM' },
      { text: 'Political developments and economic reports', pathway: 'Social Sciences' },
      { text: 'Entertainment news and sports highlights', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 25,
    question: 'You would describe your thinking style as:',
    options: [
      { text: 'Analytical and systematic', pathway: 'STEM' },
      { text: 'Strategic and people-oriented', pathway: 'Social Sciences' },
      { text: 'Creative and expressive', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 26,
    question: 'If you were to start a YouTube channel, it would be about:',
    options: [
      { text: 'Tech reviews, science experiments, or tutorials', pathway: 'STEM' },
      { text: 'Educational content, vlogs, or business tips', pathway: 'Social Sciences' },
      { text: 'Music covers, sports highlights, or art tutorials', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 27,
    question: 'In a crisis situation, you would naturally:',
    options: [
      { text: 'Analyze the situation and find a logical solution', pathway: 'STEM' },
      { text: 'Calm people down and coordinate the group', pathway: 'Social Sciences' },
      { text: 'Stay flexible and adapt quickly using instinct', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 28,
    question: 'The type of game you enjoy most is:',
    options: [
      { text: 'Puzzle games, strategy games, or simulations', pathway: 'STEM' },
      { text: 'Trivia, board games, or role-playing games', pathway: 'Social Sciences' },
      { text: 'Sports games, rhythm games, or creative sandbox games', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 29,
    question: 'Your room is most likely decorated with:',
    options: [
      { text: 'Gadgets, science posters, or a computer setup', pathway: 'STEM' },
      { text: 'Books, maps, or inspirational quotes', pathway: 'Social Sciences' },
      { text: 'Artwork, sports memorabilia, or musical instruments', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 30,
    question: 'When learning something new, you prefer:',
    options: [
      { text: 'Hands-on experiments and practical applications', pathway: 'STEM' },
      { text: 'Reading, discussions, and case studies', pathway: 'Social Sciences' },
      { text: 'Visual demonstrations and learning by doing creatively', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 31,
    question: 'If Kenya was facing an energy crisis, you would contribute by:',
    options: [
      { text: 'Developing renewable energy solutions', pathway: 'STEM' },
      { text: 'Creating awareness campaigns and policy proposals', pathway: 'Social Sciences' },
      { text: 'Using art or media to inspire conservation', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 32,
    question: 'Your favorite type of competition would be:',
    options: [
      { text: 'Science fair, coding hackathon, or math olympiad', pathway: 'STEM' },
      { text: 'Debate competition, business pitch, or essay contest', pathway: 'Social Sciences' },
      { text: 'Art exhibition, music competition, or sports tournament', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 33,
    question: 'When planning an event, you focus on:',
    options: [
      { text: 'Technical requirements and logistics', pathway: 'STEM' },
      { text: 'Guest list, budget, and promotional strategy', pathway: 'Social Sciences' },
      { text: 'Theme, entertainment, and creative elements', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 34,
    question: 'If you could invent something, it would be:',
    options: [
      { text: 'A new technology or scientific tool', pathway: 'STEM' },
      { text: 'A new business model or social system', pathway: 'Social Sciences' },
      { text: 'A new art form or sports equipment', pathway: 'Arts & Sports' },
    ],
  },
  {
    id: 35,
    question: 'What motivates you most in life?',
    options: [
      { text: 'Solving complex problems and making discoveries', pathway: 'STEM' },
      { text: 'Making an impact on society and helping others succeed', pathway: 'Social Sciences' },
      { text: 'Expressing yourself and achieving physical or creative excellence', pathway: 'Arts & Sports' },
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
