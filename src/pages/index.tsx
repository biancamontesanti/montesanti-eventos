import Head from 'next/head'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Trust from '@/components/sections/Trust'
import Testimonials from '@/components/sections/Testimonials'
import VideoGallery from '@/components/sections/VideoGallery'
import About from '@/components/sections/About'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const siteUrl = 'https://montesantieventos.fun';
  const previewImage = `${siteUrl}/images/event6.JPG`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EventPlanningService',
    name: 'Montesanti Eventos',
    description:
      'Planejamento, produção e coordenação de festas de 15 anos, aniversários, casamentos e eventos sociais em São Paulo.',
    areaServed: {
      '@type': 'City',
      name: 'São Paulo',
    },
    email: 'montesanti.eventos@gmail.com',
    telephone: '+55 11 98802-9023',
    url: siteUrl,
    sameAs: ['https://instagram.com/montesantieventos'],
    serviceType: [
      'Festa de 15 anos',
      'Debutante',
      'Aniversários',
      'Casamentos',
      'Eventos sociais',
      'Coordenação de eventos',
    ],
  };

  return (
    <>
      <Head>
        <title>Montesanti Eventos | Festa de 15 anos e eventos em São Paulo</title>
        <meta
          name="description"
          content="Montesanti Eventos realiza planejamento, produção e coordenação de festas de 15 anos, debutantes, aniversários, casamentos e eventos sociais em São Paulo."
        />
        <meta
          name="keywords"
          content="festa de 15 anos, festa debutante, debutante São Paulo, organização de festa de 15 anos, assessoria de eventos, coordenação de eventos, Montesanti Eventos, eventos sociais São Paulo, aniversário de 15 anos"
        />
        <meta name="author" content="Montesanti Eventos" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Montesanti Eventos" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="Montesanti Eventos | Festa de 15 anos e eventos em São Paulo" />
        <meta
          property="og:description"
          content="Planejamento, produção e coordenação para festas de 15 anos, debutantes, aniversários, casamentos e eventos sociais em São Paulo."
        />
        <meta property="og:image" content={previewImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Montesanti Eventos | Festa de 15 anos em São Paulo" />
        <meta
          name="twitter:description"
          content="Eventos sociais com planejamento, fornecedores selecionados e coordenação completa para o grande dia."
        />
        <meta name="twitter:image" content={previewImage} />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="relative min-h-screen overflow-hidden">
        {/* Gradient background */}
        {/* <div 
  className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
  from-slate-700/50 via-black to-black"
  style={{
    background: 'linear-gradient(to bottom right, rgba(5, 5, 5, 0.8), rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1))',
    zIndex: -1,
  }}
/> */}
        <div 
          className="fixed top-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(to bottom right, rgba(40, 18, 26, 0.92), rgba(0, 0, 0, 1) 48%, rgba(35, 32, 22, 0.96))',
            zIndex: -1,
          }}
        />
        {/* <div 
          className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
          from-purple-900/50 via-black to-black"
          style={{
            background: 'linear-gradient(to bottom right, rgba(88, 28, 135, 0.8), rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1))',
            zIndex: -1,
          }}
        /> */}
        
        {/* Content wrapper */}
        <div className="relative z-10 min-h-screen">
          {/* <Navigation /> */}
          <main>
          
            <Hero />
            {/* <InfiniteScrollTitle /> */}
            {/* <FloatingOrganicDiagram/> */}
            <Services />
            <VideoGallery />
            <About/>
            <Testimonials />
            <div className="relative bg-gradient-to-b from-transparent via-black/80 to-black">
              <Trust />
              <Footer />
            </div>
            {/* <Contact /> */}
          </main>
        </div>

        {/* WhatsApp button */}
        <WhatsAppButton />
      </div>
    </>
  )
}
