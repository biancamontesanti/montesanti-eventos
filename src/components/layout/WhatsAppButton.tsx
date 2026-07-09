import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export default function WhatsAppButton() {
  const whatsappNumber = "5511988029023"
  const whatsappMessage = "Olá! Gostaria de falar sobre um evento com a Montesanti Eventos."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Montesanti Eventos no WhatsApp"
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-all duration-300 flex items-center gap-2 group"
    >
      <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6" />
      <span className="hidden md:block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
      Converse no WhatsApp!
      </span>
    </a>
  )
}
