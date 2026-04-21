import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, Send, CheckCircle2, ExternalLink, Clock } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { HERO_IMAGES, MAIN_OFFICE } from '../mock';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: 'Campos incompletos', description: 'Nombre, email y mensaje son obligatorios.' });
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API_BASE}/contact`, {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setSent(true);
      toast({ title: 'Mensaje enviado', description: 'Gracias por contactar con nosotros. Le responderemos a la mayor brevedad.' });
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      const detail =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        'No se pudo enviar el mensaje. Intente de nuevo en unos minutos.';
      toast({ title: 'Error al enviar', description: String(detail) });
    } finally {
      setSending(false);
    }
  };

  // Google Maps embed centered at the office coordinates
  const embedSrc = `https://www.google.com/maps?q=${MAIN_OFFICE.lat},${MAIN_OFFICE.lng}&hl=es&z=16&output=embed`;

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
          {/* Info + Map */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2980] mb-3">Hablemos</h2>
              <p className="text-gray-600 leading-relaxed">
                ¿Tiene un proyecto de automatización o control en mente? Nuestro equipo técnico le atenderá a la mayor
                brevedad.
              </p>
            </div>

            <div className="bg-[#f6f7fb] border border-gray-100 p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-[#1a2980] flex items-center justify-center rounded-sm flex-shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                    Oficina Técnica
                  </div>
                  <div className="text-gray-900 font-medium leading-relaxed">
                    {MAIN_OFFICE.address}<br />
                    {MAIN_OFFICE.district}<br />
                    {MAIN_OFFICE.postalCode} {MAIN_OFFICE.city}, {MAIN_OFFICE.country}
                  </div>
                </div>
              </div>
              <a
                href={MAIN_OFFICE.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1a2980] hover:underline mt-2"
              >
                VER EN GOOGLE MAPS <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-[#1a2980] flex-shrink-0 mt-0.5" />
              <span>Respuesta habitual en 24-48 horas laborables.</span>
            </div>

            {/* Map embed */}
            <div className="overflow-hidden border border-gray-200 aspect-[4/3] w-full">
              <iframe
                title="Ubicación oficina ASI Barcelona"
                src={embedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-[#f6f7fb] border border-gray-100 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-[#1a2980] mb-6">Formulario de contacto</h3>

              {sent && (
                <div className="mb-6 flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-3 rounded-sm">
                  <CheckCircle2 className="w-5 h-5" /> Gracias por contactar con nosotros. Su mensaje ha sido enviado.
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
