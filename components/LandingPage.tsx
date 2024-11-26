"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  UserCheck,
  MessageCircle,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Users,
  Smartphone,
  Globe,
  Star,
  Menu, // Import Menu icon for the hamburger menu
  X, // Import X icon for closing the menu
} from "lucide-react";
import Link from "next/link";

const TechHerLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const featuresTabs = [
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: "Traduction en langue des signes",
      description:
        "Une solution innovante pour inclure les femmes muettes ou sourdes.",
      features: [
        "Traduction à l'aide d'un video en temps réels des languages de signes",
        "Soutient des femmes handicapées",
        "Aide pour simplifiées leur plaintes",
        "Ressources de bien-être mental",
      ],
      image: "Learning languages-amico.svg",
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Porter plainte facilement",
      description:
        "Soumettez une plainte avec preuves, bénéficiez de la reconnaissance des langues des signes et suivez son état en temps réel.",
      features: [
        "Un suivi de près par les responsables",
        "Soumettez facilement une plainte avec des preuves (texte, audio ou vidéo)",
        "Utilisez la reconnaissance des langues des signes pour une accessibilité totale.",
        "Suivez l’état de vos plaintes en temps réel.",
      ],
      image: "/Documents-amico.svg",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Communauté de soutien",
      description: "Un réseau de soutien bienveillant et inclusif.",
      features: [
        "Partage d'expériences",
        "Groupes de soutien thématiques",
        "Mentorat entre utilisatrices",
        "Événements et webinaires",
      ],
      image: "/Online connection-bro.svg",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Quiz et recommandation",
      description: "Accédez à des ressources éducatives sur l'harcèlement.",
      features: [
        "Apprendre en résolvant les quiz",
        "Recevez des recommandations personnalisées pour agir face aux situations difficiles.",
        "Participez à des quizz interactifs pour reconnaître les différents types de harcèlement.",
        "Communauté d'apprentissage",
      ],
      image: "/Online Doctor-pana.svg",
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Accessibilité",
      description: "Une plateforme accessible sur tous vos appareils.",
      features: [
        "Interface utilisateur intuitive",
        "Notifications personnalisées",
        "Support multilingue",
      ],
      image: "/Mobile inbox-bro.svg",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="text-primary-light w-8 h-8" />
            <span className="text-xl font-bold text-primary-dark">
              Tech'Her
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-primary-light hover:text-primary-dark transition"
            >
              Accueil
            </a>
            <a
              href="#"
              className="text-primary-light hover:text-primary-dark transition"
            >
              Fonctionnalités
            </a>
            <a
              href="#"
              className="text-primary-light hover:text-primary-dark transition"
            >
              À propos
            </a>
            <Link
              href="/login"
              className="bg-primary-light text-white px-4 py-2 rounded-full hover:bg-primary-light transition"
            >
              Connexion
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-light"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col items-center py-4">
              <a
                href="#"
                className="text-primary-light hover:text-primary-dark transition py-2"
              >
                Accueil
              </a>
              <a
                href="#"
                className="text-primary-light hover:text-primary-dark transition py-2"
              >
                Fonctionnalités
              </a>
              <a
                href="#"
                className="text-primary-light hover:text-primary-dark transition py-2"
              >
                À propos
              </a>
              <a
                href="#"
                className="text-primary-light px-4 py-2 rounded-full hover:bg-primary-light transition"
              >
                Connexion
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-6 pt-32 pb-16 grid md:grid-cols-2 gap-16 items-center"
      >
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm">
            Nouvelle plateforme de protection des droits de la femme
          </div>
          <h1 className="text-4xl font-bold text-primary-dark leading-tight">
            Brisons les chaînes du harcèlement, liberons notre feu intérieur
          </h1>
          <p className="text-xl text-primary-light leading-relaxed">
            Une plateforme conçue pour protéger, soutenir, et autonomiser les
            femmes face au harcèlement.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/login"
              className="bg-primary-light text-white px-6 py-3 rounded-lg hover:bg-primary-light transition flex items-center"
            >
              Commencer <ArrowRight className="ml-2" />
            </Link>
            <Link
              href="/login"
              className="border border-primary-light text-primary-light px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
            >
              Découvrir
            </Link>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <img
            src="/Fire hair-bro.svg"
            alt="Tech'Her Illustration"
            className="rounded-2xl shadow-2xl w-full"
          />
          <div className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center space-x-4">
            <Star className="text-yellow-500 w-8 h-8" />
            <div>
              <p className="font-semibold text-primary-dark">
                4.8/5 Évaluations
              </p>
              <p className="text-sm text-primary-light">
                Plus de 10,000 utilisatrices
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">
            Nos Fonctionnalités Principales
          </h2>
          <p className="text-xl text-primary-light max-w-3xl mx-auto">
            Une approche innovante qui combine technologie et empathie pour
            répondre aux besoins uniques des femmes.
          </p>
        </div>

        {/* Tabbed Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {featuresTabs.map((tab, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              onClick={() => setActiveTab(index)}
              className={`
                p-6 rounded-2xl cursor-pointer transition 
                ${
                  activeTab === index
                    ? "bg-white shadow-2xl border-2 border-primary-light"
                    : "bg-white/50 hover:bg -white/80 border border-transparent"
                }
              `}
            >
              <div
                className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-4
                ${
                  activeTab === index
                    ? "bg-primary-light text-white"
                    : "bg-indigo-100 text-primary-light"
                }
              `}
              >
                {tab.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-dark mb-3">
                {tab.title}
              </h3>
              <p className="text-primary-light mb-4">{tab.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature Details */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <h3 className="text-2xl font-bold text-primary-dark mb-6">
                {featuresTabs[activeTab].title}
              </h3>
              <ul className="space-y-4">
                {featuresTabs[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Star className="text-primary-light w-5 h-5 " />
                    <span className="text-indigo-800">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={featuresTabs[activeTab].image}
                alt={`${featuresTabs[activeTab].title} Illustration`}
                className="rounded-2xl shadow-lg w-full max-h-80"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Tools Section */}
      <div className="bg-gradient-to-r from-secondary-light to-primary-light text-white py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <Smartphone className="w-12 h-12 text-white" />
              <h2 className="text-3xl font-bold">Outils IA Avancés</h2>
            </div>
            <p className="text-xl text-purple-100 mb-6">
              Profitez d'outils d'intelligence artificielle qui vous
              accompagnent à chaque étape de votre parcours de bien-être.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <UserCheck className="text-white w-6 h-6" />
                <span>
                  Traduction des languages des signes d'un video en temps réels
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="text-white w-6 h-6" />
                <span>Recommandations personnalisées en temps réel</span>
              </li>
              <li className="flex items-center space-x-3">
                <ShieldCheck className="text-white w-6 h-6" />
                <span>Confidentialité et sécurité des données</span>
              </li>
            </ul>
            <button className="bg-white text-primary-light px-6 py-3 rounded-lg hover:bg-purple-50 transition">
              En savoir plus
            </button>
          </div>
          <div>
            <img
              src="/Artificial intelligence-amico.svg"
              alt="AI Tools Illustration"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-light to-secondary-light text-white rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              Accordez nous votre confiance
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Rejoignez une communauté qui vous comprend, vous soutient et vous
              autonomise.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/login"
                className="bg-white text-primary-light px-8 py-3 rounded-lg hover:bg-purple-50 transition"
              >
                S'inscrire Gratuitement
              </Link>
              <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-primary-light/20 transition">
                En savoir plus
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-white w-8 h-8" />
              <span className="text-xl font-bold">Tech'Her</span>
            </div>
            <p className="text-indigo-200">
              Un espace sûr, une voix pour toutes les femmes
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Produit</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Tarification
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Démo
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Légal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 pt-8 border-t border-primary-light text-center">
          <p className="text-indigo-300">
            &copy; 2024 Tech'Her. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TechHerLandingPage;
