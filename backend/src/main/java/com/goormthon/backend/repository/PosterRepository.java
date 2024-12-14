package com.goormthon.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.goormthon.backend.entity.Poster;

@Repository
public interface PosterRepository extends JpaRepository<Poster, Long>{
  
}
