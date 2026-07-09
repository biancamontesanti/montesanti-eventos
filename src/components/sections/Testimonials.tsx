import AnimatedTestimonials, { AnimatedTestimonial } from '@/components/ui/AnimatedTestimonials';

const team: AnimatedTestimonial[] = [
  {
    name: 'Bianca Montesanti',
    designation: 'Direção e coordenação geral',
    quote:
      'Conduz cada evento com olhar estratégico, sensibilidade e presença no detalhe, garantindo que escolhas, fornecedores e cronograma trabalhem a favor de uma celebração leve e impecável.',
    src: '/images/team/bianca-montesanti.png',
    width: 1122,
    height: 1402,
  },
  {
    name: 'Thais Adelino',
    designation: 'Coordenadora de eventos',
    quote:
      'Acompanha a operação de perto, organiza prioridades e ajuda a transformar o planejamento em uma experiência fluida para anfitriões, convidados e fornecedores.',
    src: '/images/team/thais-adelino.jpg',
    width: 1254,
    height: 1254,
  },
  {
    name: 'Ana Carolina Montesanti',
    designation: 'Coordenadora de produção e atendimento',
    quote:
      'Cuida da comunicação e do andamento do evento com atenção acolhedora, mantendo cada etapa alinhada para que tudo aconteça com elegância e tranquilidade.',
    src: '/images/team/ana-carolina-montesanti.png',
    width: 1254,
    height: 1254,
  },
];

export default function Testimonials() {
  return (
    <section id="equipe" className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8 text-center md:mb-16">
          <p className="text-sm uppercase tracking-[0.28em] text-white/50">
            Coordenação completa
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-wider text-white md:text-5xl">
            Nossa equipe
          </h2>
        </div>

        <AnimatedTestimonials testimonials={team} />
      </div>
    </section>
  );
}
