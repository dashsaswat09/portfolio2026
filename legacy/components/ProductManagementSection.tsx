import React, { useState } from 'react';
import TiltCard from './TiltCard';
import ShootingStarsBackground from './ShootingStarsBackground';
import ProjectModal from './ProjectModal';
import ImageLightbox from './ImageLightbox';
import { Building, Calendar, TrendingUp, Award, Wrench, Target, FileText, BookOpen, PenTool, Eye } from 'lucide-react';

interface ProductManagementSectionProps {
  setActiveTab: (tab: string) => void;
}

const ProductManagementSection: React.FC<ProductManagementSectionProps> = ({ setActiveTab }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const caseStudies = [
    {
      title: "InstaPrepsAI Product Teardown",
      description: "Analyzed user behavior and trust signals across the onboarding journey to recommend design and product improvements that enhance engagement and retention.",
      detailedDescription: `Product Teardown: User Onboarding Process — InstaPrepsAI

This teardown analyzes the user onboarding journey of InstaPrepsAI, an AI-powered edtech platform designed to build students’ exam confidence through personalized diagnostics, live mentorship, and gamified learning. The platform caters to learners preparing for JEE, NEET, Olympiads, and placements—focusing especially on Tier 2/3 cities where access to affordable, expert guidance is limited.

The study highlights InstaPrepsAI’s strong value proposition of transforming “confidence” into a measurable learning metric through a 7-minute AI Confidence Test and personalized confidence reports. The onboarding flow builds early trust via IIT/NIT mentor branding and social proof, while clear CTAs and minimal friction support conversions.

Key recommendations include optimizing the landing page to showcase confidence analytics upfront, improving permission prompts with transparent value communication, and reducing OTP friction. Overall, the teardown demonstrates how thoughtful onboarding design, emotional resonance, and AI-driven insights can together enhance user trust, retention, and engagement in edtech products.`,
      tags: ["Product Strategy", "User Research", "React", "Node.js", "Figma", "A/B Testing"],
      duration: "3 months",
      role: "Product Management Intern",
      proofOfWork: {
        type: "pdf",
        url: "https://drive.google.com/file/d/1PglgbVnXtXXJofJhgjLO8sOMpYDagbwQ/view?usp=sharing",
        filename: "InstaPrepsAI_Product_Teardown.pdf"
      }
    },
    {
      title: "Devlaunch Community Engagement Strategy",
      description: "Designed and implemented a comprehensive community engagement strategy that increased user retention by 35%.",
      detailedDescription: "This case study explores how I transformed Devlaunch's user engagement through strategic community building. I analyzed user behavior patterns, identified key engagement drivers, and implemented a multi-channel approach including forums, events, and gamification. The strategy included creating user personas, developing content calendars, and establishing feedback loops. Results included 35% increase in monthly active users and 50% improvement in user-generated content.",
      tags: ["Community Management", "User Engagement", "Analytics", "Content Strategy", "Gamification"],
      duration: "4 months",
      role: "Community Product Manager",
      proofOfWork: {
        type: "ppt",
        url: "#",
        filename: "Devlaunch_Engagement_Strategy.pptx"
      }
    },
    {
      title: "Nexorea AI Mental Wellness Platform",
      description: "Co-founded and led product development for an AI-powered mental wellness platform with conversational AI features.",
      detailedDescription: "This comprehensive case study details the creation of Nexorea from concept to launch. I conducted 40+ user interviews to understand mental wellness needs, developed AI personas for emotional support, and created a privacy-first architecture. The platform uses advanced NLP for conversation analysis and provides personalized wellness recommendations. Key achievements include 85% onboarding success rate and 25% higher retention compared to industry standards.",
      tags: ["AI/ML", "Mental Health", "NLP", "Privacy Design", "Mobile Development", "User Research"],
      duration: "6 months",
      role: "Co-Founder & Product Head",
      proofOfWork: {
        type: "link",
        url: "https://nexorea.com/"
      }
    },
    {
      title: "Habuild Yoga Feature Enhancement",
      description: "Led feature development for yoga session management, resulting in 19% increase in class attendance.",
      detailedDescription: "This case study focuses on feature enhancement and user experience optimization for Habuild's yoga platform. I analyzed user feedback, identified pain points in session management, and designed solutions including 'Yoga Together' group sessions and flexible subscription management. The project involved extensive user testing, iterative design improvements, and performance optimization. Results included 19% increase in attendance and 30% reduction in subscription cancellations.",
      tags: ["Feature Development", "UX Design", "User Testing", "Analytics", "Subscription Management"],
      duration: "2 months",
      role: "Product Manager",
      proofOfWork: {
        type: "pdf",
        url: "#",
        filename: "Habuild_Yoga_Enhancement.pdf"
      }
    },
    {
      title: "Artisanal Marketplace Revenue Model",
      description: "Designed a scalable revenue model for an artisanal marketplace, projected to increase artist income by 20%.",
      detailedDescription: "This case study explores the development of a comprehensive revenue model for connecting artists with consumers. I conducted market research with 167 artists and 253 consumers, analyzed pricing strategies, and developed a four-stream revenue model. The project included competitive analysis, financial modeling, and go-to-market strategy development. The model addresses key challenges in the artisanal market including pricing transparency and artist visibility.",
      tags: ["Revenue Strategy", "Market Research", "Financial Modeling", "Business Strategy", "Pricing"],
      duration: "5 months",
      role: "Product Strategy Lead",
      proofOfWork: {
        type: "pdf",
        url: "#",
        filename: "Artisanal_Marketplace_Strategy.pdf"
      }
    },
    {
      title: "Tata Elxsi Navigation Product Concept",
      description: "Designed a navigation product concept that enhanced accuracy by 27% and won campus competition.",
      detailedDescription: "This case study details the development of an innovative navigation solution for Tata Elxsi's TELIPORT competition. I conducted user research on navigation pain points, developed a concept that leverages IoT and AI technologies, and created detailed product specifications. The solution includes real-time traffic optimization, predictive routing, and user preference learning. The project won the campus competition out of 7,000+ teams and demonstrated strong product thinking and technical innovation.",
      tags: ["Product Design", "IoT", "AI", "Navigation", "Competition", "Innovation"],
      duration: "15 Days",
      role: "Participant",
      proofOfWork: {
        type: "ppt",
        url: "https://docs.google.com/presentation/d/1eRT-9emmatmp7XKHnSbpCxF58C1QCHfE/edit?usp=sharing&ouid=104899482388793916720&rtpof=true&sd=true",
        filename: "Tata_Elxsi_Navigation_Concept.pptx"
      }
    }
  ];

  const blogs = [
    {
      title: "The Future of AI in Product Management",
      description: "Exploring how artificial intelligence is transforming product management practices and decision-making processes.",
      detailedDescription: "This comprehensive blog post examines the intersection of AI and product management, covering topics from automated user research to predictive analytics. I share insights from implementing AI tools in real product development scenarios, including case studies from InstaPrepsAI and Nexorea. The post includes practical frameworks for integrating AI into product workflows and discusses ethical considerations in AI-driven product decisions.",
      tags: ["AI", "Product Management", "Future Trends", "Technology"],
      duration: "Published Dec 2024",
      role: "Author",
      proofOfWork: {
        type: "link",
        url: "#"
      }
    },
    {
      title: "Building User-Centered Communities: Lessons from Devlaunch",
      description: "A deep dive into community building strategies that drive engagement and retention in SaaS platforms.",
      detailedDescription: "This blog post shares actionable insights from building and scaling the Devlaunch community. I discuss the psychology of community engagement, effective moderation strategies, and metrics that matter for community health. The post includes real examples of community initiatives, user feedback analysis, and the impact on product development. Readers will learn practical frameworks for community strategy and implementation.",
      tags: ["Community Building", "User Engagement", "SaaS", "Strategy"],
      duration: "Published Nov 2024",
      role: "Author",
      proofOfWork: {
        type: "link",
        url: "#"
      }
    },
    {
      title: "Mental Health Tech: Designing for Privacy and Trust",
      description: "Exploring the unique challenges of building mental health applications with privacy-first design principles.",
      detailedDescription: "This blog post examines the critical importance of privacy and trust in mental health technology. Drawing from experience building Nexorea, I discuss design principles for sensitive applications, data protection strategies, and building user trust. The post covers regulatory considerations, ethical design practices, and technical implementation of privacy features. It's a must-read for anyone building applications that handle sensitive user data.",
      tags: ["Mental Health", "Privacy", "UX Design", "Ethics"],
      duration: "Published Oct 2024",
      role: "Author",
      proofOfWork: {
        type: "link",
        url: "#"
      }
    },
    {
      title: "From Idea to Launch: A Product Manager's Journey",
      description: "A personal account of the challenges and triumphs in bringing innovative products to market.",
      detailedDescription: "This reflective blog post shares my journey as a product manager, from early career experiences to leading complex product initiatives. I discuss key lessons learned, common pitfalls to avoid, and strategies for success in product management. The post includes real examples from various projects, insights on stakeholder management, and advice for aspiring product managers. It's both personal and practical, offering valuable insights for product professionals at any level.",
      tags: ["Career", "Product Management", "Leadership", "Personal Growth"],
      duration: "Published Sep 2024",
      role: "Author",
      proofOfWork: {
        type: "link",
        url: "#"
      }
    },
    {
      title: "Data-Driven Product Decisions: A Practical Guide",
      description: "How to leverage analytics and user research to make informed product decisions that drive growth.",
      detailedDescription: "This comprehensive guide covers the practical application of data in product decision-making. I share frameworks for data collection, analysis techniques, and how to translate insights into actionable product strategies. The post includes real examples from various projects, common mistakes to avoid, and tools that can help product managers become more data-driven. It's designed for product managers looking to improve their analytical skills and decision-making processes.",
      tags: ["Analytics", "Data Science", "Product Strategy", "Decision Making"],
      duration: "Published Aug 2024",
      role: "Author",
      proofOfWork: {
        type: "link",
        url: "#"
      }
    },
    {
      title: "The Art of User Research: Beyond Surveys and Interviews",
      description: "Exploring advanced user research techniques that provide deeper insights into user behavior and needs.",
      detailedDescription: "This blog post goes beyond traditional user research methods to explore advanced techniques for understanding users. I discuss ethnographic research, behavioral analysis, and innovative research methodologies used in product development. The post includes practical examples from various projects, tools and techniques for conducting effective research, and how to synthesize findings into actionable insights. It's valuable for product managers, designers, and researchers looking to deepen their user understanding.",
      tags: ["User Research", "UX Research", "Methodology", "Insights"],
      duration: "Published Jul 2024",
      role: "Author",
      proofOfWork: {
        type: "link",
        url: "#"
      }
    }
  ];

  const prds = [
    {
      title: "InstaPrepsAI Assessment Platform PRD",
      description: "Comprehensive product requirements document for the student assessment platform, covering all features and technical specifications.",
      detailedDescription: "This detailed PRD outlines the complete product requirements for InstaPrepsAI's assessment platform. It includes user stories, acceptance criteria, technical specifications, and implementation timelines. The document covers assessment creation, student management, analytics dashboard, and integration requirements. It serves as the foundation for development and includes detailed wireframes, user flows, and success metrics. This PRD demonstrates comprehensive product planning and stakeholder alignment.",
      tags: ["PRD", "Assessment Platform", "EdTech", "Technical Specs"],
      duration: "2 weeks",
      role: "Product Manager",
      proofOfWork: {
        type: "pdf",
        url: "#",
        filename: "InstaPrepsAI_Assessment_PRD.pdf"
      }
    },
    {
      title: "Devlaunch Community Features PRD",
      description: "Product requirements for community engagement features including forums, events, and gamification elements.",
      detailedDescription: "This PRD details the requirements for Devlaunch's community engagement features. It includes detailed user personas, feature specifications, user flows, and success metrics. The document covers forum functionality, event management, gamification systems, and moderation tools. It demonstrates user-centered design thinking and includes comprehensive acceptance criteria for each feature. The PRD shows how community features integrate with the broader product ecosystem.",
      tags: ["PRD", "Community Features", "Gamification", "User Engagement"],
      duration: "3 weeks",
      role: "Product Manager",
      proofOfWork: {
        type: "pdf",
        url: "#",
        filename: "Devlaunch_Community_PRD.pdf"
      }
    },
    {
      title: "Nexorea AI Chat System PRD",
      description: "Detailed requirements for the AI-powered conversational system with emotional intelligence and personalization.",
      detailedDescription: "This comprehensive PRD outlines the requirements for Nexorea's AI chat system. It includes technical specifications for NLP processing, emotional analysis algorithms, and personalization engines. The document covers conversation flows, AI persona definitions, privacy requirements, and integration with wellness tracking. It demonstrates deep technical understanding and includes detailed API specifications, data models, and performance requirements. The PRD shows how AI can be integrated thoughtfully into mental health applications.",
      tags: ["PRD", "AI/ML", "Mental Health", "NLP", "Privacy"],
      duration: "4 weeks",
      role: "Product Manager",
      proofOfWork: {
        type: "pdf",
        url: "#",
        filename: "Nexorea_AI_Chat_PRD.pdf"
      }
    },
    {
      title: "Habuild Yoga Session Management PRD",
      description: "Product requirements for yoga session features including group sessions and subscription management.",
      detailedDescription: "This PRD details the requirements for Habuild's yoga session management features. It includes user stories for different user types, feature specifications for group sessions, and subscription management workflows. The document covers booking systems, payment processing, session recording, and user feedback mechanisms. It demonstrates understanding of the fitness industry and includes detailed user flows and acceptance criteria. The PRD shows how to balance user needs with business requirements.",
      tags: ["PRD", "Fitness", "Subscription", "Session Management"],
      duration: "2 weeks",
      role: "Product Manager",
      proofOfWork: {
        type: "pdf",
        url: "#",
        filename: "Habuild_Yoga_Sessions_PRD.pdf"
      }
    },
    {
      title: "Artisanal Marketplace Platform PRD",
      description: "Comprehensive requirements document for the artisanal marketplace including seller tools and buyer experience.",
      detailedDescription: "This extensive PRD outlines the requirements for a comprehensive artisanal marketplace platform. It includes detailed specifications for seller onboarding, product listing, payment processing, and buyer experience. The document covers marketplace dynamics, commission structures, dispute resolution, and analytics dashboards. It demonstrates understanding of marketplace business models and includes detailed user personas, user journeys, and success metrics. The PRD shows how to balance the needs of multiple stakeholder groups.",
      tags: ["PRD", "Marketplace", "E-commerce", "Multi-sided Platform"],
      duration: "5 weeks",
      role: "Product Manager",
      proofOfWork: {
        type: "pdf",
        url: "#",
        filename: "Artisanal_Marketplace_PRD.pdf"
      }
    },
    {
      title: "Tata Elxsi Navigation App PRD",
      description: "Product requirements for the innovative navigation application with IoT integration and AI optimization.",
      detailedDescription: "This PRD details the requirements for an innovative navigation application developed for Tata Elxsi's competition. It includes technical specifications for IoT integration, real-time traffic optimization, and AI-powered route suggestions. The document covers user interface design, backend architecture, and integration with external data sources. It demonstrates technical depth and includes detailed system architecture, API specifications, and performance requirements. The PRD shows how to balance innovation with practical implementation considerations.",
      tags: ["PRD", "Navigation", "IoT", "AI", "Mobile App"],
      duration: "2 weeks",
      role: "Product Manager",
      proofOfWork: {
        type: "pdf",
        url: "#",
        filename: "Tata_Elxsi_Navigation_PRD.pdf"
      }
    }
  ];

  const uiDesigns = [
    {
      src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      alt: "InstaPrepsAI Dashboard Design",
      title: "InstaPrepsAI Assessment Dashboard",
      description: "Clean, intuitive dashboard design for educators to manage assessments and track student progress.",
      link: "#",
      images: [
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      alt: "Devlaunch Community Interface",
      title: "Devlaunch Community Platform",
      description: "Modern community interface with forums, events, and gamification elements to boost engagement.",
      link: "#",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "Nexorea AI Chat Interface",
      title: "Nexorea AI Wellness Chat",
      description: "Empathetic AI chat interface designed for mental wellness support with privacy-first approach.",
      link: "#",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop"
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      alt: "Habuild Yoga App Design",
      title: "Habuild Yoga Session App",
      description: "Zen-inspired mobile app design for yoga sessions with group features and subscription management.",
      link: "#",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop"
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      alt: "Artisanal Marketplace Design",
      title: "Artisanal Marketplace Platform",
      description: "Elegant marketplace design showcasing artisanal products with seller tools and buyer experience.",
      link: "#",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "Navigation App Interface",
      title: "Smart Navigation App",
      description: "Modern navigation interface with IoT integration and AI-powered route optimization features.",
      link: "#",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=800&h=600&fit=crop"
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      alt: "Analytics Dashboard Design",
      title: "Product Analytics Dashboard",
      description: "Comprehensive analytics dashboard for product managers to track key metrics and user behavior.",
      link: "#",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop"
      ]
    },
    {
      src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      alt: "User Research Platform",
      title: "User Research Platform",
      description: "Intuitive platform for conducting user research, managing interviews, and analyzing feedback.",
      link: "#",
      images: [
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
      ]
    }
  ];
  const internships = [
    {
      title: "Product Management Intern",
      company: "InstaPrepsAI",
      type: "B2B & B2C, EdTech",
      duration: "June '25 - Present",
      achievements: [
        "Directed a 6-member team to launch a Student Admin Assessment platform in 9 days",
        "Drove 67% MAU growth (to 1,397) by developing a relaunch strategy to improve onboarding via behavioral analysis & A/B testing",
        "Accelerated product iteration by 67% using rapid prototyping with Lovable & Google AI Studio"
      ]
    },
    {
      title: "Product Management Intern",
      company: "Devlaunch",
      type: "B2B, SaaS",
      duration: "April '25 - July '25",
      achievements: [
        "Drove 5% DAU growth by integrating gamification (streaks & badges)",
        "Reduced bounce rate by 12% by conducting 37 user interviews and translating insights into PRDs",
        "Orchestrated 10% engagement growth by launching community forums and personalized event reminders"
      ]
    },
    {
      title: "Product Management Intern",
      company: "Habuild",
      type: "B2C, Health-Tech",
      duration: "Aug '24 - Nov '24",
      achievements: [
        "Increased attendance by 19% within 3 months by launching 'Yoga Together' and 'Pause My Subscription' features"
      ]
    }
  ];

  const entrepreneurialExperiences = [
    {
      title: "Co-Founder and Product Head",
      company: "Nexorea",
      link: "https://nexorea.com/",
      type: "AI Mental Wellness",
      duration: "May '25 - Present",
      achievements: [
        "Uncovered market need via 40+ interviews, reframing insights into an AI-first diary concept",
        "Drove 85% onboarding success with a mobile-first MVP and privacy-by-design UX",
        "Achieved 25% higher retention by engineering conversational AI with 5 emotional personas"
      ]
    }
  ];

  const projects = [
    {
      title: "Artisanal Marketplace",
      subtitle: "BTP-1",
      achievements: [
        "Conducted market research with 167 artists and 253 consumers to identify key challenges",
        "Designed a scalable revenue model with four streams, projected to increase artist income by 20%",
        "Built an admin platform with six tools, enhancing artist efficiency by 25%"
      ]
    }
  ];

  const competitions = [
    {
      title: "Tata Elxsi TELIPORT",
      achievement: "Campus Winner",
      description: "Designed a navigation product concept, enhancing accuracy by 27%"
    },
    {
      title: "Top PM Fellow @NextLeap (Zomato)",
      description: "Projected a 24% increase in detailed reviews through impactful UI design enhancements"
    }
  ];

  const skills = [
    {
      category: "Product Management",
      items: ["Figma", "Balsamiq", "Notion", "Confluence", "JIRA", "User Research", "A/B Testing"]
    },
    {
      category: "Frameworks",
      items: ["RICE", "AARRR", "HEART", "MOSCOW", "CIRCLE", "Scrum", "Kanban", "OKRs", "Jobs to Be Done", "Kano Model", "Lean Startup"]
    },
    {
      category: "Analytics",
      items: ["SQL", "MS Excel", "Clevertap", "Amplitude", "Tableau", "Power BI"]
    }
  ];

  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-hidden">
      <ShootingStarsBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Product Management</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Strategic product leadership with proven track record of driving user growth, improving engagement, and launching successful products
        </p>
        <div className="mt-6">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            See my Work
          </button>
        </div>
      </div>


      {/* Entrepreneurial Experiences */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Award className="text-yellow-500 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Entrepreneurial Experiences</h2>
        </div>
        <div className="space-y-8">
          {entrepreneurialExperiences.map((exp, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-8 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{exp.title}</h3>
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-1 underline hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-1">{exp.company}</p>
                  )}
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{exp.type}</p>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-medium">{exp.duration}</span>
                </div>
              </div>
              <div className="space-y-3">
                {exp.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start">
                    <TrendingUp className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Internships */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Building className="text-white-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Internships</h2>
        </div>
        <div className="space-y-8">
          {internships.map((internship, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-8 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{internship.title}</h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-1">{internship.company}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{internship.type}</p>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-medium">{internship.duration}</span>
                </div>
              </div>
              <div className="space-y-3">
                {internship.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start">
                    <TrendingUp className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-16" id="projects">
        <div className="flex items-center mb-8">
          <Wrench className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Projects</h2>
        </div>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-8 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{project.subtitle}</p>
              
              <div className="space-y-3">
                {project.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start">
                    <Target className="text-blue-500 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Competitions & Achievements */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Award className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Competitions & Achievements</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {competitions.map((competition, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{competition.title}</h3>
              {competition.achievement && (
                <p className="text-orange-600 dark:text-orange-400 font-semibold mb-2">{competition.achievement}</p>
              )}
              <p className="text-gray-700 dark:text-gray-300">{competition.description}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <FileText className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Case Studies</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-6 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{study.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">{study.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {study.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium border border-blue-200/50 dark:border-blue-700/50"
                  >
                    {tag}
                  </span>
                ))}
                {study.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100/80 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                    +{study.tags.length - 3} more
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setSelectedProject(study)}
                className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-200 flex items-center justify-center"
              >
                <Eye className="mr-2" size={16} />
                View Work
              </button>
            </TiltCard>
          ))}
        </div>
      </section>

      {/*
      Blogs Section (commented out)
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <BookOpen className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Blogs</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-6 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{blog.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">{blog.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-medium border border-green-200/50 dark:border-green-700/50"
                  >
                    {tag}
                  </span>
                ))}
                {blog.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100/80 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                    +{blog.tags.length - 3} more
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedProject(blog)}
                className="w-full px-4 py-2 bg-green-600 dark:bg-green-500 text-white font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-400 transition-colors duration-200 flex items-center justify-center"
              >
                <Eye className="mr-2" size={16} />
                View Work
              </button>
            </TiltCard>
          ))}
        </div>
      </section>
      */}

      {/* PRDs */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <PenTool className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">PRDs</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prds.map((prd, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-6 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{prd.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">{prd.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {prd.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-purple-100/80 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium border border-purple-200/50 dark:border-purple-700/50"
                  >
                    {tag}
                  </span>
                ))}
                {prd.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100/80 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                    +{prd.tags.length - 3} more
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setSelectedProject(prd)}
                className="w-full px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-700 dark:hover:bg-purple-400 transition-colors duration-200 flex items-center justify-center"
              >
                <Eye className="mr-2" size={16} />
                View Work
              </button>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* UI/UX Design */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <PenTool className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">UI/UX Design</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uiDesigns.map((design, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(design)}
            >
              <div className="relative overflow-hidden rounded-xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200">
                <img
                  src={design.src}
                  alt={design.alt}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Eye className="text-white" size={24} />
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{design.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{design.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills and Expertise */}
      <section>
        <div className="flex items-center mb-8">
          <Target className="text-blue-600 mr-3" size={28} />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-300">Skills and Expertise</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <TiltCard key={index} className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Modals */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      <ImageLightbox
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
      </div>
    </div>
  );
};

export default ProductManagementSection;