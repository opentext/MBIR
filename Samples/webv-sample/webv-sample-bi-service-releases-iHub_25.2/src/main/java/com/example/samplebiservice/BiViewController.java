package com.example.samplebiservice;

import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.authentication.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.web.bind.annotation.*;

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

        //terminate the auth session
        String logoutUrl = biProperties.getDevXCloudAPIBaseUrl()
                + "/tenants/"
                + biProperties.getTenantId()
                + "/oauth2/logout?client_id=" + biProperties.getClientId()
                + "&sid=" +  authentication.getPrincipal().getAttribute("sid")
                + "&redirect_uri=http://localhost:9090/logout"
                + "&post_logout_redirect_uri=http://localhost:9090/logout";

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

        model.addAttribute("bireportingjs_ServiceUrl", biProperties.getBiReportingJSServiceUrl().trim());
        model.addAttribute("reportPath", biProperties.getReportPath().trim());
        model.addAttribute("dashboardPath", biProperties.getDashboardPath().trim());
        model.addAttribute("dataFilePath", biProperties.getDataFilePath().trim());

        return id;

    }
}
