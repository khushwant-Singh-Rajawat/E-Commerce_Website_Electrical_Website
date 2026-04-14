package com.RajawatElectrical.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig
{
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // ✅ Public pages
                        .requestMatchers("/", "/css/**", "/js/**", "/images/**", "/login.html", "/register.html").permitAll()
                        // ✅ Protected APIs (Need Login)
                        .requestMatchers("/api/cart/**", "/api/services/book", "/api/orders/**").authenticated()
                        // ✅ All other APIs public
                        .anyRequest().permitAll()
                );
        return http.build();
    }
}
