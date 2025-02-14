import Quiz from "./components/quiz";

export async function generateMetadata() {
  return {
    title: "Career Compass - Aung Ko Myint Portfolio",
    description:
      "Explore Career Compass, a tool powered by AI, designed to guide you in your career journey with personalized insights and job match predictions.",
    keywords: "Career Compass, AI, job match, career guidance",
    openGraph: {
      title: "Career Compass - Aung Ko Myint Portfolio",
      description:
        "Discover Career Compass, an AI-powered tool that helps guide your career journey with personalized insights and job match predictions.",
      url: "https://www.akmweb.online/careercompass",  // Correct URL here
      site_name: "Career Compass",  // Changed to reflect the specific tool
      images: [
        {
          url: "/og-image.png", // Update this to your actual image path
          width: 1200,
          height: 630,
          alt: "Career Compass Tool by Aung Ko Myint",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@aungkomyint", // Your Twitter handle
      creator: "@aungkomyint", // Creator's Twitter handle
      title: "Career Compass - Aung Ko Myint Portfolio",
      description:
        "Explore Career Compass, AI-powered career guidance tool for personalized job match predictions and career insights.",
      images: ["/twitter-image.png"], // Update this to your actual image path
    },
    alternates: {
      canonical: "https://www.akmweb.online/careercompass", // Ensure this points to the exact URL
    },
  };
}

export default function Home() {
  return (
    <div>
      <Quiz />
    </div>
  );
}
