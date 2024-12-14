package com.goormthon.backend.entity;

import java.util.ArrayList;
import java.util.List;

import com.goormthon.backend.dto.req.LocationReq;

import jakarta.persistence.CascadeType;
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
public class Location {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Double latitude;
	private Double longitude;

	@OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<User> users = new ArrayList<>();

	@OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Poster> posters = new ArrayList<>();

	@Builder(access = AccessLevel.PRIVATE)
	private Location(Double latitude, Double longitude, List<User> users, List<Poster> posters) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.users = users;
		this.posters = posters;
	}
	
	public static Location of(LocationReq dto) {
		return Location.builder()
			.latitude(dto.getLocation().getLatitude())
			.longitude(dto.getLocation().getLongitude())
			.build();
	}
}
