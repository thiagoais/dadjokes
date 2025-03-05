import React from "react";

const DadJokesPage: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto p-5 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Dad Jokes So Bad, They're Good: Click for Laughs!
        </h1>
        <p className="text-xl text-muted-foreground">
          Prepare for groan-worthy humor and side-splitting laughter!
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary border-b-2 border-border pb-2 mb-4">
          Why Dad Jokes?
        </h2>
        <p className="text-foreground">
          Dad jokes are the perfect blend of humor and cringe that brings
          families together. They're simple, often pun-based, and guaranteed to
          elicit groans and giggles alike. Our mission is to spread joy and
          laughter one dad joke at a time!
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary border-b-2 border-border pb-2 mb-4">
          Get Your Daily Dose of Dad Humor
        </h2>
        <button
          className="bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors"
          onClick={scrollToTop}
        >
          Click for a Dad Joke!
        </button>
        <p className="mt-4 p-4 bg-secondary text-secondary-foreground rounded-md shadow italic">
          Why don't scientists trust atoms? Because they make up everything!
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary border-b-2 border-border pb-2 mb-4">
          How to Use Our Dad Joke Generator
        </h2>
        <ul className="list-none pl-0">
          {[
            "Visit our website (you're already here, good job!)",
            'Click the "Click for a Dad Joke!" button',
            "Enjoy the joke and share it with friends and family",
            "Repeat for endless laughter and groans",
          ].map((item, index) => (
            <li
              key={index}
              className="mb-2 pl-6 relative before:content-['😂'] before:absolute before:left-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary border-b-2 border-border pb-2 mb-4">
          Benefits of Dad Jokes
        </h2>
        <ul className="list-none pl-0">
          {[
            "Instant mood lifter",
            "Great ice breakers for social situations",
            "Helps develop a quick wit and wordplay skills",
            "Strengthens family bonds through shared laughter",
          ].map((item, index) => (
            <li
              key={index}
              className="mb-2 pl-6 relative before:content-['😂'] before:absolute before:left-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary border-b-2 border-border pb-2 mb-4">
          Frequently Asked Questions
        </h2>
        {[
          {
            q: "What exactly is a dad joke?",
            a: "A dad joke is typically a short, often pun-based joke that's so bad it's good. They're known for their simplicity and the groans they often elicit.",
          },
          {
            q: "How often are new jokes added?",
            a: "We update our joke database regularly to ensure you always have fresh material to share with your friends and family.",
          },
          {
            q: "Can I submit my own dad jokes?",
            a: 'Absolutely! We love community contributions. Look for our "Submit a Joke" feature coming soon!',
          },
        ].map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-primary">{item.q}</h3>
            <p className="text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DadJokesPage;
