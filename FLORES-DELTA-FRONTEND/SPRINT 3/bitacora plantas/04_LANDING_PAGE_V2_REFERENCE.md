
// ------------------------------------------------------------------
// DeltaGrowPlatform V2 - Refactored by Gus
//
// **Objetivo de la Refactorización:**
// 1. **Modularidad:** Descomponer la aplicación monolítica en componentes pequeños y reutilizables.
// 2. **Legibilidad:** Crear un código más limpio, mantenible y fácil de entender para un desarrollador trainee.
// 3. **Reutilización (DRY):** Crear componentes genéricos para elementos de UI repetidos (tarjetas, botones, etc.).
// 4. **Accesibilidad (a11y):** Mejorar la semántica y añadir atributos ARIA donde sea necesario.
// 5. **Limpieza:** Eliminar código innecesario (importaciones no usadas, logs).
//
// **Estructura del Archivo:**
// - **Componentes Reutilizables:** Pequeños bloques de construcción de UI.
// - **Componentes de Sección:** Secciones principales de la página (Hero, Funciones, etc.).
// - **Componentes Principales:** Componentes de alto nivel como Header y Sidebar.
// - **Componente Raíz (DeltaGrowPlatformV2):** El componente que une todo.
// ------------------------------------------------------------------

import React, { useState } from 'react';
import { Leaf, Book, Users, LogIn, Menu, X, Sprout, MapPin, Camera, TrendingUp, Calendar, Droplets, Activity, MessageSquare, Award, ChevronRight, Mail, Home, Tractor, LineChart } from 'lucide-react';

// --- Datos de la Aplicación ---
// Mantenemos los datos aquí por simplicidad, pero en una app más grande, podrían venir de una API o un archivo JSON.
const funcionalidades = [
    { titulo: "Bitácora Digital", descripcion: "Registra cada evento de tus plantas: riegos, podas, cambios de etapa con fotos, videos y notas de audio", icon: Calendar, color: "from-green-400 to-emerald-500" },
    { titulo: "Trazabilidad por Planta", descripcion: "Seguimiento completo desde semilla hasta cosecha. Timeline histórico de cada planta individual", icon: Activity, color: "from-blue-400 to-cyan-500" },
    { titulo: "Gestión de Espacios", descripcion: "Administra tus 3 salas de cultivo, visualiza ubicaciones en mapa y controla cada ambiente", icon: MapPin, color: "from-purple-400 to-indigo-500" },
    { titulo: "Registro Multimedia", descripcion: "Captura fotos, videos y notas de audio directamente desde tu móvil en la sala de cultivo", icon: Camera, color: "from-orange-400 to-amber-500" },
    { titulo: "Métricas y Análisis", descripcion: "Datos de PH, EC, rendimiento y costos. Optimiza tu cultivo con inteligencia de datos", icon: TrendingUp, color: "from-pink-400 to-rose-500" },
    { titulo: "Control de Riegos", descripcion: "Registra riegos, nutrientes aplicados y parámetros de agua para cada etapa del cultivo", icon: Droplets, color: "from-teal-400 to-cyan-500" }
];

const articulos = [
    { titulo: "Guía Completa de Iluminación LED", categoria: "Equipamiento", fecha: "15 Sep 2025", imagen: "💡" },
    { titulo: "Cómo Optimizar el PH en Hidroponia", categoria: "Técnicas", fecha: "10 Sep 2025", imagen: "🧪" },
    { titulo: "Las Mejores Genéticas para Interior", categoria: "Genéticas", fecha: "05 Sep 2025", imagen: "🌱" }
];

const sidebarItems = [
    { name: 'Dashboard / Inicio', icon: Home, section: 'inicio', category: 'General' },
    { name: 'Mi Bitácora de Cultivo', icon: Calendar, section: 'bitacora-app', category: 'App' },
    { name: 'Gestión de Genéticas', icon: Sprout, section: 'genetics-app', category: 'App' },
    { name: 'Métricas de Cosecha', icon: LineChart, section: 'metrics-app', category: 'App' },
    { name: 'Equipamiento', icon: Tractor, section: 'equipment-app', category: 'App' },
    { name: 'Funciones de Delta Grow', icon: Activity, section: 'funciones', category: 'Info' },
    { name: 'Blog y Guías', icon: Book, section: 'blog', category: 'Info' },
    { name: 'Comunidad', icon: Users, section: 'comunidad', category: 'Info' },
    { name: 'Soporte y Contacto', icon: Mail, section: 'contacto', category: 'Info' },
];

