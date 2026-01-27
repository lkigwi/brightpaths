// EduPath AI Data - CBC Kenya Pathways, Subjects, and Careers

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
];

// Interest Quiz Questions
export const quizQuestions: QuizQuestion[] = [
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
];

// Academic subjects for grade input
export const academicSubjects = [
  { name: 'Integrated Science', pathway: 'STEM' as Pathway, weight: 1.2 },
  { name: 'Mathematics', pathway: 'STEM' as Pathway, weight: 1.3 },
  { name: 'Pre-Technical Studies', pathway: 'STEM' as Pathway, weight: 1.1 },
  { name: 'Social Studies', pathway: 'Social Sciences' as Pathway, weight: 1.2 },
  { name: 'Business Studies', pathway: 'Social Sciences' as Pathway, weight: 1.1 },
  { name: 'Languages (English/Kiswahili)', pathway: 'Social Sciences' as Pathway, weight: 1.0 },
  { name: 'Creative Arts', pathway: 'Arts & Sports' as Pathway, weight: 1.2 },
  { name: 'Physical & Health Education', pathway: 'Arts & Sports' as Pathway, weight: 1.1 },
];

// Job market trends 2026 weights
export const jobMarketWeights: Record<Pathway, number> = {
  'STEM': 1.25, // High demand for tech
  'Social Sciences': 1.1, // Steady demand
  'Arts & Sports': 1.15, // Growing creative economy
};
