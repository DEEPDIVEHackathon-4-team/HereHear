package com.goormthon.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Region {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String city;	// 시/도
	private String district;	// 구	
	private String subdistrict;	// 읍/면/동

	@Builder(access = AccessLevel.PRIVATE)
	private Region(String city, String district, String subdistrict) {
		this.city = city;
		this.district = district;
		this.subdistrict = subdistrict;
	}

	public static Region of() {
		return Region.builder().build();
	}
}
