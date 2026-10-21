/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { QuoteSystem } from './components/QuoteSystem';
import { ProjectPortfolio } from './components/ProjectPortfolio';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { IndustriesSection } from './components/IndustriesSection';
import { HowItWorks } from './components/HowItWorks';
import { CustomerTestimonials } from './components/CustomerTestimonials';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingAssistant } from './components/FloatingAssistant';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPortalModal } from './components/AdminPortalModal';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleOpenQuoteModal = (serviceName?: string) => {
    setSelectedServiceForModal(serviceName);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedServiceForModal(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Core HVAC Services Section */}
        <ServicesSection onSelectServiceForQuote={handleOpenQuoteModal} />

        {/* Project Portfolio */}
        <ProjectPortfolio onSelectProjectForQuote={handleOpenQuoteModal} />

        {/* Why Choose PELSWIJK */}
        <WhyChooseUs />

        {/* About Company */}
        <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Target Industries */}
        <IndustriesSection onSelectIndustryForQuote={handleOpenQuoteModal} />

        {/* How It Works Timeline */}
        <HowItWorks onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Customer Testimonials & Reviews Policy */}
        <CustomerTestimonials />

        {/* Inline Quote Request System */}
        <QuoteSystem />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Contact & Map Location */}
        <ContactSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Interactive Widgets */}
      <FloatingWhatsApp />
      <FloatingAssistant onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Dedicated Quote Modal (Triggered by CTAs across the site) */}
      {isQuoteModalOpen && (
        <QuoteSystem
          initialService={selectedServiceForModal}
          isModal={true}
          onCloseModal={handleCloseQuoteModal}
        />
      )}

      {/* Admin Portal Modal (Protected with passkey) */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
