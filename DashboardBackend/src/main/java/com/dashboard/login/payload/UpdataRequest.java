package com.dashboard.login.payload;

import javax.validation.constraints.Email;

public class UpdataRequest {
	
	private String name;

	@Email
	private String email;

	private String password;
	
	private Boolean root;

	public Boolean getRoot() {
		return root;
	}

	public void setRoot(Boolean root) {
		this.root = root;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
}
