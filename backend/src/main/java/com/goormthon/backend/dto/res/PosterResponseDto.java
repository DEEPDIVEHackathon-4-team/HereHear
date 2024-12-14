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
	private String regionName;
	private Double latitude;
	private Double longitude;
	private Long likeCount;
	private Long dislikeCount;
	private Long viewCount;
	private Long posterId;

	@Builder(access = AccessLevel.PRIVATE)
	private PosterResponseDto(Category category, String title, String content, LocalDateTime createdAt,
		Integer commentCount,
		Long userId, String nickname, String regionName, Double latitude, Double longitude, Long likeCount,
		Long dislikeCount, Long viewCount, Long posterId) {
		this.category = category;
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
		this.commentCount = commentCount;
		this.userId = userId;
		this.nickname = nickname;
		this.regionName = regionName;
		this.latitude = latitude;
		this.longitude = longitude;
		this.likeCount = likeCount;
		this.dislikeCount = dislikeCount;
		this.viewCount = viewCount;
		this.posterId = posterId;
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
			.latitude(poster.getLatitude())
			.longitude(poster.getLongitude())
			.regionName(poster.getRegion().getName())
			.likeCount(poster.getLikeCount())
			.dislikeCount(poster.getDislikeCount())
			.viewCount(poster.getViewCount())
			.posterId(poster.getId())
			.build();
	}

}
