package com.goormthon.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.goormthon.backend.entity.Poster;

@Repository
  public interface PosterRepository extends JpaRepository<Poster, Long>{
  @Query("SELECT c FROM Coordinate c " +
  "WHERE (6371 * " +
  "ACOS(COS(RADIANS(:latitude)) * COS(RADIANS(c.latitude)) * " +
  "COS(RADIANS(c.longitude) - RADIANS(:longitude)) + " +
  "SIN(RADIANS(:latitude)) * SIN(RADIANS(c.latitude)))) <= :distance")
  Page<Poster> findWithinDistance(@Param("latitude") double latitude,
                                  @Param("longitude") double longitude,
                                  @Param("distance") double distance,
                                  Pageable pageable);


    
  
}
