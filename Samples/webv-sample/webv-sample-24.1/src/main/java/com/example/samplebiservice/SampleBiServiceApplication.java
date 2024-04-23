package com.example.samplebiservice;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.context.properties.*;

@SpringBootApplication
@EnableConfigurationProperties(BiProperties.class)
public class SampleBiServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SampleBiServiceApplication.class, args);
    }

}
