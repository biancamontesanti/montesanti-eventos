'use client'
import { FormEvent } from 'react'

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted')
  }

  return (
    <section id="contact" className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl mb-8 md:mb-12 font-light tracking-wider text-white">
          Entre em contato
        </h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4 md:mb-6">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 bg-white/5 backdrop-blur-sm border border-white/10 focus:border-white/20 outline-none text-white placeholder-white/50 rounded-lg text-sm md:text-base"
            />
          </div>
          <div className="mb-4 md:mb-6">
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-3 bg-white/5 backdrop-blur-sm border border-white/10 focus:border-white/20 outline-none text-white placeholder-white/50 rounded-lg text-sm md:text-base"
            />
          </div>
          <div className="mb-4 md:mb-6">
            <textarea
              placeholder="Your Message"
              required
              rows={4}
              className="w-full p-3 bg-white/5 backdrop-blur-sm border border-white/10 focus:border-white/20 outline-none text-white placeholder-white/50 rounded-lg text-sm md:text-base"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white transition-colors rounded-lg text-sm md:text-base"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}