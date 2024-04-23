package com.example.samplebiservice.proxy;

import jakarta.servlet.http.*;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.authentication.*;
import org.springframework.web.bind.annotation.*;

import java.net.*;
import java.util.*;


@RestController
public class ProxyController {
    private final ProxyService service;

    public ProxyController(ProxyService service) {
        this.service = service;
    }

    @RequestMapping(
            value = {"/proxy/**", "/iportal/**"},
            method = {
                    RequestMethod.PUT,
                    RequestMethod.POST,
                    RequestMethod.OPTIONS,
                    RequestMethod.GET,
                    RequestMethod.HEAD,
                    RequestMethod.DELETE,
                    RequestMethod.PATCH})
    @CrossOrigin
    public ResponseEntity<String> proxy(@RequestBody(required = false) String body,
                                        HttpMethod method,
                                        OAuth2AuthenticationToken authentication,
                                        HttpServletRequest request)
            throws URISyntaxException {
        return service.processProxyRequest(body, method, authentication, request, UUID.randomUUID().toString());
    }
}
