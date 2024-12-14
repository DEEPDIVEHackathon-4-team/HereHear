package com.goormthon.backend.entity;

import java.util.ArrayList;
import java.util.List;

import com.goormthon.backend.dto.req.UserRegisterRequestDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "users")
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(nullable = false, unique = true)
	private String nickname;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

    private Integer heartRate;
	private Double latitude;
	private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id")
    private Region region;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Poster> posters = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

	@Builder(access = AccessLevel.PRIVATE)
	private User(String nickname, String email, String password, Integer heartRate, Double latitude, Double longitude,
		Region region, List<Poster> posters, List<Comment> comments) {
		this.nickname = nickname;
		this.email = email;
		this.password = password;
		this.heartRate = heartRate;
		this.latitude = latitude;
		this.longitude = longitude;
		this.region = region;
		this.posters = posters;
		this.comments = comments;
	}

	public static User of(UserRegisterRequestDto dto) {
		return User.builder()
        .nickname(dto.getNickname())
        .email(dto.getEmail())
        .password(dto.getPassword())
        .build();
	}

    public void update(String nickname, String email, String password) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

	public void updateLocation(Double latitude, Double longitude, Region region) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.region = region;

	}
}
