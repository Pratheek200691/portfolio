
export interface PortfolioSection {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  description: string;
  speechText: string;
  accentColor?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  projectUrl: string; 
  githubUrl: string;  
  featured: boolean;
  accentColor?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: { name: string; icon: string }[];
}



export const SECTIONS: PortfolioSection[] = [
  {
    id: 'hero',
    index: 0,
    title: 'PRATHEEK D JAIN',
    subtitle: 'Full Stack Web & App Developer',
    description: 'Building web experiences, Android applications and intelligent digital solutions.',
    speechText:
      "Welcome. I am the portfolio interface of Pratheek D Jain, a Full Stack Web and App Developer. I build web experiences, Android applications, and intelligent digital solutions. Feel free to explore by scrolling or using the arrow keys.",
    accentColor: '#00d4ff',
  },
  {
    id: 'about',
    index: 1,
    title: 'SYSTEM DIAGNOSTIC',
    subtitle: 'About Me',
    description:
      'Hi, I am Pratheek D Jain. I am a Full Stack Web and App Developer passionate about creating modern web applications, Android applications and practical digital solutions.',
    speechText:
      "Hi. I am Pratheek D Jain. I am a Full Stack Web and App Developer, passionate about creating modern web applications, Android applications, and practical digital solutions. I work with technologies including HTML, CSS, JavaScript, TypeScript, Kotlin, Android, APIs, Databases, and Git. I enjoy turning ideas into functional applications and continuously learning new technologies.",
    accentColor: '#00d4ff',
  },
  {
    id: 'skills',
    index: 2,
    title: 'TECH STACK',
    subtitle: 'Core Technologies',
    description: 'The tools and technologies I use to build powerful digital experiences.',
    speechText:
      "My tech stack spans multiple domains. On the frontend, I work with HTML5, CSS3, JavaScript, and TypeScript. For mobile development, I use Kotlin and Android. For backend and full stack work, I work with APIs, Databases, and server-side development. My tooling includes Git, GitHub, and various development tools.",
    accentColor: '#00d4ff',
  },
  {
    id: 'kotlin',
    index: 3,
    title: 'KOTLIN / ANDROID',
    subtitle: 'Mobile Development',
    description:
      'Currently mastering Kotlin to build powerful Android applications. Applied this knowledge to develop a real-world SMS spam detection Android app.',
    speechText:
      "I am currently learning Kotlin and have applied my Kotlin skills to build an Android SMS spam detection application. Kotlin is a modern, expressive language that runs on the JVM and is the preferred language for Android development. My focus is on building practical, real-world Android applications.",
    accentColor: '#7c4dff',
  },
  {
    id: 'spamshield',
    index: 4,
    title: 'SPAM SHIELD',
    subtitle: 'Featured Project — Android App',
    description:
      'An Android application designed to detect and block spam SMS messages using Kotlin. Features intelligent message classification, real-time filtering, and an intuitive interface.',
    speechText:
      "Spam Shield is my flagship Android project. It is an application designed to detect and block spam SMS messages, built using Kotlin. The app features intelligent message classification, real-time filtering, and a clean intuitive interface. It demonstrates my ability to build practical, problem-solving Android applications.",
    accentColor: '#7c4dff',
  },
  {
    id: 'blooddonation',
    index: 5,
    title: 'BLOOD DONATION PLATFORM',
    subtitle: 'Featured Project — Web Platform',
    description:
      'A full-stack web platform designed to connect donors with blood donation resources. Focused on accessibility, user experience, and real-time information delivery.',
    speechText:
      "The Blood Donation Platform is a web platform I built to connect people with blood donation resources. It focuses on accessibility, user-friendly design, and making critical information easy to find. This project demonstrates my full-stack web development skills and my ability to build platforms with real social impact.",
    accentColor: '#ff3366',
  },
  {
    id: 'projects',
    index: 6,
    title: 'PROJECT ARCHIVE',
    subtitle: 'Web Development Work',
    description: 'A collection of websites, web applications, and development projects.',
    speechText:
      "Here is my project archive, showcasing a collection of websites and web applications I have built. Each project represents a unique challenge and demonstrates my versatility across different technologies and domains.",
    accentColor: '#00d4ff',
  },
  {
    id: 'experience',
    index: 7,
    title: 'LEARNING MATRIX',
    subtitle: 'Experience & Growth',
    description: 'My continuous journey of learning, building, and growing as a developer.',
    speechText:
      "My development journey has been driven by curiosity and a passion for building. I am continuously expanding my skills across web development and mobile development, currently diving deeper into Kotlin for Android. Every project is an opportunity to learn something new.",
    accentColor: '#00d4ff',
  },
  {
    id: 'contact',
    index: 8,
    title: "LET'S BUILD SOMETHING",
    subtitle: 'Get In Touch',
    description:
      "Have an idea? Let's collaborate and build something extraordinary together.",
    speechText:
      "Thanks for exploring my portfolio. If you'd like to build something together, send me a message and I'll get back to you as soon as possible. I am always open to exciting new projects and collaborations.",
    accentColor: '#00d4ff',
  },
];



