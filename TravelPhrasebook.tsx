import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  MapPin, 
  Volume2, 
  MessageSquare, 
  Search, 
  Globe, 
  Compass,
  Navigation,
  Sparkles,
  Camera,
  Heart
} from 'lucide-react';

// --- Types ---

interface Phrase {
  es: string;
  hy: string;
  context: string;
}

// --- Data ---

const PHRASES: Phrase[] = [
  { 
    es: "¿Cómo estás?", 
    hy: "Ինչպե՞ս ես:", 
    context: "Ստանդարտ հարց" 
  },
  { 
    es: "¿Qué tal?", 
    hy: "Ի՞նչ կա չկա: / Ո՞նց ես:", 
    context: "Ավելի մտերիմ / խոսակցական" 
  },
  { 
    es: "¿Cómo andas?", 
    hy: "Ինչպե՞ս են գործերդ:", 
    context: "Բառացի՝ ո՞նց ես քայլում" 
  },
  { 
    es: "¿Qué me cuentas?", 
    hy: "Ի՞նչ կպատմես: / Ի՞նչ նորություն ունես:", 
    context: "Ինչո՞վ կկիսվես" 
  },
  { 
    es: "¿Cómo te va?", 
    hy: "Ինչպե՞ս են գնում գործերդ:", 
    context: "Գործերի ընթացքի մասին" 
  },
  { 
    es: "¿Cómo va todo?", 
    hy: "Ինչպե՞ս է ամեն ինչ ընթանում:", 
    context: "Ընդհանուր վիճակ" 
  },
  { 
    es: "¿Cómo van las cosas?", 
    hy: "Ինչպե՞ս են գործերը:", 
    context: "Բազմակի գործերի մասին" 
  },
  { 
    es: "¿Qué hay?", 
    hy: "Ի՞նչ կա:", 
    context: "Կարճ և արագ ողջույն" 
  },
  { 
    es: "¿Qué hay de nuevo?", 
    hy: "Ի՞նչ նորություն կա:", 
    context: "Նորությունների մասին" 
  }
];

// --- Utilities ---

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

// --- Components ---

export default function TravelPhrasebook() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPhrases = PHRASES.filter(p => 
    p.es.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.hy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-stone-900 font-sans selection:bg-sky-200 overflow-x-hidden">
      
      {/* Immersive Travel Header */}
      <header className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0">
           <img 
            src="https://images.unsplash.com/photo-1543783230-05202868195a?auto=format&fit=crop&q=80&w=2000" 
            alt="Spain Landscape" 
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-sky-900/40 via-sky-900/60 to-[#f3f4f6]" />
        </div>

        <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl">
           <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.3em]"
           >
             <Plane size={14} className="text-sky-300" />
             Expedición de Idiomas
           </motion.div>
           <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-2xl">
             ¿Cómo <span className="text-sky-300">Estás?</span>
           </h1>
           <p className="text-white/90 text-lg md:text-xl font-bold italic drop-shadow-md">
             Ինչպե՞ս հարցնել «Ինչպե՞ս են գործերդ» իսպաներենով:
           </p>
        </div>

        {/* Floating Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-10 p-4 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-white/40 hidden md:block"
        >
          <Camera size={24} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-40 right-20 p-4 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-white/40 hidden md:block"
        >
          <Compass size={32} />
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16 pb-24 relative z-20">
        
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-[32px] shadow-2xl border border-stone-100 flex items-center gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={20} />
            <input 
              type="text" 
              placeholder="Փնտրել արտահայտություն..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-stone-50 rounded-2xl outline-none focus:ring-4 ring-sky-500/10 font-bold transition-all placeholder:text-stone-300"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2 px-6 py-4 bg-sky-50 rounded-2xl text-sky-600 font-black uppercase tracking-widest text-[10px]">
             <Globe size={16} /> Online
          </div>
        </div>

        {/* Phrase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhrases.map((phrase, i) => (
              <motion.div
                key={phrase.es}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => speak(phrase.es)}
                className="group relative bg-white p-8 rounded-[40px] shadow-xl hover:shadow-2xl hover:translate-y-[-8px] transition-all border border-stone-50 cursor-pointer"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Volume2 size={20} className="text-sky-500" />
                </div>

                <div className="space-y-6">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500/60 flex items-center gap-2">
                        <MessageSquare size={12} /> {phrase.context}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter text-stone-900 group-hover:text-sky-600 transition-colors">
                        {phrase.es}
                      </h3>
                   </div>

                   <div className="h-px bg-stone-100 w-full" />

                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-300">Հայերեն</p>
                      <p className="text-xl font-bold text-stone-600 leading-tight">
                        {phrase.hy}
                      </p>
                   </div>
                </div>

                {/* Card Accent */}
                <div className="absolute bottom-0 left-12 w-12 h-1 bg-sky-500 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPhrases.length === 0 && (
          <div className="py-24 text-center space-y-6">
             <div className="w-24 h-24 bg-stone-200 rounded-full mx-auto flex items-center justify-center text-stone-400">
               <Navigation size={48} />
             </div>
             <p className="text-stone-400 font-black uppercase tracking-[0.3em] text-xs">Արտահայտություն չի գտնվել</p>
          </div>
        )}

      </main>

      {/* Mini Travel Guide Section */}
      <section className="bg-white py-24 px-6 border-t border-stone-100">
        <div className="max-w-4xl mx-auto space-y-12">
           <div className="text-center space-y-4">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Consejos de Viaje</h2>
              <p className="text-stone-500 font-bold">Մի քանի խորհուրդ ճամփորդության համար</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-sky-50 rounded-[40px] space-y-4">
                 <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Heart size={24} />
                 </div>
                 <h4 className="text-xl font-black uppercase tracking-tight">Սիրալիրություն</h4>
                 <p className="text-sm font-medium text-stone-600 leading-relaxed">
                   Իսպանիայում մարդիկ շատ ջերմ են: Օգտագործե՛ք «¿Qué tal?»-ը ընկերական միջավայրում ավելի անմիջական թվալու համար:
                 </p>
              </div>
              <div className="p-8 bg-amber-50 rounded-[40px] space-y-4">
                 <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={24} />
                 </div>
                 <h4 className="text-xl font-black uppercase tracking-tight">Ուղղակիություն</h4>
                 <p className="text-sm font-medium text-stone-600 leading-relaxed">
                   Հաճախ «Hola, ¿qué tal?»-ին պատասխանում են պարզապես «Bien, ¿y tú?»: Դա ամենատարածված ձևն է:
                 </p>
              </div>
           </div>
        </div>
      </section>

      <footer className="py-12 border-t border-stone-100 flex flex-col items-center gap-6 opacity-30">
         <div className="flex gap-4">
            <Globe2 className="w-6 h-6" />
            <MapPin className="w-6 h-6" />
         </div>
         <p className="text-[10px] font-black uppercase tracking-[1em]">Travel Companion v2.0</p>
      </footer>
    </div>
  );
}

const Globe2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
