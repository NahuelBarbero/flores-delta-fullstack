package DeltaFlores.web.config;

import DeltaFlores.web.entities.*;
import DeltaFlores.web.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
@Log4j2
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SalaRepository salaRepository;
    private final CepaRepository cepaRepository;
    private final PlantaRepository plantaRepository;
    private final NutrienteRepository nutrienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final PlantEventRepository plantEventRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            log.info("📢 Base de datos ya poblada. Saltando Seeder.");
            return;
        }

        log.info("🌱 Iniciando Poblado de Base de Datos Estilo Grower Pro...");

        // 1. Usuarios (1 Admin, 4 Growers)
        List<User> users = new ArrayList<>();
        User admin = createUser("admin@floresdelta.com", "Admin", "Master", AppRole.ROLE_ADMIN);
        users.add(admin);
        users.add(createUser("grower1@floresdelta.com", "Juan", "Cultivo", AppRole.ROLE_GROWER));
        users.add(createUser("grower2@floresdelta.com", "Maria", "Green", AppRole.ROLE_GROWER));
        users.add(createUser("grower3@floresdelta.com", "Pedro", "Roots", AppRole.ROLE_GROWER));
        users.add(createUser("test@floresdelta.com", "Test", "User", AppRole.ROLE_GROWER));

        userRepository.saveAll(users);

        // 2. Salas (4 Max)
        List<Sala> salas = new ArrayList<>();
        salas.add(createSala("Sala Vegetacion A", "Indoor 80x80 - Alta Humedad", users.get(1)));
        salas.add(createSala("Sala Floración Principal", "Indoor 120x120 - Sodio 600W", users.get(1)));
        salas.add(createSala("Armario Madres y Esquejes", "Bajo consumo - Mantenimiento", users.get(1)));
        salas.add(createSala("Sala Secado", "Oscura y ventilada", users.get(1))); // A veces usada
        salaRepository.saveAll(salas);

        // 3. Cepas (~10 Clásicas)
        List<Cepa> cepas = Arrays.asList(
                createCepa("OG Kush", "DNA Genetics", admin),
                createCepa("Blue Dream", "Humboldt Seeds", admin),
                createCepa("Gorilla Glue #4", "GG Strains", admin),
                createCepa("Gelato 33", "Sherbinstis", admin),
                createCepa("White Widow", "Green House", admin),
                createCepa("Amnesia Haze", "Royal Queen Seeds", admin),
                createCepa("Northern Lights", "Sensi Seeds", admin),
                createCepa("Sour Diesel", "Reserva Privada", admin),
                createCepa("Girl Scout Cookies", "Cookie Fam", admin),
                createCepa("Tangie", "DNA Genetics", admin));
        cepaRepository.saveAll(cepas);

        // 4. Nutrientes
        List<Nutriente> nutrientes = Arrays.asList(
                createNutriente("Base A+B Vege", "Nutrientes base para etapa vegetativa", admin),
                createNutriente("Base A+B Flora", "Nutrientes base para etapa floración", admin),
                createNutriente("CalMag", "Suplemento de Calcio y Magnesio", admin),
                createNutriente("PK Booster", "Potenciador de potasio y fósforo para engorde", admin),
                createNutriente("Mycorrhizae", "Hongos benéficos para raíces", admin));
        nutrienteRepository.saveAll(nutrientes);

        // 5. Plantas (50 Total - Distribuidas)
        Random rand = new Random();
        List<Planta> startPlants = new ArrayList<>();

        // -- Grupo Cosechadas (Hace meses)
        for (int i = 0; i < 15; i++) {
            Planta p = createPlanta(
                    "Cosecha-" + (i + 1),
                    cepas.get(rand.nextInt(cepas.size())),
                    salas.get(1),
                    users.get(1),
                    LocalDate.now().minusDays(120 + rand.nextInt(60)), // Plantada hace 4-6 meses
                    NuevaEtapa.COSECHADA);
            p.setFechaFin(p.getFechaCreacion().plusDays(90)); // Ciclo de 90 dias
            p.setProduccion(rand.nextInt(50) + 20); // 20-70g
            startPlants.add(p);
        }

        // -- Grupo Floración (Actuales)
        for (int i = 0; i < 20; i++) {
            startPlants.add(createPlanta(
                    "Flora-" + (i + 1),
                    cepas.get(rand.nextInt(cepas.size())),
                    salas.get(1),
                    users.get(1),
                    LocalDate.now().minusDays(30 + rand.nextInt(20)), // 1-2 meses edad
                    NuevaEtapa.FLORACION));
        }

        // -- Grupo Vege (Nuevas)
        for (int i = 0; i < 15; i++) {
            startPlants.add(createPlanta(
                    "Vege-" + (i + 1),
                    cepas.get(rand.nextInt(cepas.size())),
                    salas.get(0),
                    users.get(1),
                    LocalDate.now().minusDays(rand.nextInt(20)), // Recientes
                    NuevaEtapa.VEGETACION));
        }

        plantaRepository.saveAll(startPlants);

        // 6. Eventos (Historial)
        // Generar eventos para cada planta segun su edad
        List<PlantEvent> eventos = new ArrayList<>();

        for (Planta p : startPlants) {
            LocalDate current = p.getFechaCreacion();
            LocalDate end = p.getFechaFin() != null ? p.getFechaFin() : LocalDate.now();

            while (current.isBefore(end)) {
                current = current.plusDays(rand.nextInt(3) + 2); // Evento cada 2-5 dias
                if (current.isAfter(end))
                    break;

                int eventTypeRoll = rand.nextInt(10);

                if (eventTypeRoll < 5) { // 50% Riego
                    eventos.add(createWateringEvent(p, current));
                } else if (eventTypeRoll < 7) { // 20% Nutrientes
                    eventos.add(createNutrientEvent(p, current, nutrientes.get(rand.nextInt(nutrientes.size()))));
                } else if (eventTypeRoll < 9) { // 20% Nota/Foto
                    eventos.add(createNoteEvent(p, current));
                }
            }
        }
        plantEventRepository.saveAll(eventos);

        log.info("✅ Carga de datos completada: {} Plantas, {} Eventos generados.", startPlants.size(), eventos.size());
    }

    private User createUser(String email, String nombre, String apellido, AppRole role) {
        User u = new User();
        u.setUsername(email);
        u.setPassword(passwordEncoder.encode("123456"));
        u.setNombre(nombre);
        u.setApellido(apellido);
        u.setRol(role);
        return u;
    }

    private Sala createSala(String nombre, String desc, User owner) {
        Sala s = new Sala();
        s.setNombre(nombre);
        s.setDescripcion(desc);
        s.setUser(owner);
        return s;
    }

    private Cepa createCepa(String nombre, String banco, User owner) {
        Cepa c = new Cepa();
        c.setGeneticaParental(nombre);
        // c.setBanco(banco); // Does not exist
        c.setDetalle("Banco: " + banco);
        c.setUser(owner); // Missing in previous version
        return c;
    }

    private Nutriente createNutriente(String titulo, String desc, User owner) {
        Nutriente n = new Nutriente();
        n.setTitulo(titulo);
        n.setDescripcion(desc);
        n.setUser(owner); // Missing in previous version
        return n;
    }

    private Planta createPlanta(String nombre, Cepa cepa, Sala sala, User user, LocalDate fecha, NuevaEtapa etapa) {
        Planta p = new Planta();
        p.setNombre(nombre);
        p.setCepa(cepa);
        p.setSala(sala);
        p.setUser(user);
        p.setFechaCreacion(fecha);
        p.setEtapa(etapa);
        p.setUbicacion("Maceta 10L");
        return p;
    }

    private WateringEvent createWateringEvent(Planta p, LocalDate fecha) {
        WateringEvent e = new WateringEvent();
        e.setPlantas(List.of(p));
        e.setFecha(fecha);
        e.setPhAgua(6.0 + new Random().nextDouble() * 0.5); // 6.0 - 6.5
        e.setEcAgua(0.8 + new Random().nextDouble() * 1.0); // 0.8 - 1.8
        e.setTempAgua(20.0 + new Random().nextDouble() * 5.0);
        return e;
    }

    private NutrientEvent createNutrientEvent(Planta p, LocalDate fecha, Nutriente n) {
        NutrientEvent e = new NutrientEvent();
        e.setPlantas(List.of(p));
        e.setFecha(fecha);
        e.setNutriente(n);
        return e;
    }

    private NoteEvent createNoteEvent(Planta p, LocalDate fecha) {
        NoteEvent e = new NoteEvent();
        e.setPlantas(List.of(p));
        e.setFecha(fecha);
        e.setText("Observación rutinaria: "
                + (new Random().nextBoolean() ? "Hojas verdes y sanas." : "Creciendo vigorosamente."));
        return e;
    }
}
