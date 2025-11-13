import React, { useState, useRef, useEffect } from 'react';
import { Memory } from './types';

// --- Reusable Animated Chapter Component (defined outside App to prevent re-renders) ---

interface ChapterProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedChapter: React.FC<ChapterProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.2
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </div>
  );
};


// --- Main App Component ---

export default function App() {
  const [journeyStarted, setJourneyStarted] = useState(false);
  const journeyRef = useRef<HTMLDivElement | null>(null);

  const memories: Memory[] = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/memory1/600/800', caption: 'Nuestra Primera Aventura' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/memory2/600/800', caption: 'Ese Café Acogedor' },
    { id: 3, imageUrl: 'https://picsum.photos/seed/memory3/600/800', caption: 'Viendo el Atardecer' },
    { id: 4, imageUrl: 'https://picsum.photos/seed/memory4/600/800', caption: 'Momentos Tontos' },
    { id: 5, imageUrl: 'https://picsum.photos/seed/memory5/600/800', caption: 'Bailando en la Cocina' },
    { id: 6, imageUrl: 'https://picsum.photos/seed/memory6/600/800', caption: 'Magia Festiva' },
  ];

  const reasons = [
      "La forma en que te ríes de mis chistes tontos.",
      "Tu amabilidad con todos los que conoces.",
      "Cómo se iluminan tus ojos cuando te apasiona algo.",
      "Tu increíble fuerza y resiliencia.",
      "La sensación de hogar que tengo cuando estoy contigo."
  ];

  const handleStartJourney = () => {
    setJourneyStarted(true);
    setTimeout(() => {
        journeyRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const backgroundImageUrl = 'https://i.pinimg.com/736x/c1/7d/71/c17d71cb3196ff77d46caff2e2fbf5fe.jpg';

  return (
    <div 
      className="relative min-h-screen text-stone-200 overflow-x-hidden"
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      <main className="relative z-10">
        <section className="h-screen w-full flex flex-col items-center justify-center p-4 text-center">
            <div className={`transition-opacity duration-1000 ${journeyStarted ? 'opacity-0' : 'opacity-100'}`}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl text-amber-300 drop-shadow-lg">Nuestro Castillo Vagabundo</h1>
                <p className="mt-4 text-lg md:text-xl text-stone-300">Un Año de Magia Juntos</p>
                <button 
                    onClick={handleStartJourney}
                    className="mt-12 px-8 py-3 bg-amber-400 text-slate-900 font-bold rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-all duration-300 transform hover:scale-105"
                >
                    Comienza Nuestro Viaje
                </button>
            </div>
        </section>

        <div ref={journeyRef} className={`transition-opacity duration-500 ${journeyStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="max-w-4xl mx-auto px-6 py-20 space-y-32">
            
            <AnimatedChapter>
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl text-amber-200">Capítulo I: El Inicio</h2>
                <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-stone-300">
                    Se siente como si fuera ayer y al mismo tiempo toda una vida desde que comenzó nuestra historia. Desde esa primera conversación, supe que algo era diferente. Fue el comienzo de nuestra propia aventura mágica, una puerta que se abría a un mundo que no sabía que me estaba perdiendo.
                </p>
              </div>
            </AnimatedChapter>

            <AnimatedChapter>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <img src="https://drive.google.com/uc?export=view&id=1D_-dlLzqgrkneLf3p5XzSIZQgFVaSmJi" alt="Recuerdo de la primera cita" className="rounded-lg shadow-2xl shadow-indigo-900/50 w-full h-auto object-cover"/>
                    <div>
                        <h2 className="text-4xl md:text-5xl text-amber-200">Capítulo II: Nuestras Primeras Veces</h2>
                        <p className="mt-6 text-lg leading-relaxed text-stone-300">
                           ¿Recuerdas nuestra primera [cita, viaje, etc.]? El mundo pareció desvanecerse, y solo éramos nosotros. Cada primer momento contigo ha sido un tesoro, pintando nuestra historia con colores vibrantes y sentimientos inolvidables.
                        </p>
                    </div>
                </div>
            </AnimatedChapter>
            
            <AnimatedChapter>
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl text-amber-200">Capítulo III: Una Galería de Momentos</h2>
                    <p className="mt-6 mb-12 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-stone-300">
                        Este último año ha estado lleno de tantos momentos hermosos, grandes y pequeños. Aquí hay solo algunas de las instantáneas que viven en mi corazón.
                    </p>
                    <div className="flex space-x-4 sm:space-x-6 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-slate-700">
                        {memories.map(memory => (
                            <div key={memory.id} className="snap-center flex-shrink-0 w-64 md:w-72 group transform transition-transform duration-300 hover:-translate-y-2">
                                <img src={memory.imageUrl} alt={memory.caption} className="w-full h-96 object-cover rounded-lg shadow-xl shadow-indigo-900/40"/>
                                <p className="mt-3 text-center text-stone-300 transition-colors duration-300 group-hover:text-amber-300">{memory.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedChapter>

             <AnimatedChapter>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-4xl md:text-5xl text-amber-200">Capítulo IV: Las Cosas que Amo</h2>
                        <p className="mt-6 text-lg leading-relaxed text-stone-300">
                           Es difícil enumerar todo, pero aquí hay algunas de las innumerables cosas que adoro de ti.
                        </p>
                        <ul className="mt-6 space-y-3">
                            {reasons.map((reason, index) => (
                                <li key={index} className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-amber-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-stone-300">{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 md:order-2">
                        <img src="https://picsum.photos/seed/love/800/600" alt="Un momento de amor" className="rounded-lg shadow-2xl shadow-indigo-900/50 w-full h-auto object-cover"/>
                    </div>
                </div>
            </AnimatedChapter>

            <AnimatedChapter>
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl text-amber-200">Capítulo V: Hacia Nuestro Futuro</h2>
                <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-stone-300">
                    Un año es solo el primer capítulo. No puedo esperar a ver a dónde nos lleva nuestro castillo vagabundo a continuación. Contigo, cada día es una aventura mágica, y espero toda una vida de ellas.
                </p>
                <p className="mt-8 text-2xl font-['Playfair_Display'] text-amber-300 italic">
                    Feliz Aniversario, mi amor.
                </p>
              </div>
            </AnimatedChapter>

          </div>
          <footer className="text-center py-10 text-stone-400">
            <p>Hecho con &hearts; para ti.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}