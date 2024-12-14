package com.goormthon.backend.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Getter
public class Poster {
	private Long id;
	private String title;
	private String contents;
	private Integer like_count;
	private String img;

	@Column(nullable = false)
	@CreatedDate
	private LocalDateTime reservationDate;

	@Builder(access = AccessLevel.PRIVATE)
	private Poster(String title, String contents, Integer like_count, String img,
		LocalDateTime reservationDate) {
		this.title = title;
		this.contents = contents;
		this.like_count = like_count;
		this.img = img;
		this.reservationDate = reservationDate;
	}

	public static Poster of() {
		return Poster.builder().build();
	}

}
