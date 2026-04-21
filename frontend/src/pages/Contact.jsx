import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, Send, CheckCircle2, ExternalLink, Clock } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { HERO_IMAGES, MAIN_OFFICE } from '../mock';
import { useLanguage, tr } from '../i18n/LanguageContext';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const { toast } = useToast();
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const country = tr(MAIN_OFFICE, 'country', lang);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: t('contact.incompleteTitle'), description: t('contact.incompleteDesc') });
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
      toast({ title: t('contact.successTitle'), description: t('contact.successDesc') });
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      const detail =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        t('contact.errorDesc');
      toast({ title: t('contact.errorTitle'), description: String(detail) });
    } finally {
      setSending(false);
    }
  };

  const embedSrc = `https://www.google.com/maps?q=${MAIN_OFFICE.lat},${MAIN_OFFICE.lng}&hl=${lang}&z=16&output=embed`;

  return (
    <div className="pt-[72px]">
      <section
        className="asi-hero asi-grain"
        style={{ backgroundImage: `url(${HERO_IMAGES.contact})`, minHeight: '320px' }}
      >
        <div className="max-w-7xl mx-auto w-full px-5 lg:px-8 pb-12 pt-20">
          <h1 className="text-white font-bold text-5xl md:text-6xl tracking-tight text-right">
            {t('contact.heroTitle')}
          </h1>
        </div>
      </section>

      <section className="bg-white asi-section">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2980] mb-3">{t('contact.hablemos')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('contact.lead')}</p>
            </div>

            <div className="bg-[#f6f7fb] border border-gray-100 p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-[#1a2980] flex items-center justify-center rounded-sm flex-shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                    {t('contact.officeLabel')}
                  </div>
                  <div className="text-gray-900 font-medium leading-relaxed">
                    {MAIN_OFFICE.address}<br />
                    {MAIN_OFFICE.district}<br />
                    {MAIN_OFFICE.postalCode} {MAIN_OFFICE.city}, {country}
                  </div>
                </div>
              </div>
              <a
                href={MAIN_OFFICE.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1a2980] hover:underline mt-2"
              >
                {t('contact.seeMap')} <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-[#1a2980] flex-shrink-0 mt-0.5" />
              <span>{t('contact.responseTime')}</span>
            </div>

            <div className="overflow-hidden border border-gray-200 aspect-[4/3] w-full">
              <iframe
                title="ASI Barcelona office"
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

          <div className="lg:col-span-3">
            <div className="bg-[#f6f7fb] border border-gray-100 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-[#1a2980] mb-6">{t('contact.formTitle')}</h3>

              {sent && (
                <div className="mb-6 flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-3 rounded-sm">
                  <CheckCircle2 className="w-5 h-5" /> {t('contact.successBanner')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('contact.nameLabel')}
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={update('name')}
                      placeholder={t('contact.namePh')}
                      className="bg-white border-gray-200 focus-visible:ring-[#1a2980] focus-visible:border-[#1a2980]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('contact.emailLabel')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder={t('contact.emailPh')}
                      className="bg-white border-gray-200 focus-visible:ring-[#1a2980] focus-visible:border-[#1a2980]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {t('contact.subjectLabel')}
                  </Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={update('subject')}
                    placeholder={t('contact.subjectPh')}
                    className="bg-white border-gray-200 focus-visible:ring-[#1a2980] focus-visible:border-[#1a2980]"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {t('contact.messageLabel')}
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={update('message')}
                    placeholder={t('contact.messagePh')}
                    rows={6}
                    className="bg-white border-gray-200 focus-visible:ring-[#1a2980] focus-visible:border-[#1a2980] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="bg-[#1a2980] hover:bg-[#131f5e] text-white font-semibold tracking-wider px-8 py-6 rounded-sm"
                >
                  {sending ? t('contact.sending') : t('contact.send')}
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
