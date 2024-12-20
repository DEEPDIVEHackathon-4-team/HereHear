package com.goormthon.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.goormthon.backend.entity.Category;
import com.goormthon.backend.entity.Poster;

@Repository
public interface PosterRepository extends JpaRepository<Poster, Long> {

  @Query("SELECT p FROM Poster p WHERE (6371 * ACOS(COS(RADIANS(:latitude)) * COS(RADIANS(p.latitude)) * COS(RADIANS(p.longitude) - RADIANS(:longitude)) + SIN(RADIANS(:latitude)) * SIN(RADIANS(p.latitude)))) <= :distance")
  Page<Poster> findPostersWithinDistance(@Param("latitude") Double latitude,
      @Param("longitude") Double longitude,
      @Param("distance") Double distance,
      Pageable pageable);

  @Query("SELECT p FROM Poster p WHERE p.category = :category AND " +
      "(6371 * acos(cos(radians(:latitude)) * cos(radians(p.latitude)) * " +
      "cos(radians(p.longitude) - radians(:longitude)) + " +
      "sin(radians(:latitude)) * sin(radians(p.latitude)))) <= :distance")
  Page<Poster> findByCategoryAndDistance(
      @Param("category") Category category,
      @Param("latitude") Double latitude,
      @Param("longitude") Double longitude,
      @Param("distance") Double distance,
      Pageable pageable
  );

  // 위치 기반 검색 (카테고리 제외)
  @Query("SELECT p FROM Poster p WHERE (6371 * acos(cos(radians(:latitude)) * cos(radians(p.latitude)) * " +
      "cos(radians(p.longitude) - radians(:longitude)) + " +
      "sin(radians(:latitude)) * sin(radians(p.latitude)))) <= :distance")
  Page<Poster> findPostersByLocation(@Param("latitude") Double latitude,
      @Param("longitude") Double longitude,
      @Param("distance") Double distance,
      Pageable pageable);


  Page<Poster> findByCategoryAndRegionName(Category category, String regionName, Pageable pageable);
  Page<Poster> findByRegionName(String regionName, Pageable pageable);
}
