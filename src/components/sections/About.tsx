import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-light tracking-wider text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Sobre nós
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-white/20 mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-3xl">
            <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8 text-left sm:text-center leading-relaxed">
              A Montesanti Eventos nasceu para transformar encontros especiais em celebrações conduzidas com elegância, organização e tranquilidade. Bianca Montesanti lidera cada projeto com atenção aos detalhes, do primeiro alinhamento ao grande dia.
            </p>
            
            <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8 text-left sm:text-center leading-relaxed">
              Com um processo criterioso, selecionamos fornecedores confiáveis, acompanhamos contratos, planejamos cronogramas e supervisionamos a entrega de cada serviço para que o evento reflita o estilo e as expectativas de cada cliente.
            </p>

            <p className="text-base md:text-lg text-white/80 text-left sm:text-center leading-relaxed">
              Ao lado de Thais Adelino e Ana Carolina Montesanti, Bianca conta com uma equipe presente na operação, no atendimento e na coordenação dos bastidores, garantindo uma experiência fluida para anfitriões, convidados e parceiros.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