export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: '⬡',
    skills: [
      { name: 'HTML5', icon: '🔶' },
      { name: 'CSS3', icon: '🔷' },
      { name: 'JavaScript', icon: '⚡' },
      { name: 'TypeScript', icon: '🔵' },
    ],
  },
  {
    name: 'Mobile',
    icon: '◈',
    skills: [
      { name: 'Kotlin', icon: '🟣' },
      { name: 'Android', icon: '🟢' },
    ],
  },
  {
    name: 'Backend & Full Stack',
    icon: '⬢',
    skills: [
      { name: 'APIs', icon: '🔗' },
      { name: 'Databases', icon: '🗄️' },
      { name: 'Full Stack', icon: '🔄' },
    ],
  },
  {
    name: 'Tools',
    icon: '⚙',
    skills: [
      { name: 'Git', icon: '🔀' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'Dev Tools', icon: '🛠️' },
    ],
  },
];



export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'spam-shield',
    title: 'Spam Shield',
    description:
      'An Android application that detects and blocks spam SMS messages using intelligent classification algorithms built in Kotlin.',
    technologies: ['Kotlin', 'Android', 'SMS API', 'Machine Learning'],
    projectUrl: 'YOUR_SPAM_SHIELD_DEMO_URL', 
    githubUrl: 'YOUR_SPAM_SHIELD_GITHUB_URL', 
    featured: true,
    accentColor: '#7c4dff',
  },
  {
    id: 'blood-donation',
    title: 'Blood Donation Platform',
    description:
      'A full-stack web platform connecting donors with blood donation resources, focusing on accessibility and real-time information.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Full Stack'],
    projectUrl: 'YOUR_BLOOD_DONATION_DEMO_URL', 
    githubUrl: 'YOUR_BLOOD_DONATION_GITHUB_URL', 
    featured: true,
    accentColor: '#ff3366',
  },
];

export const OTHER_PROJECTS: Project[] = [
  {
    id: 'project-alpha',
    title: 'Project Alpha',                           
    description: 'A web application showcasing modern frontend development techniques and interactive user experiences.', 
    technologies: ['HTML', 'CSS', 'JavaScript'],      
    projectUrl: 'YOUR_PROJECT_ALPHA_URL',             
    githubUrl: 'YOUR_PROJECT_ALPHA_GITHUB_URL',       
    featured: false,
    accentColor: '#00d4ff',
  },
  {
    id: 'project-beta',
    title: 'Project Beta',                            
    description: 'A full-stack web solution built to solve real-world problems with clean code and thoughtful design.', 
    technologies: ['TypeScript', 'CSS', 'APIs'],      
    projectUrl: 'YOUR_PROJECT_BETA_URL',              
    githubUrl: 'YOUR_PROJECT_BETA_GITHUB_URL',        
    featured: false,
    accentColor: '#00d4ff',
  },
  {
    id: 'project-gamma',
    title: 'Project Gamma',                           
    description: 'An innovative web project demonstrating full-stack capabilities and creative problem solving.', 
    technologies: ['JavaScript', 'Databases', 'Git'], 
    projectUrl: 'YOUR_PROJECT_GAMMA_URL',             
    githubUrl: 'YOUR_PROJECT_GAMMA_GITHUB_URL',       
    featured: false,
    accentColor: '#00d4ff',
  },
];



export const TECH_BADGES = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript',
  'Kotlin', 'Android', 'Full Stack', 'Git', 'APIs', 'Databases',
];



export interface LearningItem {
  year: string;
  title: string;
  description: string;
  tech: string[];
}

export const LEARNING_TIMELINE: LearningItem[] = [
  {
    year: 'NOW',
    title: 'Mastering Kotlin & Android',
    description: 'Diving deep into Kotlin for Android development, building real-world applications like Spam Shield.',
    tech: ['Kotlin', 'Android'],
  },
  {
    year: 'ACTIVE',
    title: 'Full Stack Web Development',
    description: 'Building complete web experiences from frontend interfaces to backend APIs and databases.',
    tech: ['TypeScript', 'JavaScript', 'APIs', 'Databases'],
  },
  {
    year: 'CORE',
    title: 'Frontend Mastery',
    description: 'Strong foundation in HTML5, CSS3, JavaScript, and TypeScript for modern web interfaces.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
  },
  {
    year: 'BASE',
    title: 'Developer Foundation',
    description: 'Git version control, collaborative development, project structure, and clean code principles.',
    tech: ['Git', 'GitHub'],
  },
];
