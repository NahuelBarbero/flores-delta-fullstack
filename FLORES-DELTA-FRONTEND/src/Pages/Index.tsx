import React, { useState, useEffect } from 'react';
import { Header } from '@/Components/landing/Header';
import { Sidebar } from '@/Components/landing/Sidebar';
import { HeroSection } from '@/Components/landing/HeroSection';
import { FeaturesSection } from '@/Components/landing/FeaturesSection';
import { BlogSection } from '@/Components/landing/BlogSection';
import { CommunitySection } from '@/Components/landing/CommunitySection';
import { ContactSection } from '@/Components/landing/ContactSection';
import { FinalCTASection } from '@/Components/landing/FinalCTASection';
import { Footer } from '@/Components/landing/Footer';

/**
 * Página de Landing (Index)
 * REFACTORIZADO: 549 líneas → ~90 líneas
 * Todos los componentes inline fueron extraídos a components/landing/
 */
const Index = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    const scrollToSection = (section: string) => {
        setActiveSection(section);
        setSidebarOpen(false);
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Detectar la sección activa al hacer scroll
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const sections = ['inicio', 'funciones', 'blog', 'comunidad', 'contacto'];

        for (const sectionId of sections) {
            const sectionElement = document.getElementById(sectionId);
            if (sectionElement) {
                const sectionTop = sectionElement.offsetTop - 100;
                const sectionHeight = sectionElement.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    setActiveSection(sectionId);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // TIP del socio: [] = una sola vez al montar

    return (
        <div className="bg-background text-foreground min-h-screen font-sans">
            {/* Overlay para cerrar sidebar en móvil */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-[80] md:hidden" onClick={() => setSidebarOpen(false)}></div>}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />

            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />

            {/* Secciones principales */}
            <HeroSection scrollToSection={scrollToSection} />
            <FeaturesSection />
            <BlogSection />
            <CommunitySection />
            <ContactSection />
            <FinalCTASection />
            <Footer scrollToSection={scrollToSection} />
        </div>
    );
};

export default Index;
