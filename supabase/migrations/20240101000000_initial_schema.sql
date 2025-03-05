-- Create jokes table
CREATE TABLE IF NOT EXISTS jokes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create initial jokes data
INSERT INTO jokes (content) VALUES
('Why don''t scientists trust atoms? Because they make up everything!'),
('Did you hear about the mathematician who''s afraid of negative numbers? He''ll stop at nothing to avoid them.'),
('Why don''t skeletons fight each other? They don''t have the guts.'),
('What''s the best thing about Switzerland? I don''t know, but the flag is a big plus.'),
('I told my wife she was drawing her eyebrows too high. She looked surprised.'),
('Why did the scarecrow win an award? Because he was outstanding in his field!'),
('Why don''t eggs tell jokes? They''d crack each other up.'),
('I''m reading a book about anti-gravity. It''s impossible to put down!'),
('What do you call a fake noodle? An impasta.'),
('How do you organize a space party? You planet.'),
('Why did the bicycle fall over? Because it was two tired!'),
('What did the ocean say to the beach? Nothing, it just waved.'),
('Why did the tomato turn red? Because it saw the salad dressing!'),
('What do you call a bear with no teeth? A gummy bear!'),
('Why don''t scientists trust atoms? Because they make up everything!');
