import React, { useEffect, useRef } from "react";

export default function AboutUsPage() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const teamMembers = [
    {
      name: "Justine Massy",
      role: "Founder & CEO",
      bio: "Former Oxford University Professor with 15+ years in education technology",
      avatar: "JM",
      expertise: ["EdTech", "Curriculum Design", "Leadership"],
    },
    {
      name: "Clifford Badman",
      role: "Chief Learning Officer",
      bio: "Education specialist with expertise in curriculum development",
      avatar: "CB",
      expertise: ["Learning Science", "Assessment", "Pedagogy"],
    },
    {
      name: "Neil Rose",
      role: "Head of Product",
      bio: "Product management expert passionate about learning experiences",
      avatar: "NR",
      expertise: ["UX Design", "Product Strategy", "Innovation"],
    },
    {
      name: "Cade Dawson",
      role: "Technical Director",
      bio: "Software engineer dedicated to building scalable platforms",
      avatar: "CD",
      expertise: ["Cloud Architecture", "AI/ML", "Scalability"],
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Active Students",
      trend: "+25% this year",
    },
    {
      number: "500+",
      label: "Expert Tutors",
      trend: "Global network",
    },
    {
      number: "95%",
      label: "Success Rate",
      trend: "Student satisfaction",
    },
    {
      number: "25+",
      label: "Countries",
      trend: "Worldwide reach",
    },
  ];

  const values = [
    {
      icon: "👥",
      title: "Inclusive Learning",
      description:
        "Education accessible to everyone, everywhere regardless of background",
      features: [
        "Scholarship Programs",
        "Multi-language Support",
        "Accessibility First",
      ],
    },
    {
      icon: "⭐",
      title: "Quality First",
      description: "Rigorous standards for all courses and instructors",
      features: [
        "Expert Vetting",
        "Quality Assurance",
        "Continuous Improvement",
      ],
    },
    {
      icon: "🏆",
      title: "Student Success",
      description: "Your achievements drive us forward every day",
      features: ["Personalized Learning", "Career Support", "Lifetime Access"],
    },
  ];

  const companyInfo = [
    {
      icon: "📍",
      title: "Headquarters",
      description: "London, UK",
      detail: "Serving students worldwide",
    },
    {
      icon: "📅",
      title: "Founded",
      description: "2018",
      detail: "5+ years of excellence",
    },
    {
      icon: "💻",
      title: "Platform",
      description: "Online Learning",
      detail: "Cutting-edge technology",
    },
  ];

  const milestones = [
    {
      year: "2018",
      event: "EduCon Founded",
      description: "Launched with 10 courses",
    },
    {
      year: "2019",
      event: "10K Students",
      description: "Reached first major milestone",
    },
    {
      year: "2020",
      event: "Global Expansion",
      description: "Expanded to 15 countries",
    },
    {
      year: "2022",
      event: "AI Integration",
      description: "Launched smart learning features",
    },
    {
      year: "2023",
      event: "50K Students",
      description: "Current active user base",
    },
  ];

  const SectionHeader = ({ title, subtitle, center = true }) => (
    <div
      ref={addToRefs}
      className={`${
        center ? "text-center" : "text-left"
      } mb-16 relative opacity-0 transition-all duration-700`}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent relative">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6 font-light opacity-0 transition-all duration-700 delay-300">
          {subtitle}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 bg-fixed overflow-hidden">
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .stagger-animation > * {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .stagger-animation > *:nth-child(1) {
          animation-delay: 0.1s;
        }
        .stagger-animation > *:nth-child(2) {
          animation-delay: 0.2s;
        }
        .stagger-animation > *:nth-child(3) {
          animation-delay: 0.3s;
        }
        .stagger-animation > *:nth-child(4) {
          animation-delay: 0.4s;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 to-indigo-600">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10"></div>
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 animate-slide-in-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                About <span className="animate-float inline-block">EduCon</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-white font-semibold mb-4 opacity-95">
                UK's Premier Online Learning Platform
              </h2>
              <p className="text-lg md:text-xl text-white mb-8 leading-relaxed opacity-90">
                Transforming education through innovation, technology, and
                unwavering commitment to student success since 2018.
              </p>
            </div>
            <div className="opacity-0 animate-slide-in-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-pulse-glow">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4 animate-float">🎓</div>
                  <h3 className="text-2xl font-bold mb-2">
                    Innovating Education
                  </h3>
                  <p className="opacity-90">Since 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Info Section */}
      <div
        ref={addToRefs}
        className="max-w-7xl mx-auto mb-24 mt-8 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700"
      >
        <SectionHeader
          title="Company Information"
          subtitle="Key facts about our organization and global operations"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
          {companyInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-purple-100 h-full flex flex-col items-center transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 animate-float">
                {info.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {info.title}
              </h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {info.description}
              </div>
              <p className="text-gray-600 font-medium text-center">
                {info.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={addToRefs}
        className="py-16 mb-24 bg-white border border-purple-100 opacity-0 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Impact"
            subtitle="The numbers that showcase our global reach and educational effectiveness"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center border border-purple-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group"
              >
                <div className="text-5xl mb-4 animate-float">📊</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-purple-600 font-bold text-sm">
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story & Timeline Section */}
      <div
        ref={addToRefs}
        className="max-w-7xl mx-auto mb-24 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="opacity-0 animate-slide-in-left">
            <SectionHeader
              title="Our Journey"
              subtitle="The evolution of EduCon from a visionary idea to a global learning platform"
              center={false}
            />
            <p
              className="text-lg text-gray-700 leading-relaxed mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Founded in 2018 in the heart of London, EduCon emerged from Dr.
              Nilesh Roy's vision to revolutionize online education. We
              recognized the untapped potential of digital learning to bridge
              educational gaps worldwide.
            </p>
            <p
              className="text-lg text-gray-700 leading-relaxed mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              From our humble beginnings with just 10 meticulously crafted
              courses, we've grown into a comprehensive learning ecosystem that
              serves passionate learners across 25+ countries, constantly
              pushing the boundaries of what's possible in online education.
            </p>
            <p
              className="text-lg text-gray-700 leading-relaxed opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              Today, EduCon stands as a testament to innovation in education,
              blending cutting-edge technology with pedagogical excellence to
              create transformative learning experiences that empower students
              to achieve their fullest potential.
            </p>
          </div>
          <div className="opacity-0 animate-slide-in-right">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Our Milestones
              </h3>
              <div className="relative">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-start mb-6 relative opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                  >
                    {index < milestones.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-indigo-600 opacity-30"></div>
                    )}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/40 flex-shrink-0 mr-6 group hover:scale-110 transition-transform duration-300">
                      {milestone.year}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {milestone.event}
                      </h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div
        ref={addToRefs}
        className="max-w-7xl mx-auto mb-24 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700"
      >
        <SectionHeader
          title="Our Values"
          subtitle="The core principles that shape every decision and innovation at EduCon"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-purple-100 h-full flex flex-col items-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 animate-float">
                {value.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                {value.description}
              </p>
              <div className="w-full">
                {value.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="inline-block bg-purple-50 text-purple-600 text-sm font-medium px-3 py-1 rounded-full border border-purple-200 m-1 group-hover:bg-purple-100 group-hover:border-purple-300 transition-all duration-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div
        ref={addToRefs}
        className="py-16 mb-24 bg-white border border-purple-100 opacity-0 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Leadership Team"
            subtitle="Meet the visionary professionals driving EduCon's mission to transform education globally"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-purple-100 h-full flex flex-col items-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl group"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-purple-500/40 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 shadow-lg shadow-purple-500/40 group-hover:bg-indigo-700 transition-colors duration-300">
                  {member.role}
                </span>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {member.bio}
                </p>
                <div className="w-full">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-block border border-purple-600 text-purple-600 text-xs px-2 py-1 rounded-full m-1 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div
        ref={addToRefs}
        className="max-w-7xl mx-auto mb-16 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white text-center border border-white/20 relative overflow-hidden animate-pulse-glow">
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white/10 animate-float"></div>
          <div
            className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-white/10 animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shadow opacity-0 animate-fade-in-up">
              Our Commitment
            </h2>
            <p
              className="text-xl mb-12 opacity-95 font-light opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              To Students, Education, and Building a Better Future Through
              Learning
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-animation">
              <div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  Educational Excellence
                </h3>
                <p className="opacity-95 leading-relaxed">
                  We maintain the highest standards of educational quality,
                  ensuring every course and resource meets rigorous academic
                  criteria and delivers tangible value to our students
                  worldwide.
                </p>
              </div>
              <div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  Innovation & Technology
                </h3>
                <p className="opacity-95 leading-relaxed">
                  We continuously invest in cutting-edge technology and
                  innovative teaching methodologies to create engaging,
                  effective, and accessible learning experiences that prepare
                  students for the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
