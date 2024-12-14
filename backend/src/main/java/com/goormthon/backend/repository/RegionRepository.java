package com.goormthon.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.goormthon.backend.entity.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
	List<Region> findByParentCode(Long parentCode);

	Optional<Region> findByName(String name);
}
