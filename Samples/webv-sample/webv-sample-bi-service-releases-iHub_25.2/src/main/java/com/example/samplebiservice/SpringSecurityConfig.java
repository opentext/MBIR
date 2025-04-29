package com.example.samplebiservice;

import org.springframework.context.annotation.*;
import org.springframework.security.config.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.config.annotation.web.configurers.*;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.endpoint.*;
import org.springframework.security.oauth2.client.registration.*;
import org.springframework.security.oauth2.client.web.*;
import org.springframework.security.web.*;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    @Bean
    public OAuth2AuthorizationRequestResolver pkceResolver(ClientRegistrationRepository repo) {
        var base_uri = OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI;
        var resolver = new  DefaultOAuth2AuthorizationRequestResolver(repo, base_uri);
        resolver.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());
        return resolver;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, OAuth2AuthorizationRequestResolver resolver) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
                .oauth2Login(login -> login.authorizationEndpoint(config -> config.authorizationRequestResolver(resolver)))
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }

    @Bean
    @Primary
    public OAuth2AuthorizedClientManager authorizedClientManager(
            ClientRegistrationRepository clientRegistrationRepository,
            OAuth2AuthorizedClientRepository authorizedClientRepository) {

       var refreshTokenTokenResponseClient = new DefaultRefreshTokenTokenResponseClient();

        var authorizedClientProvider = OAuth2AuthorizedClientProviderBuilder.builder()
                        .authorizationCode()
                        .refreshToken(configurer -> configurer.accessTokenResponseClient(refreshTokenTokenResponseClient))
                        .build();

        var authorizedClientManager = new DefaultOAuth2AuthorizedClientManager(clientRegistrationRepository, authorizedClientRepository);
        authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

        return authorizedClientManager;
    }
}
