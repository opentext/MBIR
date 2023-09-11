package com.example.samplebiservice;

import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.*;

@Component
public class InMemoryUsersConfig {

    @Autowired
    BiProperties biProperties;

    @Bean
    @Primary
    public UserDetailsService users() {
        User.UserBuilder users = User.withDefaultPasswordEncoder();

        //built in admin user that can modify the system settings, e.g. client id and secret, subscription names, etc.
        UserDetails admin = users
                .username(biProperties.getUsername())
                .password(biProperties.getPassword())
                .roles("ADMIN")
                .build();
        return new SimpleOAuthUserDetailsService(admin);
    }
}
