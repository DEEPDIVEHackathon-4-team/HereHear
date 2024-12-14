package com.goormthon.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.goormthon.backend.entity.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
	Optional<Region> findByCityAndDistrictAndSubdistrict(String city, String district, String subdistrict);
}
