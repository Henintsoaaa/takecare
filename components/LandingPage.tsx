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
  Book,
  Smartphone,
  Globe,
  Star,
  Headphones,
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
      title: "Santé Mentale",
      description:
        "Un espace de soutien psychologique personnalisé et confidentiel.",
      features: [
        "Forums de discussion sécurisés",
        "Messagerie privée avec counseling",
        "Bouton SOS pour support immédiat",
        "Ressources de bien-être mental",
      ],
      image: "/Mindfulness-amico.svg",
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Santé Physique",
      description: "Suivi personnalisé de votre bien-être physique.",
      features: [
        "Tracking du cycle menstruel",
        "Quiz de santé personnalisés",
        "Conseils nutritionnels adaptés",
        "Assistance IA pour symptômes",
      ],
      image: "/Healthy lifestyle-amico.svg",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Communauté",
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
      title: "Éducation",
      description: "Accédez à des ressources éducatives sur la santé.",
      features: [
        "Articles et blogs sur la santé",
        "Webinaires avec des experts",
        "Accès à des livres électroniques",
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
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="text-indigo-600 w-8 h-8" />
            <span className="text-xl font-bold text-indigo-900">Tech'Her</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-indigo-700 hover:text-indigo-900 transition"
            >
              Accueil
            </a>
            <a
              href="#"
              className="text-indigo-700 hover:text-indigo-900 transition"
            >
              Fonctionnalités
            </a>
            <a
              href="#"
              className="text-indigo-700 hover:text-indigo-900 transition"
            >
              À propos
            </a>
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Connexion
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-indigo-700"
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
                className="text-indigo-700 hover:text-indigo-900 transition py-2"
              >
                Accueil
              </a>
              <a
                href="#"
                className="text-indigo-700 hover:text-indigo-900 transition py-2"
              >
                Fonctionnalités
              </a>
              <a
                href="#"
                className="text-indigo-700 hover:text-indigo-900 transition py-2"
              >
                À propos
              </a>
              <a
                href="#"
                className="text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-700 transition"
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
            Nouvelle plateforme de santé féminine
          </div>
          <h1 className="text-5xl font-bold text-indigo-900 leading-tight">
            Votre Partenaire Santé Holistique
          </h1>
          <p className="text-xl text-indigo-700 leading-relaxed">
            Tech'Her offre un accompagnement personnalisé et bienveillant pour
            votre bien-être physique, mental et émotionnel.
          </p>
          <div className="flex space-x-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center">
              Commencer <ArrowRight className="ml-2" />
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition">
              Découvrir
            </button>
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
              <p className="font-semibold text-indigo-900">4.8/5 Évaluations</p>
              <p className="text-sm text-indigo-700">
                Plus de 10,000 utilisatrices
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-indigo-900 mb-4">
            Nos Fonctionnalités Principales
          </h2>
          <p className="text-xl text-indigo-700 max-w-3xl mx-auto">
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
                    ? "bg-white shadow-2xl border-2 border-indigo-600"
                    : "bg-white/50 hover:bg -white/80 border border-transparent"
                }
              `}
            >
              <div
                className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-4
                ${
                  activeTab === index
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-600"
                }
              `}
              >
                {tab.icon}
              </div>
              <h3 className="text-xl font-semibold text-indigo-900 mb-3">
                {tab.title}
              </h3>
              <p className="text-indigo-700 mb-4">{tab.description}</p>
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
              <h3 className="text-2xl font-bold text-indigo-900 mb-6">
                {featuresTabs[activeTab].title}
              </h3>
              <ul className="space-y-4">
                {featuresTabs[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Star className="text-indigo-600 w-5 h-5 " />
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
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
                <span>Analyse de vos données personnelles</span>
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
            <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg hover:bg-purple-50 transition">
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
            className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              Commencez Votre Parcours de Bien-être
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Rejoignez une communauté qui vous comprend, vous soutient et vous
              autonomise.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-indigo-700 px-8 py-3 rounded-lg hover:bg-purple-50 transition">
                S'inscrire Gratuitement
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-indigo-700/20 transition">
                En savoir plus
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-white w-8 h-8" />
              <span className="text-xl font-bold">Tech'Her</span>
            </div>
            <p className="text-indigo-200">
              Votre partenaire technologique pour un bien-être féminin
              holistique.
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
        <div className="container mx-auto px-6 mt-8 pt-8 border-t border-indigo-700 text-center">
          <p className="text-indigo-300">
            &copy; 2024 Tech'Her. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TechHerLandingPage;
