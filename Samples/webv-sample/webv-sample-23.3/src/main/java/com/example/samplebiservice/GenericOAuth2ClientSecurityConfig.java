package com.example.samplebiservice;

import jakarta.servlet.http.*;
import org.springframework.context.annotation.*;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.registration.*;
import org.springframework.security.oauth2.client.web.*;
import org.springframework.security.oauth2.core.endpoint.*;
import org.springframework.util.*;

import java.util.*;
import java.util.function.*;

@Configuration
@ComponentScan
public class GenericOAuth2ClientSecurityConfig {
    @Bean
    @Primary
    public OAuth2AuthorizedClientManager authorizedClientManager(
            ClientRegistrationRepository clientRegistrationRepository,
            OAuth2AuthorizedClientRepository authorizedClientRepository) {

        OAuth2AuthorizedClientProvider authorizedClientProvider =
                OAuth2AuthorizedClientProviderBuilder.builder()
                        .password()
                        .refreshToken()
                        .build();

        DefaultOAuth2AuthorizedClientManager authorizedClientManager =
                new DefaultOAuth2AuthorizedClientManager(
                        clientRegistrationRepository, authorizedClientRepository);
        authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

        // Assuming the `username` and `password` are supplied as `HttpServletRequest` parameters,
        // map the `HttpServletRequest` parameters to `OAuth2AuthorizationContext.getAttributes()`
        authorizedClientManager.setContextAttributesMapper(contextAttributesMapper());

        return authorizedClientManager;
    }

    private Function<OAuth2AuthorizeRequest, Map<String, Object>> contextAttributesMapper() {
        return authorizeRequest -> {
            Map<String, Object> contextAttributes = Collections.emptyMap();
            HttpServletRequest servletRequest = authorizeRequest.getAttribute(HttpServletRequest.class.getName());
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if(servletRequest != null) {
                String username = servletRequest.getParameter(OAuth2ParameterNames.USERNAME);
                String password = servletRequest.getParameter(OAuth2ParameterNames.PASSWORD);
                if (StringUtils.hasText(username) && StringUtils.hasText(password)) {
                    contextAttributes = new HashMap<>();

                    // `PasswordOAuth2AuthorizedClientProvider` requires both attributes
                    contextAttributes.put(OAuth2AuthorizationContext.USERNAME_ATTRIBUTE_NAME, username);
                    contextAttributes.put(OAuth2AuthorizationContext.PASSWORD_ATTRIBUTE_NAME, password);
                }
            } else if(authentication != null && authentication.isAuthenticated()) {
                contextAttributes = new HashMap<>();
                contextAttributes.put(OAuth2AuthorizationContext.USERNAME_ATTRIBUTE_NAME, authentication.getName());
                contextAttributes.put(OAuth2AuthorizationContext.PASSWORD_ATTRIBUTE_NAME, authentication.getCredentials());
            } else {
                return authorizeRequest.getAttributes();
            }
            return contextAttributes;
        };
    }
}
