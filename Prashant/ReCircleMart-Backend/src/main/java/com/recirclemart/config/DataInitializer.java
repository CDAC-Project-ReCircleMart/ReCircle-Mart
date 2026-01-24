package com.recirclemart.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.recirclemart.entities.product.Category;
import com.recirclemart.entities.user.Role;
import com.recirclemart.entities.user.UserStatus;
import com.recirclemart.repository.product.CategoryRepository;
import com.recirclemart.repository.user.RoleRepository;
import com.recirclemart.repository.user.UserStatusRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private UserStatusRepository statusRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    @Override
    public void run(String... args) {

        // ================= ROLES =================
        if (roleRepo.count() == 0) {
            roleRepo.save(new Role("ROLE_USER"));
            roleRepo.save(new Role("ROLE_ADMIN"));
        }

        // ================= USER STATUS =================
        if (statusRepo.count() == 0) {
            statusRepo.save(new UserStatus("ACTIVE"));
            statusRepo.save(new UserStatus("INACTIVE"));
            statusRepo.save(new UserStatus("BLOCKED"));
        }

        // ================= CATEGORIES =================
        if (categoryRepo.count() == 0) {

            Category cars = new Category();
            cars.setCategoryName("Cars");

            Category bikes = new Category();
            bikes.setCategoryName("Bikes");

            Category mobiles = new Category();
            mobiles.setCategoryName("Mobiles");

            Category electronics = new Category();
            electronics.setCategoryName("Electronics");

            Category properties = new Category();
            properties.setCategoryName("Properties");

            Category jobs = new Category();
            jobs.setCategoryName("Jobs");

            categoryRepo.save(cars);
            categoryRepo.save(bikes);
            categoryRepo.save(mobiles);
            categoryRepo.save(electronics);
            categoryRepo.save(properties);
            categoryRepo.save(jobs);
        }
    }
}
