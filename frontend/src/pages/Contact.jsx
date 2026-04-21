import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { HERO_IMAGES, CONTACT_INFO, OFFICES } from '../mock';

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: 'Campos incompletos', description: 'Nombre, email y mensaje son obligatorios.' });
      return;
    }
    setSending(true);
    // Mock submit
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
    toast({ title: 'Mensaje enviado', description: 'Gracias por contactar con nosotros.' });
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        className="asi-hero asi-grain"
        style={{ backgroundImage: `url(${HERO_IMAGES.contact})`, minHeight: '320px' }}
      >
        <div className="max-w-7xl mx-auto w-full px-5 lg:px-8 pb-12 pt-20">
          <h1 className="text-white font-bold text-5xl md:text-6xl tracking-tight text-right">
            CONTACTO
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white asi-section">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2980] mb-3">Hablemos</h2>
              <p className="text-gray-600 leading-relaxed">
                ¿Tiene un proyecto de automatización o control en mente? Nuestro equipo técnico le atenderá a la mayor
                brevedad.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1a2980]/10 flex items-center justify-center rounded-sm">
                  <Mail className="w-4 h-4 text-[#1a2980]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email</div>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-[#1a2980] hover:underline font-medium"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1a2980]/10 flex items-center justify-center rounded-sm">
                  <Phone className="w-4 h-4 text-[#1a2980]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Teléfono</div>
                  <a href="tel:+34900000000" className="text-[#1a2980] hover:underline font-medium">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Oficinas técnicas</h3>
              <div className="grid grid-cols-2 gap-2">
                {OFFICES.map((o) => (
                  <div
                    key={o}
                    className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-sm border border-gray-100"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#1a2980]" />
                    {o}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-[#f6f7fb] border border-gray-100 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-[#1a2980] mb-6">Formulario de contacto</h3>

              {sent && (
                <div className="mb-6 flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-3 rounded-sm">
                  <CheckCircle2 className="w-5 h-5" /> Gracias por contactar con nosotros.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Su nombre"
                      className="bg-white border-gray-200 focus-visible:ring-[#1a2980] focus-visible:border-[#1a2980]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="correo@empresa.com"
                      className="bg-white border-gray-200 focus-visible:ring-[#1a2980] focus-visible:border-[#1a2980]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Asunto
                  </Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={update('subject')}
                    placeholder="Motivo de su consulta"
                    className="bg-white border-gray-200 focus-visible:ring-[#1a2980] focus-visible:border-[#1a2980]"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Describa brevemente su proyecto..."
                    rows={6}
                    className="bg-white border-gray-200 focus-visible:ring-[#1a2980] focus-visible:border-[#1a2980] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="bg-[#1a2980] hover:bg-[#131f5e] text-white font-semibold tracking-wider px-8 py-6 rounded-sm"
                >
                  {sending ? 'ENVIANDO...' : 'ENVIAR'}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
