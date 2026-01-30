package com.recirclemart.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class FileUploadConfig {

    // Only configuration needed is in application.properties:
    // file.upload-dir=src/main/resources/static/uploads
    // Multipart is auto-handled by Spring
}
