package com.recirclemart.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		authManagerBuilder.userDetailsService(userDetailsService);
		return authManagerBuilder.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		// Use List.of or Arrays.asList to set your React app's origin
		configuration.setAllowedOrigins(List.of("http://localhost:5173"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true); // Required if sending cookies or Auth headers

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
		System.out.println("sdfasdfa");
		// http
		// .csrf(csrf -> csrf.disable())
		// .authorizeHttpRequests(requests -> requests
		// .requestMatchers("/authenticate", "/api/users/register/").permitAll()
		// .requestMatchers("/cust/**").hasRole("CUSTOMER")
		// .requestMatchers("/admin/**").hasRole("ADMIN")
		// .requestMatchers("/common/**").hasAnyRole("ADMIN", "CUSTOMER")
		// .anyRequest().authenticated()
		// )
		// .httpBasic(Customizer.withDefaults())
		// .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
		// .sessionManagement(session ->
		// session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// return http.build();
		http
				.csrf(csrf -> csrf.disable()) // Keep disabled for APIs
				.cors(Customizer.withDefaults())
				.authorizeHttpRequests(requests -> requests
						// This line allows access to every single endpoint without authentication
						.anyRequest().permitAll())
				.httpBasic(Customizer.withDefaults())
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}
}
