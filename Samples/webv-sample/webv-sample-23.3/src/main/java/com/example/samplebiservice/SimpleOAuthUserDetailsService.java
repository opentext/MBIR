package com.example.samplebiservice;

import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.authority.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.provisioning.*;
import org.springframework.stereotype.*;
import org.springframework.web.context.request.*;

import java.util.*;
import java.util.logging.*;

@Component
public class SimpleOAuthUserDetailsService extends InMemoryUserDetailsManager {
    private final Logger logger = Logger.getLogger(this.getClass().getName());

    @Autowired
    private OAuth2AuthorizedClientManager authorizedClientManager;

    public SimpleOAuthUserDetailsService() {
        super();
    }

    public SimpleOAuthUserDetailsService(UserDetails... users) {
        super(users);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.equals("admin")) {
            UserDetails user = super.loadUserByUsername(username.toLowerCase());
            return new User(user.getUsername(), user.getPassword(), user.isEnabled(), user.isAccountNonExpired(),
                    user.isCredentialsNonExpired(), user.isAccountNonLocked(), user.getAuthorities());
        } else {
            logger.info("logging in with otds user");
            //authenticate through otds
            HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
            String password = request.getParameter("password");

            OAuth2AuthorizeRequest authorizeRequest = OAuth2AuthorizeRequest.withClientRegistrationId("mbir")
                    .principal(username)
                    .attributes(attrs -> {
                        attrs.put(OAuth2AuthorizationContext.USERNAME_ATTRIBUTE_NAME, username);
                        attrs.put(OAuth2AuthorizationContext.PASSWORD_ATTRIBUTE_NAME, password);
                    })
                    .build();
            OAuth2AuthorizedClient authorizedClient = null;
            String errMsg = "failed to authenticate with OAuth2 token service, please make sure the cliend id/secret, subscription name and user credentials are correct";
            try {
                authorizedClient = authorizedClientManager.authorize(authorizeRequest);
            } catch (Exception e) {
                logger.log(Level.SEVERE, errMsg, e);
            }
            if(authorizedClient == null || authorizedClient.getAccessToken() == null) {
                throw new BadCredentialsException(errMsg);
            }

            return User
                    .withDefaultPasswordEncoder()
                    .username(username)
                    .password(password)
                    .roles("MBIR")
                    .build();
        }
    }
}
