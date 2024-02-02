package com.example.samplebiservice;

import jakarta.servlet.http.*;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.authentication.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.util.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.*;

@Controller
public class BiViewController {
    private final BiProperties biProperties;
    private final OAuth2AuthorizedClientService clientService;
    
    public BiViewController(BiProperties biProperties,
                            OAuth2AuthorizedClientService clientService) {
        this.biProperties = biProperties;
        this.clientService = clientService;
    }

    @GetMapping({"/"})
    String mbir(Model model, OAuth2AuthenticationToken authentication) {
        model.addAttribute("username", authentication.getPrincipal().getAttribute("email"));
        return "index";
    }

    @GetMapping({"/signout"})
    String logout(OAuth2AuthenticationToken authentication) {
        OAuth2AuthorizedClient client = clientService
                .loadAuthorizedClient(
                        authentication.getAuthorizedClientRegistrationId(),
                        authentication.getName()
                );

        if(client == null) {
            return "redirect:/logout";
        }

        String revokeTokenUrl = biProperties.getDevXCloudAPIBaseUrl()
                + "/tenants/"
                + biProperties.getTenantId()
                + "/oauth2/revoke";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(client.getAccessToken().getTokenValue());
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        //revoke the current JWT token
        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
        map.add("client_id", biProperties.getClientId());
        map.add("token", client.getAccessToken().getTokenValue());
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        new RestTemplate().exchange(revokeTokenUrl, HttpMethod.POST, request, String.class);

        //terminate the auth session
        String logoutUrl = biProperties.getDevXCloudAPIBaseUrl()
                + "/tenants/"
                + biProperties.getTenantId()
                + "/oauth2/logout?client_id=" + biProperties.getClientId()
                + "&sid=" +  authentication.getPrincipal().getAttribute("sid")
                + "&redirect_uri=http://localhost:9090/logout";

        return "redirect:" + logoutUrl;
    }

    @GetMapping({"/load-mbir-jsapi/{id}"})
    String loadMBIRVisualization(Model model, OAuth2AuthenticationToken authentication, @PathVariable String id) {
        OAuth2AuthorizedClient client = clientService
                .loadAuthorizedClient(
                        authentication.getAuthorizedClientRegistrationId(),
                        authentication.getName()
                );

        if(client == null) {
            return "redirect:/logout";
        }

        model.addAttribute("authToken", client.getAccessToken().getTokenValue());
        model.addAttribute("bireportingjs_ServiceUrl", biProperties.getBiReportingJSServiceUrl().trim());
        model.addAttribute("reportPath", biProperties.getReportPath().trim());
        model.addAttribute("dashboardPath", biProperties.getDashboardPath().trim());

        return id;

    }
}
