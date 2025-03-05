import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { addSubscriber } from "@/lib/database";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type SubscriptionFormValues = z.infer<typeof formSchema>;

interface SubscriptionFormProps {
  onSubmit?: (values: SubscriptionFormValues) => void;
  isSubmitting?: boolean;
}

const SubscriptionForm = ({
  onSubmit = () => {},
  isSubmitting = false,
}: SubscriptionFormProps) => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleSubmit = async (values: SubscriptionFormValues) => {
    try {
      // Call the database function to add subscriber
      const success = await addSubscriber(values.name, values.email);

      if (success) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
        form.reset();

        // Show toast notification
        toast({
          title: "Subscription successful!",
          description: "You'll now receive daily dad jokes in your inbox.",
          duration: 5000,
        });
      } else {
        // Handle case where email might already exist
        form.setError("email", {
          type: "manual",
          message: "This email is already subscribed.",
        });

        // Show toast notification for already subscribed
        toast({
          title: "Already subscribed",
          description: "This email is already receiving our dad jokes.",
          variant: "destructive",
          duration: 3000,
        });
      }

      // Still call the onSubmit prop for any parent component handling
      onSubmit(values);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show a generic error message
      form.setError("root", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });

      // Show toast notification for error
      toast({
        title: "Subscription failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-md border border-border">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Get Daily Dad Jokes
      </h2>
      <p className="text-muted-foreground mb-6 text-center">
        Subscribe to receive a fresh dad joke in your inbox every day!
      </p>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md mb-4 text-center"
        >
          Thanks for subscribing! Get ready for some dad-tastic jokes!
        </motion.div>
      ) : null}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubscriptionForm;
