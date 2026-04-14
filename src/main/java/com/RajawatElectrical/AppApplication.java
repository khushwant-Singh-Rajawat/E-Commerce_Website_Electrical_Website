package com.RajawatElectrical;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.RajawatElectrical.Repository")
@EntityScan(basePackages = "com.RajawatElectrical.Model")
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
		System.out.println("🚀 RajawatElectrical.com Backend Started Successfully! ⚡");
	}

}
