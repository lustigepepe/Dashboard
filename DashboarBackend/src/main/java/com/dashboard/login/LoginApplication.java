package com.dashboard.login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.dashboard.login.config.AppGlobalProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppGlobalProperties.class)
public class LoginApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginApplication.class, args);
	}
}
