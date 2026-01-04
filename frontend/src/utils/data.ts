import { BarChart2, FileText, Mail, Sparkles } from "lucide-react";
import type { ComponentType } from "react";

export interface Feature {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI Invoice Creation",
    description:
      "Paste any text, email, or receipt and let our AI instantly generate a complete, professional invoices for you.",
  },
  {
    icon: BarChart2,
    title: "AI Powered Dashboard",
    description:
      "Get Smart, actionable insights about your business fincances, generated automatically by our AI analyst.",
  },
  {
    icon: Mail,
    title: "Smart Remainders",
    description:
      "Automatically generate polite and effective payment reminder emails for overdue invoices with a single click.",
  },
  {
    icon: FileText,
    title: "Easy Invoice Management",
    description:
      "Easily manage all your invoice, track payment, send reminders for overdue payments.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "This app saved me hours of work. I can now create and send invoices in minutes!",
    author: "Jane Doe",
    title: "Freelance Designer",
    avatar: "https://placehold.co/100x100/000000/ffffff?text=JD",
  },
  {
    quote:
      "The best invoicing app I have ever used. Simple, intuitive, and powerful.",
    author: "John Smith",
    title: "Small Business Owner",
    avatar: "https://placehold.co/100x100/000000/ffffff?text=JS",
  },
  {
    quote:
      "I love the dashboard and reporting features. It helps me keep track of my finances easily.",
    author: "Peter Jones",
    title: "Consultant",
    avatar: "https://placehold.co/100x100/000000/ffffff?text=PJ",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "How does the AI invoice creation work?",
    answer:
      "Simply paste any text that contains invoice details—like an email, a list of items, or a receipt—and our AI will automatically generate a professional invoice for you.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, you can try our platform for free for 14 days. If you want, we’ll provide full access so you can explore all features.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Of course. Our pricing scales with your company. Chat with our friendly team anytime to upgrade or downgrade your plan.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We understand that things change. You can cancel your plan at any time, and you’ll never be locked into long-term contracts.",
  },
  {
    question: "Can other info be added to an invoice?",
    answer:
      "Yes, you can add notes, payment terms, and even attach files to your invoices.",
  },
  {
    question: "How does billing work?",
    answer:
      "Plans are per workspace, not per account. You can upgrade one workspace without affecting others.",
  },
];
