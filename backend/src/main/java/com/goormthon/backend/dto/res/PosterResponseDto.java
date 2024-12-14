package com.goormthon.backend.dto.res;

import java.time.LocalDateTime;

import com.goormthon.backend.entity.Category;
import com.goormthon.backend.entity.Poster;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PosterResponseDto {
	private Category category;
	private String title;
	private String content;
	private LocalDateTime createdAt;
	private Integer commentCount;
	private Long userId;
	private String nickname;
	private String city;

	@Builder(access = AccessLevel.PRIVATE)
	private PosterResponseDto(Category category, String title, String content, LocalDateTime createdAt,
		Integer commentCount, Long userId, String nickname, String city) {
		this.category = category;
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
		this.commentCount = commentCount;
		this.userId = userId;
		this.nickname = nickname;
		this.city = city;
	}

	public static PosterResponseDto of(Poster poster) {
		return PosterResponseDto.builder()
			.category(poster.getCategory())
			.title(poster.getTitle())
			.content(poster.getContents())
			.createdAt(poster.getCreatedAt())
			.commentCount(poster.getComments().size())
			.userId(poster.getUser().getId())
			.nickname(poster.getUser().getNickname())
			.city(poster.getRegion().getName())
			.build();
	}
}
