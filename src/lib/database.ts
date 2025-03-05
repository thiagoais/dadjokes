import { supabase } from "./supabase";

export interface Joke {
  id: string;
  content: string;
  created_at?: string;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  created_at?: string;
}

export async function fetchRandomJoke(): Promise<Joke | null> {
  try {
    const { data, error } = await supabase
      .from("jokes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Error fetching jokes:", error);
      return null;
    }

    if (data && data.length > 0) {
      // Get a random joke from the results
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex] as Joke;
    }

    return null;
  } catch (error) {
    console.error("Error in fetchRandomJoke:", error);
    return null;
  }
}

export async function addSubscriber(
  name: string,
  email: string,
): Promise<boolean> {
  try {
    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from("subscribers")
      .select("email")
      .eq("email", email)
      .single();

    if (existingSubscriber) {
      console.log("Email already subscribed");
      return false;
    }

    const { error } = await supabase
      .from("subscribers")
      .insert([{ name, email }]);

    if (error) {
      console.error("Error adding subscriber:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in addSubscriber:", error);
    return false;
  }
}
