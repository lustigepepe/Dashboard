package com.dashboard.login.controller;

import com.dashboard.login.exception.ResourceNotFoundException;
import com.dashboard.login.model.User;
import com.dashboard.login.repository.UserRepository;
import com.dashboard.login.security.CurrentUser;
import com.dashboard.login.security.UserPrincipal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
	public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
		return userRepository.findById(userPrincipal.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
	}

	@GetMapping("/users")
	@PreAuthorize("hasRole('USER')")
	public List<User> getAllUsers(@CurrentUser UserPrincipal userPrincipal) {
		return userRepository.findAll();
	}

	@GetMapping("/user/email/{emailRegex}")
	@PreAuthorize("hasRole('USER')")
	public List<User> findByEmail(@PathVariable String emailRegex) {
		emailRegex = emailRegex.replace("*", "%");
		return userRepository.findByEmailRegex(emailRegex);
	}

	@GetMapping(value = "/user/name/{nameRegex}")
	@PreAuthorize("hasRole('USER')")
	public List<User> findByName(@PathVariable String nameRegex) {
		nameRegex = nameRegex.replace("*", "%");
		return userRepository.findByName(nameRegex);
	}
}
