package com.goormthon.backend.entity;

import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Location {
	private Long id;
	private Double latitude;
	private Double longitude;

	@Builder(access = AccessLevel.PRIVATE)
	private Location(Double latitude, Double longitude) {
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public static Location of() {
		return Location.builder().build();
	}
}
