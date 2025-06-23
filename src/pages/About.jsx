import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Images équipe
import Alice from '../assets/team/ai.jpeg';
import Jean from '../assets/team/ai1.jpeg';
import Mina from '../assets/team/ai3.jpg';

// Images tech
import NLP from '../assets/tech/ai1.jpeg';
import ML from '../assets/tech/ai.jpeg';
import Summarization from '../assets/tech/ai3.jpg';
import Crawling from '../assets/tech/ai2.jpg';

// Données équipe
const teamMembers = [
  { name: 'Alice Dubois', role: 'Chercheuse IA', photo: Alice },
  { name: 'Jean Traoré', role: 'Développeur principal', photo: Jean },
  { name: 'Mina Zhang', role: 'Designer UX/UI', photo: Mina },
];

const techImages = [NLP, ML, Summarization, Crawling];

// Animations
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const About = () => {
  return (
    <motion.div
      className="py-16 px-6 transition-all duration-500 bg-white text-gray-900 dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] dark:text-white"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Intro */}
        <motion.div className="text-center" variants={fadeInUp}>
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">🚀 À propos de InivGenius</h1>
          <p className="text-gray-400 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Une recherche plus intelligente, plus rapide. Propulsée par l'IA.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div className="rounded-xl p-8 shadow-lg bg-white/70 dark:bg-white/10 backdrop-blur-md" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-6">🎯 Notre mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Chez InivGenius, notre mission est de transformer la manière dont les utilisateurs découvrent et interagissent avec l'information.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Plus qu’un simple moteur de recherche, InivGenius aspire à devenir un assistant intelligent qui accélère la prise de décision.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Notre vision : rendre la recherche plus humaine, intuitive et puissante grâce à l’intelligence artificielle.
          </p>
        </motion.div>

        {/* Ressources */}
        <motion.div className="rounded-xl p-8 shadow-lg bg-white/70 dark:bg-white/10 backdrop-blur-md" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-6 text-center">📚 Ressources & Documentation</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            Explorez nos guides, tutoriels interactifs et ressources techniques.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/documentation"
              className="group bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-xl transition">
              <div className="flex items-center space-x-3">
                <span className="text-blue-600 dark:text-blue-400 text-xl">📖</span>
                <div>
                  <h3 className="font-semibold text-lg">Documentation officielle</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">API, endpoints, intégration technique.</p>
                </div>
              </div>
            </Link>

            <a href="https://youtube.com/@InivGenius" target="_blank" rel="noreferrer noopener"
              className="group bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-xl transition">
              <div className="flex items-center space-x-3">
                <span className="text-red-500 text-xl">🎥</span>
                <div>
                  <h3 className="font-semibold text-lg">Vidéos & démonstrations</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cas d’usage, démos IA interactives.</p>
                </div>
              </div>
            </a>

            <a href="https://github.com/inivgenius/tutorials" target="_blank" rel="noreferrer noopener"
              className="group bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-xl transition">
              <div className="flex items-center space-x-3">
                <span className="text-green-600 text-xl">💡</span>
                <div>
                  <h3 className="font-semibold text-lg">Tutoriels & intégrations</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Guides d’intégration IA dans vos apps.</p>
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Histoire */}
        <motion.div className="rounded-xl p-8 shadow-lg bg-white/70 dark:bg-white/10 backdrop-blur-md" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-6">📜 Notre histoire</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            InivGenius est née de la passion commune d’experts en IA, data science et design pour une recherche plus intelligente.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Notre équipe a conçu une plateforme qui comprend le langage humain, offre des résultats précis et une expérience fluide.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Aujourd’hui, nous accompagnons des milliers d’utilisateurs dans leur quête d’informations pertinentes et personnalisées.
          </p>
        </motion.div>

        {/* Technologies */}
        <motion.div className="rounded-xl p-8 shadow-lg bg-white/70 dark:bg-white/10 backdrop-blur-md" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-6">🧠 Technologies utilisées</h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-3 mb-6">
            <li><strong>NLP :</strong> compréhension contextuelle et sémantique.</li>
            <li><strong>Machine Learning :</strong> classement intelligent et apprentissage continu.</li>
            <li><strong>Résumés IA :</strong> synthèse automatique de contenu long.</li>
            <li><strong>Web Crawling :</strong> indexation rapide et mise à jour du web.</li>
            <li><strong>Interface UI/UX IA :</strong> expérience fluide, intuitive et responsive.</li>
          </ul>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {techImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Tech ${index + 1}`}
                  className="rounded-lg h-32 w-full object-cover p-2 bg-white/10 dark:bg-white/5"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Équipe */}
        <motion.div className="rounded-xl p-8 shadow-lg bg-white/70 dark:bg-white/10 backdrop-blur-md" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-6 text-center">👥 L'équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                className="text-center bg-white/60 dark:bg-white/5 p-4 rounded-xl hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mx-auto w-24 h-24 rounded-full object-cover mb-3 border-2 border-white/20"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default About;
