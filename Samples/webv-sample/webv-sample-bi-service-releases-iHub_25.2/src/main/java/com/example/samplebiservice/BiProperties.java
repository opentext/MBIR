package com.example.samplebiservice;

import lombok.*;
import org.springframework.boot.context.properties.*;

@ConfigurationProperties("bi.app")
@Data
public class BiProperties {
    private String biReportingJSServiceUrl;
    private String devXCloudAPIBaseUrl;
    private String tenantId;
    private String username;
    private String password;
    private String clientId;
    private String clientSecret;
    private String reportPath;
    private String dashboardPath;
    private String dataFilePath;
}
