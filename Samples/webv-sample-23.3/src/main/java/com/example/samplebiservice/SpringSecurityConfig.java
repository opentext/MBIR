package com.example.samplebiservice;

import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.security.config.*;
import org.springframework.security.config.annotation.authentication.builders.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.web.*;

@Configuration
@ComponentScan
@EnableWebSecurity
public class SpringSecurityConfig {
    @Autowired
    UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .eraseCredentials(false)
                .userDetailsService(userDetailsService);
        http
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().authenticated()
                ).formLogin(Customizer.withDefaults())
                .authenticationManager(authenticationManagerBuilder.build());
        return http.build();
    }
}
