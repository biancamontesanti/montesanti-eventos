import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

const Footer = () => {
  const whatsappUrl = "https://wa.me/5511988029023?text=Ol%C3%A1!%20Gostaria%20de%20falar%20sobre%20um%20evento%20com%20a%20Montesanti%20Eventos.";
  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com/montesantieventos",
      label: "Instagram"
    },
    {
      icon: <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6" />,
      href: whatsappUrl,
      label: "WhatsApp"
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:montesanti.eventos@gmail.com",
      label: "Email"
    }
  ];

  const footerLinks = [
    {
      title: "Serviços",
      links: [
        { label: "Casamentos", href: "#services" },
        { label: "Corporativo", href: "#services" },
        { label: "Festas", href: "#services" },
        { label: "Formaturas", href: "#services" },
      ]
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre", href: "#about" },
        { label: "Equipe", href: "#equipe" },
        { label: "Portfólio", href: "#portfolio" },
        { label: "Contato", href: "#contato" },
      ]
    }
  ];

  return (
    <motion.footer 
      id="contato"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t border-white/10 bg-transparent"
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-xl md:text-2xl font-light tracking-wider text-white mb-4">
              Montesanti Eventos
            </h3>
            <p className="text-sm text-white/60 mb-6">
              Transformando sonhos em celebrações inesquecíveis
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index} className="md:col-span-1">
              <h4 className="text-white font-medium mb-4">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="md:col-span-1">
            <h4 className="text-white font-medium mb-4">
              Contato
            </h4>
            <div className="space-y-3 text-sm text-white/60">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-white/40" />
                São Paulo, SP
              </p>
              <a
                href="tel:+5511988029023"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-white/40" />
                +55 (11) 98802-9023
              </a>
              <a
                href="mailto:montesanti.eventos@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-white/40" />
                montesanti.eventos@gmail.com
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-white/80 hover:border-white/25 hover:text-white transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Conversar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/60">
              © 2026 Montesanti Eventos. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
