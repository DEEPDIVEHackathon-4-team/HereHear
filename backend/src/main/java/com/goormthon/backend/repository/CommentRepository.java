package com.goormthon.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goormthon.backend.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{

  
} 
