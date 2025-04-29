package com.example.samplebiservice;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.context.properties.*;
import org.springframework.context.annotation.*;
import org.springframework.http.client.*;
import org.springframework.retry.annotation.*;
import org.springframework.retry.policy.*;
import org.springframework.retry.support.*;
import org.springframework.web.client.*;

@SpringBootApplication
@EnableConfigurationProperties(BiProperties.class)
@EnableRetry
public class SampleBiServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SampleBiServiceApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        ClientHttpRequestFactory factory = new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory());
        return new RestTemplate(factory);
    }

    @Bean
    public RetryTemplate retryTemplate() {
        RetryTemplate retryTemplate = new RetryTemplate();
        SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy();
        retryPolicy.setMaxAttempts(3);
        retryTemplate.setRetryPolicy(retryPolicy);
        return retryTemplate;
    }
}
