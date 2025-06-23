import React, { useState } from 'react';
import styles from './Home.module.css';
import { motion, AnimatePresence } from 'framer-motion';

import RotatingText from '../../components/common/RotatingText/RotatingText';
import ScrollVelocity from '../../components/common/ScrollVelocity/ScrollVelocity';
import ProfileCard from '../../components/common/ProfileCard/ProfileCard';
import ScrambledText from '../../components/common/ScrambledText/ScrambledText';
import ScrollFloat from '../../components/effects/ScrollFloat/ScrollFloat';
import EducationTimeline from '../../components/common/EducationTimeline/EducationTimeline';
import SkillCard from '../../components/common/SkillCard/SkillCard';
import ProjectPopup from '../../components/common/ProjectPopup/ProjectPopup';

import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGithub, FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiCss3, SiHtml5, SiExpress } from 'react-icons/si';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import profilePicture from '../../assets/images/pp.png';
import setaraImage from '../../assets/images/setara.png';
import webLabImage from '../../assets/images/web lab.png';


const AboutSection: React.FC = () => {
  const itemVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 15, duration: 0.8, delay: 0.2 }}};

  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        <motion.div
          className={styles.aboutContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={itemVariants}
        >
          <ScrollFloat containerClassName={styles.sectionHeading}>
            About Me
          </ScrollFloat>
          <div className={styles.aboutLayout}>
            <div className={styles.profileCardContainer}>
              <ProfileCard
                name="HILMY BAIHAQI"
                title="Next Web-Developer"
                handle="hilmybaihaqi"
                status="Crafting with Code"
                contactText="Contact Me"
                avatarUrl={profilePicture}
                showUserInfo={false}
                enableTilt={true}
                onContactClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            </div>
            <div className={styles.aboutDescription}>
              <ScrambledText
                className={styles.sectionText}
                radius={100}
                duration={1.5}
                speed={0.3}
              >
                {`As a web developer, I transform complex ideas into intuitive and elegant digital experiences. Specializing in modern web technologies, my primary focus is on building responsive and seamless interfaces, ensuring every interaction feels natural to the user.

I am driven by technical challenges and constantly seek new knowledge in this dynamic industry. I believe collaboration is the key to creating impactful solutions. Let's build something amazing together.`}
              </ScrambledText>
              
              <div className={styles.aboutSocialLinks}>
                <a href="https://github.com/hilmybaihaqii" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/hilmy-baihaqi-bb4619283/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                <a href="https://www.instagram.com/hilmybaihaaqi_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://www.facebook.com/hilmy.baihaqi.338?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillsSection: React.FC = () => {
  const skillsData = [
    { name: 'React.js', icon: <FaReact />, level: 90, category: 'Frontend', color: '#61DAFB', details: { experience: '1+ years', projects: 'Project Portfolio ', focus: 'Hooks, State Management (Context, Redux), Performance' } },
    { name: 'TypeScript', icon: <SiTypescript />, level: 85, category: 'Frontend', color: '#3178C6', details: { experience: '1+ years', projects: 'All recent React projects', focus: 'Static Typing, Interfaces, Generics' } },
    { name: 'JavaScript', icon: <SiJavascript />, level: 88, category: 'Frontend', color: '#F7DF1E', textColor: '#000', details: { experience: '1+ years', projects: 'The fundamentals of all web projects', focus: 'ES6+, Async/Await, DOM Manipulation' } },
    { name: 'HTML5', icon: <SiHtml5 />, level: 95, category: 'Frontend', color: '#E34F26', details: { experience: '1+ years', projects: 'The structure of all web pages', focus: 'Semantic HTML, Accessibility' } },
    { name: 'CSS3', icon: <SiCss3 />, level: 92, category: 'Frontend', color: '#1572B6', details: { experience: '1+ years', projects: 'Styling all web pages', focus: 'Flexbox, Grid, Animations, Responsive Design' } },
    { name: 'Node.js', icon: <FaNodeJs />, level: 75, category: 'Backend', color: '#339933', details: { experience: '1+ years', projects: 'API for internal applications', focus: 'RESTful APIs, Middleware' } },
    { name: 'Express.js', icon: <SiExpress />, level: 70, category: 'Backend', color: '#444444', details: { experience: '1+ years', projects: 'Main Framework for backend', focus: 'Routing, Middleware' } },
    { name: 'Figma', icon: <FaFigma />, level: 80, category: 'Tools', color: '#F24E1E', details: { experience: '1+ years', projects: 'UI/UX & Prototyping', focus: 'Prototyping, Component-based Design' } },
  ];

  const [activeFilter, setActiveFilter] = useState('All');

  const filteredSkills = activeFilter === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeFilter);

  const filterButtons = ['All', 'Frontend', 'Backend', 'Tools'];

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <ScrollFloat containerClassName={styles.sectionHeading} ease='power4.out'>
          My Skills & Expertise
        </ScrollFloat>

        <div className={styles.filterButtons}>
          {filterButtons.map(filter => (
            <button
              key={filter}
              className={`${styles.filterButton} ${activeFilter === filter ? styles.activeFilter : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className={styles.skillsGrid}>
          <AnimatePresence>
            {filteredSkills.map(skill => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectsSection: React.FC = () => {
  const projectsData = [
          {
	text: 'Educational Website',
      image: setaraImage ,
      description: 'SetaraKita is an educational web platform dedicated to promoting and raising awareness of gender equality in Indonesia. The site aims to provide a better understanding of the importance of gender equality in various aspects of life.',
      link: 'https://setarakita.netlify.app/',
      tech: ['HTML5', 'CSS3', 'Javascript']
    },
    {
      text: 'Lab Website',
      image: webLabImage,
      description: 'As a first work and landing page for a lab recruitment assignment, this is a very impressive result.',
      link: 'https://stirring-panda-496f9e.netlify.app/',
      tech: ['HTML5', 'CSS3']
    },
  ];

  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  const handleCardClick = (project: typeof projectsData[0]) => {
    setSelectedProject(project);
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className={styles.projectsSection}>
        <div className="container">
          <ScrollFloat containerClassName={styles.sectionHeading} ease='power4.out'>
            Featured Projects
          </ScrollFloat>
          
          <motion.div 
            className={styles.projectGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {projectsData.map((project) => (
              <motion.div
                key={project.text}
                className={styles.projectCard}
                onClick={() => handleCardClick(project)}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)" }}
              >
                <div className={styles.projectImage} style={{ backgroundImage: `url(${project.image})` }}></div>
                <div className={styles.projectCardContent}>
                  <h3 className={styles.projectTitle}>{project.text}</h3>
                  <div className={styles.projectTech}>
                    {project.tech.slice(0, 3).map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectPopup project={selectedProject} onClose={handleClosePopup} />
    </>
  );
};

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={styles.contactHeader}>
            <span className={styles.contactSubtitle}>What's Next?</span>
            <h2 className={styles.contactTitle}>Let's Work Together!</h2>
            <p className={styles.contactDescription}>
              I am always open to discussing new projects, creative ideas, or opportunities to be a part of your vision. Please feel free to contact me.
            </p>
          </div>

          <div className={styles.contactLayout}>
            {/* Kolom Kiri: Peta Interaktif */}
            <div className={styles.contactVisual}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.8996634335!2d106.75924747752531!3d-6.229749554033246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1719101569728!5m2!1sen!2sid"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Kolom Kanan: Info Kontak */}
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <FaEnvelope />
                </div>
                <div className={styles.contactText}>
                  <h4>Email</h4>
                  <a href="https://gmail.com/">hilmybaihaqi08@gmail.com</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <FaLinkedinIn />
                </div>
                <div className={styles.contactText}>
                  <h4>LinkedIn</h4>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">Hilmy Baihaqi</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <FaMapMarkerAlt />
                </div>
                <div className={styles.contactText}>
                  <h4>Location</h4>
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


const Home: React.FC = () => {
  const rotatingTexts = ["UI/UX Designer", "Front-end Developer", "Web Enthusiast", "Creative Thinker", "Tech Explorer"];
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } } };
  const itemVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 15, duration: 0.8 } } };
  const floatingVariants = { float: { y: ["0%", "-5%", "0%"], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } } };
  const buttonVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 15, duration: 0.8, delay: 1.0 } } };

  return (
    <>
      <section id="home" className={styles.homeSection}>
        <div className="container">
          <motion.div
            className={styles.homeContent}
            variants={{ ...containerVariants, float: floatingVariants.float }}
            initial="hidden"
            animate={["visible", "float"]}
            viewport={{ once: false, amount: 0.5 }}
          >
            <motion.h1 className={styles.headingPrimary} variants={itemVariants}>HELLO EVERYONE, I'M <span className={styles.highlightName}>HILMY BAIHAQI</span></motion.h1>
            <motion.h2 className={styles.headingSecondary} variants={itemVariants}>
              I AM A{" "}
              <RotatingText
                texts={rotatingTexts}
                rotationInterval={3000}
                staggerDuration={0.05}
                mainClassName={styles.rotatingTextMain}
                elementLevelClassName={styles.rotatingTextElement}
              />
            </motion.h2>
            <motion.p className={styles.shortDescription} variants={itemVariants}>With a strong passion for user-centric design and clean code, I build web solutions that are not just functional, but also beautiful and impactful. Let's create something amazing together😎.</motion.p>
            <motion.div className={styles.buttonsContainer} variants={buttonVariants}>
              <a href="#about" className={styles.seeMoreButton}>Discover More</a>
              <a href="#contact" className={styles.contactMeButton}>Contact me</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.greetingSection}>
        <ScrollVelocity 
          texts={["Welcome to My Playground • ", "Let's Create Together • "]} 
          velocity={35}
          className={styles.greetingText}
        />
      </section>

      <AboutSection />
      <EducationTimeline />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
};

export default Home;