import { CalendarCheck, ClipboardCheck, Handshake, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const trustItems = [
  {
    icon: ClipboardCheck,
    title: 'Planejamento documentado',
    description: 'Cronograma, prioridades e entregas alinhados antes do evento para reduzir improvisos.',
  },
  {
    icon: Handshake,
    title: 'Fornecedores selecionados',
    description: 'Indicação e acompanhamento de parceiros de confiança para cada perfil de celebração.',
  },
  {
    icon: CalendarCheck,
    title: 'Presença no dia',
    description: 'Coordenação dos bastidores, montagem e andamento para que os anfitriões aproveitem.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparência',
    description: 'Comunicação próxima, organização de decisões e cuidado com cada etapa contratada.',
  },
];

export default function Trust() {
  return (
    <section className="relative py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-white md:text-sm">
            Segurança para contratar
          </p>
          <h2 className="mt-4 text-3xl font-light leading-tight text-white md:text-5xl">
            Organização visível do primeiro contato ao grande dia
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                viewport={{ once: true }}
                className="rounded-lg border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm"
              >
                <Icon className="h-6 w-6 text-white" />
                <h3 className="mt-5 text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
