package com.shivam.springbootcookieauth.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class OpenAPIConfig {


    @Bean
    public OpenAPI myOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8081");
        devServer.setDescription("Server URL in Development environment");
        Info info = new Info()
                .title("Demo API")
                .version("1.0")
                .description("This API exposes endpoints to manage demo.");
        return new OpenAPI().info(info).servers(List.of(devServer));
    }
}