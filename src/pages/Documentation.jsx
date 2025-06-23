import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Documentation = () => {
  return (
    <motion.div
      className="min-h-screen py-16 px-6 bg-white text-gray-900
                 dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] dark:text-white
                 transition-colors duration-500"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.3 } },
      }}
    >
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Header */}
        <motion.header className="text-center" variants={fadeIn}>
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
            📖 Documentation officielle
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Retrouvez ici toutes les informations pour intégrer et utiliser les APIs de InivGenius.
          </p>
        </motion.header>

        {/* Manuel d'utilisation */}
        <motion.section
          className="rounded-xl p-8 bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-lg"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2">
            📘 Manuel d'utilisation de l'application
          </h2>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-200 space-y-3 leading-relaxed">
            <li>
              <strong>Accéder à la page d’accueil :</strong> Rendez-vous sur{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">https://inivgenius.com</code>.
            </li>
            <li>
              <strong>Saisir une requête :</strong> Utilisez la barre de recherche pour taper une question ou un mot-clé.
            </li>
            <li>
              <strong>Choisir des filtres intelligents :</strong> Sélectionnez des options telles que{" "}
              <em>Type de contenu</em>, <em>Domaine</em>, <em>Langue</em>, ou <em>Période</em> pour affiner vos résultats.
            </li>
            <li>
              <strong>Résultats IA :</strong> Consultez les résultats enrichis par IA (résumés, score de pertinence, IA badge).
            </li>
            <li>
              <strong>Suggestions intelligentes :</strong> Explorez les recommandations générées automatiquement en bas de page.
            </li>
            <li>
              <strong>Mode sombre / clair :</strong> Changez le thème via le bouton en haut à droite.
            </li>
            <li>
              <strong>Feedback :</strong> Cliquez sur "Donner un avis" pour améliorer le moteur.
            </li>
          </ol>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
            *Disponible également sur mobile avec une interface 100% responsive.*
          </p>
        </motion.section>

        {/* Structure API */}
        <motion.section
          className="rounded-xl p-8 bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-lg"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2">🧭 Structure générale de l’API</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-3 leading-relaxed">
            <li>
              <strong>GET /api/v1/search</strong> — Recherche principale
            </li>
            <li>
              <strong>GET /api/v1/suggestions</strong> — Suggestions dynamiques
            </li>
            <li>
              <strong>POST /api/v1/feedback</strong> — Envoi de feedback utilisateur
            </li>
            <li>
              <strong>GET /api/v1/stats</strong> — Statistiques de recherche
            </li>
          </ul>
        </motion.section>

        {/* Authentification */}
        <motion.section
          className="rounded-xl p-8 bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-lg"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2">🔐 Authentification</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            L’authentification se fait via une clé API envoyée dans les headers :
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm overflow-x-auto font-mono">
            {`GET /api/v1/search
Headers:
  Authorization: Bearer VOTRE_CLE_API`}
          </pre>
        </motion.section>

        {/* Exemples */}
        <motion.section
          className="rounded-xl p-8 bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-lg"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2">📥 Exemples d'utilisation</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm overflow-x-auto font-mono">
            {`fetch("https://inivgenius-api.com/api/v1/search?q=climat+IA", {
  headers: {
    Authorization: "Bearer VOTRE_CLE_API"
  }
})
.then(res => res.json())
.then(data => console.log(data));`}
          </pre>
        </motion.section>

        {/* Tester API */}
        <motion.section
          className="rounded-xl p-8 bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-lg text-center"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold mb-6 flex justify-center gap-2 items-center">
            🧪 Tester l’API en ligne
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://swagger.inivgenius.com"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Swagger UI
            </a>
            <a
              href="https://postman.inivgenius.com"
              target="_blank"
              rel="noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Postman Docs
            </a>
            <a
              href="https://github.com/inivgenius/api"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              GitHub Repository
            </a>
          </div>
        </motion.section>

        {/* Lien retour */}
        <motion.footer className="text-center" variants={fadeIn}>
          <Link
            to="/about"
            className="inline-block mt-10 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            ← Retour à la page À propos
          </Link>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default Documentation;
