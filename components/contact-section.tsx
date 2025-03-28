"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, CheckCircle, Code } from "lucide-react";
import { SuperButton } from "@/components/super-button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, you would send the data to your backend
      // For demonstration, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        className="opacity-0 animate-fadeInUp"
        style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
      >
        <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          I'm always open to discussing new projects, creative ideas or
          opportunities to be part of your vision. Feel free to reach out using
          any of the methods below.
        </p>

        <div className="space-y-6">
          <div className="transform transition-all duration-200 hover:scale-103 hover:translate-x-1">
            <Card className="overflow-hidden border-l-4 border-l-primary">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">srijitd248@gmail.com</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="transform transition-all duration-200 hover:scale-103 hover:translate-x-1">
            <Card className="overflow-hidden border-l-4 border-l-primary">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+91 73846 62005</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="transform transition-all duration-200 hover:scale-103 hover:translate-x-1">
            <Card className="overflow-hidden border-l-4 border-l-primary">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">
                    Kumaraswamy Layout, South Bangalore, Karnataka, India
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-lg font-medium mb-4">Connect on Social Media</h4>
          <div className="flex space-x-4">
            <a
              href="https://in.linkedin.com/in/srijit-das-dsce-2024-2028-blr"
              className="bg-muted/80 p-3 rounded-full hover:bg-primary/20 transition-colors hover:-translate-y-2 transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://github.com/student-srijit"
              className="bg-muted/80 p-3 rounded-full hover:bg-primary/20 transition-colors hover:-translate-y-2 transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://x.com/SrijitDas217890"
              className="bg-muted/80 p-3 rounded-full hover:bg-primary/20 transition-colors hover:-translate-y-2 transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/srijit__das__/"
              className="bg-muted/80 p-3 rounded-full hover:bg-primary/20 transition-colors hover:-translate-y-2 transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        className="opacity-0 animate-fadeInUp"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-10 -mr-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -mb-8 -ml-8"></div>
            <h3 className="text-2xl font-bold relative z-10">
              Let's Build Something Amazing Together
            </h3>
            <p className="opacity-90 mt-1 relative z-10">
              I'm currently open to new opportunities and collaborations
            </p>
          </div>
          <CardContent className="p-6 relative">
            {/* Animated code background */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
              <pre className="text-xs text-primary">
                {`function ContactMe() {
  const [message, setMessage] = useState('');
  const sendMessage = async () => {
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ message })
    });
    return 'Thank you for your message!';
  };
  return <Form onSubmit={sendMessage} />;
}`}
              </pre>
            </div>

            {submitted ? (
              <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-6 rounded-md flex items-center gap-3 animate-fadeIn">
                <CheckCircle className="h-6 w-6" />
                <div>
                  <h4 className="font-medium">Message Sent Successfully!</h4>
                  <p>Thank you for your message. I'll get back to you soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2 relative group">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium group-focus-within:text-primary transition-colors"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="shuvam"
                      className="border-muted-foreground/20 focus:border-primary transition-all duration-300 group-hover:border-primary/50"
                      required
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                  </div>
                  <div className="space-y-2 relative group">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium group-focus-within:text-primary transition-colors"
                    >
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="shuvam@gmail.com"
                      className="border-muted-foreground/20 focus:border-primary transition-all duration-300 group-hover:border-primary/50"
                      required
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                  </div>
                </div>

                <div className="space-y-2 relative group">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium group-focus-within:text-primary transition-colors"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Let's discuss a project opportunity..."
                      className="border-muted-foreground/20 focus:border-primary transition-all duration-300 group-hover:border-primary/50"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary opacity-0 group-focus-within:opacity-100 transition-opacity">
                      <Code className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                </div>

                <div className="space-y-2 relative group">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium group-focus-within:text-primary transition-colors"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Srijit, I'd like to discuss a potential opportunity..."
                      rows={5}
                      className="border-muted-foreground/20 focus:border-primary transition-all duration-300 group-hover:border-primary/50 resize-none"
                      required
                    />
                    <div className="absolute right-3 bottom-3 text-muted-foreground text-xs">
                      {formData.message.length > 0
                        ? `${formData.message.length} characters`
                        : ""}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-focus-within:w-full transition-all duration-300"></div>
                </div>

                <div className="transform transition-all duration-200 hover:scale-102 active:scale-98">
                  <SuperButton
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full py-6 text-base relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <span className="flex items-center gap-2 relative z-10">
                          <Send className="h-5 w-5" />
                          Initiate Collaboration
                        </span>
                        <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                      </>
                    )}
                  </SuperButton>
                </div>

                <div className="text-center text-xs text-muted-foreground mt-4">
                  <p>
                    Or reach me directly at{" "}
                    <span className="text-primary">srijitd248@gmail.com</span>
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
