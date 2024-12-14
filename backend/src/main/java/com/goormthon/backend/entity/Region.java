package com.goormthon.backend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

	@Column(unique = true)
    private String city;

	@Column(unique = true)
    private String district;

	@Column(unique = true)
    private String subdistrict;

	@Builder(access = AccessLevel.PRIVATE)
	private Region(String city, String district, String subdistrict) {
		this.city = city;
		this.district = district;
		this.subdistrict = subdistrict;
	}

	public static Region of(String city, String district, String subdistrict) {
		return Region.builder()
			.city(city)
			.district(district)
			.subdistrict(subdistrict)
			.build();
	}
}
