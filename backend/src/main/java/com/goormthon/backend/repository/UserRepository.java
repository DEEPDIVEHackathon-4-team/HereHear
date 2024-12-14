package com.goormthon.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.goormthon.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	boolean existsByNickname(String nickname);
	boolean existsByEmail(String email);
}
