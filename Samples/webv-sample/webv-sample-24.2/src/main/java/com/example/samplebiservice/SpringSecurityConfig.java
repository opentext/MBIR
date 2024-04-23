package com.example.samplebiservice;

import org.springframework.context.annotation.*;
import org.springframework.security.config.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.config.annotation.web.configurers.*;
import org.springframework.security.config.web.server.*;
import org.springframework.security.oauth2.client.registration.*;
import org.springframework.security.oauth2.client.web.*;
import org.springframework.security.oauth2.client.web.server.*;
import org.springframework.security.web.*;
import org.springframework.security.web.server.*;

@Configuration
@ComponentScan
@EnableWebSecurity
public class SpringSecurityConfig {
    @Bean
    public SecurityWebFilterChain pkceFilterChain(ServerHttpSecurity http, ServerOAuth2AuthorizationRequestResolver resolver) {
        http.authorizeExchange(r -> r.anyExchange().authenticated());
        http.oauth2Login(auth -> auth.authorizationRequestResolver(resolver));
        return http.build();
    }

    @Bean
    public ServerOAuth2AuthorizationRequestResolver pkceResolver(ReactiveClientRegistrationRepository repo) {
        DefaultServerOAuth2AuthorizationRequestResolver resolver = new DefaultServerOAuth2AuthorizationRequestResolver(repo);
        resolver.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());
        return resolver;
    }

        @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().authenticated()
                ).oauth2Login(Customizer.withDefaults())
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }
}
