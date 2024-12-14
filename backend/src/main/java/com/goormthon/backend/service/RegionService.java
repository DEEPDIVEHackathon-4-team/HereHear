package com.goormthon.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.goormthon.backend.entity.Region;
import com.goormthon.backend.repository.RegionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegionService {

	private final RegionRepository regionRepository;

	// 지역 등록
	public Region createRegion(Long code, String name, Long parentCode) {
		Region region = new Region(code, name, parentCode);
		return regionRepository.save(region);
	}

	// 특정 parentCode를 가진 하위 지역 목록 조회
	public List<Region> getChildren(Long parentCode) {
		return regionRepository.findByParentCode(parentCode);
	}

	// 계층구조 출력 (재귀)
	public void printRegionHierarchy(Long code) {
		Region region = regionRepository.findById(code)
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 코드입니다: " + code));
		printHierarchy(region, 0);
	}

	private void printHierarchy(Region region, int depth) {
		String indent = " ".repeat(depth * 2);
		System.out.println(indent + region.getName());
		List<Region> children = regionRepository.findByParentCode(region.getCode());
		for (Region child : children) {
			printHierarchy(child, depth + 1);
		}
	}
}