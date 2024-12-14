package com.goormthon.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.goormthon.backend.entity.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location,Long>{

  Optional<Location> findByLatitudeAndLongtitude(Double lat, Double lng);
} 
