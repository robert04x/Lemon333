import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Clock, MapPin, Phone, Mail, Diamond as Lemon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Background3D from '../components/Background3D';

const SimpleLogo = () => {
  return (
    <div className="mb-8">
      <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-white shadow-md mx-auto">
        <img
          src="/src/Lemon Logo - Final.png"
          alt="Logo"
          className="w-8 h-8 object-contain"
        />
      </div>
    </div>
  );
};

const TikTokButton = () => {
  return (
    <motion.a
      href="https://www.tiktok.com/@lemon_restaurant"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, duration: 0.8, type: "spring" }}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="w-8 h-8 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z"/>
        </svg>
      </motion.div>
      
      {/* Pulse effect */}
      <motion.div
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-black rounded-full -z-10"
      />
    </motion.a>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        navigate('/menu');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced vibrant background */}
        <div className="fixed inset-0 -z-20">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300" />
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 40%, rgba(251, 191, 36, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.4) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 70% 30%, rgba(255, 165, 0, 0.3) 0%, transparent 60%)",
                "radial-gradient(circle at 30% 70%, rgba(255, 165, 0, 0.3) 0%, transparent 60%)",
                "radial-gradient(circle at 60% 60%, rgba(255, 165, 0, 0.3) 0%, transparent 60%)",
                "radial-gradient(circle at 70% 30%, rgba(255, 165, 0, 0.3) 0%, transparent 60%)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute inset-0"
          />
        </div>

        <Background3D />
        
        <motion.div
          ref={containerRef}
          style={{
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
          className="relative text-center px-4 z-30"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }}
          >
            <SimpleLogo />
            
            <div className="space-y-2" style={{ transform: 'translateZ(50px)' }}>
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-8xl font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400 drop-shadow-[0_4px_8px_rgba(251,191,36,0.3)]"
              >
                LEMON
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-3xl font-serif text-yellow-600 tracking-widest uppercase"
              >
                restaurant
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-sm text-yellow-500 tracking-wider uppercase"
              >
                by Romeo
              </motion.p>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="text-2xl mt-8 mb-12 text-yellow-700 font-serif italic max-w-2xl mx-auto"
            >
              Unde "doar o gustare" devine "trei feluri si un desert"
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <Link
                to="/menu"
                className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Vezi meniul nostru
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center space-x-12 text-yellow-700 z-30"
        >
          {[
            { icon: Clock, text: "Program 08:00-00:00" },
            { icon: MapPin, text: "Gorneni, Giurgiu" },
            { icon: Phone, text: "0733368272" },
            { icon: Mail, text: "lemonrestaurant@yahoo.com" }
          ].map(({ icon: Icon, text }, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <Icon className="h-5 w-5 text-yellow-500" />
              <span>{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      <TikTokButton />
    </div>
  );
}

export default Home;
