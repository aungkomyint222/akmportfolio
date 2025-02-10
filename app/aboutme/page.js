import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: "About Me - Aung Ko Myint Portfolio",
    description:
      "Learn more about Aung Ko Myint, a passionate web designer and developer, and explore innovative solutions in coding, design, and problem-solving.",
    keywords:
      "Aung Ko Myint, web designer, web developer, portfolio, web development, tech solutions, full-stack developer, NextJS, React, JavaScript, UI/UX design",
  };
}

export default function AboutPage() {
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-white-900 mb-6">About Aung Ko Myint</h1>
      <p className="text-lg leading-relaxed mb-4">
        Welcome to the official website of <span className="font-semibold">Aung Ko Myint</span>, your go-to web designer and developer dedicated to building exceptional digital experiences. With a strong foundation in modern web technologies and an eye for detail, Aung Ko Myint has been helping businesses, creators, and individuals elevate their online presence.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        As a web designer and developer, my journey started from a deep curiosity about how websites and digital platforms work. Growing up, I was always fascinated by the internet and the endless possibilities it offered. This curiosity turned into a passion, and I decided to pursue a career in web development to bring my ideas and creativity to life.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        I began my career by experimenting with HTML, CSS, and JavaScript, learning through online courses and personal projects. Over the years, I honed my skills and expanded my expertise to include cutting-edge web technologies like React, Next.js, Node.js, and others. My goal has always been to stay ahead of the curve by embracing new trends and tools in the ever-evolving world of web development.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        At <span className="font-semibold">Aung Ko Myint</span>, I offer a comprehensive range of web design and development services that cater to your specific needs. Whether you are a startup, a small business, or a personal brand, I specialize in creating stunning, responsive, and user-friendly websites that reflect your unique identity.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        My passion for coding and design drives me to continually improve and innovate, ensuring every project I take on not only meets but exceeds expectations. I believe in creating solutions that not only look great but also work seamlessly, providing your users with the best experience possible.
      </p>
      {/* Back to Home button */}
      <div className="text-center mt-6">
        <Link href="/" className='inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300'>
        
            Back to Home
          
        </Link>
      </div>
    </div>
  );
}
