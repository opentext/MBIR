package com.example.samplebiservice.proxy;

import com.example.samplebiservice.*;
import jakarta.servlet.http.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.*;
import org.springframework.http.client.*;
import org.springframework.retry.annotation.*;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.authentication.*;
import org.springframework.security.oauth2.core.*;
import org.springframework.stereotype.*;
import org.springframework.web.client.*;
import org.springframework.web.util.*;

import java.net.*;
import java.util.*;

@Service
public class ProxyService {
    private final Logger logger = LogManager.getLogger(ProxyService.class);

    private final BiProperties biProperties;
    private final OAuth2AuthorizedClientService clientService;

    public ProxyService(BiProperties biProperties,
                            OAuth2AuthorizedClientService clientService) {
        this.biProperties = biProperties;
        this.clientService = clientService;
    }

    @Retryable(retryFor = Exception.class, backoff = @Backoff(delay = 1000), maxAttempts = 3)
    public ResponseEntity<String> processProxyRequest(String body,
                                                      HttpMethod method,
                                                      OAuth2AuthenticationToken authentication,
                                                      HttpServletRequest request,
                                                      String traceId) {
        org.apache.logging.log4j.ThreadContext.put("traceId", traceId);
        String requestUrl = request.getRequestURI();

        //log if required in this line
        URI uri = URI.create(biProperties.getDevXCloudAPIBaseUrl());

        //if it didn't have bireportingjs in the URI, prefix it
        if(! requestUrl.startsWith("/proxy")) {
            requestUrl = "/bireportingjs" + requestUrl;
        }

        String csrf = request.getParameter("otToken");
        if(csrf != null && ! csrf.isBlank()) {
            request.getSession().setAttribute("otToken", csrf);
        }

        // replacing context path form urI to match actual gateway URI
        String csrfToken = (String) request.getSession().getAttribute("otToken");
        uri = UriComponentsBuilder.fromUri(uri)
                .path(requestUrl.replace("/proxy", "/bireportingjs/iportal"))
                .query(request.getQueryString())
                .replaceQueryParam("otToken", csrfToken)
                .build(true).toUri();

        HttpHeaders headers = new HttpHeaders();
        Enumeration<String> headerNames = request.getHeaderNames();

        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            headers.set(headerName, request.getHeader(headerName));
        }

        headers.set("TRACE", traceId);
        headers.remove(HttpHeaders.ACCEPT_ENCODING);

        if(csrfToken != null) {
            headers.set("otToken", csrfToken);
        }

        try {
            String authenticationToken = getAuthenticationToken(authentication);
            headers.set("Authorization", "Bearer " + authenticationToken);

            HttpEntity<Object> httpEntity = new HttpEntity<>(body, headers);
            ClientHttpRequestFactory factory = new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory());
            RestTemplate restTemplate = new RestTemplate(factory);

            return restTemplate.exchange(uri, method, httpEntity, String.class);

        } catch (HttpStatusCodeException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(e.getStatusCode().value())
                    .headers(e.getResponseHeaders())
                    .body(e.getResponseBodyAsString());
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(500)
                    .body(e.getMessage());
        }

    }

    private String getAuthenticationToken(OAuth2AuthenticationToken authentication) {
        OAuth2AuthorizedClient client = clientService
                .loadAuthorizedClient(
                        authentication.getAuthorizedClientRegistrationId(),
                        authentication.getName()
                );
        return client.getAccessToken().getTokenValue();
    }


    @Recover
    public ResponseEntity<String> recoverFromRestClientErrors(Exception e, String body,
                                                              HttpMethod method, HttpServletRequest request, HttpServletResponse response, String traceId) {
        logger.error("retry method for the following url " + request.getRequestURI() + " has failed" + e.getMessage(), e);

        if(e instanceof OAuth2AuthorizationException) {
            return ResponseEntity.status(401)
                    .body(((OAuth2AuthorizationException) e).getError().getDescription());
        } else {
            return ResponseEntity.status(500)
                    .body("failed to process the request.");
        }
    }
}
