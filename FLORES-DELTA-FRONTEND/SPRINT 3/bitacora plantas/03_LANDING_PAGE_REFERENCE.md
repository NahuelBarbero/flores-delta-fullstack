import React, { useState } from 'react';
import { Leaf, Book, Users, LogIn, Menu, X, Sprout, MapPin, Camera, TrendingUp, Calendar, Droplets, Sun, Activity, MessageSquare, Award, ChevronRight, Mail, Phone, Home, Search, Heart, Shield, Tractor, LineChart } from 'lucide-react';

export default function DeltaGrowPlatform() {
	// Eliminamos el estado 'menuOpen' ya que el Sidebar lo reemplaza
	const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para el menú lateral
	const [activeSection, setActiveSection] = useState('inicio');

	const funcionalidades = [
		{
			titulo: "Bitácora Digital",
			descripcion: "Registra cada evento de tus plantas: riegos, podas, cambios de etapa con fotos, videos y notas de audio",
			icon: Calendar,
			color: "from-green-400 to-emerald-500"
		},
		{
			titulo: "Trazabilidad por Planta",
			descripcion: "Seguimiento completo desde semilla hasta cosecha. Timeline histórico de cada planta individual",
			icon: Activity,
			color: "from-blue-400 to-cyan-500"
		},
		{
			titulo: "Gestión de Espacios",
			descripcion: "Administra tus 3 salas de cultivo, visualiza ubicaciones en mapa y controla cada ambiente",
			icon: MapPin,
			color: "from-purple-400 to-indigo-500"
		},
		{
			titulo: "Registro Multimedia",
			descripcion: "Captura fotos, videos y notas de audio directamente desde tu móvil en la sala de cultivo",
			icon: Camera,
			color: "from-orange-400 to-amber-500"
		},
		{
			titulo: "Métricas y Análisis",
			descripcion: "Datos de PH, EC, rendimiento y costos. Optimiza tu cultivo con inteligencia de datos",
			icon: TrendingUp,
			color: "from-pink-400 to-rose-500"
		},
		{
			titulo: "Control de Riegos",
			descripcion: "Registra riegos, nutrientes aplicados y parámetros de agua para cada etapa del cultivo",
			icon: Droplets,
			color: "from-teal-400 to-cyan-500"
		}
	];

	const articulos = [
		{
			titulo: "Guía Completa de Iluminación LED",
			categoria: "Equipamiento",
			fecha: "15 Sep 2025",
			imagen: "💡"
		},
		{
			titulo: "Cómo Optimizar el PH en Hidroponia",
			categoria: "Técnicas",
			fecha: "10 Sep 2025",
			imagen: "🧪"
		},
		{
			titulo: "Las Mejores Genéticas para Interior",
			categoria: "Genéticas",
			fecha: "05 Sep 2025",
			imagen: "🌱"
		}
	];

	// Nuevas opciones de menú lateral basadas en la utilidad de la web
	const sidebarItems = [
		{ name: 'Dashboard / Inicio', icon: Home, section: 'inicio', category: 'General' },
		// Funciones de la App (Simulando lo que harías dentro de la plataforma)
		{ name: 'Mi Bitácora de Cultivo', icon: Calendar, section: 'bitacora-app', category: 'App' },
		{ name: 'Gestión de Genéticas', icon: Sprout, section: 'genetics-app', category: 'App' },
		{ name: 'Métricas de Cosecha', icon: LineChart, section: 'metrics-app', category: 'App' },
		{ name: 'Equipamiento', icon: Tractor, section: 'equipment-app', category: 'App' },
		// Secciones Informativas
		{ name: 'Funciones de Delta Grow', icon: Activity, section: 'funciones', category: 'Info' },
		{ name: 'Blog y Guías', icon: Book, section: 'blog', category: 'Info' },
		{ name: 'Comunidad', icon: Users, section: 'comunidad', category: 'Info' },
		{ name: 'Soporte y Contacto', icon: Mail, section: 'contacto', category: 'Info' },
	];

	const scrollToSection = (section) => {
		setActiveSection(section);
		setSidebarOpen(false);
		// Esta es una simulación de desplazamiento, ya que React no renderiza las secciones como elementos DOM reales en este entorno.
		console.log(`Scrolling to ${section}`);
		const element = document.getElementById(section);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	// Sidebar Component
	const Sidebar = () => {
		// Agrupamos los ítems por categoría para darle estructura
		const appItems = sidebarItems.filter(item => item.category === 'App');
		const infoItems = sidebarItems.filter(item => item.category === 'Info' || item.category === 'General');

		return (
			<div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-white w-64 shadow-2xl z-[90] md:hidden overflow-y-auto`}>
				<div className="p-4 flex items-center justify-between border-b border-green-100 h-16 sticky top-0 bg-white z-10">
					<span className="text-xl font-bold text-gray-800">Menú Principal</span>
					<button onClick={() => setSidebarOpen(false)} className="text-gray-600 hover:text-green-600">
						<X size={24} />
					</button>
				</div>
				<nav className="p-4 space-y-4">
					
					{/* Secciones de la Aplicación */}
					<div>
						<h3 className="text-xs font-semibold uppercase text-gray-500 mb-2 pl-3">Plataforma de Cultivo</h3>
						{appItems.map((item, index) => {
							const Icon = item.icon;
							return (
								<button
									key={index}
									onClick={() => scrollToSection(item.section)}
									className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${activeSection === item.section ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'}`}
								>
									<Icon size={20} className="text-green-500" />
									<span>{item.name}</span>
								</button>
							);
						})}
					</div>
					
					<hr className="border-t border-gray-100 my-4" />
					
					{/* Secciones Informativas / Marketing */}
					<div>
						<h3 className="text-xs font-semibold uppercase text-gray-500 mb-2 pl-3">Información y Comunidad</h3>
						{infoItems.map((item, index) => {
							const Icon = item.icon;
							return (
								<button
									key={index}
									onClick={() => scrollToSection(item.section)}
									className={`w-full text-left flex items-center space-x-3 p-3 rounded-xl transition-colors ${activeSection === item.section ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'}`}
								>
									<Icon size={20} className="text-gray-500" />
									<span>{item.name}</span>
								</button>
							);
						})}
					</div>

					{/* Botón de Ingreso en el Sidebar */}
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


	return (
		<div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen font-sans">
			{/* Overlay para el Sidebar - Alto Z-Index para cubrir todo */}
			{sidebarOpen && <div className="fixed inset-0 bg-black/50 z-[80] md:hidden" onClick={() => setSidebarOpen(false)}></div>}
				
			{/* Sidebar (Menú Lateral) */}
			<Sidebar />


			{/* Navigation Bar */}
			<nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-green-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Mobile Menu Icon + Logo */}
						<div className="flex items-center space-x-2">
							{/* Botón para abrir el Sidebar - Solo visible en móvil, colocado al lado del logo */}
							<button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-green-600 p-2 rounded-lg">
								<Menu size={24} />
							</button>

							{/* Logo */}
							<div className="flex items-center space-x-2">
								<div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
									<Leaf className="text-white" size={24} />
								</div>
								<span className="text-2xl font-bold text-gray-800">Delta <span className="text-green-600">Grow</span></span>
							</div>
						</div>

						{/* Desktop Menu */}
						<div className="hidden md:flex space-x-8">
							<button onClick={() => scrollToSection('inicio')} className={`${activeSection === 'inicio' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}>
								<Sprout size={18} />
								<span>Inicio</span>
							</button>
							<button onClick={() => scrollToSection('funciones')} className={`${activeSection === 'funciones' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}>
								<Activity size={18} />
								<span>Funciones</span>
							</button>
							<button onClick={() => scrollToSection('blog')} className={`${activeSection === 'blog' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}>
								<Book size={18} />
								<span>Blog</span>
							</button>
							<button onClick={() => scrollToSection('comunidad')} className={`${activeSection === 'comunidad' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}>
								<Users size={18} />
								<span>Comunidad</span>
							</button>
							<button onClick={() => scrollToSection('contacto')} className={`${activeSection === 'contacto' ? 'text-green-600 font-semibold' : 'text-gray-600'} hover:text-green-600 transition-colors flex items-center space-x-1`}>
								<Mail size={18} />
								<span>Contacto</span>
							</button>
						</div>

						{/* Login Button (Desktop) */}
						<div className="hidden md:block">
							<button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
								<LogIn size={18} />
								<span>Ingresar</span>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
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
						{/* Botones de Acceso Rápido */}
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

					{/* Feature Pills */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
						<div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
							<div className="bg-gradient-to-br from-green-400 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
								<Activity className="text-white" size={24} />
							</div>
							<h3 className="font-bold text-gray-800 text-lg mb-2">Gestión Completa</h3>
							<p className="text-gray-600 text-sm">Administra plantas, espacios y toda la trazabilidad de tu cultivo</p>
						</div>
						<div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
							<div className="bg-gradient-to-br from-blue-400 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
								<Book className="text-white" size={24} />
							</div>
							<h3 className="font-bold text-gray-800 text-lg mb-2">Aprende Siempre</h3>
							<p className="text-gray-600 text-sm">Accede a guías, técnicas y conocimiento de la comunidad</p>
						</div>
						<div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
							<div className="bg-gradient-to-br from-purple-400 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
								<Users className="text-white" size={24} />
							</div>
							<h3 className="font-bold text-gray-800 text-lg mb-2">Comunidad Activa</h3>
							<p className="text-gray-600 text-sm">Comparte tus cultivos y aprende de otros cultivadores</p>
						</div>
					</div>
				</div>
			</section>

			{/* Funciones Section */}
			<section id="funciones" className="py-20 px-4 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Funciones de Gestión del Cultivo</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Herramientas profesionales para llevar tu cultivo al siguiente nivel. Control total desde la siembra hasta la cosecha.
						</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{funcionalidades.map((func, index) => {
							const Icon = func.icon;
							return (
								<div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
									<div className={`bg-gradient-to-br ${func.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
										<Icon className="text-white" size={28} />
									</div>
									<h3 className="text-xl font-bold text-gray-800 mb-3">{func.titulo}</h3>
									<p className="text-gray-600 leading-relaxed">{func.descripcion}</p>
								</div>
							);
						})}
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

			{/* Blog Section */}
			<section id="blog" className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Blog y Recursos Educativos</h2>
						<p className="text-xl text-gray-600">Aprende las mejores técnicas y mantente actualizado</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{articulos.map((articulo, index) => (
							<div key={index} className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
								<div className="bg-gradient-to-br from-green-400 to-emerald-500 h-40 flex items-center justify-center text-6xl">
									{articulo.imagen}
								</div>
								<div className="p-6">
									<div className="flex items-center justify-between mb-3">
										<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{articulo.categoria}</span>
										<span className="text-gray-500 text-xs">{articulo.fecha}</span>
									</div>
									<h3 className="text-xl font-bold text-gray-800 mb-3">{articulo.titulo}</h3>
									<button className="text-green-600 font-semibold hover:text-green-700 flex items-center space-x-1">
										<span>Leer más</span>
										<ChevronRight size={16} />
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-12">
						<button className="bg-white border-2 border-green-500 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300">
							Ver Todos los Artículos
						</button>
					</div>
				</div>
			</section>

			{/* Comunidad Section */}
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
									<div className="flex items-center space-x-3">
										<Award className="text-amber-300" size={28} />
										<span className="text-lg">Comparte tus mejores cosechas</span>
									</div>
									<div className="flex items-center space-x-3">
										<MessageSquare className="text-blue-300" size={28} />
										<span className="text-lg">Consulta y aprende de expertos</span>
									</div>
									<div className="flex items-center space-x-3">
										<Users className="text-purple-300" size={28} />
										<span className="text-lg">Conecta con cultivadores de todo el país</span>
									</div>
								</div>

								<button className="mt-8 bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2">
									<Users size={20} />
									<span>Explorar la Comunidad</span>
								</button>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
									<p className="text-4xl font-bold mb-2">500+</p>
									<p className="text-green-100">Cultivadores activos</p>
								</div>
								<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
									<p className="text-4xl font-bold mb-2">1.2K</p>
									<p className="text-green-100">Cultivos registrados</p>
								</div>
								<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
									<p className="text-4xl font-bold mb-2">250+</p>
									<p className="text-green-100">Artículos publicados</p>
								</div>
								<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
									<p className="text-4xl font-bold mb-2">3.5K</p>
									<p className="text-green-100">Comentarios y tips</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contacto Section */}
			<section id="contacto" className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
						<p className="text-xl text-gray-600">¿Tienes alguna duda o quieres saber más? Escríbenos.</p>
					</div>
					
					<div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-green-100">
						<form className="space-y-6">
							{/* Nombre */}
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Tu nombre y apellido"
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150"
								/>
							</div>

							{/* Email */}
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="tu.correo@ejemplo.com"
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150"
								/>
							</div>

							{/* Mensaje */}
							<div>
								<label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
								<textarea
									id="message"
									name="message"
									rows="4"
									placeholder="Escribe tu consulta aquí..."
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150"
								></textarea>
							</div>

							{/* Botón Enviar */}
							<button
								type="submit"
								className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-2"
							>
								<Mail size={20} />
								<span>Enviar Mensaje</span>
							</button>
						</form>
					</div>
				</div>
			</section>

			{/* CTA Final */}
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

			{/* Footer */}
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
		</div>
	);
}