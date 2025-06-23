// src/components/common/ProjectPopup/ProjectPopup.tsx (Struktur Diperbarui)
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectPopup.module.css';
import { IoMdClose } from 'react-icons/io';

type Project = {
  text: string;
  image: string;
  description: string;
  link: string;
  tech: string[];
};

interface ProjectPopupProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.popupOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.popupContent}
            initial={{ y: 50, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose} aria-label="Close popup">
              <IoMdClose />
            </button>
            
            <img src={project.image} alt={project.text} className={styles.popupImage} />
            
            {/* DITAMBAHKAN: div pembungkus untuk semua detail teks */}
            <div className={styles.popupDetails}>
              <h2 className={styles.popupTitle}>{project.text}</h2>
              <p className={styles.popupDescription}>{project.description}</p>
              <h3>Framework:</h3>
              <div className={styles.techStack}>
                {project.tech.map(tech => (
                  <span key={tech} className={styles.techBadge}>{tech}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
                visit the site
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPopup;