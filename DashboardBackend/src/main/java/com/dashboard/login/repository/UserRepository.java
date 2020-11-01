package com.dashboard.login.repository;

import com.dashboard.login.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String searchTerm);

	@Query(value = "SELECT * FROM users WHERE email LIKE :searchTerm", nativeQuery = true)
	List<User> findByEmailRegex(@Param("searchTerm") String searchTerm);

	@Query(value = "SELECT * FROM users WHERE name LIKE :searchTerm", nativeQuery = true)
	List<User> findByName(@Param("searchTerm") String searchTerm);

	Boolean existsByEmail(String email);
}