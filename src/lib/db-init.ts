import { supabase } from "./supabase";

export async function initializeDatabase() {
  console.log("Checking database tables...");

  try {
    // Check if jokes table exists and has data
    const { count: jokesCount, error: jokesError } = await supabase
      .from("jokes")
      .select("*", { count: "exact", head: true });

    if (jokesError) {
      console.error("Error checking jokes table:", jokesError);
      return false;
    }

    // If no jokes exist, add initial jokes
    if (jokesCount === 0) {
      console.log("Adding initial jokes...");
      const initialJokes = [
        {
          content:
            "Why don't scientists trust atoms? Because they make up everything!",
        },
        {
          content:
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
        },
        {
          content:
            "Why don't skeletons fight each other? They don't have the guts.",
        },
        {
          content:
            "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
        },
        {
          content:
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        },
        {
          content:
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
        },
        { content: "Why don't eggs tell jokes? They'd crack each other up." },
        {
          content:
            "I'm reading a book about anti-gravity. It's impossible to put down!",
        },
        { content: "What do you call a fake noodle? An impasta." },
        { content: "How do you organize a space party? You planet." },
      ];

      const { error: insertError } = await supabase
        .from("jokes")
        .insert(initialJokes);

      if (insertError) {
        console.error("Error inserting initial jokes:", insertError);
        return false;
      }

      console.log("Initial jokes added successfully");
    } else {
      console.log(`Found ${jokesCount} jokes in the database`);
    }

    return true;
  } catch (error) {
    console.error("Database initialization error:", error);
    return false;
  }
}
