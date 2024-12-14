package com.goormthon.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goormthon.backend.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findByPosterId(Long postId);
}
