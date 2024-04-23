package com.example.samplebiservice;

import org.springframework.security.access.annotation.*;
import org.springframework.security.core.*;
import org.springframework.security.oauth2.client.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.*;

import java.security.*;
import java.util.*;

@Controller
public class BiViewController {
    private final BiProperties biProperties;
    private final OAuth2AuthorizedClientManager authorizedClientManager;
    
    public BiViewController(BiProperties biProperties,
                            OAuth2AuthorizedClientManager authorizedClientManager) {
        this.biProperties = biProperties;
        this.authorizedClientManager = authorizedClientManager;
    }

    @GetMapping({"/"})
    RedirectView index(Authentication authentication) {
        String path = "/mbir";
        if(authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equalsIgnoreCase("ROLE_ADMIN"))) {
          path = "/setting";
        }

        return new RedirectView(path);
    }

    @GetMapping({"/mbir"})
    @Secured("ROLE_MBIR")
    String mbir(Model model, Principal principal) {
        model.addAttribute("username", principal.getName());
        return "index";
    }

    @GetMapping({"/setting"})
    @Secured("ROLE_ADMIN")
    String setting(Model model, Principal principal) {
        model.addAttribute("setting", biProperties);
        model.addAttribute("username", principal.getName());
        return "settings";
    }

    @GetMapping({"/load-mbir-jsapi/{id}"})
    String loadMBIRVisualization(Model model, Principal principal, @PathVariable String id) {
        OAuth2AuthorizeRequest authorizeRequest = OAuth2AuthorizeRequest.withClientRegistrationId("mbir")
                .principal(principal.getName())
                .build();
        String externalJWTToken = Objects
                .requireNonNull(authorizedClientManager.authorize(authorizeRequest))
                .getAccessToken()
                .getTokenValue();

        model.addAttribute("authToken", externalJWTToken);
        model.addAttribute("bireportingjs_ServiceUrl", biProperties.getBiReportingJSServiceUrl().trim());
        model.addAttribute("reportPath", biProperties.getReportPath().trim());
        model.addAttribute("dashboardPath", biProperties.getDashboardPath().trim());

        return id;

    }

    @PostMapping("/setting")
    @CrossOrigin
    String setting(@ModelAttribute BiProperties input, Model model) {
        biProperties.setReportPath(input.getReportPath().trim());
        biProperties.setDashboardPath(input.getDashboardPath().trim());

        model.addAttribute("setting", biProperties);
        model.addAttribute("success", "success");
        return "settings";
    }
}
