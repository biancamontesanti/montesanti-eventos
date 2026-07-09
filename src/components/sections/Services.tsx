import { motion } from 'framer-motion';
import Marquee from '@/components/ui/Marquee';

const services = [
  { 
    title: 'Planejamento',
    description: 'Visitação de locais exclusivos, seleção de fornecedores confiáveis e criação de um cronograma detalhado.'
  },
  {
    title: 'Convites',
    description: 'Criação de convites personalizados e gestão das confirmações de presença dos convidados.'
  },
  {
    title: 'Decoração',
    description: 'Design e ambientação do espaço, refletindo o estilo e tema desejado.',
  },
  {
    title: 'Catering',
    description: 'Seleção cuidadosa de menus e bebidas que combinam com a ocasião e o público.',
  },
  {
    title: 'Audiovisual',
    description: 'Planejamento de som, luzes e registro profissional para eternizar o evento.'
  },
  {
    title: 'Recepção',
    description: 'Coordenação da entrada e atendimento dos convidados para uma experiência acolhedora e organizada.'
  }
];

export default function Services() {
  return (
    <section id="services" className="relative -mt-[26vh] pt-[34vh] pb-16 md:-mt-[30vh] md:pt-[38vh] md:pb-24 overflow-hidden bg-gradient-to-b from-black via-black to-transparent">
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div 
          className="max-w-4xl mx-auto mb-8 text-center md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            <motion.span 
              className="block mb-2 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Cada detalhe importa,
            </motion.span>
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              e nós cuidamos de todos.
            </motion.span>
          </h1>
        </motion.div>

        <div className="mb-10 space-y-2 md:mb-16">
          <Marquee duration={30}>
            {services.map((service) => (
              <span
                key={service.title}
                className="mx-3 whitespace-nowrap text-lg font-light uppercase tracking-[0.16em] text-white/65 md:text-4xl md:tracking-[0.2em]"
              >
                {service.title}
              </span>
            ))}
          </Marquee>

          <Marquee reverse duration={34}>
            {['Assessoria', 'Cronograma', 'Fornecedores', 'Cerimonial', 'Montagem', 'Experiência'].map((item) => (
              <span
                key={item}
                className="mx-3 whitespace-nowrap text-base font-light uppercase tracking-[0.16em] text-white/35 md:text-3xl md:tracking-[0.2em]"
              >
                {item}
              </span>
            ))}
          </Marquee>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              className="p-5 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 
                         transition-all rounded-lg flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl md:text-3xl mb-3 md:mb-4 text-white font-semibold">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
