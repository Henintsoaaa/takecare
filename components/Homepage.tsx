"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  UserCircle,
  Users,
  MessageCircle,
  Search,
  Newspaper,
  Heart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

export default function Home() {
  const redirectToQuizz = () => {
    redirect("/quizz");
  };
  const redirectToPub = () => {
    redirect("emotion-tracker");
  };

  const redirectToPlainte = () => {
    redirect("/plainte");
  };
  const redirectToActualite = () => {
    redirect("/actualite");
  };
  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <header className="bg-white shadow-sm flex gap-5 md:pl-24 pl-10 items-center">
        {/* <Heart className="w-12 h-12 text-primary-light" /> */}
        <Image src="/logo1.svg" alt="Tech'Her Logo" width={56} height={56} />
        <p className="text-primary-light  font-semibold text-xl py-5 hidden md:block">
          Tech'Her
        </p>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-600">
        <p className=" font-bold text-center text-primary-dark mb-8 md:text-4xl text-2xl">
          Vous n'êtes pas seule, on est avec vous
        </p>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Rejoignez notre communauté dynamique de femmes qui se soutiennent
          mutuellement à travers la découverte de soi, la connexion et la
          défense des droits.
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary-light">
                <UserCircle className="mr-2" />
                Plainte
              </CardTitle>
              <CardDescription>Votre voix compte.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Soumettez une plainte avec preuve. Bénéficiez de la
                reconnaissance laungage des signes en cas d'handicap.
              </p>
            </CardContent>
            <CardFooter>
              <button
                onClick={redirectToPlainte}
                className="flex items-center justify-center w-full py-3 px-4 bg-primary-light hover:bg-primary-light text-white font-semibold rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
              >
                Soumettre
              </button>
            </CardFooter>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary-light">
                <Users className="mr-2" />
                Communauté
              </CardTitle>
              <CardDescription>Soyez parmis nous.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Rejoignez un réseau de femmes inspirantes qui vous soutiennent.
              </p>
            </CardContent>
            <CardFooter>
              <button
                onClick={redirectToPub}
                className="flex items-center justify-center w-full py-3 px-4 bg-primary-light hover:bg-primary-light text-white font-semibold rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
              >
                Se connecter
              </button>
            </CardFooter>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary-light">
                <MessageCircle className="mr-2" />
                Quizz
              </CardTitle>
              <CardDescription>Relever le défi</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Découvrez en quelques questions comment mieux reconnaitre et
                agir face au harcèlement
              </p>
            </CardContent>
            <CardFooter>
              <button
                onClick={redirectToQuizz}
                className="flex items-center justify-center w-full py-3 px-4 bg-primary-light hover:bg-primary-light text-white font-semibold rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
              >
                Commencer
              </button>
            </CardFooter>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary-light">
                <Newspaper className="mr-2" />
                Actualité
              </CardTitle>
              <CardDescription>
                Soyez en contact avec les dernières nouvelles.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">
                Découvrez les dernières nouvelles et comment mieux agir face au
                harcèlement.
              </p>
            </CardContent>
            <CardFooter>
              <button
                onClick={redirectToActualite}
                className="flex items-center justify-center w-full py-3 px-4 bg-primary-light hover:bg-primary-light text-white font-semibold rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
              >
                <span className="mr-2">Commencer</span>
              </button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2024 Tech'Her. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
