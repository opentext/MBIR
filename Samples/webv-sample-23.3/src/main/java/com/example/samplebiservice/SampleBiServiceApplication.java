package com.example.samplebiservice;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.context.properties.*;
import org.springframework.security.config.annotation.method.configuration.*;

@SpringBootApplication
@EnableConfigurationProperties(BiProperties.class)
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SampleBiServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SampleBiServiceApplication.class, args);
    }

}
