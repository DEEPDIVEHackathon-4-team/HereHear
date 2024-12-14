package com.goormthon.backend.entity;

import java.util.ArrayList;
import java.util.List;

import com.goormthon.backend.dto.req.UserReq;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String nickname;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private Integer heartRate;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<Poster> posters = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<Location> locations = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<Report> reports = new ArrayList<>();

	@Builder(access = AccessLevel.PRIVATE)
	private User(Long id, String email, String nickname, String password, Integer heartRate) {
		this.id = id;
		this.email = email;
		this.nickname = nickname;
		this.password = password;
		this.heartRate = heartRate;
	}

	public static User of(UserReq dto) {
		return User.builder()
        .id(dto.getId())
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
}
