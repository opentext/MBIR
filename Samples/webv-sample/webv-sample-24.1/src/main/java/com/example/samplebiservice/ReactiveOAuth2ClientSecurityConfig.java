package com.example.samplebiservice;

import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.config.annotation.web.reactive.*;
import org.springframework.security.oauth2.client.registration.*;
import org.springframework.security.oauth2.core.*;

@Configuration
@EnableWebFluxSecurity
@ComponentScan
@EnableWebSecurity
public class ReactiveOAuth2ClientSecurityConfig {

    @Bean
    @Primary
    ReactiveClientRegistrationRepository getRegistration(
            @Value("${bi.app.devXCloudAPIBaseUrl}") String issuerUri,
            @Value("${spring.security.oauth2.client.registration.mbir.provider}") String registrationId,
            @Value("${spring.security.oauth2.client.provider.mbir.authorization-uri}") String authorizationUri,
            @Value("${spring.security.oauth2.client.provider.mbir.jwk-set-uri}") String jwkSetUri,
            @Value("${spring.security.oauth2.client.registration.mbir.redirect-uri}") String redirectUri,
            @Value("${spring.security.oauth2.client.provider.mbir.token-uri}") String token_uri,
            @Value("${spring.security.oauth2.client.registration.mbir.client-id}") String client_id,
            @Value("${spring.security.oauth2.client.registration.mbir.client-secret}") String client_secret
    ) {

        ClientRegistration registration = ClientRegistration
                .withRegistrationId(registrationId)
                .tokenUri(token_uri)
                .clientId(client_id)
                .authorizationUri(authorizationUri)
                .jwkSetUri(jwkSetUri)
                .clientSecret(client_secret)
                .redirectUri(redirectUri)
                .issuerUri(issuerUri)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .scope("openid")
                .build();
        return new InMemoryReactiveClientRegistrationRepository(registration);
    }
}
