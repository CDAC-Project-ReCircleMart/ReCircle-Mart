//package com.recirclemart;
//
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.transaction.annotation.EnableTransactionManagement;
//
//@SpringBootApplication
//@EntityScan(basePackages = "com.recirclemart.entity")
//@EnableJpaRepositories(basePackages = "com.recirclemart.repository")
//@EnableTransactionManagement
//public class RecirclemartApplication {
//
//    public static void main(String[] args) {
//        SpringApplication.run(RecirclemartApplication.class, args);
//    }
//}


package com.recirclemart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RecirclemartApplication {

    public static void main(String[] args) {
        SpringApplication.run(RecirclemartApplication.class, args);
    }
}
