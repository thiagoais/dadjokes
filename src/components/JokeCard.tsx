import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laugh } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { fetchRandomJoke, Joke } from "@/lib/database";
import { useToast } from "@/components/ui/use-toast";
import ShareButtons from "./ShareButtons";

interface JokeCardProps {
  initialJoke?: Joke;
  onNextJoke?: () => void;
}

const JokeCard = ({ initialJoke, onNextJoke }: JokeCardProps) => {
  const [joke, setJoke] = useState<Joke | null>(initialJoke || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!joke) {
      getRandomJoke();
    }
  }, []);

  const getRandomJoke = async () => {
    setIsLoading(true);
    try {
      const newJoke = await fetchRandomJoke();

      if (newJoke) {
        setJoke(newJoke);
      } else {
        // Fallback if database fetch fails
        setJoke({
          id: "0",
          content:
            "Why did the joke fail to load? It's still running to get here!",
        });

        // Show error toast
        toast({
          title: "Couldn't fetch joke",
          description: "There was an issue connecting to the database.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke({
        id: "0",
        content:
          "Why did the joke fail to load? It's still running to get here!",
      });

      // Show error toast
      toast({
        title: "Error",
        description: "Failed to fetch a new joke. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextJoke = () => {
    //if (onNextJoke) {
    //  onNextJoke();
    //} else {
    getRandomJoke();
    //}
  };

  return (
    <Card className="w-full max-w-[800px] mx-auto bg-background border-2 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-center pb-2">
        <Laugh className="h-10 w-10 text-primary mr-2" />
        <h2 className="text-2xl font-bold text-center">Dad Joke of the Day</h2>
      </CardHeader>

      <CardContent className="pt-6 pb-4 px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={joke?.id || "loading"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[200px] flex flex-col items-center justify-center"
          >
            {isLoading ? (
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Laugh className="h-8 w-8 text-muted-foreground" />
                </motion.div>
                <p className="mt-4 text-muted-foreground">
                  Loading a dad-tastic joke...
                </p>
              </div>
            ) : (
              <>
                <p className="text-xl md:text-2xl text-center font-medium mb-6">
                  {joke?.content ||
                    "Why was the joke file empty? Because the punchline is still loading!"}
                </p>
                {joke && <ShareButtons joke={joke.content} className="mt-4" />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-center pb-6">
        <Button
          onClick={handleNextJoke}
          disabled={isLoading}
          size="lg"
          className="text-base font-medium"
        >
          {isLoading ? "Loading..." : "Next Joke"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JokeCard;
