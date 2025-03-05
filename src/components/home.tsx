import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import JokeCard from "./JokeCard";
import SubscriptionForm from "./SubscriptionForm";
import ThemeToggle from "./ThemeToggle";
import { Joke, fetchRandomJoke } from "@/lib/database";

const Home: React.FC = () => {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const fetchNewJoke = async () => {
    try {
      alert("aaa");
      const joke = await fetchRandomJoke();
      setCurrentJoke(joke);
    } catch (error) {
      console.error("Error fetching new joke:", error);
      setCurrentJoke(null); // This will trigger JokeCard to fetch a new joke as fallback
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  const handleSubscribe = async (values: { name: string; email: string }) => {
    setIsSubscribing(true);
    try {
      // The actual database call is handled in the SubscriptionForm component
      // This is just for state management in the parent component
      console.log("Subscription submitted:", values);
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center border-b">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-primary"
        >
          Dad Jokes Generator
        </motion.h1>
        <ThemeToggle initialTheme={theme} onThemeChange={handleThemeChange} />
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center gap-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <JokeCard initialJoke={currentJoke} onNextJoke={fetchNewJoke} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-md"
        >
          <SubscriptionForm
            onSubmit={handleSubscribe}
            isSubmitting={isSubscribing}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 border-t text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Dad Jokes Generator. All rights
          reserved.
        </p>
        <p className="mt-1">Bringing smiles one dad joke at a time!</p>
      </footer>
    </div>
  );
};

export default Home;
