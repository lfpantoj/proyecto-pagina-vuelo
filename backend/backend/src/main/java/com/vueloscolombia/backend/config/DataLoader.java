@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private VueloRepository vueloRepository;

    @Override
    public void run(String... args) {

        if(vueloRepository.count() == 0) {
            Vuelo v1 = new Vuelo("Bogotá", "Medellín", 300000, "12:00", "14:00");
            Vuelo v2 = new Vuelo("Cali", "Cartagena", 350000, "15:00", "17:00");
            vueloRepository.saveAll(List.of(v1, v2));
        }
    }
}
