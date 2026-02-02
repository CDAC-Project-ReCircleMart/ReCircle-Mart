package com.recirclemart.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	// @Override
	// protected boolean shouldNotFilter(HttpServletRequest request) throws
	// ServletException {
	// System.out.println("asd");
	// String path = request.getServletPath();
	// System.out.println(path);
	// return path.equals("/api/users/register/") ||
	// path.startsWith("/authenticate");
	// }

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		String authHeader = request.getHeader(("Authorization"));
		System.out.println("Authentication Header : " + authHeader);
		boolean validHeader = authHeader != null && authHeader.startsWith("Bearer");
		Authentication auth = null;
		if (validHeader) {
			String token = authHeader.replace("Bearer", "").trim();
			System.out.println("Token is : " + token);
			auth = jwtUtil.validateToken(token);

		}

		if (auth != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			SecurityContextHolder.getContext().setAuthentication(auth);

		}

		filterChain.doFilter(request, response);

	}

	
}