// ==================================================================
// 1. COMPONENTES REUTILIZABLES
// Componentes pequeños y genéricos que se usan en múltiples lugares.
// ==================================================================

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
    </div>
);

const FeaturePill = ({ icon: Icon, title, description, colorClass }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border ${colorClass} hover:shadow-xl transition-shadow`}>
        <div className={`bg-gradient-to-br ${colorClass.replace('border-', 'from-').replace('-100', '-400')} to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
            <Icon className="text-white" size={24} />
        </div>
        <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

const FunctionalityCard = ({ icon: Icon, title, description, color }) => (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
        <div className={`bg-gradient-to-br ${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
            <Icon className="text-white" size={28} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const ArticleCard = ({ imagen, categoria, fecha, titulo }) => (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 h-40 flex items-center justify-center text-6xl" role="img" aria-label={titulo}>
            {imagen}
        </div>
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{categoria}</span>
                <span className="text-gray-500 text-xs">{fecha}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{titulo}</h3>
            <button className="text-green-600 font-semibold hover:text-green-700 flex items-center space-x-1">
                <span>Leer más</span>
                <ChevronRight size={16} />
            </button>
        </div>
    </div>
);

const StatCard = ({ value, label }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <p className="text-4xl font-bold mb-2">{value}</p>
        <p className="text-green-100">{label}</p>
    </div>
);

const InputField = ({ id, label, type = "text", placeholder, rows }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        {type === 'textarea' ? (
            <textarea id={id} name={id} rows={rows} placeholder={placeholder} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150" />
        ) : (
            <input type={type} id={id} name={id} placeholder={placeholder} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150" />
        )}
    </div>
);

// ==================================================================
// 2. COMPONENTES DE SECCIÓN
// Componentes que representan una sección completa de la página.
// ==================================================================

const HeroSection = ({ scrollToSection }) => (
    <section id="inicio" className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    🌿 Plataforma de Gestión y Aprendizaje
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Cultiva con <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">amor</span> y <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">enfoque</span>
                </h1>
                <p className="text-2xl text-gray-700 leading-relaxed font-medium">
                    Aprende con pasión y compartí tus resultados en nuestro blog.
                </p>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Delta Grow es tu plataforma completa para gestionar cada etapa de tu cultivo, aprender de la comunidad y compartir tu experiencia. Trazabilidad profesional al alcance de tu mano.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
                        <LogIn size={20} />
                        <span>Acceder a mi Bitácora</span>
                    </button>
                    <button onClick={() => scrollToSection('blog')} className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center space-x-2">
                        <Book size={20} />
                        <span>Explorar el Blog</span>
                    </button>
                     <button onClick={() => scrollToSection('contacto')} className="border-2 border-green-500 bg-green-50 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-100 transition-all duration-300 flex items-center justify-center space-x-2">
                        <Mail size={20} />
                        <span>Contáctanos</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
                <FeaturePill icon={Activity} title="Gestión Completa" description="Administra plantas, espacios y toda la trazabilidad de tu cultivo" colorClass="border-green-100" />
                <FeaturePill icon={Book} title="Aprende Siempre" description="Accede a guías, técnicas y conocimiento de la comunidad" colorClass="border-blue-100" />
                <FeaturePill icon={Users} title="Comunidad Activa" description="Comparte tus cultivos y aprende de otros cultivadores" colorClass="border-purple-100" />
            </div>
        </div>
    </section>
);

const FeaturesSection = () => (
    <section id="funciones" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
            <SectionTitle 
                title="Funciones de Gestión del Cultivo"
                subtitle="Herramientas profesionales para llevar tu cultivo al siguiente nivel. Control total desde la siembra hasta la cosecha."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {funcionalidades.map((func, index) => (
                    <FunctionalityCard key={index} {...func} />
                ))}
            </div>
            <div className="text-center mt-12">
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2">
                    <LogIn size={20} />
                    <span>Comenzar a Gestionar mi Cultivo</span>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    </section>
);

const BlogSection = () => (
    <section id="blog" className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
            <SectionTitle 
                title="Blog y Recursos Educativos"
                subtitle="Aprende las mejores técnicas y mantente actualizado"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articulos.map((articulo, index) => (
                    <ArticleCard key={index} {...articulo} />
                ))}
            </div>
            <div className="text-center mt-12">
                <button className="bg-white border-2 border-green-500 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300">
                    Ver Todos los Artículos
                </button>
            </div>
        </div>
    </section>
);

const CommunitySection = () => (
    <section id="comunidad" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Únete a Nuestra Comunidad</h2>
                        <p className="text-xl mb-8 text-green-50">
                            Comparte tus cultivos, aprende de otros cultivadores y recibe feedback de la comunidad. Juntos crecemos mejor.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3"><Award className="text-amber-300" size={28} /> <span className="text-lg">Comparte tus mejores cosechas</span></div>
                            <div className="flex items-center space-x-3"><MessageSquare className="text-blue-300" size={28} /> <span className="text-lg">Consulta y aprende de expertos</span></div>
                            <div className="flex items-center space-x-3"><Users className="text-purple-300" size={28} /> <span className="text-lg">Conecta con cultivadores de todo el país</span></div>
                        </div>
                        <button className="mt-8 bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2">
                            <Users size={20} />
                            <span>Explorar la Comunidad</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard value="500+" label="Cultivadores activos" />
                        <StatCard value="1.2K" label="Cultivos registrados" />
                        <StatCard value="250+" label="Artículos publicados" />
                        <StatCard value="3.5K" label="Comentarios y tips" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ContactSection = () => (
    <section id="contacto" className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto">
            <SectionTitle title="Contáctanos" subtitle="¿Tienes alguna duda o quieres saber más? Escríbenos." />
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-green-100">
                <form className="space-y-6">
                    <InputField id="name" label="Nombre Completo" placeholder="Tu nombre y apellido" />
                    <InputField id="email" label="Email" type="email" placeholder="tu.correo@ejemplo.com" />
                    <InputField id="message" label="Mensaje" type="textarea" rows="4" placeholder="Escribe tu consulta aquí..." />
                    <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-2">
                        <Mail size={20} />
                        <span>Enviar Mensaje</span>
                    </button>
                </form>
            </div>
        </div>
    </section>
);

const FinalCTASection = () => (
    <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Listo para transformar tu cultivo?</h2>
            <p className="text-xl text-gray-600 mb-8">
                Accede a tu bitácora digital, gestiona tus plantas y únete a una comunidad de cultivadores apasionados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center space-x-2">
                    <LogIn size={24} />
                    <span>Ingresar a mi Cuenta</span>
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-full font-bold text-lg hover:bg-green-50 transition-all duration-300">
                    Crear Cuenta Gratis
                </button>
            </div>
        </div>
    </section>
);

const Footer = ({ scrollToSection }) => (
    <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <Leaf className="text-green-500" size={32} />
                        <span className="text-2xl font-bold">Delta <span className="text-green-500">Grow</span></span>
                    </div>
                    <p className="text-gray-400 text-sm">Cultivando confianza, cosechando resultados</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Plataforma</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="hover:text-green-500 cursor-pointer" onClick={() => scrollToSection('bitacora-app')}>Mi Bitácora</li>
                        <li className="hover:text-green-500 cursor-pointer" onClick={() => scrollToSection('genetics-app')}>Gestión de Genéticas</li>
                        <li className="hover:text-green-500 cursor-pointer" onClick={() => scrollToSection('metrics-app')}>Métricas y Análisis</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Comunidad</h4>
                     <ul className="space-y-2 text-sm text-gray-400">
                        <li className="hover:text-green-500 cursor-pointer" onClick={() => scrollToSection('blog')}>Blog</li>
                        <li className="hover:text-green-500 cursor-pointer" onClick={() => scrollToSection('comunidad')}>Comunidad</li>
                        <li className="hover:text-green-500 cursor-pointer">Compartir Cultivos</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Soporte</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="hover:text-green-500 cursor-pointer" onClick={() => scrollToSection('contacto')}>Contacto</li>
                        <li className="hover:text-green-500 cursor-pointer">Guías de Uso</li>
                        <li className="hover:text-green-500 cursor-pointer">Términos de Uso</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
                <p className="text-gray-500 text-sm">© 2025 Delta Grow. Todos los derechos reservados. | José C. Paz, Buenos Aires, Argentina</p>
            </div>
        </div>
    </footer>
);


// ==================================================================
// 3. COMPONENTES PRINCIPALES
// Componentes de alto nivel que organizan la UI.
// ==================================================================

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeSection, scrollToSection }) => {
    const appItems = sidebarItems.filter(item => item.category === 'App');
    const infoItems = sidebarItems.filter(item => item.category === 'Info' || item.category === 'General');

    return (
        <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-white w-64 shadow-2xl z-[90] md:hidden overflow-y-auto`}>
            <div className="p-4 flex items-center justify-between border-b border-green-100 h-16 sticky top-0 bg-white z-10">
                <span className="text-xl font-bold text-gray-800">Menú Principal</span>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-600 hover:text-green-600" aria-label="Cerrar menú">
                    <X size={24} />
                </button>
            </div>
            <nav className="p-4 space-y-4">
                <div>
                    <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2 pl-3">Plataforma de Cultivo</h3>
                    {appItems.map((item) => (
                        <button key={item.name} onClick={() => scrollToSection(item.section)} className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${activeSection === item.section ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'}`}>
                            <item.icon size={20} className="text-green-500" />
                            <span>{item.name}</span>
                        </button>
                    ))}
                </div>
                <hr className="border-t border-gray-100 my-4" />
                <div>
                    <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2 pl-3">Información y Comunidad</h3>
                    {infoItems.map((item) => (
                        <button key={item.name} onClick={() => scrollToSection(item.section)} className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${activeSection === item.section ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'}`}>
                            <item.icon size={20} className="text-gray-500" />
                            <span>{item.name}</span>
                        </button>
                    ))}
                </div>
                <div className="mt-8 p-3">
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                        <LogIn size={18} />
                        <span>Ingresar</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

const Header = ({ setSidebarOpen, activeSection, scrollToSection }) => (
    <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-2">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-green-600 p-2 rounded-lg" aria-label="Abrir menú">
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                            <Leaf className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">Delta <span className="text-green-600">Grow</span></span>
                    </div>
                </div>
                <div className="hidden md:flex space-x-8">
                    <button onClick={() => scrollToSection('inicio')} className={`${activeSection === 'inicio' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}><Sprout size={18} /><span>Inicio</span></button>
                    <button onClick={() => scrollToSection('funciones')} className={`${activeSection === 'funciones' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}><Activity size={18} /><span>Funciones</span></button>
                    <button onClick={() => scrollToSection('blog')} className={`${activeSection === 'blog' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}><Book size={18} /><span>Blog</span></button>
                    <button onClick={() => scrollToSection('comunidad')} className={`${activeSection === 'comunidad' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}><Users size={18} /><span>Comunidad</span></button>
                    <button onClick={() => scrollToSection('contacto')} className={`${activeSection === 'contacto' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}><Mail size={18} /><span>Contacto</span></button>
                </div>
                <div className="hidden md:block">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                        <LogIn size={18} />
                        <span>Ingresar</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>
);


// ==================================================================
// 4. COMPONENTE RAÍZ
// El componente principal que renderiza toda la página.
// ==================================================================

export default function DeltaGrowPlatformV2() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        setSidebarOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen font-sans">
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-[80] md:hidden" onClick={() => setSidebarOpen(false)}></div>}
            
            <Sidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                activeSection={activeSection} 
                scrollToSection={scrollToSection} 
            />

            <Header 
                setSidebarOpen={setSidebarOpen} 
                activeSection={activeSection} 
                scrollToSection={scrollToSection} 
            />

            <main>
                <HeroSection scrollToSection={scrollToSection} />
                <FeaturesSection />
                <BlogSection />
                <CommunitySection />
                <ContactSection />
                <FinalCTASection />
            </main>

            <Footer scrollToSection={scrollToSection} />
        </div>
    );
}
